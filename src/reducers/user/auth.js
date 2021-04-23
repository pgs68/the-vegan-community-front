import { Actions } from '../../actions/user'
import { fullfilled, rejected, pending } from '../utils'

const isLoggedInChange = (state, { payload }) => {
    if(payload.value){
        return {
            ...state,
            isLoggedIn: payload.value
        }
    } else {
        return {
            ...state,
            isLoggedIn: payload.value,
            currentUser: {}
        }
    }
    
}

const setUserInformationFullFilled = (state, { payload }) => {
    if(payload.docs.length){
        const user = payload.docs[0].data()
        return {
            ...state,
            currentUser: user
        }
    } else {
        return {
            ...state,
            error: true
        }
    }
}

const setUserInformationRejected = (state, { payload }) => ({
    ...state,
    currentUser: {},
    error: payload
})

const Auth = {
    [Actions.IS_LOGGED_IN_CHANGE]: isLoggedInChange,
    [fullfilled(Actions.SET_USER_INFORMATION)]: setUserInformationFullFilled,
    [rejected(Actions.SET_USER_INFORMATION)]: setUserInformationRejected
}

export default Auth