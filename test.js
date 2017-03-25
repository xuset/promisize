var promisize = require('.')
var test = require('tape')

test('callback success', function (t) {
  var cb = promisize(callback)
  t.equal(cb.promise, undefined)
  cb(null, 'foobar')

  function callback (err, result) {
    t.equal(err, null)
    t.equal(result, 'foobar')
    t.end()
  }
})

test('callback error', function (t) {
  var cb = promisize(callback)
  t.equal(cb.promise, undefined)
  cb('error')

  function callback (err, result) {
    t.equal(err, 'error')
    t.equal(result, undefined)
    t.end()
  }
})

test('promise success', function (t) {
  var cb = promisize(undefined)
  t.notEqual(cb.promise, undefined)

  cb.promise.then(function (result) {
    t.equal(result, 'foobar')
    t.end()
  })

  cb(null, 'foobar')
})

test('promise error', function (t) {
  var cb = promisize(undefined)
  t.notEqual(cb.promise, undefined)

  cb.promise.catch(function (err) {
    t.equal(err, 'error')
    t.end()
  })

  cb('error')
})

// ********************************************************************
// ***** Pretend there is no native Promise support from here on ******
// ********************************************************************
test('no op', function (t) {
  delete global.Promise
  t.end()
})

test('promises unsupported and no callback', function (t) {
  var cb = promisize(undefined)
  t.equal(cb.promise, undefined)
  cb(null, 'foobar') // Basically a no-op
  t.end()
})

test('promises unsupported and callback success', function (t) {
  var cb = promisize(callback)
  t.equal(cb.promise, undefined)
  cb(null, 'foobar')

  function callback (err, result) {
    t.equal(err, null)
    t.equal(result, 'foobar')
    t.end()
  }
})

test('promises unsupported and callback error', function (t) {
  var cb = promisize(callback)
  t.equal(cb.promise, undefined)
  cb('error')

  function callback (err, result) {
    t.equal(err, 'error')
    t.equal(result, undefined)
    t.end()
  }
})
