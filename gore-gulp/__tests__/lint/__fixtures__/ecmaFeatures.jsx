/**
 * @license Copyright (c) 2015, goreutils.com
 * For licensing, see LICENSE
 */

"use strict";

var foo = [1, 2, 3],
    bar,
    baz,
    booz;

// modules
import React from "react";

// arrow functions
foo.map(item => item * 2);

// block bindings
foo.map(function (item) {
    let wooz = 5;

    return item * wooz;
});

// classess
class Bar extends React.Component {}

// destructuring
[bar, baz, booz] = foo;
bar += baz + booz;

// for-of loops
// generators
function *createGenerator() {
    yield 1;
    yield 2;
    yield 3;
}

for (let it of createGenerator()) {
    foo.map(it);
}

// objectLiteralComputedProperties
bar = {
    [baz]: booz
};

// objectLiteralShorthandMethods
bar = {
    constructor(hoho) {
        super(hoho);
    }
};

// objectLiteralShorthandProperties
bar = {
    baz,
    booz
};

// regexUFlag
bar = new RegExp("hello", "u");

// regexYFlag
bar = /world/y;

// spread operator
Math.max(...foo);

// template string
function mysqlRealEscapeString(item) {
    return parseInt(item, 10);
}
bar = mysqlRealEscapeString`SELECT * FROM users WHERE id = ${bar}`;

// unicode code point escapes
bar = "\u{20BB7}";

// jsx
bar = <baz {...foo} />;
