/**
 * Load html fixtures
 *
 * @param  {String}     name Fixture HTML document name
 * @return {HTMLObject}      HTML document
 */
jasmine.loadFixture = function (name) {
    'use strict';
    var request = new XMLHttpRequest(),
        htmlPage = document.implementation.createHTMLDocument('fixture'),
        basePath = window.location.href;

    // Create base fixture path
    basePath = basePath.substring(0, basePath.lastIndexOf('/')) + '/tests/fixtures/' + name + '.html';

    // Get html page
    request.open('GET', basePath, false);
    request.send(null);
    htmlPage.documentElement.innerHTML = request.responseText;

    return htmlPage;
};
