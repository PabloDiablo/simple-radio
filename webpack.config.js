var webpack = require('webpack');

var isDebug = process.env.NODE_ENV === 'debug';

module.exports = {

    entry: "./src/index.js",

    output: {
        path: __dirname + "/dist",
        filename: isDebug ? 'SimpleRadio.js' : 'SimpleRadio.min.js',
        libraryTarget: 'umd',
        library: 'SimpleRadio'
    },

    module: {
        loaders: [
            { test: /\.js(x)?$/, loader: 'babel-loader' }
        ]
    },

    resolve: {
        extensions: ['', '.js']
    }

};