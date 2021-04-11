const chai = require('chai')

/**
 * @param type
 * @param test
 * @return {boolean}
 */
function checkSingle (type, test) {
  // we don't check for null values
  if (test === null) {
    return true
  } else if (type === Number) {
    return !Number.isNaN(Number(test))
  } else if (type === String) {
    return typeof test === 'string'
  } else if (type === Boolean) {
    return typeof test === 'boolean'
  } else if (Array.isArray(type)) {
    return checkArray(type, test)
  } else if (type instanceof RegExp) {
    type.lastIndex = 0
    return type.test(test)
  } else if (type instanceof Function) {
    return type(test)
  } else {
    return false
  }
}

/**
 * @param {object} expected
 * @param {object} actual
 * @return {boolean}
 */
function checkObject (expected, actual) {
  if (!expected || !actual || typeof expected !== 'object' || typeof actual !== 'object') {
    return false
  }

  return Object.entries(expected).every(([key, type]) => {
    return checkSingle(type, actual[key])
  })
}

/**
 * @param {Array} expected
 * @param {Array|any} actual
 */
function checkArray (expected, actual) {
  if (!Array.isArray(actual) || !Array.isArray(expected)) {
    return false
  }

  let matchSchema = expected[0]

  return actual.every((object) => {
    return match(matchSchema, object)
  })
}

/**
 * @param {any} expected
 * @param {any} actual
 *
 * @return {boolean}
 */
function match (expected, actual) {
  if (Array.isArray(expected)) {
    return checkArray(expected, actual)
  } else if (expected && typeof expected === 'object' && expected.constructor.name === 'Object') {
    return checkObject(expected, actual)
  }

  return checkSingle(expected, actual)
}

function jsonSchema (schema) {
  let matches = match(schema, this._obj)

  this.assert(
    matches,
    'expected #{this} to match the given schema',
    'expected #{this} to not match the given schema',
  )
}

function jsonMatchPlugin (_chai) {
  const Assertion = chai.Assertion

  Assertion.addMethod('haveSchema', jsonSchema)
}

module.exports = jsonMatchPlugin
