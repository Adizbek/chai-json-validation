const chai = require('chai')
const jsonSchema = require('../src/index')

chai.should()

chai.use(jsonSchema)

const isEven = (value) => value % 2 === 0

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
      score: 1567.54,
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
      score: /\d+\.\d{0,2}/g,
      projects: [{ id: Number, name: String }]
    })
  })

  it('should check regexp array', function () {
    let json = [125.23, 154.33, 5567.94]

    json.should.haveSchema([/\d+\.\d{0,2}/g])
  })

  it('should check value via function', function () {
    let json = [12, 32, 152, 352, 312]

    json.should.haveSchema([isEven])
  })

})
