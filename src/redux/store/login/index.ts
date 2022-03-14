import { USER_LOGIN } from 'redux/actions'
import { User } from './types'

export const userLogin = (user: User) => ({
  type: USER_LOGIN,
  payload: user,
})
