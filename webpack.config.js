var path = require("path");
var webpack = require("webpack");
module.exports = {
    watch: false,
    devtool: "source-map",
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader?experimental&optional=runtime&sourceMap=inline'
            }
        ],
        preLoaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/, // exclude any and all files in the node_modules folder
                loader: "jshint-loader"
            }
        ]
    },
    resolve: {
        // add bower components and main source to resolved
        root: [path.join(__dirname, "bower_components"),
            path.join(__dirname, 'src/main')]
    },
    output: {
        filename: 'flexcss.js',
        libraryTarget: 'umd',
        library: 'FlexCss',
        sourceMapFilename: 'flexcss.map'
    },
    plugins: [
        new webpack.ResolverPlugin(
            new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin("bower.json", ["main"])
        ),
        new webpack.optimize.UglifyJsPlugin()
    ]
};