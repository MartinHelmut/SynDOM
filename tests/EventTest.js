/**
 * Test dom event handling
 *
 * http://tobyho.com/2011/12/15/jasmine-spy-cheatsheet/
 */
describe('DOM Events', function () {
    'use strict';

    it('bind one event on single element', function () {
        var clickSpy = jasmine.createSpy('click'),
            event = document.createEvent('MouseEvents');

        event.initMouseEvent('click', true, true);

        S.on(S('body')[0], 'click', clickSpy);
        S('body')[0].dispatchEvent(event, true);

        expect(clickSpy).toHaveBeenCalled();
    });

    it('bind multiple events on single element', function () {
        var clickSpy = jasmine.createSpy('click'),
            focusSpy = jasmine.createSpy('focus'),
            clickEvent = document.createEvent('MouseEvents'),
            focusEvent = document.createEvent('MouseEvents');

        clickEvent.initMouseEvent('click', true, true);
        focusEvent.initMouseEvent('focus', true, true);

        S.on(S('body')[0], ['click', 'focus'], function () {
            clickSpy();
            focusSpy();
        });
        S('body')[0].dispatchEvent(clickEvent, true);
        S('body')[0].dispatchEvent(focusEvent, true);

        expect(clickSpy).toHaveBeenCalled();
    });

    it('bind one event to multiple elements', function () {
        var clickSpy = jasmine.createSpy('click'),
            event = document.createEvent('MouseEvents');

        event.initMouseEvent('click', true, true);

        S.on(S('script'), 'click', clickSpy);
        S('script')[0].dispatchEvent(event, true);
        S('script')[1].dispatchEvent(event, true);

        expect(clickSpy).toHaveBeenCalled();
    });
});
