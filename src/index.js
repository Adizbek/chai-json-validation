const chai = require('chai')

/**
 * @param object
 * @return {boolean}
 */
function isObject (object) {
  return object && typeof object === 'object' && object.constructor.name === 'Object'
}

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
    return checkArray.call(this, type, test)
  } else if (isObject(type)) {
    return checkObject.call(this, type, test)
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

  if (this.__flags.strictSchemaValidation) {
    let expectedKeys = Object.keys(expected)
    let actualKeys = Object.keys(actual)

    let isOnlyRequiredKeysPresent = expectedKeys.length === actualKeys.length && expectedKeys.every(key => actualKeys.includes(key))

    if (!isOnlyRequiredKeysPresent) {
      this.assert(
        false,
        `Actual keys are not match to expected\nExpected: ${expectedKeys}\nActual: ${actualKeys}`
      )
    }
  }

  return Object.entries(expected).every(([key, type]) => {
    return checkSingle.call(this, type, actual[key])
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
    return match.call(this, matchSchema, object)
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
    return checkArray.call(this, expected, actual)
  } else if (isObject(expected)) {
    return checkObject.call(this, expected, actual)
  }

  return checkSingle.call(this, expected, actual)
}

function jsonSchema (schema) {
  let matches = match.call(this, schema, this._obj)

  let negate = this.__flags.negate

  this.assert(
    negate ? !matches : matches,
    `expected #{this}\n${JSON.stringify(this._obj, null, 2)}\nto match the given schema`,
    `expected #{this}\n${JSON.stringify(this._obj, null, 2)}\nto not match the given schema`,
  )
}

function jsonSchemaStrict (schema) {
  this.__flags.strictSchemaValidation = true

  return jsonSchema.call(this, schema)
}

function jsonMatchPlugin (_chai) {
  const Assertion = chai.Assertion

  Assertion.addMethod('haveSchema', jsonSchema)
  Assertion.addMethod('haveSchemaStrict', jsonSchemaStrict)
}

module.exports = jsonMatchPlugin
