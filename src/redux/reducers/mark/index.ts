import { HYDRATE } from 'next-redux-wrapper'
import { MARK } from 'redux/actions'

const initialState = {
  name: '',
}
const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case HYDRATE:
      return { ...state, ...action.payload.mark }
    case MARK:
      const newState = { ...state, ...action.payload }
      return newState
    default:
      return state
  }
}

export default reducer
