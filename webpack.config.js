const path = require('path');
var ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');

module.exports = {
    entry: {
        'wx':'./wx/game.js',
        'iqiyi': './iqiyi/game.js',
        'browser': './browser/game.js'
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
        // ...
        function()
        {
            this.plugin("done", function(stats)
            {
                if (stats.compilation.errors && stats.compilation.errors.length)
                {
                    console.log(stats.compilation.errors);
                    process.exit(1);
                }
            });
        }
    ],

};