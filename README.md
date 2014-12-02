# SynDOM

## Contents

* [Description](#description)
  * [Features](#features)
  * [Browser Support](#browser-support)
* [Select DOM nodes](#select-dom-nodes)
  * [ByID](#byid)
  * [ByClassName](#byclassname)
  * [ByName](#byname)
  * [ByTagName](#bytagname)
  * [Context](#context)
* [Manipulate CSS classes](#manipulate-css-classes)
  * [hasClass](#hasclass)
  * [addClass](#addclass)
  * [removeClass](#removeclass)
  * [toggleClass](#toggleclass)
* [DOM operations](#dom-operations)
  * [Attributes](#attributes)
  * [Remove](#remove)
* [Event binding](#event-binding)
* [Animation](#animation)

## Description

*SynDOM* is a JavaScript library for basic DOM operartions.

### Features

* less than **700 Bytes** gzipped
* **select** DOM elements
* **Event binding**
* **Manipulating CSS classes**
* **DOM** operations
* **Animate** DOM elements with requestAnimationFrame (and Fallback)

Inspired by [salt.js](https://github.com/james2doyle/saltjs), the SynDOM variant also caches the selected elements and and offers the possibility to set a element context.

### Browser Support
- Chrome
- Firefox
- Opera
- Safari
- IE9+

If you want to support **IE6-8** you need to include the IE support file, [download here](http://gitlab.synbackend.com/synlight-internal-projects/syndom/raw/master/demo/iesupport.js) or use the one in the `demo` folder.

```html
<!--[if lte IE 6]>
    <script type="text/javascript" src="js/iesupport.js"></script>
<![endif]-->
```

## Select DOM nodes

Internaly nodes are selected through the JavaScript functions `getElementById()`, `getElementsByClassName()`, `getElementsByName()` and `getElementsByTagName()`. The return value is always an **native JavaScript object** (Node or NodeList). This will also be **cached** by SynDOM.

### ByID

```javascript
$('#idName');
```

### ByClassName

```javascript
$('.className');
```

### ByName

```javascript
$('@name');
```

### ByTagName

```javascript
$('element');
```

### Context

Elements to be selected may be located in a context (parent Node). The default context is *document*. An example of context (in CSS notation) could be `#wrapper .rows`. The context is always an **already selected element**:

```javascript
// Get context
var myContext = $('#wrapper');
// Node from context
var rows = $('.rows', myContext);
```

## Manipulate CSS classes

To manipulate CSS classes cross browser use the following methods from the SynDOM object:

### hasClass

The `hasClass()` method checks if a certain CSS class is set on an **single** DOM element.

```javascript
var el = $('#element');
if ($.hasClass(el, 'classname')) {
    // ...
}
```

### addClass

With `addClass()` one or more classes can be set to one or more elements.

```javascript
// Set class to one Node
var el = $('#element');
$.addClass(el, 'class1');

// Set class to NodeList
var el = $('.elements');
$.addClass(el, 'class2');
```

To assign a class to **several different elements**, an array is passed with element selectors.

```javascript
var elList = [
    $('#wrapper'),
    $('.someBoxes'),
    $('@moreElements')
];
$.addClass(elList, 'class');
```

In addition, **several classes** can be assigned to an element at a time.

```javascript
var el = $('#box');
$.addClass(el, [
    'class1',
    'class2'
]);
```

These variants can also be **combined**, so that all the elements obtained all the classes defined.

```javascript
var elList = [
    $('#wrapper'),
    $('.someBoxes'),
    $('@moreElements')
];
$.addClass(elList, [
    'class1',
    'class2'
]);
```

### removeClass

By `removeClass()` one or more classes of one or more elements are removed.

```javascript
// Remove class from Node
var el = $('#box');
$.removeClass(el, 'uselessClass');

// Remove class from NodeList
var el = $('@namedElements');
$.addClass(el, 'class');
```

To remove classes from **several different Nodes**, pass an array with the respective elements.

```javascript
var elList = [
    $('input'),
    $('div')
];
$.removeClass(elList, 'class');
```

Same as `addClass()` **multiple classes** can also be removed in `removeClass()`.

```javascript
var el = $('article')[0];
$.removeClass(el, [
    'marked',
    'new-article'
]);
```

And here is the combination of different elements with multiple classes.

```javascript
var elList = [
    $('.articles'),
    $('.breadcrumb')
];
$.removeClass(elList, [
    'class1',
    'class2'
]);
```

### toggleClass

The `toggleClass()` method toggle CSS classes: Are the classes provided they are removed, if there not exists they are added.

```javascript
var el = $('#information');
$.toggleClass(el, 'open');
```

Like `addClass()` and `removeClass()` multiple classes and / or elements are passed as an array to toggle to several classes and elements.

```javascript
var el = $('#information'),
    elList = [
        $('#wrapper'),
        $('.box')
    ];

// Toggle multiple classes
$.toggleClass(el, [
    'class1',
    'class2'
]);

// Toggle on multiple elements
$.toggleClass(elList, 'class');

// Combination
$.toggleClass(elList, [
    'class1',
    'class2'
]);
```

## DOM operations

### Attributes

With SynDOM attributes can be get and set, use the SynDOM method `attr()` for this purpose. To **retrieve an attribute** of an element, only the attribute name is passed.

```javascript
var el = $('#myElement');
var value = $.attr(el, 'attrName');
```

To **set an attribute**, a second value, the content of the attribute is passed.

```javascript
var el = $('#myElement');
$.attr(el, 'attrName', 'value');
```

Only strings are acceptable to set attribute values!

### Remove

With SynDOM elements may also be deleted. For this purpose, there is the `remove()` method.

```javascript
var el = $('#myElement');
$.remove(el);
```

The **return value** is the deleted Node. There can also be passed NodeLists and Arrays with elements to remove.


```javascript
var elList = [
        $('#myElement'),
        $('input')
    ],
    el = $('.elements');

$.remove(elList);
$.remove(el);
```

The **return value** is the last deleted element.

## Event binding

With SynDOM **cross browser events** can be assigned via the `on()` method, with flexible assignment of events to elements. You can pass one or multiple elements, the event name and a callback function.


```javascript
var el = $('#click-me');
$.on(el, 'click', function (event) {
    // ...
});
```

Bind multiple elements (NodeList):

```javascript
var allLinks = $('a');
$.on(allLinks, 'hover', function (event) {
    // ...
});
```

Bind different Nodes by array.

```javascript
var elList = [
    $('input'),
    $('textarea'),
    $('select')
];
$.on(elList, 'focus', function (event) {
    // ...
});
```

In addition, several events can be bound at once as array.

```javascript
var inputs = $('input');
$.on(inputs, ['focus', 'blur'], function (event) {
    $.toggleClass(event.target, 'focused');
});
```

## Animation

You can animate elements by `animate()`. The animation itself is in you hands, SynDOM only provides a easy way to manage your animation. Here a basic example:

```js
$.animate(
    {
        time: 3000,
        node: $('#element'),
        run: function (node, rate) {
            // ...
        }
    }
);
```

### Animation Options

The **time** option is a time in milliseconds, how long the animation should run. Node property **node** is the node to animate, all types are accepted, even NodeList, because you handel it.

### Animation Callback

The `run` callback defines what happens on every animation step. Passed arguments are `node` and `rate`.

**node**

The node object is the given *Node* or *NodeList*, so you need to handle multiple elements.

**rate**

The rate is the actual animation point, as **float between 0 and 1**.

### Multiple Animations

If you want animate more than one thing you can add more animations. They are executed after the previous is executed. Just use an array:

```js
$.animate([
    {
        time: 3000,
        node: $('#element1'),
        run: function (node, rate) {
            // ...
        }
    },
    {
        time: 1000,
        node: $('#element2'),
        run: function (node, rate) {
            // ...
        }
    }
]);
```

Also, you can drop the `node` property on the second (or later) animation if you want to use the same object:

```js
$.animate([
    {
        time: 3000,
        node: $('#element'),
        run: function (node, rate) {
            // ...
        }
    },
    {
        time: 1000,
        run: function (node, rate) {
            // node is the same like in the first animation
            // ...
        }
    }
]);
```

So, it is possible to animate multiple elements with multiple steps:

```js
$.animate([
    {
        time: 3000,
        node: $('#element1'),
        run: function (node, rate) { /* ... */ }
    },
    {
        time: 1000,
        run: function (node, rate) { /* ... */ }
    },
    {
        time: 3000,
        node: $('#element2'),
        run: function (node, rate) { /* ... */ }
    },
    {
        time: 1000,
        run: function (node, rate) { /* ... */ }
    }
]);
```