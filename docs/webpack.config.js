var path = require("path");

module.exports = {
    entry: "./src/app.ts",
    output: {
        filename: "dist/app.js"
    },
    resolve: {
        extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
    },
    module: {
        loaders: [
            { test: /\.tsx?$/, loader: "ts-loader" }
        ]
    }
};
