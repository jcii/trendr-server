exports.up = function(knex, Promise) {
return Promise.all([
  knex.schema.createTable('users', (table) => {
    table.increments('id').primary()
    table.string('username')
    table.string('password')
    table.string('jwt')
    table.bigint('created_at')
    table.bigint('updated_at')
  }),
  knex.schema.createTable('trends', (table) => {
    table.increments('id').primary()
    table.integer('user_id').references("users.id")
    table.string("trend_title")
    table.boolean("is_primary")
    table.string("trend_description")
    table.bigint('created_at')
    table.bigint('updated_at')
  }),
  knex.schema.createTable('twitter_keywords', (table) => {
    table.increments('id').primary()
    table.integer('trend_id').references("trends.id")
    table.string("keyword")
    table.boolean("is_active")
    table.bigint('created_at')
    table.bigint('updated_at')

  }),
  knex.schema.createTable('trend_tickers', (table) => {
    table.increments('id').primary()
    table.integer("user_id").references("users.id")
    table.integer("trend_id").references("trends.id")
    table.string("ticker")
    table.bigint('created_at')
    table.bigint('updated_at')
  }),
  knex.schema.createTable('realtime_stocks', (table) => {
    table.increments('id').primary()
    table.string("name")
    table.string("symbol")
    table.decimal("price")
    table.integer("volume")
    table.bigint("timestamp")
    table.bigint('created_at')
    table.bigint('updated_at')
  }),
  knex.schema.createTable('stock_history', (table) => {
    table.increments('id').primary()
    table.integer('user_id').references("users.id")
    table.string("name")
    table.string("symbol")
    table.integer("price")
    table.string("date_period")
    table.bigint("unix_timestamp")
    table.string("full_date")
    table.string("year")
    table.integer("month_number")
    table.string("month")
    table.integer("day_number")
    table.string("day")
    table.bigint('created_at')
    table.bigint('updated_at')
  }),
  knex.schema.createTable('nyse_companies', (table) => {
    table.increments('id').primary()
    table.string("symbol")
    table.string("company_name")
    table.string("LastSale")
    table.string("MarketCap")
    table.string("IPOyear")
    table.string("Sector")
    table.string("industry")
    table.string("quote")
  }),
  knex.schema.createTable('nasdaq_companies', (table) => {
    table.increments('id').primary()
    table.string("symbol")
    table.string("company_name")
    table.string("LastSale")
    table.string("MarketCap")
    table.string("IPOyear")
    table.string("Sector")
    table.string("industry")
    table.string("quote")
  }),
  knex.schema.createTable('amex_companies', (table) => {
    table.increments('id').primary()
    table.string("symbol")
    table.string("company_name")
    table.string("LastSale")
    table.string("MarketCap")
    table.string("IPOyear")
    table.string("Sector")
    table.string("industry")
    table.string("quote")
  }),
    knex.schema.createTable('current_keyword_mentions', (table) => {
    table.increments('id').primary()
    table.integer('user_id')
    table.string("text")
    table.string("hashtags")
    table.bigint("unix_timestamp")
    table.string("full_date")
    table.bigint('created_at')
    table.bigint('updated_at')
  }),
    knex.schema.createTable('keyword_tweets', (table) => {
    table.increments('id').primary()
    table.integer("trend_id").references("trends.id")
    table.string("text")
    table.string("hashtags")
    table.bigint("unix_timestamp")
    table.string("full_date")
    table.bigint('created_at')
    table.bigint('updated_at')
  })
])}
exports.down = (knex, Promise) => {}