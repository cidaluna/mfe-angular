const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const mf = require('@angular-architects/module-federation/webpack');
const path = require('path');
const share = mf.share;

const sharedMappings = new mf.SharedMappings();
sharedMappings.register(
  path.join(__dirname, '../../tsconfig.json'),
  [/* mapped paths to share */]);

module.exports = {
  output: {
    uniqueName: 'mfeApp',
    publicPath: 'auto',
    scriptType: 'text/javascript'
  },
  optimization: {
    runtimeChunk: false
  },
  resolve: {
    alias: {
      ...sharedMappings.getAliases(),
    }
  },
  experiments: {
    outputModule: true
  },
  devServer: {
    port: 4333,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'
    },
    historyApiFallback: true,
    static: {
      directory: path.join(__dirname, 'dist'),
    },
  },
  plugins: [
    new ModuleFederationPlugin({
        library: { type: 'module' },

        // For remotes
         name:'mfeApp',
         filename: 'remoteEntry.js',
         exposes:{
          './BooksComponent': './projects/mfe-app/src/app/books/books.component.ts',
          './LoginComponent': './projects/mfe-app/src/app/login/login.component.ts',
          './PublishersComponent': './projects/mfe-app/src/app/publishers/publishers.component.ts',
        },


        shared: share({
          '@angular/core': { singleton: true, strictVersion: true, requiredVersion: 'auto' },
          '@angular/common': { singleton: true, strictVersion: true, requiredVersion: 'auto' },
          '@angular/common/http': { singleton: true, strictVersion: true, requiredVersion: 'auto' },
          '@angular/router': { singleton: true, strictVersion: true, requiredVersion: 'auto' },
          '@angular/forms': { singleton: true, strictVersion: true, requiredVersion: 'auto' },
          '@angular/platform-browser': { singleton: true, strictVersion: true, requiredVersion: 'auto' },
          '@angular/platform-browser-dynamic': { singleton: true, strictVersion: true, requiredVersion: 'auto' },
          ...sharedMappings.getDescriptors()
        })

    }),
    sharedMappings.getPlugin()
  ],
};
