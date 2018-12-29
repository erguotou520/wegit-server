const githubApi = require('../apis/github')

const newUserSchema = {
  body: {
    type: 'object',
    properties: {
      provider: { type: 'string' },
      code: { type: 'string' }
    },
    required: ['provider', 'code']
  }
}

module.exports = function register (fastify) {
  // 
  fastify.post('/app/login', { schema: newUserSchema }, async (request, reply) => {
    if (request.body.provider === 'github') {
      githubApi.setToken(request.body.access_token)
      const me = await githubApi.getMe()
      reply.send({ me })
    } else {
      reply.send({ ok: 'ok' })
    }
  })
}