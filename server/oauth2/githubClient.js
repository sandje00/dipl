'use strict';

const { clientId, clientSecret } = require('../config/oauth2');
const axios = require('axios');
const { CLIENT_URL } = process.env;
const crypto = require('crypto');

const baseURL = 'https://github.com';
const ENDPOINTS = {
  authorize: `${baseURL}/login/oauth/authorize`,
  accessToken: `${baseURL}/login/oauth/access_token`
};

class GitHubClient {
  constructor(clientId, clientSecret) {
    this.clientId = clientId;
    this.clientSecret = clientSecret;
    this.redirectUri = `${CLIENT_URL}/oauth2/redirect`;
    this.rest = axios.create({ baseURL });
    this._endpoints = { ...ENDPOINTS };
  }

  buildAuthorizeUri(scope) {
    return `${this._endpoints.authorize}?client_id=${this.clientId}&redirect_uri=${this.redirectUri}&scope=${scope}&state=${this._generateState(64)}`;
  }

  async accessToken(code) {
    return this.rest.post(this._endpoints.accessToken, null, {
      params: {
        client_id: this.clientId,
        client_secret: this.clientSecret,
        code,
        redirect_uri: this.redirectUri
      },
      headers: {
        accept: 'application/json'
      }
    });
  }

  _generateState(size) {
    return crypto.randomBytes(size).toString('hex');
  }
}

const githubClient = new GitHubClient(clientId, clientSecret);

module.exports = githubClient;
