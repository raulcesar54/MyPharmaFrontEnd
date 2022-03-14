import { HYDRATE } from 'next-redux-wrapper'
import { USER_LOGIN } from 'redux/actions'

const initialState = {
  email: '',
  password: '',
}

const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case HYDRATE:
      return { ...state, ...action.payload.user }
    case USER_LOGIN:
      const newState = { ...state, ...action.payload }
      return newState
    default:
      return state
  }
}

export default reducer
