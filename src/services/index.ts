import { create } from 'apisauce'
import { parseCookies } from 'nookies'

const { 'auth:token': token } = parseCookies()
export const api = create({
  baseURL: 'http://localhost:8080',
})
if (token) {
  const { token: tokenHash } = JSON.parse(token)
  api.headers['Authorization'] = `Bearer ${tokenHash}`
}
