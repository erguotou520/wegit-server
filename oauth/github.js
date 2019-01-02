const oauthPlugin = require('fastify-oauth2')
const config = require('../config')

const githubCallbackUrl = '/auth/github/callback'

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
    callbackUri: `${config.server.host}${githubCallbackUrl}`
  })
  
  fastify.get(githubCallbackUrl, async function (request, reply) {
    const result = await this.getAccessTokenFromAuthorizationCodeFlow(request)
    reply.redirect(`wegit://oauth?provider=github&token=${result.access_token}`)
  })
}