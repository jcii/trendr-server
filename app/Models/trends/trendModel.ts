'use strict'
import { Request, Response } from 'express'
const trendDb = require('../../config/db/knex/knexConfig')

module.exports = class TrendClass {
    constructor() { }

    sayHello() {
        return new Promise((resolve, reject) => {
            resolve('hello from trend model')
        })
    }

}