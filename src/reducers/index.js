import { combineReducers } from 'redux'

import product from './product'
import user from './user'

const theVeganCommunityReducer = combineReducers({
    product,
    user
})

export default theVeganCommunityReducer