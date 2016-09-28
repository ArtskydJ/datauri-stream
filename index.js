var map = require('through2-map')
var fileType = require('file-type')

var fallbackMime = 'application/octet-stream'

module.exports = function DataUriStream(opts) {
	return map(function each(chunk, i) {
		var encoded = chunk.toString('base64')

		if (i === 0) {
			var type = fileType(chunk)
			var mime = (opts && typeof opts === 'object' && opts.mime) || (type && type.mime) || fallbackMime
			encoded = 'data:' + mime + ';base64,' + encoded
		}

		return encoded
	})
}
