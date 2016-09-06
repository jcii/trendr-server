module.exports = {
  development: {
    client:'pg',
    connection: 'postgres://localhost/trendr'
  },
  production:{
    client:'pg',
    connection: process.env.DATABASE_URL
  }
}