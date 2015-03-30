/**
 * Copyright (c) 2015-present, Hypermedia Isobar
 * All rights reserved.
 *
 * This source code is licensed under the MIT-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

"use strict";

var mocha = require("gulp-mocha"),
    gulp = require("gulp"),
    path = require("path");

module.exports = function (baseDir) {
    var pckg = require(path.join(baseDir, "package.json")),
        globPattern = path.join(baseDir, pckg.directories.lib, "**", "*.test.{js,jsx}");

    return function () {
        return gulp.src(globPattern)
            .pipe(mocha({
                "bail": true,
                "reporter": "dot"
            }));
    };
};
