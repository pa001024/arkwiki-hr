/**
 * Reads a source file that may (or may not) contain ES6 classes, transforms it
 * to ES5 compatible code using the pre-bundled ES6 class visitors, and prints
 * out the result.
 */
var transform = require('es3ify').transform;
var transformMW = require('es3ify-mw').transform;
var fs = require('fs');

var originalFileContents = fs.readFileSync('dist/js/app.js', 'utf-8');

var transformedFileData = transform(transformMW(originalFileContents));

fs.writeFileSync('dist/hr.js', transformedFileData);

fs.copyFileSync('dist/css/app.css', 'dist/hr.css');
