/**
 * Copyright (c) 2015-present, goreutils
 * All rights reserved.
 *
 * This source code is licensed under the MIT-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

"use strict";

var path = require("path"),
    mocha = require("gulp-mocha");

module.exports = function (options, gulp, baseDir) {
    var pckg = require(path.join(baseDir, "package.json")),
        globPattern = path.join(baseDir, pckg.directories.lib, "**", "*.test" + options.ecmaScriptFileExtensionsGlobPattern);

    return function () {
        return gulp.src(globPattern)
            .pipe(mocha({
                "bail": true,
                "reporter": "dot"
            }));
    };
};
