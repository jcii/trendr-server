module.exports = {
  '/test': require('./API/rootRoute'),
  '/cole': require('./API/coleRoute'),
  '/realtimeStocks': require('./API/realtimeStocks'),
  '/register': require('./API/registerRoute'),
  '/stockSymbol': require('./API/stockSymbolRoute'),
  '/twitterSearch': require('./API/twitterSearchRoute'),
  '/twitterStream': require('./API/twitterStreamRoute'),
  '/user': require('./API/userRoute'),
  '/trend': require('./API/trendRoute'),
  '/login': require('./API/loginRoute')
}