const fastify = require('fastify')()
const config = require('./config')
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

fastify.addSchema({
  $id: 'authHeader',
  type: 'object',
  properties: {
    Authorization: { type: 'string', pattern: '/^token /' },
    Provider: { type: 'string', enum: ['github'] }
  },
  required: ['Authorization', 'Provider']
})

fastify.setNotFoundHandler((request, reply) => {
  console.log(request.req.url)
  reply.send(404)
})

const start = async () => {
  try {
    await fastify.listen(config.server.listenPort, config.server.listenHost)
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}
start()