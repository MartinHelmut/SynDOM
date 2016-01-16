/**
 * Test the DOM selecting functions
 */
describe('Helper', function () {
    'use strict';

    // Get fixture
    var htmlPage;
    beforeEach(function () {
        htmlPage = jasmine.loadFixture('select-test');
    });

    describe('attachToElement', function () {
        it('attach to single element', function (done) {
            var element = S('#content', htmlPage);
            S.attachToElement(element, function (node) {
                expect(node.tagName).toBe('P');
                done();
            });
        });

        it('attach to multiple elements', function (done) {
            var elements = S('li', htmlPage);
            S.attachToElement(elements, function (node) {
                expect(node.tagName).toBe('LI');
                done();
            });
        });
    });

    describe('arrayIterator', function () {
        it('iterate non array', function (done) {
            var nonArray = 'String';
            S.arrayIterator(nonArray, function (arrayElement) {
                expect(arrayElement).toBe('String');
                done();
            });
        });

        it('iterate array', function (done) {
            var array = ['foo', 'bar'],
                index = 0;
            S.arrayIterator(array, function (arrayElement) {
                expect(arrayElement).toBe(array[index]);
                index += 1;
                done();
            });
        });
    });
});
