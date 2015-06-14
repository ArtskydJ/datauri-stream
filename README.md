datauri-stream
==============

[![Build Status](https://travis-ci.org/ArtskydJ/datauri-stream.svg)](https://travis-ci.org/ArtskydJ/datauri-stream)
[![Dependency Status](https://david-dm.org/artskydj/datauri-stream.svg)](https://david-dm.org/artskydj/datauri-stream)
[![devDependency Status](https://david-dm.org/artskydj/datauri-stream/dev-status.svg)](https://david-dm.org/artskydj/datauri-stream#info=devDependencies)

Lightweight `data` ─► [`data URI`](https://en.wikipedia.org/wiki/Data_URI_scheme) transform stream.

# examples

Use with the file system:
```js
var DataUri = require('datauri-stream')
var fs = require('fs')

fs.createReadStream('./picture.jpg')
	.pipe(DataUri())
	.pipe(process.stdout)
// 'data:image/png;base64,iVBORw0KGg...'
```

Use with http requests:
```js
var DataUri = require('datauri-stream')
var http = require('http')

http.get('http://www.google.com', function(res) {
	res.pipe(DataUri())
		.pipe(process.stdout)
	// 'data:image/png;base64,Vs8uZ29vZG...'
})
```

Use on the browser with browserify:
```js
var DataUri = require('datauri-stream')
var hyperquest = require('hyperquest')
var concat = require('concat-stream')

hyperquest('https://www.npmjs.com/static/images/npm-logo.svg')
	.pipe(DataUri({ mime: 'image/svg' }))
	.pipe(concat(function (dataUri) {
		var img = document.createElement('img')
		img.src = dataUri
		document.body.appendChild(img)
	}))
```

# api

```js
var DataUriStream = require('datauri-stream')
```

# `var ts = DataUriStream([opts])`

### `opts.mime`

An optional override for the mime type.

The mime type will be automatically detected otherwise, using the [file-type](https://github.com/sindresorhus/file-type) module. It [supports many file types](https://github.com/sindresorhus/file-type#supported-file-types).

If the source is not a file, then you'll want to supply the mime type.

### `ts`

A standard [Transform Stream](https://nodejs.org/api/stream.html#stream_class_stream_transform). Pipe to and from it.

<!---
# cli

```bash
$ cat file.png | datauri
data:image/png;base64,p93dm2nm3tuyd9...

$ echo 'some text' | datauri text/plain
data:text/plain;base64,c29tZSB0ZXh0

$ echo 'whatever' | datauri
data:application/octet-stream;base64,d2hhdGV2ZXI=
```
--->

# install

With [npm](http://nodejs.org/download) do:

	npm install datauri-stream

# license

[VOL](http://veryopenlicense.com)
