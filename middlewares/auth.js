const { getUser } = require('../apis/github')

module.exports = function (fastify) {
  fastify.use(async (req, res, next) => {
    if (!/^(\/api)/.test(req.url)) {
      next()
    } else {
      let { authorization, provider } = req.headers
      if (authorization && provider) {
        if (authorization.startsWith('token ')) {
          authorization = authorization.substr(6)
          try {
            const user = await fastify.redis.hgetall(`token_${authorization}`)
            if (user) {
              req.user = user
              next()
            } else {
              const user = await getUser(authorization)
              const _user = {
                id: user.id,
                name: user.name,
                avatar: user.avatar_url,
                email: user.email,
                createdAt: user.created_at
              }
              await fastify.redis.hmset(`token_${authorization}`, _user)
              next()
            }
          } catch (error) {
            next(error)
          }
        } else {
          next(new Error(400))
        }
      } else {
        next(new Error(404))
      }
    }
  })
}