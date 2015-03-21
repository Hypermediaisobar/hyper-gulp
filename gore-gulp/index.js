/**
 * @license Copyright (c) 2015, goreutils.com
 * For licensing, see LICENSE
 */

"use strict";

var path = require("path"),
    lint = require(path.join(__dirname, "/lint")),
    test = require(path.join(__dirname, "/test")),
    webpack = require(path.join(__dirname, "/webpack"));

module.exports = {
    "tasks": {
        "lint": lint,
        "test": test,
        "webpack": webpack
    }
};
