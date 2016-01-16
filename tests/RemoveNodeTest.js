/**
 * Test remove one or multiple nodes
 */
describe('Remove nodes', function () {
    'use strict';

    // Get fixture
    var htmlPage;
    beforeEach(function () {
        htmlPage = jasmine.loadFixture('select-test');
    });

    it('remove single node', function () {
        expect(
            S('#content', htmlPage)
        ).toBeTruthy();

        S.remove(S('#content', htmlPage));

        expect(
            S('#content', htmlPage, true) // Don't use cache
        ).toBeFalsy();
    });

    it('remove node list', function () {
        expect(
            S('li', htmlPage).length
        ).toBeGreaterThan(1);

        S.remove(S('li', htmlPage));

        expect(
            S('li', htmlPage, true).length // Don't use cache
        ).toBe(0);
    });
});
