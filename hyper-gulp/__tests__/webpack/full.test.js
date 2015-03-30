/**
 * @license Copyright (c) 2015, goreutils.com
 * For licensing, see LICENSE
 */

"use strict";

/*eslint no-sync: 0 */
/*global beforeEach: false, describe: false, it: false */

var assert = require("chai").assert,
    fs = require("fs"),
    path = require("path"),
    tmp = require("tmp"),
    webpack = require(path.join(__dirname, "..", "..", "webpack"));

describe("webpack", function () {
    var tmpDir;

    beforeEach(function (done) {
        tmp.dir(function (err, generatedTmpDir) {
            if (err) {
                done(err);
            } else {
                tmpDir = generatedTmpDir;

                done();
            }
        });
    });

    it("generates output using .entry.js files", function (done) {
        webpack.full(path.join(__dirname, "__fixtures__"))
            .output(tmpDir)()
            .then(function () {
                assert.ok(fs.statSync(path.join(tmpDir, "test-fixture-example.common.min.js")).isFile());
                assert.ok(fs.statSync(path.join(tmpDir, "test-fixture-example.common.min.js.map")).isFile());
                assert.ok(fs.statSync(path.join(tmpDir, "test-fixture-example.module.min.js")).isFile());
                assert.ok(fs.statSync(path.join(tmpDir, "test-fixture-example.module.min.js.map")).isFile());

                done();
            })
            .catch(done);
    });
});
