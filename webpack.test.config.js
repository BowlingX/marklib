var path = require("path");
module.exports = {
    watch: false,
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }
        ],

        postLoaders: [{ //
            test: /\.js$/,
            exclude: /(test|node_modules|bower_components|test_helpers)\//,
            loader: 'istanbul-instrumenter'
        }],
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
        root: [path.join(__dirname, 'src/main'),
            path.join(__dirname, 'src/test_helpers')]
    }
};