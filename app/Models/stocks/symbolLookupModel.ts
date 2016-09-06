'use strict'
import { Request, Response } from 'express'
const symbolDb = require('../../config/db/knex/knexConfig')

module.exports = class SymbolLookupClass {
    constructor() { }

    getCompany(searchString: string) {
        return symbolDb.knex.raw(`select * from 
            (
            select *
            from amex_companies
            union
            select *
            from nyse_companies
            union
            select *
            from nasdaq_companies
            ) companies
            where LOWER(company_name) like LOWER('%${searchString}%')
            or LOWER(symbol) like LOWER('%${searchString}%')
            limit 10`)
    }
}