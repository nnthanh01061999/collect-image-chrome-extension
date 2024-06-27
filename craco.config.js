const path = require('path');
const SizePlugin = require('size-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    webpack: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
        configure: (webpackConfig, { env, paths }) => {
            const babelLoaderRule = webpackConfig.module.rules.find(
                (rule) =>
                    rule.use &&
                    rule.use.find((use) => use.loader === 'babel-loader')
            );

            if (babelLoaderRule) {
                babelLoaderRule.use[0].options = {
                    ...babelLoaderRule.use[0].options,
                    plugins: [
                        {
                            loader: require.resolve('./reactCompilerLoader'),
                        },
                    ],
                };
            }

            return {
                ...webpackConfig,
                entry: {
                    main: [
                        env === 'development' &&
                            require.resolve(
                                'react-dev-utils/webpackHotDevClient'
                            ),
                        paths.appIndexJs,
                    ].filter(Boolean),
                    content: './src/chrome/content.ts',
                    background: './src/chrome/background.ts',
                },
                output: {
                    ...webpackConfig.output,
                    filename: 'static/js/[name].js',
                },
                optimization: {
                    ...webpackConfig.optimization,
                    runtimeChunk: false,
                },
                module: {
                    ...webpackConfig.module,
                    rules: [
                        ...webpackConfig.module.rules,
                        {
                            test: /\.css$/,
                            exclude: [/src\/index.css/],
                            use: [MiniCssExtractPlugin.loader, 'css-loader'],
                        },
                    ],
                },
            };
        },
        plugins: [
            new SizePlugin(),
            new MiniCssExtractPlugin({
                filename: 'css/[name].css',
            }),
        ],
    },
};
