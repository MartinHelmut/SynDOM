/*jslint browser: true, ass: true, nomen: true */

/**
 * Synlight DOM module
 *
 * @version 0.0.1
 * @licence Apache Licence 2.0
 * @author  Martin Helmut Fieber <info@martin-fieber.de>
 * 
 * @param {Object} window
 * @param {Object} document
 */
window.$ = (function (window, document) {
    'use strict';

    /**
     * Attach function on elements
     * 
     * @param {Element|NodeList|Array} el DOM element, node list or array with elements and node lists
     * @param {Function}               fn Callback
     */
    function _attachToElement(el, fn) {
        var i;
        if ((el && el.nodeName) || el === window) {
            fn(el);
        } else if (el && el instanceof Array) {
            for (i = el.length - 1; i >= 0; i -= 1) {
                _attachToElement(el[i], fn);
            }
        } else if (el && el.length) {
            for (i = el.length - 1; i >= 0; i -= 1) {
                fn(el[i]);
            }
        }
    }

    /**
     * Simple Array iteration for mixed types objects
     * 
     * @param {Mixed}   obj  Any mixed object type
     * @param {Function} fn  Function to execute on array entry
     */
    function _arrayIterator(obj, fn) {
        var i;
        obj = Array.isArray(obj) ? obj : [obj];
        for (i = obj.length - 1; i >= 0; i -= 1) {
            fn(obj[i]);
        }
    }

    /**
     * Get a class matcher RegExp
     * 
     * @param  {String} cl Class name
     * @return {RegExp}    Regular Expression to match a class name
     */
    function _getClassRegExp(cl) {
        return new RegExp('(?:\\s|^)' + cl + '(?:\\s|$)');
    }

    /**
     * Query selector engine
     * 
     * @param  {String}           selector Selector string
     * @param  {Element}          context  Context search for elements
     * @return {Element|NodeList}          DOM Element or NodeList
     */
    var syndom = (function () {
            var _cache = {};
            return function (selector, context) {
                var match = {
                    '#': 'ById',
                    '.': 'sByClassName',
                    '@': 'sByName'
                }[selector[0]];
                if (!!_cache[selector]) {
                    return _cache[selector];
                }
                _cache[selector] = (context || document)['getElement' + (match || 'sByTagName')](match ? selector.slice(1) : selector);
                return _cache[selector];
            };
        }()),

        /**
         * Return event listener setter method:
         * 
         * @param {Element|NodeList} el   DOM element or node list
         * @param {String}           type Event type
         * @param {Function}         fn   Event callback
         */
        on = (function () {
            // Random addEventListener function
            if (document.addEventListener) {
                return function (el, type, fn) {
                    _arrayIterator(type, function (type) {
                        _attachToElement(el, function (el) {
                            el.addEventListener(type, fn, false);
                        });
                    });
                };
            }
            // IE event attachment
            return function (el, type, fn) {
                _arrayIterator(type, function (type) {
                    _attachToElement(el, function (el) {
                        el.attachEvent('on' + type, function () {
                            return fn.call(el, window.event);
                        });
                    });
                });
            };
        }()),

        /**
         * Has class method
         * 
         * @param  {Element} el DOM element
         * @param  {String}  cl Class name
         * @return {Boolean}    Has class status
         */
        hasClass = function (el, cl) {
            return !!(el.className && el.className.match(_getClassRegExp(cl)));
        },

        /**
         * Add class method
         * 
         * @param {Element|NodeList|Array} el DOM element, node list or array with elements and node lists
         * @param {String}                 cl Class name
         */
        addClass = function (el, cl) {
            _arrayIterator(cl, function (cl) {
                _attachToElement(el, function (el) {
                    if (!hasClass(el, cl)) {
                        el.className = (el.className += ' ' + cl).trim();
                    }
                });
            });
        },

        /**
         * Remove class method
         * 
         * @param {Element|NodeList|Array} el DOM element, node list or array with elements and node lists
         * @param {String}                 cl Class name
         */
        removeClass = function (el, cl) {
            _arrayIterator(cl, function (cl) {
                var regex = _getClassRegExp(cl);
                _attachToElement(el, function (el) {
                    el.className = (el.className && el.className.replace(regex, ' ')).trim();
                });
            });
        },

        /**
         * Toggle class method
         * 
         * @param {Element|NodeList|Array} el DOM element, node list or array with elements and node lists
         * @param {String}                 cl Class name
         */
        toggleClass = function (el, cl) {
            _arrayIterator(cl, function (cl) {
                _attachToElement(el, function (el) {
                    if (hasClass(el, cl)) {
                        removeClass(el, cl);
                    } else {
                        addClass(el, cl);
                    }
                });
            });
        };

    // Set public methods
    syndom.on          = on;
    syndom.hasClass    = hasClass;
    syndom.addClass    = addClass;
    syndom.removeClass = removeClass;
    syndom.toggleClass = toggleClass;

    return syndom;

}(window, document));