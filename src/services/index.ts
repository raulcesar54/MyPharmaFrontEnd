import { create } from 'apisauce'
import { parseCookies } from 'nookies'

const { 'auth:token': tokenFronHeader } = parseCookies()
export const api = create({
  baseURL: 'http://localhost:8080',
})
if (tokenFronHeader) {
  const { data } = JSON.parse(tokenFronHeader)
  api.setHeader('Authorization', `Bearer ${data.token}`)
}
