const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    webpack: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
        configure: (webpackConfig, { env, paths }) => {
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
            };
        },
        plugins: [
            new CopyPlugin({
                patterns: [
                    {
                        from: 'src/style',
                        to: './css',
                    },
                ],
            }),
        ],
    },
};
