/**
 * Copyright (c) 2015-present, Hypermedia Isobar
 * All rights reserved.
 *
 * This source code is licensed under the MIT-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

"use strict";

var _ = require("lodash"),
    glob = require("glob"),
    path = require("path"),
    Q = require("q"),
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

function normalizeEntry(entries) {
    var entry,
        ret = {};

    for (entry of entries) {
        ret[path.basename(entry, ".entry.js")] = entry;
    }

    return ret;
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

function stub(baseDir, outputPath) {
    var pckg = require(path.join(baseDir, "package.json"));

    return Q.nfcall(glob, path.join(__dirname, pckg.directories.lib, "**", "*.entry.{js,jsx}"))
        .then(normalizeEntry)
        .then(function (entries) {
            return {
                "bail": true,
                "context": path.join(__dirname, pckg.directories.lib),
                "devtool": "source-map",
                "entry": entries,
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
                    "path": outputPath
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
            };
        });
}

function init(baseDir, variant) {
    return {
        "output": function (output) {
            return function () {
                return stub(baseDir, output).then(variant).then(run);
            };
        }
    };
}

module.exports = {
    "full": function (baseDir) {
        return init(baseDir, full);
    },
    "quick": function (baseDir) {
        return init(baseDir, quick);
    }
};
