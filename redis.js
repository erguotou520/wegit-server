const redis = require('redis')
const config = require('./config')

module.exports = new Promise((resolve, reject) => {
  const client = redis.createClient(config.redis)
  client.on('error', reject)
  client.on('connect', () => resolve(client))
})
