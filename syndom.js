/*jslint browser: true, ass: true, nomen: true */

/**
 * Synlight DOM module
 *
 * @version 0.0.2
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
     * @param {Object}   obj  Any mixed object type
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
     * @type {Function} Query selector engine
     */
    var syndom = (function () {
            var _cache = [];
            /**
             * Query selector engine
             *
             * @param  {String}           selector Selector string
             * @param  {Element|Node}     context  Context search for elements
             * @return {Element|NodeList}          DOM Element or NodeList
             */
            return function (selector, context) {
                var match = {
                        '#': 'ById',
                        '.': 'sByClassName',
                        '@': 'sByName'
                    }[selector[0]],
                    i;
                context = context || document;
                // Search for saved selector / context combination in cache
                for (i = _cache.length - 1; i >= 0; i -= 1) {
                    if (_cache[i].s === selector && _cache[i].c === context) {
                        return _cache[i].e;
                    }
                }
                // Save cache object and return element
                return _cache[_cache.push({
                    c: context,
                    s: selector,
                    e: context['getElement' + (match || 'sByTagName')](match ? selector.slice(1) : selector) // result
                }) - 1].e;
            };
        }()),

        /**
         * @type {Function} Return event listener setter method
         */
        on = (function () {
            // Random addEventListener function
            if (document.addEventListener) {
                /**
                 * Return event listener setter method:
                 *
                 * @param {Element|NodeList} el   DOM element or node list
                 * @param {String}           type Event type
                 * @param {Function}         fn   Event callback
                 */
                return function (el, type, fn) {
                    _arrayIterator(type, function (type) {
                        _attachToElement(el, function (el) {
                            el.addEventListener(type, fn, false);
                        });
                    });
                };
            }
            /**
             * Return event listener setter method for IE
             *
             * @param {Element|NodeList} el   DOM element or node list
             * @param {String}           type Event type
             * @param {Function}         fn   Event callback
             */
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
            return (!!el.className && el.className.match(_getClassRegExp(cl)));
        },

        /**
         * Add class method
         * 
         * @param {Element|NodeList|Array} el DOM element, node list or array with elements and node lists
         * @param {String|Array}              cl Class name or array with class names
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
         * @param {String|Array}              cl Class name or array with class names
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
         * @param {String|Array}              cl Class name or array with class names
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
        },

        /**
         * Get or set attribute on element
         * 
         * @param  {Element}               el    DOM element
         * @param  {String}                attr  Attribute name
         * @param  {String|Number|Boolean} value Attribute value to set
         * @return {String}                      Actual attribute value
         */
        attr = function (el, attr, value) {
            return (!value && el.getAttribute(attr)) || el.setAttribute(attr, value.toString());
        },

        /**
         * Remove elements
         * 
         * @param  {Element|NodeList} el Dom element or node list to remove
         * @return {Element|NodeList}    Last removed element or node list
         */
        remove = function (el) {
            var rm = null;
            _attachToElement(el, function (el) {
                rm = el.parentNode && el.parentNode.removeChild(el);
            });
            return rm;
        };

    // Set public methods
    syndom.on          = on;
    syndom.hasClass    = hasClass;
    syndom.addClass    = addClass;
    syndom.removeClass = removeClass;
    syndom.toggleClass = toggleClass;
    syndom.attr        = attr;
    syndom.remove      = remove;

    return syndom;

}(window, document));