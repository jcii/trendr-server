module.exports = {
  development: {
    client:'pg',
    connection: 'postgres://localhost/backend'
  },
  production:{
    client:'pg',
    connection: process.env.DATABASE_URL
  }
}