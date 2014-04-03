syndom v0.0.1
=============
* * *

## Beschreibung
Syndom ist eine JavaScript-Bibliothek für grundlegende DOM-Funktionen.

### Features
- weniger als **600 Byte** gzipped
- **selektieren** von Elementen
- **Event-Bindung**
- **manipulatuion von CSS-Klassen**

Inspiriert von [salt.js]("https://github.com/james2doyle/saltjs") was die Art der Selektierung angeht wurde die *syndom*-Variante abgewandelt, um bereits selektierte Elemente zu cachen und der Möglichkeit einen Kontext für ein Element anzugeben.

### Browser Support
- Chrome
- Firefox
- Opera
- Safari
- IE9+ (mit IE-Support-Datei auch IE6+)

## Anwednung
Um *syndom* zu nutzen wird das Script am Ende der Seite eingebunden:

```html
<html>
<head>
    <title>Dokument</title>
</head>
<body>
    Hallo Welt
    <script type="text/javascript" src="syndom.js"></script>
</body>
</html>
```

Für **IE8 und kleiner** Support kann die support-Datei in den Kopf der Seite als *Conditional Comment* eingebunden werden:

```html
<html>
<head>
    <title>Dokument</title>
    <!--[if lte IE 6]>
        <script type="text/javascript" src="iesupport.js"></script>
    <![endif]-->
</head>
<body>
    Hallo Welt
    <script type="text/javascript" src="syndom.js"></script>
</body>
</html>
```

## Elemente selektieren
Elemente werden intern mit den JavaScript-Funktionen ```getElementById()```, ```getElementsByClassName()```, ```getElementsByName()``` und ```getElementsByTagName()``` selektiert. Es werden immer **native JavaScript-Objekte wiedergegeben**.

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

### Mit Kontext
Elemente die selektiert werden sollen können sich in einem Kontext befinden. Der standardkontext ist *document*. Ein Beispielkontext (in CSS Schreibweiße) könnte ```#wrapper .rows``` sein. Der Kontext ist immer ein **bereits selektiertes Element**:

```javascript
// Kontext wählen
var myContext = $('#wrapper');
// Elemente aus Kontext
$('.rows', myContext);
```

## CSS-Klassen manipulieren
Zum Cross-Brwoser manipulieren von CSS-Klassen gibt es folgende Methoden aus dem *syndom*-Objekt:

### hasClass
Die Methode ```hasClass()``` prüft ob eine bestimmte CSS-Klasse an **einem** Element gesetzt ist. Die Methode wird wie folgt angewendet:

```javascript
var el = $('#element');
if ($.hasClass(el, 'class')) {
    // ...
}
```

### addClass
Mit ```addClass()``` kann eine oder mehrere Klassen an ein oder mehrere Elemente gesetzt werden. Grundfunktion:

```javascript
// Klasse an ein Element setzen
var el = $('#element');
$.addClass(el, 'class1');

// Klasse an NodeList setzen
var el = $('.elements');
$.addClass(el, 'class2');
```

Zum vergeben von einer Klasse an **mehrere unterschiedliche Elemente** kann ein Array mit einer Elementauswahl übergeben werden:

```javascript
// Klasse an unterschiedliche Elemente setzen
var elList = [
    $('#wrapper'),
    $('.someBoxes'),
    $('@moreElements')
];
$.addClass(elList, 'class');
```

Außerdem können **mehrere Klassen** an ein Element auf einmal vergeben werden:

```javascript
var el = $('#box');
$.addClass(el, [
    'class1',
    'class2'
]);
```

Diese Varianten können auch **kombiniert** werden, so das alle Elemente alle Klassen erhalten die definiert sind:

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
Per ```removeClass()``` können eine oder mehrere Klassen von einem oder mehreren Elementen entfernt werden:

```javascript
// Klasse von ein Element entfernen
var el = $('#box');
$.removeClass(el, 'uselessClass');

// Klasse von NodeList entfernen
var el = $('@namedElements');
$.addClass(el, 'class');
```

Um Klassen von **mehreren unterschiedlichen Elementen** zu entfernen wird ein Array mit den jeweiligen Elementen übergeben:

```javascript
var elList = [
    $('input'),
    $('div')
];
$.removeClass(elList, 'class');
```

Genau wie bei *addClass* können auch bei *removeClass* **mehrere Klassen** entfernt werden:

```javascript
var el = $('article')[0];
$.removeClass(el, [
    'marked',
    'new-article'
]);
```

Und hier die Kombination für **unterschiedliche Elemente mit mehreren Klassen**:

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
Die ```toggleClass()``` Methode **wechselt CSS-Klassen** aus. Sind die Klassen vorhanden werden sie entfernt, existieren sie nicht werden sie hinzugefügt. Ein einfacher Aufruf könnte so aussehen:

```javascript
var el = $('#information');
$.toggleClass(el, 'open');
```

Wie *addClass* und *removeClass* können **mehrere Klassen und/oder Elemente** als Array übergeben werden um mehrere Klassen und Elemente zu toggeln.

```javascript
var el = $('#information'),
    elList = [
        $('#wrapper'),
        $('.box')
    ];

// Mehrere Klassen toggeln
$.toggleClass(el, [
    'class1',
    'class2'
]);

// Mehrere Elemente toggeln
$.toggleClass(elList, 'class');

// Kombination
$.toggleClass(elList, [
    'class1',
    'class2'
]);
```

## Event-Bindung
Mit *syndom* können **Cross-Browser Events** per ```on()``` Methode vergeben werden, mit flexibler vergabe der Events an Elemente. Dabei wird das oder die Elemente übergeben, das Event und eine Callback-Funktion die das Event-Objekt übergeben bekommt. Zum binden eines klick-Events:

```javascript
var el = $('#click-me');
$.on(el, 'click', function (event) {
    //
});
```

Zum binden eines Events an **mehrere Elemente** (*NodeList*):

```javascript
var allLinks = $('a');
$.on(allLinks, 'hover', function (event) {
    //
});
```

Für **mehrere unterschiedliche Elemente** kann ein Array übergeben werden:

```javascript
var elList = [
    $('input'),
    $('textarea'),
    $('select')
];
$.on(elList, 'focus', function (event) {
    //
});
```

Zudem können mehrere Events auf einmal gebunden werden in dem für das Event ein Array übergeben wird:

```javascript
var inputs = $('input');
$.on(inputs, ['focus', 'blur'], function (event) {
    $.toggleClass(event.target, 'focused');
});
```