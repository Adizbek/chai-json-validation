const chai = require('chai')
const jsonSchema = require('../src/index')

chai.should()

chai.use(jsonSchema)

describe('Plugin test', function () {
  it('should check schema', function () {
    let json = [
      { a: 5, b: 'A', c: false },
      { a: 5, b: 'B', c: true },
      { a: '5', b: 'C', c: true }
    ]

    json.should.haveSchema([
      { a: Number, b: String, c: Boolean }
    ])
  })

  it('should validate deep schema', function () {
    let json = {
      name: 'Adizbek Ergashev',
      born: 1998,
      active: true,
      skills: ['Vuejs', 'Nodejs', 'Kotlin', 'Java'],
      projects: [
        { id: 1, name: null },
        { id: 2, name: 'Project' },
        { id: 3, name: 'Project' },
        { id: 4, name: 'Project' },
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
