/*jshint camelcase: false */
/*globals module */
module.exports = function (grunt) {
    'use strict';

    // Init Grunt
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        // JSHint tasks, require .jshintrc file
        // https://github.com/gruntjs/grunt-contrib-jshint
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                ignores: [
                    'tests/helpers/AjaxHelper.js',
                    'coverage/**/*.js'
                ]
            },
            all: [
                'Gruntfile.js',
                'syndom.js'
            ]
        },
        // JavaScript Code Style checker
        // https://github.com/jscs-dev/grunt-jscs
        jscs: {
            main: [
                'Gruntfile.js',
                'syndom.js',
                'tests/**/*Test.js',
                'tests/**/*Helper.js',
                '!tests/helpers/AjaxHelper.js'
            ],
            options: {
                config: '.jscsrc'
            }
        },
        // JavaScript test suite
        // https://github.com/gruntjs/grunt-contrib-jasmine
        jasmine: {
            src: 'syndom.js',
            options: {
                specs: 'tests/**/*Test.js',
                helpers: 'tests/helpers/**/*Helper.js',
                // Code coverage
                // https://github.com/maenu/grunt-template-jasmine-istanbul
                template : require('grunt-template-jasmine-istanbul'),
                templateOptions: {
                    coverage: 'coverage/coverage.json',
                    report: 'coverage'
                },
                '--web-security' : false
            }
        }
    });

    // Load all tasks
    // https://github.com/sindresorhus/load-grunt-tasks
    require('load-grunt-tasks')(grunt, {
        pattern: [
            'grunt-*',
            '!grunt-template-jasmine-istanbul'
        ]
    });

    // Register tasks
    grunt.registerTask('default', [
        'jshint',
        'jscs',
        'jasmine'
    ]);
};
