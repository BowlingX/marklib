var path = require("path");
var webpack = require("webpack");
var isProduction = "production" === process.env.NODE_ENV;
module.exports = {
    watch: false,
    devtool: "source-map",
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader?optional=runtime&sourceMap=inline'
            }
        ],
        preLoaders: [
            {
                test: /\.js$/,
                include: [
                    path.resolve(__dirname, "src")
                ],
                loader: "eslint-loader"
            }
        ]
    },
    resolve: {
        // add bower components and main source to resolved
        root: [path.join(__dirname, 'src/main')]
    },
    entry: {
        'site': ['modules/Site'],
        'marklib': ['modules/Marklib']
    },
    output: {
        filename: isProduction ? '[name].min.js' : '[name].js',
        libraryTarget: 'umd',
        library: 'Marklib',
        sourceMapFilename: isProduction ? '[name].min.map' : '[name].map'
    },
    plugins: [
        new webpack.EnvironmentPlugin(['NODE_ENV'])
    ]
};

if (isProduction) {
    module.exports.plugins.push(new webpack.optimize.UglifyJsPlugin())
}