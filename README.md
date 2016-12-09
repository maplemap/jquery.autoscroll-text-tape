# Auto scroll text tape jQuery plugin

## Quick start

### Install

This package can be installed with:

- [npm](https://www.npmjs.com/package/jquery.autoscroll-text-tape): `npm install --save jquery.autoscroll-text-tape`

Or download the [latest release](https://github.com/maplemap/jquery.autoscroll-text-tape/releases).


### Load

#### Webpack

Load the required stylesheet and JS:

```js
import $ from 'jquery';
import 'imports?jQuery=jquery!jquery.autoscroll-text-tape';
```

#### Static HTML

Put the script at the [bottom](https://developer.yahoo.com/performance/rules.html#js_bottom) of your markup right after jQuery:

```html
<script src="/node_modules/jquery/dist/jquery.js"></script>
<script src="/node_modules/jquery.autoscroll-text-tape/dist/autoScrollTextTape.min.js"></script>
```


### Usage

Wrap your text with a container element `div`.

```html
<div class="text-block">Mama always said life was like a box of chocolates. You never know what you’re gonna get.</div>
```


Call the [plugin](https://learn.jquery.com/plugins/) function.

```javascript
$(document).ready(function(){
  $('.text-block"').autoTextTape();
});
```


### Options
