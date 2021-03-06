# chai-json-validation
JSON schema validation for Chai

## Install

```bash
// using yarn
yarn add -D chai-json-validation

// using npm
npm install --save-dev chai-json-validation
```

## Available types

```js
Number
String
Boolean
RegExp
Function
```

## Available methods
```js

// Can present extra keys in object
haveSchema()

// Only described keys are allowed, if any extra keys present will fail 
haveSchemaStrict()
```

## Validating object

```js
let json = { id: 1, name: 'Project A' }

json.should.haveSchema({ id: Number, name: String })
```

## Validating array

```js
let json = [
  { id: 1, name: 'Project A' },
  { id: 2, name: 'Project B' },
  { id: 3, name: 'Project C' },
  { id: 4, name: 'Project D' },
]

json.should.haveSchema([{ id: Number, name: String }])
```

## Usage

```js
const chai = require('chai')
const jsonSchema = require('chai-json-validation')

chai.should()

chai.use(jsonSchema)

describe('Plugin test', function () {
  it('should validate schema', function () {
    let json = {
      name: 'Adizbek Ergashev',
      born: 1998,
      active: true,
      skills: ['Vuejs', 'Nodejs', 'Kotlin', 'Java'],
      projects: [
        { id: 1, name: 'Project A' },
        { id: 2, name: 'Project B' },
        { id: 3, name: 'Project C' },
        { id: 4, name: 'Project D' },
      ]
    }

    json.should.haveSchema({
      name: String,
      born: Number,
      active: Boolean,
      skills: [String],
      projects: [{ id: Number, name: String }]
    })
  })
})
```

### Strict check
```js
let json = { name: 'Adizbek', password: '123123', email: 'Mail@gmail.com' }

// assertion will fail, json contains unexpected password and email keys
// Will pass if only name present
json.should.haveSchemaStrict({ name: String })
```
