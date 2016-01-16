/**
 * Some simple basic helper
 *
 * Use it like: "expect(obj).toBeFunction();" to check types and values.
 */
beforeEach(function () {
    'use strict';
    jasmine.addMatchers({
        toBeObject: function () {
            return {
                compare: function (actual) {
                    return {
                        pass: actual !== null && typeof actual === 'object'
                    };
                }
            };
        },
        toBeString: function () {
            return {
                compare: function (actual) {
                    return {
                        pass: typeof actual === 'string'
                    };
                }
            };
        },
        toBeNumber: function () {
            return {
                compare: function (actual) {
                    return {
                        pass: !isNaN(parseFloat(actual)) && typeof actual !== 'string'
                    };
                }
            };
        },
        toBeFunction: function () {
            return {
                compare: function (actual) {
                    return {
                        pass: typeof actual === 'function'
                    };
                }
            };
        },
        toBeArray: function () {
            return {
                compare: function (actual) {
                    return {
                        pass: Object.prototype.toString.call(actual) === '[object Array]'
                    };
                }
            };
        }
    });
});
