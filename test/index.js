var test = require('tape');
var extend = require('../');

test('extend empty shallow', function (t) {
    t.plan(1);

    var a = {},
        b = {b: 1};

    extend(a, b);

    t.deepEqual(a, {b: 1});
});

test('extend non-empty shallow', function (t) {
    t.plan(1);

    var a = {a: 1},
        b = {b: 1};

    extend(a, b);

    t.deepEqual(a, {a: 1, b: 1});
});

test('extend cyclic', function (t) {
    t.plan(1);

    var a = {a: 1},
        b = {};

    b.b = b;

    extend(a, b);

    t.deepEqual(a, {a: 1, b: b});
});

test('extend double cyclic', function (t) {
    t.plan(1);

    var a = {},
        b = {};

    a.a = a;
    b.b = b;

    extend(a, b);

    t.deepEqual(a, {a: a, b: b});
});

test('extend double cyclic same key', function (t) {
    t.plan(2);

    var a = {},
        b = {};

    a.b = a;
    b.b = b;

    extend(a, b);

    t.equal(a.b, a);
    t.notEqual(a, b);
});

test('extend deep cyclic same path', function (t) {
    t.plan(2);

    var a = {a:{}},
        b = {a:{}};

    a.a.a = a;
    b.a.a = b;

    extend(a, b);

    t.equal(a.a.a, a);
    t.notEqual(a.a.a, b);
});

test('extend double cyclic nested same key', function (t) {
    t.plan(2);

    var innerA = {},
        a = {a:innerA},
        b = {a:{}};

    a.a.b = a;
    b.a.b = b;

    extend(a, b);

    t.equal(a.a, innerA);
    t.equal(a.a.b, a);
});

test('extend double cyclic nested same key with siblings', function (t) {
    t.plan(3);

    var innerA = {},
        a = {a:innerA},
        b = {a:{}, b: 3};

    a.a.b = a;
    b.a.b = b;

    extend(a, b);

    t.equal(a.a, innerA);
    t.equal(a.a.b, a);
    t.equal(a.b, 3);
});

test('duplicate values', function (t) {
    t.plan(3);

    var a = {},
        b = {a: 1, b: 1, c: 2};

    extend(a, b);

    t.equal(a.a, 1);
    t.equal(a.b, 1);
    t.equal(a.c, 2);
});

test('extend remove cyclic', function (t) {
    t.plan(1);

    var a = {},
        b = {},
        c = {};

    a.a = a;
    b.a = c;

    extend(a, b);

    t.equal(a.a, c);
});

test('extend remove cyclic', function (t) {
    t.plan(2);

    var a = {},
        b = {},
        c = {x:1},
        d = {x:2};

    a.a = c;
    b.a = d;

    extend(a, b);

    t.equal(a.a, c);
    t.equal(a.a.x, 2);
});