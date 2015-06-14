var map = require('through2-map')
var fileType = require('file-type')

module.exports = function DataUriStream(opts) {
	var optsMime = opts && opts.mimeType
	var fallbackMime = 'application/octet-stream'

	return map(function each(chunk, i) {
		var encoded = chunk.toString('base64')

		if (i === 0) {
			var type = fileType(chunk)
			var mime = optsMime || (type && type.mime) || fallbackMime
			encoded = 'data:' + mime + ';base64,' + encoded
		}

		return encoded
	})
}
// Publish this as a module on npm
