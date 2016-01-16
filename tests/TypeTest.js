/**
 * Test the type methods
 */
describe('Types', function () {
    'use strict';

    describe('integer', function () {
        it('from string', function () {
            expect(S.int('0123')).toBeNumber();
        });
        it('from integer', function () {
            expect(S.int(123)).toBe(123);
        });
        it('from float', function () {
            expect(S.int(1.5)).toBe(1);
        });
        it('from array', function () {
            expect(S.int([])).toBeNumber();
        });
        it('from object', function () {
            expect(S.int({})).toBeNumber();
        });
    });

    describe('float', function () {
        it('from string', function () {
            expect(S.float('1.6')).toBe(1.6);
        });
        it('from integer', function () {
            expect(S.float(42)).toBe(42);
        });
        it('from float', function () {
            expect(S.float(0.5)).toBe(0.5);
        });
        it('from array', function () {
            expect(S.float([])).toBe(0);
        });
        it('from object', function () {
            expect(S.float({})).toBeNaN();
        });
    });

    describe('string', function () {
        it('from string', function () {
            expect(S.string('Hallo')).toBeString();
        });
        it('from integer', function () {
            expect(S.string(5)).toBe('5');
        });
        it('from float', function () {
            expect(S.string(5.7)).toBe('5.7');
        });
        it('from array', function () {
            expect(S.string([])).toBeString();
        });
        it('from object', function () {
            expect(S.string({})).toBeString();
        });
    });

    describe('boolean', function () {
        it('from string', function () {
            expect(S.bool('')).toBe(false);
        });
        it('from integer', function () {
            expect(S.bool(1)).toBe(true);
        });
        it('from float', function () {
            expect(S.bool(42.42)).toBe(true);
        });
        it('from array', function () {
            expect(S.bool([])).toBe(true);
        });
        it('from object', function () {
            expect(S.bool({})).toBe(true);
        });
    });
});
