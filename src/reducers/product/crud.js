import { Actions } from '../../actions/product'
import { fullfilled, rejected, pending } from '../utils'

const createProductFullFilled = (state, { payload }) => ({
    ...state
})

const createProductRejected = state => ({
    ...state
})

const fetchProductsFullFilled = (state, { payload }) =>  {
    console.log('Hola?')
    console.log(payload)
    return {
    ...state,
    productos: payload
    }
}

const fetchProductsRejected = state => ({
    ...state
})

const changeProductFormInfo = (state, { payload }) => {
    state.product[payload.id] = payload.value
    return {...state}
}

const Crud = {
    [fullfilled(Actions.CREATE_PRODUCT)]: createProductFullFilled,
    [rejected(Actions.CREATE_PRODUCT)]: createProductRejected,
    [fullfilled(Actions.FETCH_PRODUCTS)]: fetchProductsFullFilled,
    [rejected(Actions.FETCH_PRODUCTS)]: fetchProductsRejected,
    [Actions.CHANGE_PRODUCT_INFO]: changeProductFormInfo
}

export default Crud