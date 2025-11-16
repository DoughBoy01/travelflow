const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const path = require('path');

/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {
  projectRoot: __dirname,
  watchFolders: [
    path.resolve(__dirname, '../shared'),
  ],
  resolver: {
    extraNodeModules: {
      '@shared': path.resolve(__dirname, '../shared'),
    },
    nodeModulesPaths: [
      path.resolve(__dirname, 'node_modules'),
      path.resolve(__dirname, '../node_modules'),
    ],
  },
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
