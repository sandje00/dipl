'use strict';

const {
  GITHUB_OAUTH2_CLIENT_ID,
  GITHUB_OAUTH2_CLIENT_SECRET
} = process.env;

module.exports = {
  clientId: GITHUB_OAUTH2_CLIENT_ID,
  clientSecret: GITHUB_OAUTH2_CLIENT_SECRET
};
