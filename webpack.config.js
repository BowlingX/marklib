/*
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 David Heidrich, BowlingX <me@bowlingx.com>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

var path = require("path");
var webpack = require("webpack"), fs = require('fs');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var isProduction = "production" === process.env.NODE_ENV;

module.exports = {
    watch: false,
    devtool: "source-map",
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                include: [
                    path.resolve(__dirname, "src/main"),
                    path.resolve(__dirname, "node_modules/flexcss")

                ],
                loader: 'babel-loader?optional=runtime'
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract(
                    // activate source maps via loader query
                    'css?sourceMap!' +
                    'autoprefixer?browsers=last 2 versions!' +
                    'sass?outputStyle=expanded&sourceMap=true&sourceMapContents=true'
                )
            },
            {
                test: /\.(png|woff|woff2|eot|ttf|svg)$/,
                loader: 'url-loader?limit=1000&name=img/[hash].[ext]'
            },
            {
                test: /\.html/,
                loader: 'html-loader'
            }
        ],
        preLoaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/, // exclude any and all files in the node_modules folder
                loader: "eslint-loader"
            }
        ]
    },
    resolve: {
        modulesDirectories: ['src/main', 'assets', 'node_modules']
    },
    entry: {
        'site': ['modules/Site'],
        'marklib': ['modules/Marklib'],
        'styles':['marklib.scss']
    },
    output: {
        publicPath:'../',
        path: __dirname + "/build",
        filename: isProduction ? 'js/[name].min.js' : 'js/[name].js',
        libraryTarget: 'umd',
        library: 'Marklib',
        sourceMapFilename: isProduction ? 'js/[name].min.map' : 'js/[name].map'
    },
    plugins: [
        new webpack.EnvironmentPlugin(['NODE_ENV']),
        new ExtractTextPlugin('css/[name].min.css')
    ]
};