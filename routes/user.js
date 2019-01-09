module.exports = function register (fastify) {
  fastify.get('/user',
    async (req, reply) => {
      reply.send({ user: req.user })
    }
  )
}