'use strict';

const { clientId, clientSecret } = require('../config/oauth2');
const axios = require('axios');
const { CLIENT_URL } = process.env;
const crypto = require('crypto');

const ENDPOINTS = {
  authorize: 'https://github.com/login/oauth/authorize',
  accessToken: 'https://github.com/login/oauth/access_token',
  createRepo: 'https://api.github.com/user/repos'
};

class GitHubClient {
  constructor(clientId, clientSecret) {
    this._clientId = clientId;
    this._clientSecret = clientSecret;
    this._redirectUri = `${CLIENT_URL}/oauth2/redirect`;
    this._rest = axios.create();
    this._endpoints = { ...ENDPOINTS };
  }

  buildAuthorizeUri(scope) {
    const state = this._generateState(64);
    const githubAuthUri = `${this._endpoints.authorize}?client_id=${this._clientId}&redirect_uri=${this._redirectUri}&scope=${scope}&state=${state}`;
    return {
      state,
      githubAuthUri
    };
  }

  async accessToken(code) {
    return this._rest.post(this._endpoints.accessToken, null, {
      params: {
        client_id: this._clientId,
        client_secret: this._clientSecret,
        code,
        redirect_uri: this._redirectUri
      },
      headers: {
        accept: 'application/json'
      }
    });
  }

  async createRepo(accessToken, data) {
    return this._rest.post(this._endpoints.createRepo, data, {
      headers: this._getAuthHeaders(accessToken)
    });
  }

  _generateState(size) {
    return crypto.randomBytes(size).toString('hex');
  }

  _getAuthHeaders(accessToken) {
    return {
      accept: 'application/vnd.github.v3+json',
      Authorization: `token ${accessToken}`
    }
  }
}

const githubClient = new GitHubClient(clientId, clientSecret);

module.exports = githubClient;
