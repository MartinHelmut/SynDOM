/**
 * Test animation functions
 */
describe('Animations', function () {
    'use strict';

    // Get fixture
    var htmlPage;
    beforeEach(function () {
        htmlPage = jasmine.loadFixture('select-test');
    });

    it('run single animation on one element', function (done) {
        S.animate(
            {
                time: 100,
                node: S('#content', htmlPage),
                run: function (node, rate) {
                    expect(node).toBeTruthy();
                    expect(rate).toBeNumber();
                    expect(rate).toBeLessThan(1.001);
                },
                callback: function (node) {
                    expect(node).toBeTruthy();
                    done();
                }
            }
        );
    });

    it('run multiple animations on one element', function (done) {
        var nodeBak;
        S.animate([
            {
                time: 100,
                node: S('#content', htmlPage),
                run: function (node, rate) {},
                callback: function (node) {
                    nodeBak = node;
                    expect(node).toBeTruthy();
                }
            },
            {
                time: 100,
                run: function (node, rate) {},
                callback: function (node) {
                    expect(node).toBe(nodeBak);
                    done();
                }
            }
        ]);
    });

    it('run multiple animations on multiple elements', function (done) {
        var node1 = S('.navigation', htmlPage),
            node2 = S('#content', htmlPage);
        S.animate([
            {
                time: 100,
                node: node1,
                run: function (node, rate) {},
                callback: function (node) {
                    expect(node).toBe(node1);
                }
            },
            {
                time: 100,
                node: node2,
                run: function (node, rate) {},
                callback: function (node) {
                    expect(node).toBe(node2);
                    done();
                }
            }
        ]);
    });
});
