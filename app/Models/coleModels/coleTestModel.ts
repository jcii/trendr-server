'use strict'
const db = require('../../config/db/knex/knexConfig')

module.exports = class coleTestModel {
  constructor() { }
  getTrends() {
    return db.knex.raw(`select * from trends`)
  }
}