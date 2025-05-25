const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const mf = require("@angular-architects/module-federation/webpack");
const path = require("path");
const share = mf.share;

const sharedMappings = new mf.SharedMappings();
sharedMappings.register(
  path.join(__dirname, '../../tsconfig.json'),
  [/* mapped paths to share */]);

module.exports = {
  output: {
    uniqueName: "mfeApp",
    publicPath: "auto",
    scriptType: "text/javascript"
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
  plugins: [
    new ModuleFederationPlugin({
        library: { type: "module" },

        // For remotes
         name:"mfeApp",
         filename: "remoteEntry.js",
         exposes:{
          './BooksComponent': './projects/mfe-app/src/app/books/books.component.ts',
          './LoginComponent': './projects/mfe-app/src/app/login/login.component.ts',
          './PublishersComponent': './projects/mfe-app/src/app/publishers/publishers.component.ts',
        },


        shared: share({
          "@angular/core": { singleton: true, strictVersion: true, requiredVersion: 'auto', eager: false },
          "@angular/common": { singleton: true, strictVersion: true, requiredVersion: 'auto', eager: false },
          "@angular/common/http": { singleton: true, strictVersion: true, requiredVersion: 'auto', eager: false },
          "@angular/router": { singleton: true, strictVersion: true, requiredVersion: 'auto', eager: false },
          "@angular/forms": { singleton: true, strictVersion: true, requiredVersion: 'auto', eager: false },
          "@angular/platform-browser": { singleton: true, strictVersion: true, requiredVersion: 'auto', eager: false },
          "@angular/platform-browser-dynamic": { singleton: true, strictVersion: true, requiredVersion: 'auto', eager: false },
          ...sharedMappings.getDescriptors()
        })

    }),
    sharedMappings.getPlugin()
  ],
};
