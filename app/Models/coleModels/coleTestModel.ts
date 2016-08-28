'use strict'
const coleDb = require('../../config/db/knex/knexConfig')

module.exports = class coleTestModel {
  constructor() { }
  getTrends() {
    return coleDb.knex.raw(`select * from trends`)
  }
}