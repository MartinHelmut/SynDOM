/**
 * Test the module loader
 */
describe('Module loader', function () {
    'use strict';

    it('require script with callback', function (done) {
        S.require.config({
            basePath: 'tests/fixtures/'
        });
        S.require('simple-module', function () {
            expect(simpleModuleVar).toBeDefined();
            done();
        });
    });

    /*
    it('require script with callback by absolute path', function (done) {
        S.require.config({
            basePath: '/var/www/html/syndom/tests/fixtures/'
        });
        S.require('simple-module', function () {
            expect(simpleModuleVar).toBeDefined();
            done();
        });
    });
    */

    it('require module by name', function (done) {
        S.require.config({
            modules: {
                'simpleNamedModule': 'tests/fixtures/simple-module'
            }
        });
        S.require('simpleNamedModule', function () {
            expect(simpleModuleVar).toBeDefined();
            done();
        });
    });

    it('require defined module by name', function (done) {
        S.require.config({
            modules: {
                'definedModule': 'tests/fixtures/defined-module'
            }
        });
        S.require('definedModule', function (moduleObject) {
            expect(moduleObject).toBeDefined();
            done();
        });
    });
});
