const path = require('path');

var sourceConfig = {
    entry: './src/app/index.ts',
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: [ '.tsx', '.ts', '.js' ]
    },
    output: {
        filename: 'app.js',
        path: path.resolve(__dirname, '../')
    },
    node: {
        fs: "empty",
        net: 'empty'
    },
    target: 'node'
};

module.exports = [
    sourceConfig
]

