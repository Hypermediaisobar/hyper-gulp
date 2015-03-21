/**
 * @license Copyright (c) 2015, goreutils.com
 * For licensing, see LICENSE
 */

"use strict";

var _ = require("lodash"),
    path = require("path"),
    querystring = require("querystring"),
    webpack = require("webpack");

function full(config) {
    return _.assign(config, {
        "debug": false,
        "plugins": [
            new webpack.DefinePlugin({
                "process.env": {
                    "NODE_ENV": "production"
                }
            }),
            new webpack.optimize.CommonsChunkPlugin(config.pckg.name + ".common.min.js"),
            new webpack.optimize.UglifyJsPlugin()
        ]
    });
}

function quick(config) {
    return _.assign(config, {
        "debug": true,
        "plugins": [
            new webpack.DefinePlugin({
                "process.env": {
                    "NODE_ENV": "development"
                }
            }),
            new webpack.optimize.CommonsChunkPlugin(config.pckg.name + ".common.min.js")
        ]
    });
}

function run(config) {
    return new Promise(function (resolve, reject) {
        webpack(config, function (err) {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}

function task(baseDir) {
    var pckg = require(path.join(baseDir, "package.json"));

    return Promise.resolve({
        "bail": true,
        "context": path.join(__dirname, pckg.directories.lib),
        "devtool": "source-map",
        "entry": {
        },
        "module": {
            "loaders": [
                {
                    // bower components usually expect to run in browser
                    // environment and sometimes assume that global 'this'
                    // is always the Window object which is a mistake
                    "test": /bower_components/,
                    "loader": "imports?this=>window"
                },
                {
                    "test": /\.jsx$/,
                    "exclude": /(bower_components|node_modules)/,
                    "loader": "babel-loader?" + querystring.stringify({
                        "loose": [
                            "es6.modules",
                            "es6.properties.computed",
                            "es6.templateLiterals"
                        ],
                        "optional": [
                            "runtime",
                            "utility.deadCodeElimination",
                            "utility.inlineExpressions",
                            "validation.undeclaredVariableCheck",
                            "validation.react"
                        ]
                    })
                }
            ]
        },
        "output": {
            "filename": pckg.name + ".[name].min.js",
            "path": path.join(baseDir, "dist")
        },
        "pckg": pckg,
        "resolve": {
            "extensions": [
                "",
                ".coffee",
                ".js",
                ".jsx"
            ]
        }
    });
}

module.exports = {
    "full": function (baseDir) {
        return function () {
            return task(baseDir).then(full).then(run);
        };
    },
    "quick": function (baseDir) {
        return function () {
            return task(baseDir).then(quick).then(run);
        };
    }
};
