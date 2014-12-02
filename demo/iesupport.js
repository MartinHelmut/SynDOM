/*jslint browser: true */

/**
 * General syndom needed IE8 and lower support
 * 
 * @param {Object} window
 * @param {Object} document
 */
(function (window, document) {
    'use strict';

    if (!document.getElementsByClassName) {
        (function () {
            /**
             * Get elements by class name function
             * 
             * @param  {String}  className Name of the html class
             * @param  {Element} context   DOM element
             * @return {Array}             Array with DOM elements
             */
            var getElementsByClassName = function (className, context) {
                context = context || document;
                var elems = !!context.querySelectorAll ? context.querySelectorAll('.' + className) : (function () {
                    var elArray = [],
                        tmp = context.getElementsByTagName('*'),
                        len = tmp.length,
                        regex = new RegExp('(^|\\s)' + className + '(\\s|$)'),
                        i;
                    for (i = 0; i < len; i += 1) {
                        if (regex.test(tmp[i].className)) {
                            elArray.push(tmp[i]);
                        }
                    }
                    return elArray;
                }());
                return elems;
            };

            /**
             * Document get elements by class name function
             * 
             * @param  {String}   className Name of the html class
             * @return {NodeList}           Result DOM NodeList
             */
            document.getElementsByClassName = function (className) {
                return getElementsByClassName(className, document);
            };

            /**
             * Element get elements by class name function
             * 
             * @param  {String}   className Name of the html class
             * @return {NodeList}           Result DOM NodeList
             */
            Element.prototype.getElementsByClassName = function (className) {
                return getElementsByClassName(className, this);
            };
        }());
    }

    if (!String.prototype.trim) {
        /**
         * Trim string
         * 
         * @return {String} Trimed string
         */
        String.prototype.trim = function () {
            return this.replace(/^\s+|\s+$/g, '');
        };
    }

    if (!Array.prototype.indexOf) {
        /**
         * Returns the first index at which a given element can be found in the 
         * array, or -1 if it is not present.
         * 
         * @param  {Mixed}  searchElement Object of any type
         * @param  {Number} fromIndex     Start at index position
         * @return {Number}               Index or -1 if not found
         */
        Array.prototype.indexOf = function (searchElement, fromIndex) {
            var len;
            if (this === undefined || this === null) {
                throw new TypeError('"this" is null or not defined');
            }
            len = this.length >>> 0; // Hack to convert object.length to a UInt32
            fromIndex = +fromIndex || 0;
            if (Math.abs(fromIndex) === Infinity) {
                fromIndex = 0;
            }
            if (fromIndex < 0) {
                fromIndex += len;
                if (fromIndex < 0) {
                    fromIndex = 0;
                }
            }
            for (;fromIndex < len; fromIndex += 1) {
                if (this[fromIndex] === searchElement) {
                    return fromIndex;
                }
            }
            return -1;
        };
    }

}(window, document));