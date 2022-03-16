import { create } from 'apisauce'
import { parseCookies } from 'nookies'

const { 'auth:token': tokenFronHeader } = parseCookies()
export const api = create({
  baseURL: 'http://localhost:5421',
})
if (tokenFronHeader) {
  const { data } = JSON.parse(tokenFronHeader)
  api.setHeader('Authorization', `Bearer ${data.token}`)
}
