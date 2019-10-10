const path = require('path');

module.exports = {
    entry: ['babel-polyfill', './client/index.js'],
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js',
        publicPath: '/build/'
    },
    mode: process.env.NODE_ENV,
    devServer: {
        port: 8080,
        proxy: {
        '/': 'http://localhost:3000/'
      }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    }
                }
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                    loader: 'css-loader'
                },
                {
                    loader: "sass-loader" // compiles Sass to CSS
                }
                ]
            }
        ]
    }
}
