# clean-share-buttons.js

A way to add "share" buttons to a page by simply adding a single DOM element

## Usage

To use the clean share buttons, just include `share-buttons.js` in your page, and add one or more share button elements to the DOM.

Add the following to the `<head>`:

	<script src='/path/to/js/share-buttons.js'></script>

Then add the following somewhere in the `<body>`:

	<div class='share-button' data-type='facebook'></div>

And you will see a share button to Facebook of the current page.

Alternately, if you'd prefer to specify a separate URL to share, you can specify it using the data-url attribute:

	<div class='share-button' data-type='facebook' data-url='http://example.com/my-awesome-page/'></div>

## Features

### Available Vendors

The clean share button currently supports **Facebook** & **Twitter** sharing. More to be added soon! (Also if you'd like to add a particular vendor, create a feature issue, and let us know.)

Valid arguments to `data-type`:

* `facebook`
* `twitter`

### Auto-Adding

You don't need to re-run the script, or do anything else, anytime you add a valid `.share-button` element to the page, `share-button.js` will attempt to convert it into a full share button.

### Custom styling

Share buttons are automatically styled using the stylesheet `share-buttons.css`, but if feel free to substitute your own entire stylesheet, or just override some styles. The share button is composed of plain HTML, so your css will work like usual.


## License

The  is dual licensed (just like jQuery) under the MIT (MIT_LICENSE.txt) and GPL Version 2 (GPL_LICENSE.txt) licenses.
