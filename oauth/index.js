const github = require('./github')

module.exports = fastify => {
  github(fastify)
}