const oauthPlugin = require('fastify-oauth2')
const config = require('../config')
const githubApi = require('../apis/github')

module.exports = function (fastify) {
  fastify.register(oauthPlugin, {
    name: 'github',
    scope: 'repo',
    credentials: {
      client: {
        id: config.github.clientId,
        secret: config.github.clientSecret
      },
      auth: oauthPlugin.GITHUB_CONFIGURATION
    },
    startRedirectPath: '/login/github',
    callbackUri: 'http://127.0.0.1:3001/auth/github/callback'
  })
  
  fastify.get('/auth/github/callback', async function (request, reply) {
    const result = await this.getAccessTokenFromAuthorizationCodeFlow(request)
    githubApi.setToken(result.access_token)
    const me = await githubApi.getMe()
    reply.send({ me })
  })
}