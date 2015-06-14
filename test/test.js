var test = require('tape')
var through2 = require('through2')
var concat = require('concat-stream')
var fs = require('fs')
var got = require('got')
var DataUriStream = require('../index.js')

var dot = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyb' +
	'lAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg=='

function equals(t, str) {
	return concat({ encoding: 'string' }, function (data) {
		t.equals(data, str || dot)
		t.end()
	})
}

test('fs', function (t) {
	fs.createReadStream(__dirname + '/Red-dot-5px.png')
		.pipe(DataUriStream())
		.pipe(equals(t))
})

test('http', function (t) {
	got('https://upload.wikimedia.org/wikipedia/commons/3/31/Red-dot-5px.png')
		.pipe(DataUriStream())
		.pipe(equals(t))
})

test('unknown type', function(t) {
	var src = new through2()
	var expect = 'data:application/octet-stream;base64,aGVsbG8uZ29vZGJ5ZS4='

	src
		.pipe(DataUriStream())
		.pipe(equals(t, expect))

	src.write('hello.')
	src.end('goodbye.')
})
