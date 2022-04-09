'use strict';

const path = require('path');

module.exports = {
  pages: {
    index: {
      entry: path.join(__dirname, 'client/main.js')
    }
  },
  configureWebpack: ({
    resolve: {
      alias: {
        '@': path.join(__dirname, 'client')
      },
      extensions: [ '.js', '.vue' ]
    },
    devServer: {
      proxy: {
        '/api': {
          target: process.env.VUE_APP_API_HOST,
          secure: process.env.NODE_ENV === 'production'
        }
      }
    }
  })
};
