const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ErrorOverlayPlugin = require('error-overlay-webpack-plugin');

const isDev = process.env.NODE_ENV !== 'production';
const mode =  isDev ? 'development' : 'production';
const baseDir = __dirname;
const srcDir = `${baseDir}/src`;

const plugins = [
    new HtmlWebpackPlugin({
        template: `${srcDir}/index.html`
    }),
];

if (isDev) {
    plugins.push(new ErrorOverlayPlugin());
}

module.exports = {
    mode,
    entry: `${baseDir}/src/index.js`,
    output: {
        path: `${baseDir}/dist`
    },
    serve: {
        open: true
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader?modules',
                    'sass-loader'
                ]
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            }
        ]
    },
    plugins
};
