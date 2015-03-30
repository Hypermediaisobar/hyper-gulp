/**
 * Copyright (c) 2015-present, goreutils
 * All rights reserved.
 *
 * This source code is licensed under the MIT-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

"use strict";

var path = require("path"),
    eslint = require("gulp-eslint"),
    globals = require(path.join(__dirname, "/globals")),
    gulp = require("gulp");

module.exports = function (baseDir) {
    var eslintrc = path.join(__dirname, "..", "eslint.json"),
        pckg = require(path.join(baseDir, "package.json")),
        globPattern = path.join(baseDir, pckg.directories.lib, "**", "*." + globals.ecmaScriptFileExtensionsGlobPattern);

    return function () {
        return gulp.src(globPattern)
            .pipe(eslint(eslintrc))
            .pipe(eslint.format())
            .pipe(eslint.failOnError());
    };
};
