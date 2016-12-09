# Auto scroll text tape jQuery plugin
jQuery plug-in for autoscrolling text in wrapper.
It must work only in case when the wrapper of the text will be less than text.
This plug-in reacts to change of page size.

See [Demo](https://maplemap.github.io/jquery.autoscroll-text-tape/test/)

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
|    Property    | Type   |          Description          |
| -------------  |  ----  |          -----------          |
| speed          | string | Default: 'normal'. The are 3 options: ```slow```, ```normal```, ```fast``` |
| tapeOffset     | int    | Default: 0. It's parameter for offset of tape with text on right and left sides. In pixels.|
| moveOnHover    | bool   | Default: false. Text tape will move only after hover  |
