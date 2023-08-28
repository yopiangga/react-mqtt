/* config-overrides.js */
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")
const { removeModuleScopePlugin } = require('customize-cra');

module.exports = function override(config, env) {
    config.plugins.push(new NodePolyfillPlugin())
    removeModuleScopePlugin()(config);
    return config
}