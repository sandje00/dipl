'use strict';

const {
  BAD_REQUEST,
  CREATED,
  NO_CONTENT,
  OK
} = require('../shared/errors/status');
const { Note, sequelize, Task } = require('../shared/database');
const githubClient = require('../oauth2/githubClient');
const HttpError = require('../shared/errors/httpError');
const pick = require('lodash/pick');
const Project = require('./project.model');
const { UniqueConstraintError } = require('sequelize');

const msg = {
  SUCCESS_ADD_PROJECT: 'You have added new project successfully.',
  SUCCESS_UPDATE_PROJECT: 'You have updated a project successfully.'
};

const REPO_INFO = [ 'id', 'name', 'full_name', 'private', 'html_url' ];

async function getAll({ user: { id }, query: { attributes } }, res) {
  const defaultAttributes = [ 'id', 'title', 'description', 'repo' ]; // Change as new functionalities are added
  const projects = await Project.findAll({
    attributes: attributes && JSON.parse(attributes) || defaultAttributes,
    where: { userId: id }
  });
  return res.status(OK).json({ projects });
}

async function create(req, res) {
  const newProject = { ...req.body, userId: req.user.id };
  try {
    await Project.create(newProject);
  } catch (err) {
    if (err instanceof UniqueConstraintError) {
      throw new HttpError(BAD_REQUEST, err.errors[0].message);
    }
    throw err;
  }
  return res.status(CREATED).json({ message: msg.SUCCESS_ADD_PROJECT });
}

function getOne({ project }, res) {
  return res.status(OK).json({ project });
}

async function update({ body, project }, res) {
  try {
    project.set({ ...body });
    await project.save();
  } catch (err) {
    if (err instanceof UniqueConstraintError) {
      throw new HttpError(BAD_REQUEST, err.errors[0].message);
    }
    throw err;
  }
  return res.status(OK).json({ message: msg.SUCCESS_UPDATE_PROJECT });
}

async function deleteOne({ project }, res) {
  await sequelize.transaction(async (t) => {
    await Note.destroy(
      { where: { projectId: project.id } },
      { transaction: t }
    );
    await Task.destroy(
      { where: { projectId: project.id } },
      { transaction: t }
    );
    await project.destroy({ transaction: t });
  });
  return res.status(NO_CONTENT).send();
}

async function createRepo({ project, githubAccessToken, query: { isPrivate } }, res) {
  const data = {
    name: project.title,
    description: project.description,
    private: isPrivate
  };
  const repoData = await githubClient.createRepo(githubAccessToken, data);
  const repo = pick(repoData.data, REPO_INFO);
  project.set({ repo });
  await project.save();
  return res.status(CREATED).json({ repo });
}

async function getAllRepos({ githubAccessToken }, res) {
  const reposData = await githubClient.getAllRepos(githubAccessToken);
  const repos = extractReposInfo(reposData.data, REPO_INFO);
  return res.status(OK).json({ repos });
}

async function linkToRepo({ project, body: repo }, res) {
  project.set({ repo });
  await project.save();
  return res.send(OK).json({ repo });
}

module.exports = {
  getAll,
  create,
  getOne,
  update,
  deleteOne,
  createRepo,
  getAllRepos,
  linkToRepo
};

function extractReposInfo(data, info) {
  return data.map(it => pick(it, info));
}
