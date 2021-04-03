import Auth from './auth'

const initialState = {
    isLoggedIn: false,
    currentUser: {},
    error: false
}

const Managers = {
    ...Auth
}

export default (state = initialState, action = { type: '' }) => {
    const finded = Managers[action.type]
    return finded ? finded(state, action) : { ...state }
  }