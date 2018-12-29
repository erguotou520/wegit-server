const fastify = require('fastify')({
  logger: true
})
const routes = require('./routes')
const oauthList = require('./oauth')

// register oauth
Object.keys(oauthList).forEach(key => {
  oauthList[key](fastify)
})

// register routes
Object.keys(routes).forEach(key => {
  routes[key](fastify)
})

const start = async () => {
  try {
    await fastify.listen(3001)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()