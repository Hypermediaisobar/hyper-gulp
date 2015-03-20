/**
 * @license Copyright (c) 2015, goreutils.com
 * For licensing, see LICENSE
 */

"use strict";

var eslint = require("gulp-eslint"),
    gulp = require("gulp"),
    path = require("path");

module.exports = function (baseDir) {
    var eslintrc = path.join(__dirname, "..", "eslint.json"),
        pckg = require(path.join(baseDir, "package.json")),
        globPattern = path.join(baseDir, pckg.directories.lib, "**", "*.{js,jsx}");

    return function () {
        return gulp.src(globPattern)
            .pipe(eslint(eslintrc))
            .pipe(eslint.format())
            .pipe(eslint.failOnError());
    };
};
