var path = require('path');
var seedFile = require('knex-seed-file');
exports.seed = function (knex, Promise) {
    return Promise.join(knex('amex_companies').del(), seedFile(knex, path.resolve('./seeds/amex_companies.csv'), 'amex_companies', [
        'symbol',
        'company_name',
        'LastSale',
        'MarketCap',
        'IPOyear',
        'Sector',
        'industry',
        'quote'
    ], {
        // columnSeparator: '',
        ignoreFirstLine: true
    }));
};
