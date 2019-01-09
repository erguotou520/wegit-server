const githubApi = require('../apis/github')
const utils = require('../utils')

module.exports = function register (fastify) {
  fastify.get('/me',
    async (request, reply) => {
    if (request.body.provider === 'github') {
      const me = await githubApi.getMe(utils.getAccessTokenFromRequest(request))
      reply.send({ me })
    } else {
      reply.send({ ok: 'ok' })
    }
  })
}