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
  plugins: [
    new ModuleFederationPlugin({
        library: { type: 'var', name: 'mfeApp'},

        // For remotes
         name:'mfeApp',
         filename: 'remoteEntry.js',
         exposes:{
          './BooksComponent': './projects/mfe-app/src/app/books/books.component.ts',
          './BookAddEditComponent': './projects/mfe-app/src/app/books/book-add-edit/book-add-edit.component.ts',
          './LoginComponent': './projects/mfe-app/src/app/login/login.component.ts',
          './PublishersComponent': './projects/mfe-app/src/app/publishers/publishers.component.ts',
        },


        shared: share({
          '@angular/core': { singleton: true, strictVersion: true, requiredVersion: '^18.0.0', eager: true },
          '@angular/common': { singleton: true, strictVersion: true, requiredVersion: '^18.0.0', eager: true },
          '@angular/common/http': { singleton: true, strictVersion: true, requiredVersion: '^18.0.0', eager: true },
          '@angular/animations': { singleton: true, strictVersion: true, requiredVersion: '^18.0.0', eager: true },
          '@angular/forms': { singleton: true, strictVersion: true, requiredVersion: '^18.0.0', eager: true },
          '@angular/router': { singleton: true, strictVersion: true, requiredVersion: '^18.0.0', eager: true },
          '@angular/platform-browser': { singleton: true, strictVersion: true, requiredVersion: '^18.0.0', eager: true },
          ...sharedMappings.getDescriptors()
        })

    }),
    sharedMappings.getPlugin()
  ],
};
