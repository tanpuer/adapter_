const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
    entry: {
<<<<<<< HEAD
        // 'wx':'./wx/game.js',
        // 'iqiyi': './iqiyi/game.js',
        // 'browser': './browser/game.js',
=======
        'wx':'./wx/game.js',
        'iqiyi': './iqiyi/game.js',
        'browser': './browser/game.js',
>>>>>>> d54cbef79d8d72bcc56d6711cc47f4f8c28e2840
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