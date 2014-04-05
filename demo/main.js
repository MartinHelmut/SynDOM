(function () {
	'use strict';

	// Classes
	$.addClass($('#wrapper').childNodes, 'inner');
	$.removeClass($('#wrapper').childNodes, 'foo');

	// Events
	$.on($('.box', $('#wrapper')), 'click', function (event) {
		$.toggleClass(event.target, 'mark');
	});

	// Toggle multiple boxes
	$.on($('.box', $('#wrapper')), 'click', function (event) {
		$.toggleClass($('.box', $('#wrapper')), 'mark2');
	});

	// Array as Selector
	var boxes = [
		$('.box2'),
		$('.box3'),
		$('.box4')
	];
	$.addClass(boxes, 'box');

	// Array as class
	$.addClass($('.box2'), [
		'class1',
		'class2',
		'class3'
	]);

}());