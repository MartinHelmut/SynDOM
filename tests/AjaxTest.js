/**
 * Test ajax
 */
describe('Ajax', function () {
    'use strict';

    // Mock ajax calls

    beforeEach(function () {
        jasmine.Ajax.install();
    });

    afterEach(function () {
        jasmine.Ajax.uninstall();
    });

    // Test ajax

    it('make default GET ajax call', function () {
        var doneFn = jasmine.createSpy('success');

        S.ajax({
            url: 'test/url/',
            success: function (response) {
                doneFn(response.responseText);
            }
        });

        expect(jasmine.Ajax.requests.mostRecent().url).toBe('test/url/');
        expect(doneFn).not.toHaveBeenCalled();

        jasmine.Ajax.requests.mostRecent().respondWith({
            status: 200,
            contentType: 'text/plain',
            responseText: 'ajax response text'
        });

        expect(doneFn).toHaveBeenCalledWith('ajax response text');
    });

    it('make explicit GET ajax call', function () {
        var doneFn = jasmine.createSpy('success');

        S.ajax({
            type: 'GET',
            url: 'test/url/',
            success: function (response) {
                doneFn(response.responseText);
            }
        });

        expect(jasmine.Ajax.requests.mostRecent().url).toBe('test/url/');
        expect(doneFn).not.toHaveBeenCalled();

        jasmine.Ajax.requests.mostRecent().respondWith({
            status: 200,
            contentType: 'text/plain',
            responseText: 'ajax response text'
        });

        expect(doneFn).toHaveBeenCalledWith('ajax response text');
    });

    it('make POST ajax call', function () {
        var doneFn = jasmine.createSpy('success');

        S.ajax({
            type: 'POST',
            data: {
                key: 'value'
            },
            url: 'test/url/',
            success: function (response) {
                doneFn(response.responseText);
            }
        });

        expect(jasmine.Ajax.requests.mostRecent().url).toBe('test/url/');
        expect(doneFn).not.toHaveBeenCalled();

        jasmine.Ajax.requests.mostRecent().respondWith({
            status: 200,
            contentType: 'text/plain',
            responseText: 'ajax response text'
        });

        expect(doneFn).toHaveBeenCalledWith('ajax response text');
    });

    it('make POST ajax call with custom headers', function () {
        var doneFn = jasmine.createSpy('success');

        S.ajax({
            type: 'POST',
            url: 'test/url/',
            headers: {
                'My-Header': 'Header value'
            },
            success: function (response) {
                doneFn(response.requestHeaders['My-Header']);
            }
        });

        expect(jasmine.Ajax.requests.mostRecent().url).toBe('test/url/');
        expect(doneFn).not.toHaveBeenCalled();

        jasmine.Ajax.requests.mostRecent().respondWith({
            status: 200,
            contentType: 'text/plain'
        });

        expect(doneFn).toHaveBeenCalledWith('Header value');
    });

    it('throw POST ajax call error', function () {
        var doneFn = jasmine.createSpy('success');

        S.ajax({
            type: 'POST',
            url: 'test/url/',
            error: function (response) {
                doneFn(response.responseText);
            }
        });

        expect(jasmine.Ajax.requests.mostRecent().url).toBe('test/url/');
        expect(doneFn).not.toHaveBeenCalled();

        jasmine.Ajax.requests.mostRecent().respondWith({
            status: 404,
            contentType: 'text/plain',
            responseText: 'url not found'
        });

        expect(doneFn).toHaveBeenCalledWith('url not found');
    });
});
