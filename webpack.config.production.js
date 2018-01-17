const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const webpack = require("webpack");
const path = require("path");

module.exports = {
    entry: path.join(__dirname, 'dist'),

    output: {
        path: path.join(__dirname, 'production'),
        filename: 'js/bundle.js'
    },

    resolve: {
        alias: {
            components: path.resolve(__dirname, 'dist/components'),
            params: path.resolve(__dirname, 'dist/configs/params'),
            helpers: path.resolve(__dirname, 'dist/helpers'),
            configs: path.resolve(__dirname, 'dist/configs'),
            sass: path.resolve(__dirname, 'assets/sass'),
            apps: path.resolve(__dirname, 'dist/app'),
            api: path.resolve(__dirname, 'dist/api')
        }
    },

    module: {
        loaders: [
            {
                test: /.(png|jpg|jpeg|gif|svg|woff|woff2|eot|ttf)(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url-loader?name=[name].[ext]&outputPath=css/'
            },
            {
                test: /\.js?$/,
                loader: 'babel-loader',
                exclude: /(node_modules|bower_components)/
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.scss$/,
                exclude: /(node_modules|bower_components)/,
                loader: ExtractTextPlugin.extract({fallback: "style-loader", use: "css-loader!sass-loader"})
            }
        ]
    },

    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {warnings: false},
            mangle: true,
            sourcemap: true,
            beautify: false,
            dead_code: true
        }),
        new CompressionPlugin({
            asset: "[path].gz[query]",
            algorithm: "gzip",
            test: /\.(js|html)$/,
            threshold: 10240,
            minRatio: 0.8
        }),
        new ExtractTextPlugin({filename: "/css/style.css", allChunks: false})
    ]
};
