/**
 * Test the attribute function
 */
describe('Attributes', function () {
    'use strict';

    // Get fixture
    var htmlPage, firstLink;
    beforeEach(function () {
        htmlPage = jasmine.loadFixture('select-test');
        firstLink = S('ul li a', htmlPage)[0];
    });

    it('read attribute value', function () {
        expect(
            S.attr(firstLink, 'href')
        ).toBe('test/link/');
    });

    it('set attribute value', function () {
        expect(
            S.attr(firstLink, 'data-time')
        ).toBe('20:15');
        S.attr(firstLink, 'data-time', '22:15');
        expect(
            S.attr(firstLink, 'data-time')
        ).toBe('22:15');
    });
});
