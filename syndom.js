/*jslint browser:true, ass:true, nomen:true, bitwise:true */

/**
 * Synlight DOM module
 *
 * @version 1.0.7
 * @licence Apache Licence 2.0
 * @author  Martin Helmut Fieber <info@martin-fieber.de>
 *
 * @param {Object} window
 * @param {Object} document
 */
window.S = (function (window, document) {
    'use strict';

    // Adapted from https://gist.github.com/paulirish/1579671 which derived from
    // http://paulirish.com/2011/requestanimationframe-for-smart-animating/
    // http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
    // requestAnimationFrame polyfill by Erik Möller.
    // Fixes from Paul Irish, Tino Zijdel, Andrew Mao, Klemen Slavič, Darius Bacon
    // MIT license
    (function () {
        var vendors = ['ms', 'moz', 'webkit', 'o'],
            vp,
            lastTime,
            i = 0;
        // Get browser vendor methods
        for (i = vendors.length - 1; i >= 0 && !window.requestAnimationFrame; i -= 1) {
            vp = vendors[i];
            window.requestAnimationFrame = window[vp + 'RequestAnimationFrame'];
            window.cancelAnimationFrame = (window[vp + 'CancelAnimationFrame'] || window[vp + 'CancelRequestAnimationFrame']);
        }
        // Create polyfill
        if (!window.requestAnimationFrame || !window.cancelAnimationFrame) {
            lastTime = 0;
            window.requestAnimationFrame = function (callback) {
                var now = +new Date(),
                    nextTime = Math.max(lastTime + 16, now);
                return setTimeout(function () {
                    callback(lastTime = nextTime);
                }, nextTime - now);
            };
            window.cancelAnimationFrame = clearTimeout;
        }
    }());

    /**
     * Attach function on elements
     *
     * @param {Element|NodeList|Array} el DOM element, node list or array with elements and node lists
     * @param {Function}               fn Callback
     */
    function attachToElement(el, fn) {
        var i;
        if ((el && el.nodeName) || el === window) {
            fn(el);
        } else if (el && el instanceof Array) {
            for (i = el.length - 1; i >= 0; i -= 1) {
                attachToElement(el[i], fn);
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
    function arrayIterator(obj, fn) {
        obj = Array.isArray(obj) ? obj : [obj];
        obj.forEach(fn);
    }

    /**
     * Get a class matcher RegExp
     *
     * @param  {String} cl Class name
     * @return {RegExp}    Regular Expression to match a class name
     */
    function getClassRegExp(cl) {
        return new RegExp('(?:\\s|^)' + cl + '(?:\\s|$)');
    }

    /**
     * Check if value is executable
     *
     * @param  {Function} fn Possible function
     * @return {Boolean}     Is executable
     */
    function isExecutable(fn) {
        return !!fn && typeof fn === 'function';
    }

    // Universal syndom cache object
    var cache = {
            // DOM element
            dom: [],
            // Async script load
            require: {
                settings: {},
                defined: {}
            }
        },

        /**
         * Query selector engine
         *
         * @param  {String}           selector Selector string
         * @param  {Element|Node}     context  Context search for elements
         * @param  {Boolean}          noCache  Don't use the cache, optional, default: false
         * @return {Element|NodeList}          DOM Element or NodeList
         */
        syndom = function (selector, context, noCache) {
            var match = !/\s/.test(selector) && {
                    '#': 'getElementById'
                }[selector[0]],
                i;
            context = context || document;
            noCache = !!noCache;
            // Search for saved selector / context combination in cache
            if (noCache === false) {
                for (i = cache.dom.length - 1; i >= 0; i -= 1) {
                    if (cache.dom[i].s === selector && cache.dom[i].c === context) {
                        return cache.dom[i].e;
                    }
                }
            }
            // Save cache object and return element
            return cache.dom[cache.dom.push({
                c: context,
                s: selector,
                e: context[match || 'querySelectorAll'](match ? selector.slice(1) : selector) // result
            }) - 1].e;
        },

        /**
         * Event listener
         *
         * @param {Element|NodeList} el   DOM element or node list
         * @param {String}           type Event type
         * @param {Function}         fn   Event callback
         */
        on = function (el, type, fn) {
            arrayIterator(type, function (type) {
                attachToElement(el, function (el) {
                    el.addEventListener(type, fn, false);
                });
            });
        },

        /**
         * Ajax
         *
         * @param {Object} settings Ajax settings object
         */
        ajax = function (settings) {
            var request = new XMLHttpRequest(),
                postData = null,
                data,
                header;

            settings.type = settings.type || 'GET';

            // Create post string data
            if (!!settings.data) {
                postData = '';
                for (data in settings.data) {
                    if (settings.data.hasOwnProperty(data)) {
                        postData += encodeURIComponent(data) + '=';
                        postData += encodeURIComponent(settings.data[data]) + '&';
                    }
                }
                postData.substr(0, postData.length - 1);
            }

            request.open(settings.type, settings.url, true);

            // Set basic HTTP headers
            request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
            request.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

            // Set custom headers
            if (!!settings.headers) {
                for (header in settings.headers) {
                    if (settings.headers.hasOwnProperty(header)) {
                        request.setRequestHeader(
                            header,
                            settings.headers[header]
                        );
                    }
                }
            }

            // Set load listener
            request.addEventListener('load', function () {
                if (request.status >= 200 && request.status < 400) {
                    // Successful request
                    if (isExecutable(settings.success)) {
                        settings.success(request);
                    }
                } else if (isExecutable(settings.error)) {
                    // Error on server
                    settings.error(request);
                }
            }, false);

            // Set error listener
            if (isExecutable(settings.error)) {
                request.addEventListener('error', settings.error, false);
            }

            request.send(postData);
        },

        /**
         * Has class method
         *
         * @param  {Element} el DOM element
         * @param  {String}  cl Class name
         * @return {Boolean}    Has class status
         */
        hasClass = function (el, cl) {
            return (!!el.className && el.className.match(getClassRegExp(cl)));
        },

        /**
         * Add class method
         *
         * @param {Element|NodeList|Array} el DOM element, node list or array with elements and node lists
         * @param {String|Array}              cl Class name or array with class names
         */
        addClass = function (el, cl) {
            arrayIterator(cl, function (cl) {
                attachToElement(el, function (el) {
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
            arrayIterator(cl, function (cl) {
                var regex = getClassRegExp(cl);
                attachToElement(el, function (el) {
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
            arrayIterator(cl, function (cl) {
                attachToElement(el, function (el) {
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
         * @param  {Element} el    DOM element
         * @param  {String}  attr  Attribute name
         * @param  {String}  value Attribute value to set
         * @return {String}        Actual attribute value
         */
        attr = function (el, attr, value) {
            if (!value) {
                return el.getAttribute(attr);
            }
            return el.setAttribute(attr, value.toString());
        },

        /**
         * Remove elements
         *
         * @param  {Element|NodeList} el Dom element or node list to remove
         * @return {Element|NodeList}    Last removed element or node list
         */
        remove = function (el) {
            var rm = null;
            attachToElement(el, function (el) {
                rm = el.parentNode && el.parentNode.removeChild(el);
            });
            return rm;
        },

        /**
         * Flush the internal cache
         */
        flush = function () {
            cache.dom = [];
        },

        /**
         * Animate object
         *
         * @param {Array|Object} list Object or array with setting objects
         */
        animate = function (list) {
            var item,
                duration,
                end = 0,
                node,
                /**
                 * Single animation step
                 */
                step = function () {
                    var current   = +new Date(),
                        remaining = end - current,
                        rate;
                    if (remaining < 60) {
                        if (item) {
                            node = node || item.node;
                            item.run(node, 1); // 1 = progress is at 100%
                            if (isExecutable(item.callback)) {
                                item.callback(node);
                            }
                        }
                        item = list.shift(); // get the next item
                        if (item) {
                            node = item.node || node;
                            duration = item.time;
                            end = current + duration;
                            item.run(node, 0); // 0 = progress is at 0%
                        } else {
                            return;
                        }
                    } else {
                        rate = 1 - remaining / duration;
                        item.run(node || item.node, rate);
                    }
                    window.requestAnimationFrame(step);
                };
            if (!Array.isArray(list)) {
                list = [list];
            }
            // Start the animation
            step();
        },

        /**
         * Require script async
         *
         * @param {String}   name     Module name or path
         * @param {Function} callback Optional callback to trigger after load
         */
        require = function (name, callback) {
            var script = syndom('script')[0],
                scriptToAppend = document.createElement('script');
            // Trigger callback on load
            if (isExecutable(callback)) {
                on(scriptToAppend, 'load', function () {
                    // Execute callback with module parameter if defined
                    callback(
                        cache.require.defined[name]
                    );
                });
            }
            // Set the proper src attribute
            scriptToAppend.src = (
                (
                    cache.require.settings && (
                        cache.require.settings.basePath + (
                            cache.require.settings.modules[name] || name
                        )
                    )
                )
            ) + '.js';
            // Insert script tag
            script.parentNode.insertBefore(scriptToAppend, script);
        },

        /**
         * Define external module
         *
         * @param {String}   name     Module name
         * @param {Function} callback Module function body
         */
        define = function (name, callback) {
            if (isExecutable(callback)) {
                cache.require.defined[name] = callback();
            }
        },

        /**
         * Value to integer
         *
         * @param  {Object} value Mixed value
         * @return {Number}       Integer
         */
        intType = function (value) {
            return value | 0;
        },

        /**
         * Value to float
         *
         * @param  {Object} value Mixed value
         * @return {Number}       Float
         */
        floatType = function (value) {
            return +value;
        },

        /**
         * Value to string
         *
         * @param  {Object} value Mixed value
         * @return {String}       String
         */
        stringType = function (value) {
            return String(value);
        },

        /**
         * Value to boolean
         *
         * @param  {Object}  value Mixed value
         * @return {Boolean}       Boolean
         */
        boolType = function (value) {
            return !!value;
        };

    /**
     * Require configuration setter
     *
     * @param {Object} settings Settings object
     */
    require.config = function (settings) {
        // Create default settings
        var localBasePath = (settings.basePath || '');
        if (localBasePath[0] === '/') {
            localBasePath = window.location.origin + '/' + localBasePath.substring(0);
        }
        cache.require.settings.basePath = localBasePath;
        cache.require.settings.modules = settings.modules || {};
    };

    // Set public methods
    syndom.on              = on;
    syndom.ajax            = ajax;
    syndom.hasClass        = hasClass;
    syndom.addClass        = addClass;
    syndom.removeClass     = removeClass;
    syndom.toggleClass     = toggleClass;
    syndom.attr            = attr;
    syndom.remove          = remove;
    syndom.flush           = flush;
    syndom.animate         = animate;
    syndom.require         = require;
    syndom.define          = define;
    syndom.attachToElement = attachToElement;
    syndom.arrayIterator   = arrayIterator;
    syndom.int             = intType;
    syndom.float           = floatType;
    syndom.string          = stringType;
    syndom.bool            = boolType;

    // If jQuery is not set, use $ for backwards compatibility
    if (!window.$) {
        window.$ = syndom;
    }
    return syndom;

}(window, document));
