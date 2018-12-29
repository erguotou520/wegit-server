const axios = require('axios')

const http = axios.create({
  baseURL: 'https://api.github.com',
  headers: { Accept: 'application/vnd.github.v3+json' }
})

// http.interceptors.response.use(async function (res) {
//   return { data: res.data,  }
// })

module.exports = {
  setToken (access_token) {
    http.defaults.headers = { ...http.defaults.headers, Authorization: `token ${access_token}` }
  },
  async getMe () {
    const res = await http.get('/user')
    return res.data
  }
}