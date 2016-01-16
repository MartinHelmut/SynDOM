# SynDOM

![Build status on master](http://gitlab.synbackend.com/ci/projects/2/status.png?ref=master)

## Contents

* [Description](#description)
  * [Features](#features)
  * [Browser Support](#browser-support)
* [Select DOM nodes](#select-dom-nodes)
  * [Select](#select)
  * [Context](#context)
  * [Cache](#cache)
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
  * [Animation Options](#animation-options)
  * [Animation Callback](#animation-callback)
  * [Multiple Animations](#multiple-animations)
* [Ajax](#ajax)
  * [Get](#get)
  * [Post](#post)
  * [Send headers](#send-headers)
* [Module loader](#module-loader)
  * [Require](#require)
  * [Define](#define)
  * [Configure](#configure)
* [Helper](#helper)
  * [Attach function to elements](#attach-function-to-elements)
  * [Array Iterator](#array-iterator)
* [Types](#types)
* [Test](#test)
* [Author](#author)

## Description

*syndom* is a JavaScript library for basic DOM operartions, event handling, basic animations (fast through `requestAnimationFrame`), ajax and simple module loading (without dependencies).

### Features

* less than **1.5kb** gzipped
* **select** DOM elements
* **Event binding**
* **Manipulating CSS classes**
* **DOM** operations
* **Animate** DOM elements with requestAnimationFrame (and Fallback)
* **Ajax** requests
* Simple async **module loader**

Inspired by [salt.js](https://github.com/james2doyle/saltjs), the *syndom* variant also caches the selected elements and offers the possibility to set a element context.

### Browser Support
- Chrome
- Firefox
- Opera
- Safari
- IE9+

## Select DOM nodes

Internaly nodes are selected through the JavaScript functions `getElementById()` or `querySelectorAll()`. So you can use CSS selection. The return value is always an **native JavaScript object** (Node or NodeList). This will also be **cached** by *syndom*. Here are some examples:

### Select

```javascript
S('#idName');
S('.className');
S('.className .anotherClass');
S('.className:first-child');
S('a[data-url]');
```

### Context

Elements to be selected may be located in a context (parent Node). The default context is *document*. An example of context (in CSS notation) could be `#wrapper .rows`. The context is always an **already selected element**:

```javascript
// Get context
var myContext = S('#wrapper');
// Node from context
var rows = S('.rows', myContext);
```

### Cache

*syndom* caches all new Node and NodeList operations to operate as less as possible DOM iteration. **Also deleted elements are stored in cache!** So you can access mistakenly deleted elements again. If you don't want to access DOM by cache use the third *syndom* function argument `noCache`:

```javascript
var ele = S('nav li', document, true); // Load not from cache
```

Alternatively you can flush the whole cache:

```javascript
S.flush();
```

## Manipulate CSS classes

To manipulate CSS classes cross browser use the following methods from the *syndom* object:

### hasClass

The `hasClass()` method checks if a certain CSS class is set on an **single** DOM element.

```javascript
var el = S('#element');
if (S.hasClass(el, 'classname')) {
    // ...
}
```

### addClass

With `addClass()` one or more classes can be set to one or more elements.

```javascript
// Set class to one Node
var el = S('#element');
S.addClass(el, 'class1');

// Set class to NodeList
var el = S('.elements');
S.addClass(el, 'class2');
```

To assign a class to **several different elements**, an array is passed with element selectors.

```javascript
var elList = [
    S('#wrapper'),
    S('.someBoxes'),
    S('div')
];
S.addClass(elList, 'class');
```

In addition, **several classes** can be assigned to an element at a time.

```javascript
var el = S('#box');
S.addClass(el, [
    'class1',
    'class2'
]);
```

These variants can also be **combined**, so that all the elements obtained all the classes defined.

```javascript
var elList = [
    S('#wrapper'),
    S('.someBoxes'),
    S('li')
];
S.addClass(elList, [
    'class1',
    'class2'
]);
```

### removeClass

By `removeClass()` one or more classes of one or more elements are removed.

```javascript
// Remove class from Node
var el = S('#box');
S.removeClass(el, 'uselessClass');

// Remove class from NodeList
var el = S('p');
S.addClass(el, 'class');
```

To remove classes from **several different Nodes**, pass an array with the respective elements.

```javascript
var elList = [
    S('input'),
    S('div')
];
S.removeClass(elList, 'class');
```

Same as `addClass()` **multiple classes** can also be removed in `removeClass()`.

```javascript
var el = S('article')[0];
S.removeClass(el, [
    'marked',
    'new-article'
]);
```

And here is the combination of different elements with multiple classes.

```javascript
var elList = [
    S('.articles'),
    S('.breadcrumb')
];
S.removeClass(elList, [
    'class1',
    'class2'
]);
```

### toggleClass

The `toggleClass()` method toggle CSS classes: Are the classes provided they are removed, if there not exists they are added.

```javascript
var el = S('#information');
S.toggleClass(el, 'open');
```

Like `addClass()` and `removeClass()` multiple classes and / or elements are passed as an array to toggle to several classes and elements.

```javascript
var el = S('#information'),
    elList = [
        S('#wrapper'),
        S('.box')
    ];

// Toggle multiple classes
S.toggleClass(el, [
    'class1',
    'class2'
]);

// Toggle on multiple elements
S.toggleClass(elList, 'class');

// Combination
S.toggleClass(elList, [
    'class1',
    'class2'
]);
```

## DOM operations

### Attributes

With *syndom* attributes can be get and set, use the *syndom* method `attr()` for this purpose. To **retrieve an attribute** of an element, only the attribute name is passed.

```javascript
var el = S('#myElement');
var value = S.attr(el, 'attrName');
```

To **set an attribute**, a second value, the content of the attribute is passed.

```javascript
var el = S('#myElement');
S.attr(el, 'attrName', 'value');
```

Only strings are acceptable to set attribute values!

### Remove

With *syndom* elements may also be deleted. For this purpose, there is the `remove()` method.

```javascript
var el = S('#myElement');
S.remove(el);
```

The **return value** is the deleted Node. There can also be passed NodeLists and Arrays with elements to remove.


```javascript
var elList = [
        S('#myElement'),
        S('input')
    ],
    el = S('.elements');

S.remove(elList);
S.remove(el);
```

The **return value** is the last deleted element.

## Event binding

With *syndom* **cross browser events** can be assigned via the `on()` method, with flexible assignment of events to elements. You can pass one or multiple elements, the event name and a callback function.


```javascript
var el = S('#click-me');
S.on(el, 'click', function (event) {
    // ...
});
```

Bind multiple elements (NodeList):

```javascript
var allLinks = S('a');
S.on(allLinks, 'hover', function (event) {
    // ...
});
```

Bind different Nodes by array.

```javascript
var elList = [
    S('input'),
    S('textarea'),
    S('select')
];
S.on(elList, 'focus', function (event) {
    // ...
});
```

In addition, several events can be bound at once as array.

```javascript
var inputs = S('input');
S.on(inputs, ['focus', 'blur'], function (event) {
    S.toggleClass(event.target, 'focused');
});
```

## Animation

You can animate elements by `animate()`. The animation itself is in your hands, *syndom* only provides a easy way to manage your animations. Here is a basic example:

```javascript
S.animate(
    {
        time: 3000,
        node: S('#element'),
        run: function (node, rate) {
            // ...
        }
    }
);
```

### Animation Options

The **time** option is a time in milliseconds, how long the animation should run. Node property **node** is the node to animate, all types are accepted, even NodeList, because you handle it.

### Animation Callback

The `run` callback defines what happens on every animation step. Passed arguments are `node` and `rate`.

**node**

The node object is the given *Node* or *NodeList*, you need to handle multiple elements.

**rate**

The rate is the actual animation point, as **float between 0 and 1**.

Also there is a real `callback` property you can define. It fires after the animation finishes. Also the `node` object is given.

```javascript
S.animate(
    {
        time: 3000,
        node: S('#element'),
        run: function (node, rate) {
            // ...
        },
        callback: function (node) {
            // ...
        }
    }
);
```

### Multiple Animations

If you want animate more than one thing you can add more animations. They are executed after the previous is executed. Just use an array:

```javascript
S.animate([
    {
        time: 3000,
        node: S('#element1'),
        run: function (node, rate) {
            // ...
        }
    },
    {
        time: 1000,
        node: S('#element2'),
        run: function (node, rate) {
            // ...
        }
    }
]);
```

Also, you can drop the `node` property on the second (or later) animation if you want to use the same object:

```javascript
S.animate([
    {
        time: 3000,
        node: S('#element'),
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

It is also possible to animate multiple elements with multiple steps:

```javascript
S.animate([
    {
        time: 3000,
        node: S('#element1'),
        run: function (node, rate) { /* ... */ }
    },
    {
        time: 1000,
        run: function (node, rate) { /* ... */ }
    },
    {
        time: 3000,
        node: S('#element2'),
        run: function (node, rate) { /* ... */ }
    },
    {
        time: 1000,
        run: function (node, rate) { /* ... */ }
    }
]);
```

## Ajax

From **syndom v1.0.4** it is possible to use ajax requests. The ajax method `ajax` is just a simple wrapper for some common functionality, but for easy use. Here is the basic, minimal, use:

```javascript
S.ajax({url: '/my/cool/url'});
```

### Get

The default HTTP method is *GET*. Here the example for explicit use GET and get the response of the URL.

```javascript
S.ajax({
    type: 'GET',
    url: '/my/cool/url',
    success: function (response) {
        // ...
    },
    error: function (response) {
        // ...
    }
});
```

You see, there is a `success` and an `error` method. Both are getting the default response. The error method can get optionally an *error* object as first argument if the url or some parameter are wrong.

You can use all basic JavaScript response options. To get the responseText use:

```javascript
var data = response.responseText;
```

### Post

You can make post request as easy as get. First look at the example:

```javascript
S.ajax({
    type: 'POST',
    url: '/my/cool/url',
    data: {
        name: 'value'
    },
    success: function (response) {
        // ...
    },
    error: function (response) {
        // ...
    }
});
```

The `type` is now `POST`. There is also an `data` property. This is an object with **key: value** properties to send with the post request.

### Send headers

Alternatively, it is possible to set custom request headers. Use the `headers` property to fulfill this task:

```javascript
S.ajax({
    url: '/my/cool/url',
    headers: {
        'My-Custom-Header': 'Header value'
    }
});
```

## Module loader

*syndom* offers a very small and fast module loader. **Not to define dependencies**, but to load scripts dynamically in your application and optionally execute an callback after load.

### Require

There is not much required to load a script:

```javascript
S.require('js/myScript');
```

This loads the script `js/myScript.js` from your start script. You don't need any `.js` extension. The base root path is from the executed file, except you [define one](#configure). If you write:

```javascript
S.require('/js/myScript');
```

then the location origin is used, e.g.: `http://localhost/`.

If you want to execute some functionality after script load use a callback:

```javascript
S.require('js/myScript', function () {
    // Use things defined in the script ...
});
```

### Configure

There are two options used at this time, `basePath` and `modules`. Set the base load path as follows:

```javascript
S.require.config({
    basePath: 'js/'
});
```

**Always** use a slash after your path folder! From now on, **all** scripts are loaded from the root `js/` folder. Also [defined modules](#define).

If you want to use short names for your files, called "modules", use the modules config:

```javascript
S.require.config({
    basePath: 'js/',
    modules: {
        myModule: 'some/path/myModule'
    }
});
```

This loads the JavaScript file `js/some/path/myModule.js`.

### Define

You can easily define modules by config. If you defined a unique module name you can use it optionally (you don't need to if you don't want to pass objects) **inside** the module as name to define scoped modules. First enclose your text with the module definition:

```javascript
// js/some/path/myModule.js
S.define('myModule', function () {
    var moduleObject = { /* ... */ };
    return moduleObject;
});
```

If you now require the script the returned `moduleObject` is used as callback argument:

```javascript
// js/main.js
S.require.config({
    basePath: 'js/',
    modules: {
        myModule: 'some/path/myModule'
    }
});

S.require('myModule', function (moduleObject) {
    // "moduleObject" is only visible here
});
```

## Helper

Helper functions are some functions for common use in your application.

### Attach function to elements

Attach a function to one ore more elements selected. It works for single elements:

```javascript
S.attachToElement(
    S('#element'),
    function (item) {
        // ...
    }
);
```

And for multiple elements where it calls the function for every element:

```javascript
S.attachToElement(
    S('.elements'),
    function (item) {
        // ...
    }
);
```

### Array Iterator

The *Array Iterator* method is a clean way to iterate over elements. If the element is no array it converts it and iterates once. So you don't need to worry what you pass to the function. The order is **reversed**, so the array iteration is faster.

```javascript
S.arrayIterator(
    [0, 1, 2],
    function (item) {
        // ...
    }
);
```

```javascript
S.arrayIterator(
    'string',
    function (item) {
        // item is "string"
    }
);
```

## Types

*syndom* defines some common type casting methods to fast convert values to types. Use:

```
S.int('42');       // => 42
S.int('5.4');      // => 5
S.float('6.3');    // => 6.3
S.string(42);      // => "42"
S.string([0,1,2]); // => "0,1,2"
S.bool(1);         // => true
S.bool(0);         // => false
```

## Test

You can run the *syndom* tests on your own. If you run the tests an code coverage is generated under `coverage/index.html`, too. To run the tests install [Grunt](http://gruntjs.com/getting-started) if not already done. Install all dependencies and run the grunt default task:

```sh
sudo npm install
grunt
```

## Author

* [Martin Helmut Fieber](/u/MartinHelmut)
