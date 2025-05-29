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
    uniqueName: 'hostApp',
    publicPath: 'auto',
    scriptType: 'text/javascript',
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
        library: { type: 'var', name: 'hostApp'},
        // remotes host
        name: 'hostApp',
        remotes: {
          'mfeApp':'mfeApp@http://localhost:4333/remoteEntry.js',
        },

        shared: share({
          '@angular/core': { singleton: true, strictVersion: true, requiredVersion: '^18.0.0', eager: true },
          '@angular/common': { singleton: true, strictVersion: true, requiredVersion: '^18.0.0', eager: true },
          '@angular/common/http': { singleton: true, strictVersion: true, requiredVersion: '^18.0.0', eager: true },
          '@angular/animations': { singleton: true, strictVersion: true, requiredVersion: '^18.0.0', eager: true },
          '@angular/forms': { singleton: true, strictVersion: true, requiredVersion: '^18.0.0', eager: true },
          '@angular/router': { singleton: true, strictVersion: true, requiredVersion: '^18.0.0', eager: true },
          '@angular/platform-browser': { singleton: true, strictVersion: true, requiredVersion: '^18.0.0', eager: true },
          '@angular/material': { singleton: true, strictVersion: true },
          '@angular/cdk': { singleton: true, strictVersion: true },
          ...sharedMappings.getDescriptors()
        })

    }),
    sharedMappings.getPlugin()
  ],
};
