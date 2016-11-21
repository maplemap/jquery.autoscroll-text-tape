const webpack = require('webpack');

const NODE_ENV = process.env.NODE_ENV || 'development';
const NODE_HOST = process.env.NODE_HOST || '0.0.0.0';
const NODE_PORT = process.env.NODE_PORT || 8090;

module.exports = {
    entry: getEntrySources(['./src/main.js']),
    output: {
        path: __dirname + '/dist/',
        publicPath: "/dist", //assets data
        filename: 'autoscroll-text-tape.min.js'
    },
    module: {
        loaders: [
            {
                test: /\.less$/,
                loader: "style-loader!css-loader!postcss-loader!less",
                exclude: [/node_modules/]
            },
            {
                test: /\.js$/,
                loader: 'babel',
                query: {
                    presets: ["es2015"]
                }
            }
        ]
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ],

    devServer: {
        host: NODE_HOST,
        port: NODE_PORT,
        colors: true,
        debug: true,
        hot: true,
        devtool: true,
        historyApiFallback: true,
        "eval-source-map": true,
        "eval-source-map": true,
        inline: true,
        contentBase: __dirname + '/test',
    },
};

if (NODE_ENV == 'production') {
    module.exports.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings:     false,
                drop_console: true,
                unsafe:       true
            }
        })
    );
}

function getEntrySources(sources) {
    if (process.env.NODE_ENV !== 'production') {
        sources.unshift(`webpack-dev-server/client?http://${NODE_HOST}:${NODE_PORT}`);
        sources.unshift('webpack/hot/only-dev-server');
    }

    return sources;
}
