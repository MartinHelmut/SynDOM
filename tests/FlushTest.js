/**
 * Test the cache flush
 */
describe('Cache flush', function () {
    'use strict';

    // Get fixture
    var htmlPage;
    beforeEach(function () {
        htmlPage = jasmine.loadFixture('select-test');
    });

    it('flush all', function () {
        S.remove(S('#content', htmlPage));

        expect(
            S('#content', htmlPage)
        ).toBeTruthy();

        S.flush();

        expect(
            S('#content', htmlPage)
        ).toBeFalsy();
    });
});
