const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
    entry: {
        'wx':'./wx/game.js',
        'iqiyi': './iqiyi/game.js',
        'browser': './browser/game.js',
        'webgl': './webgl/webgl.js',
    },
    output: {
        filename: '[name]/bundle.js',
        path: path.join(__dirname, 'dist'),
        publicPath: "/"
    },
    module: {
        rules: [{
            test: /\.js?$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        }]
    },
    devtool: "source-map",
    plugins: [
        // new UglifyJsPlugin()
    ],

};