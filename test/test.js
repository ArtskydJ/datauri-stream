var test = require('tape')
var Stream = require('stream')
var concat = require('concat-stream')
var fs = require('fs')
var https = require('https')
var DataUriStream = require('../index.js')

var dot = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyb' +
	'lAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg=='

function expected(t, stream, expect) {
	stream
		.pipe(DataUriStream())
		.pipe(concat({ encoding: 'string' }, function (data) {
			t.equals(data, expect)
			t.end()
		}))
}

test('fs', function (t) {
	var stream = fs.createReadStream(__dirname + '/Red-dot-5px.png')
	expected(t, stream, dot)
})

test('http', function (t) {
	var url = 'https://upload.wikimedia.org/wikipedia/commons/3/31/Red-dot-5px.png'
	https.get(url, function (res) {
		expected(t, res, dot)
	})
})

test('unknown type', function(t) {
	var stream = new Stream.PassThrough()
	var expect = 'data:application/octet-stream;base64,aGVsbG8uZ29vZGJ5ZS4='

	expected(t, stream, expect)

	stream.write('hello.')
	setTimeout(function () {
		stream.end('goodbye.')
	}, 1)
})
