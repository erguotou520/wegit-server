const { getUser } = require('../apis/github')

module.exports = function (fastify) {
  fastify.use(async (req, res, next) => {
    if (req.url.startsWith('/login')) {
      next()
    } else {
      let { authorization, provider } = req.headers
      if (authorization && provider) {
        if (authorization.startsWith('token ')) {
          authorization = authorization.substr(6)
          try {
            if (await fastify.redis.getAsync(`token_${authorization}`)) {
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
              await fastify.redis.hmsetAsync(`token_${authorization}`, _user)
              next()
            }
          } catch (error) {
            next(error)
          }
        } else {
          next(new Error(400))
        }
        next()
      } else {
        next(new Error(404))
      }
    }
  })
}