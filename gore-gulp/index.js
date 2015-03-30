/**
 * Copyright (c) 2015-present, goreutils
 * All rights reserved.
 *
 * This source code is licensed under the MIT-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

"use strict";

var path = require("path"),
    lint = require(path.join(__dirname, "/lint")),
    test = require(path.join(__dirname, "/test")),
    webpack = require(path.join(__dirname, "/webpack"));

function setup(gulp, baseDir) {
    gulp.task("default", [
        "test"
    ]);
    gulp.task("lint", lint(baseDir));
    gulp.task("test", [
        "lint"
    ], test(baseDir));
}

function stub(gulp) {
    return {
        "setup": function (baseDir) {
            return setup(gulp, baseDir);
        }
    };
}

stub.tasks = {
    "lint": lint,
    "test": test,
    "webpack": webpack
};

module.exports = stub;
