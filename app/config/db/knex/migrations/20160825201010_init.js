exports.up = function(knex, Promise) {
return Promise.all([
  knex.schema.createTable('users', function(table){
    table.increments('id').primary()
    table.string('username')
    table.string('password')
    table.string('email')
    table.string('jwt')
  }),
  knex.schema.createTable('trends', function(table){
    table.increments('id').primary()
    table.integer().references("users.id")
    table.string("trend_title")
    table.string("trend_description")
    table.bigint('created_at')
    table.bigint('updated_at')
  }),
  knex.schema.createTable('twitter_keywords', function(table){
    table.increments('id').primary()
    table.integer().references("trends.id")
    table.string("keyword")
    table.bigint('created_at')
    table.bigint('updated_at')

  }),
  knex.schema.createTable('trend_tickers', function(table){
    table.increments('id').primary()
    table.integer().references("trends.id")
    table.string("ticker")
    table.bigint('created_at')
    table.bigint('updated_at')
  }),
  knex.schema.createTable('keyword_tweets', function(table){
    table.increments('id').primary()
    table.integer().references("twitter_keywords.id")
    table.json("raw_tweet")
    table.bigint('created_at')
    table.bigint('updated_at')

  })

])}
exports.down = function(knex, Promise) {}