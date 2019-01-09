const axios = require('axios')

const http = axios.create({
  baseURL: 'https://api.github.com',
  headers: { Accept: 'application/vnd.github.v3+json' }
})

// http.interceptors.response.use(async function (res) {
//   return { data: res.data,  }
// })

module.exports = {
  async getUser (token) {
    const res = await http.get('/user', null, {
      headers: {
        Authorization: `token ${token}`
      }
    })
    return res.data
  }
}