// reactCompilerLoader.js
const { transformSync } = require('@babel/core');
const BabelPluginReactCompiler = require('babel-plugin-react-compiler');

const ReactCompilerConfig = {
    /* Add your ReactCompilerConfig here */
};

function reactCompilerLoader(sourceCode, sourceMap) {
    const result = transformSync(sourceCode, {
        filename: this.resourcePath,
        sourceMaps: true,
        plugins: [[BabelPluginReactCompiler, ReactCompilerConfig]],
    });

    if (result === null) {
        this.callback(new Error(`Failed to transform "${this.resourcePath}"`));
        return;
    }

    this.callback(null, result.code, result.map);
}

module.exports = reactCompilerLoader;
