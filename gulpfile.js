/**
 * @license Copyright (c) 2015, goreutils.com
 * For licensing, see LICENSE
 */

"use strict";

var eslint = require("gulp-eslint"),
    path = require("path"),
    pckg = require(path.join(__dirname, "package.json")),
    gg = require(path.join(__dirname, pckg.name)),
    gulp = require("gulp");

gulp.task("default", ["test"]);
gulp.task("lint", gg.tasks.lint(__dirname));
gulp.task("test", ["lint"], gg.tasks.test(__dirname));
