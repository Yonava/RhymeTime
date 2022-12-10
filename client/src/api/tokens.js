import axios from 'axios'

export default class Tokens {
  static async generate(roomId, clientId) {
    try {
      const response = await axios({
        method: 'post',
        url: '/api/tokens/sign',
        data: { 
          clientId, 
          roomId 
        },
        timeout: 10000
      })

      return Promise.resolve(response.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }
  static async verify(token) {
    try {
      const response = await axios({
        method: 'get',
        url: `/api/tokens/verify/${token}`,
        timeout: 10000
      })

      if (response.data?.error) {
        throw response.data.error
      }

      return Promise.resolve(response.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }
}