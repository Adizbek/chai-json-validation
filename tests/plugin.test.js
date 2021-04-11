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

  it('should validate schema', function () {
    let json = [{
      'id': 172188,
      'max_memory': 1608,
      'max_time': 116,
      'active_test': 50,
      'status': 9,
      'language_id': 3,
      'task_id': 93,
      'olympiad_id': null,
      'created_at': '2021-04-05T22:58:52.000Z',
      'user': { 'username': 'programmer0324', 'name': 'Avazbek Murataliyev' },
      'task': {
        'id': 93,
        'number': '0082',
        'translations': [{ 'title': 'Игра в камни', 'locale': 'ru' }, { 'title': 'Toshlar o’yini', 'locale': 'uz' }]
      }
    }, {
      'id': 172187,
      'max_memory': 3668,
      'max_time': 149,
      'active_test': 10,
      'status': 9,
      'language_id': 3,
      'task_id': 55,
      'olympiad_id': null,
      'created_at': '2021-04-05T22:51:20.000Z',
      'user': { 'username': 'programmer0324', 'name': 'Avazbek Murataliyev' },
      'task': {
        'id': 55,
        'number': '0048',
        'translations': [{ 'title': 'Треугольник Флойда', 'locale': 'ru' }, {
          'title': 'Floyd uchburchagi',
          'locale': 'uz'
        }]
      }
    }]

    json.should.haveSchema([{
      id: Number,
      max_memory: Number,
      active_test: Number,
      status: Number,
      language_id: Number,
      task_id: Number,
      olympiad_id: Number,
      created_at: String,
      user: { username: String, name: String },
      task: {
        id: Number,
        number: String,
        translations: [{ title: String, locale: String }]
      }
    }])
  })

  it('should have strict check', function () {
    let json = { name: 'Adizbek' }
    json.should.haveSchemaStrict({ name: String })

    let jsonNotStrict = { name: 'Adizbek', password: 123123 }

    jsonNotStrict.should.not.haveSchemaStrict({ name: String })
    jsonNotStrict.should.haveSchema({ name: String })
  })
})
