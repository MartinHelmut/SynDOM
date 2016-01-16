/**
 * Test css functions
 */
describe('CSS classes', function () {
    'use strict';

    // Get fixture
    var htmlPage;
    beforeEach(function () {
        htmlPage = jasmine.loadFixture('select-test');
    });

    describe('hasClass', function () {
        it('has class', function () {
            expect(
                S.hasClass(S('nav', htmlPage)[0], 'navigation')
            ).toBeTruthy();
        });

        it('has class failure by NodeLists', function () {
            expect(
                S.hasClass(S('nav', htmlPage), 'navigation')
            ).toBeFalsy();
        });
    });

    describe('addClass', function () {
        it('add one class to one element', function () {
            S.addClass(
                S('#page-wrapper', htmlPage),
                'wrapper'
            );
            expect(
                S('.wrapper', htmlPage).length
            ).toBeGreaterThan(0);
        });

        it('add multiple classes to one element', function () {
            S.addClass(
                S('#page-wrapper', htmlPage),
                [
                    'wrapper',
                    'page'
                ]
            );
            expect(
                S('.wrapper.page', htmlPage).length
            ).toBeGreaterThan(0);
        });

        it('add one class to multiple elements', function () {
            S.addClass(
                [
                    S('#page-wrapper', htmlPage),
                    S('.container', htmlPage)
                ],
                [
                    'class1'
                ]
            );
            expect(
                S('.class1', htmlPage).length
            ).toBeGreaterThan(1);
        });
    });

    describe('removeClass', function () {
        it('remove one class from one element', function () {
            S.removeClass(
                S('nav', htmlPage)[0],
                'navigation'
            );
            expect(
                S('.navigation', htmlPage).length
            ).toBe(0);
        });

        it('remove one class from multiple elements', function () {
            S.removeClass(
                S('li', htmlPage),
                'link'
            );
            expect(
                S('.link', htmlPage).length
            ).toBe(0);
        });

        it('remove multiple classes from one element', function () {
            S.removeClass(
                S('#content', htmlPage),
                [
                    'text',
                    'para'
                ]
            );
            expect(
                S('.text', htmlPage)[0]
            ).toBeFalsy();
            expect(
                S('.para', htmlPage)[0]
            ).toBeFalsy();
        });
    });

    // Toggle classes test

    describe('toggleClass', function () {
        it('toggle one class from one element', function () {
            expect(
                S.hasClass(S('li', htmlPage)[0], 'active')
            ).toBeFalsy();
            S.toggleClass(
                S('li', htmlPage)[0],
                'active'
            );
            expect(
                S.hasClass(S('li', htmlPage)[0], 'active')
            ).toBeTruthy();
        });

        it('toggle one class from multiple elements', function () {
            expect(
                S.hasClass(S('li', htmlPage)[0], 'active')
            ).toBeFalsy();
            expect(
                S.hasClass(S('h1', htmlPage)[0], 'active')
            ).toBeFalsy();

            S.toggleClass(
                [
                    S('li', htmlPage)[0],
                    S('h1', htmlPage)[0]
                ],
                'active'
            );

            expect(
                S.hasClass(S('li', htmlPage)[0], 'active')
            ).toBeTruthy();
            expect(
                S.hasClass(S('h1', htmlPage)[0], 'active')
            ).toBeTruthy();
        });

        it('toggle multiple classes from one element', function () {
            expect(
                S.hasClass(S('li', htmlPage)[0], 'link')
            ).toBeTruthy();
            expect(
                S.hasClass(S('li', htmlPage)[0], 'active')
            ).toBeFalsy();

            S.toggleClass(
                S('li', htmlPage)[0],
                [
                    'active',
                    'link'
                ]
            );

            expect(
                S.hasClass(S('li', htmlPage)[0], 'active')
            ).toBeTruthy();
            expect(
                S.hasClass(S('li', htmlPage)[0], 'link')
            ).toBeFalsy();
        });
    });
});
