const fastify = require('fastify')()
const config = require('./config')
const routes = require('./routes')
const socket = require('./socket')
const oauth = require('./oauth')
const middlewares = require('./middlewares')

// redis
fastify.register(require('fastify-redis'), config.redis)

// register middleware
middlewares(fastify)

// register oauth
oauth(fastify)

// register routes
routes(fastify)

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