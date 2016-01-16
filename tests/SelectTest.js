/**
 * Test the DOM selecting functions
 */
describe('DOM selection', function () {
    'use strict';

    // Get fixture
    var htmlPage;
    beforeEach(function () {
        htmlPage = jasmine.loadFixture('select-test');
    });

    it('return single node by id', function () {
        expect(
            S('#page-wrapper', htmlPage).tagName
        ).toBe(
            'DIV'
        );
    });

    it('return node list by class', function () {
        expect(
            S('.container', htmlPage).length
        ).toBeDefined();
    });

    it('return node list by css query', function () {
        expect(
            S('.navigation li', htmlPage).length
        ).toBeGreaterThan(1);
    });

    it('return node list by css query by attribute', function () {
        expect(
            S('h1[data-heading]', htmlPage).length
        ).toEqual(1);
    });
});
