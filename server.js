const fastify = require('fastify')()
const config = require('./config')
const routes = require('./routes')
const socket = require('./socket')
const oauthList = require('./oauth')
const middleware = require('./middleware')

// redis
fastify.register(require('fastify-redis'), config.redis)

// register middleware
Object.keys(middleware).forEach(key => {
  middleware[key](fastify)
})

// register oauth
Object.keys(oauthList).forEach(key => {
  oauthList[key](fastify)
})

// register routes
Object.keys(routes).forEach(key => {
  routes[key](fastify)
})

// socket.io
socket(fastify.server)

// fastify.addSchema({
//   $id: 'authHeader',
//   type: 'object',
//   properties: {
//     Authorization: { type: 'string', pattern: '/^token /' },
//     Provider: { type: 'string', enum: ['github'] }
//   },
//   required: ['Authorization', 'Provider']
// })

fastify.setNotFoundHandler((request, reply) => {
  console.log(request.req.url)
  reply.send(404)
})

const start = async () => {
  try {
    await fastify.listen(config.server.listenPort, config.server.listenHost)
    console.log(config.server.host)
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}
start()