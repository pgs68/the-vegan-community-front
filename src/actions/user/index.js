import {
    TypeActionsAuth,
    isLoggedInChange,
    setUserInformation
} from './auth'

const Actions = {
    ...TypeActionsAuth
}

export {
    Actions,
    isLoggedInChange,
    setUserInformation
}