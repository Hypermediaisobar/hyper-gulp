/**
 * Copyright (c) 2015-present, goreutils
 * All rights reserved.
 *
 * This source code is licensed under the MIT-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

"use strict";

var path = require("path"),
    mocha = require("gulp-mocha"),
    globals = require(path.join(__dirname, "/globals")),
    gulp = require("gulp");

module.exports = function (baseDir) {
    var pckg = require(path.join(baseDir, "package.json")),
        globPattern = path.join(baseDir, pckg.directories.lib, "**", "*.test" + globals.ecmaScriptFileExtensionsGlobPattern);

    return function () {
        return gulp.src(globPattern)
            .pipe(mocha({
                "bail": true,
                "reporter": "dot"
            }));
    };
};
