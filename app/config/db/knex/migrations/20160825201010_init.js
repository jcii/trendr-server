exports.up = function(knex, Promise) {
return Promise.all([
  knex.schema.createTable('users', (table) => {
    table.increments('id').primary()
    table.string('username')
    table.string('password')
    table.string('email')
    table.string('jwt')
    table.bigint('created_at')
    table.bigint('updated_at')
  }),
  knex.schema.createTable('trends', (table) => {
    table.increments('id').primary()
    table.integer('users_id').references("users.id")
    table.string("trend_title")
    table.string("trend_description")
    table.bigint('created_at')
    table.bigint('updated_at')
  }),
  knex.schema.createTable('twitter_keywords', (table) => {
    table.increments('id').primary()
    table.integer('trends_id').references("trends.id")
    table.string("keyword")
    table.bigint('created_at')
    table.bigint('updated_at')

  }),
  knex.schema.createTable('trend_tickers', (table) => {
    table.increments('id').primary()
    table.integer("user_id").references("users.id")
    table.integer("trends_id").references("trends.id")
    table.string("ticker")
    table.bigint('created_at')
    table.bigint('updated_at')
  }),
  knex.schema.createTable('keyword_tweets', (table) => {
    table.increments('id').primary()
    table.integer("trends_id").references("twitter_keywords.id")
    table.json("raw_tweet")
    table.bigint('created_at')
    table.bigint('updated_at')
  }),
  knex.schema.createTable('realtime_stocks', (table) => {
    table.increments('id').primary()
    table.string("name")
    table.string("symbol")
    table.integer("price")
    table.integer("volume")
    table.integer("timestamp")
    table.bigint('created_at')
    table.bigint('updated_at')
  }),
  knex.schema.createTable('stock_history', (table) => {
    table.increments('id').primary()
    table.integer('users_id').references("users.id")
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
  })
])}
exports.down = (knex, Promise) => {}