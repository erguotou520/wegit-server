module.exports = {
  getAccessTokenFromRequest (request) {
    return request.headers.Authorization.substring(5)
  }
}