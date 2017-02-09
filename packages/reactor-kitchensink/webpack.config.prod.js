'use strict';

const path = require('path');
const webpack = require('webpack');
const ExtJSReactorWebpackPlugin = require('@extjs/reactor-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const extJSConfig = require('./extjs.config');

module.exports = {
    devtool: 'cheap-module-source-map',

    entry: [
        './src/index'
    ],

    output: {
        path: path.join(__dirname, 'build'),
        filename: 'index.js'
    },

    resolve: {
        alias: {
            "react": path.resolve('./node_modules/react'),
            "react-dom": path.resolve('./node_modules/react-dom')
        }
    },

    plugins: [
        new ExtJSReactorWebpackPlugin(Object.assign({}, extJSConfig, { production: true })),
        new webpack.optimize.OccurenceOrderPlugin(true),
        new webpack.optimize.DedupePlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production'),
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            output: {
                comments: false
            },
            compress: {
                warnings: false,
                screw_ie8: false
            }
        }),
        new HtmlWebpackPlugin({
            template: 'src/index.html',
            hash: true
        })
    ],

    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel',
                include: [
                    path.join(__dirname, 'src')
                ]
            },
            {
                test: /\.css$/,
                loader: 'style!css'
            },
            {
                test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
                exclude: /\/favicon.ico$/,
                loader: 'file',
                query: {
                    name: 'static/media/[name].[hash:8].[ext]'
                }
            }
        ]
    },

    devServer: {
        contentBase: "./build",
        noInfo: true,
        hot: true
    }
};