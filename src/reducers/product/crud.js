import { Actions } from '../../actions/product'
import { fullfilled, rejected, pending } from '../utils'
import { initialFilters } from './utils'

const createProductFullFilled = (state, { payload }) => {
    console.log(payload)
    return {
        ...state,
        notification: {
            show: true,
            message: 'Producto creado correctamente'
        }
    }
}

const createProductRejected = state => ({
    ...state
})

const fetchProductosPending = (state) => {
    return {
        ...state,
        productosIsLoading: true
    }
}

const fetchProductsFullFilled = (state, { payload }) =>  {
    var productos = []
    if(payload.docs.length){
        payload.docs.forEach((doc) => {
            var producto = doc.data()
            productos.push(producto)
        })
        return {
            ...state,
            productos: productos,
            productosIsLoading: false
        }
    } else {
        return {
            ...state,
            error: payload,
            productosIsLoading: false
        }
    }
}

const fetchProductsRejected = state => ({
    ...state,
    productosIsLoading: false
})


const fetchPhotoProductFullFilled = (state, {payload}) => {
    var productos = state.productos
    productos[0].fotoPrincipal = payload
    return {
        ...state,
        productos: productos
    }
}

const fetchPhotoProductRejected = (state, {payload}) => {
    var productos = state.productos
    productos[payload.id].fotoPrincipal = ''
    return {
        ...state,
        productos: productos
    }
}

const fetchSupermarketsFullfilled = (state, {payload}) => {
    var supermercados = []
    if(payload.docs.length){
        payload.docs.forEach((doc) => {
            var supermercado = doc.data()
            supermercados.push(supermercado)
        })
        return {
            ...state,
            supermercados: supermercados
        }
    } else {
        return {
            ...state,
            error: payload
        }
    }
}

const fetchSupermarketsRejected = (state, {payload}) => ({
    ...state,
    error: payload
})

const setFilters = (state, {payload}) => ({
    ...state,
    filtros: payload.filters
})

const cleanFilters = (state) => ({
    ...state,
    filtros: initialFilters
})

const fetchProductByCodebarFullFilled = (state, {payload}) => {
    return {
        ...state,
        producto: payload.data()
    }
}

const fetchProductByCodebarRejected = (state, {payload}) => ({
    ...state,
    error: payload
})


const Crud = {
    [fullfilled(Actions.CREATE_PRODUCT)]: createProductFullFilled,
    [rejected(Actions.CREATE_PRODUCT)]: createProductRejected,
    [pending(Actions.FETCH_PRODUCTS)]: fetchProductosPending,
    [fullfilled(Actions.FETCH_PRODUCTS)]: fetchProductsFullFilled,
    [rejected(Actions.FETCH_PRODUCTS)]: fetchProductsRejected,
    [fullfilled(Actions.FETCH_PHOTO_PRODUCTS)]: fetchPhotoProductFullFilled,
    [rejected(Actions.FETCH_PHOTO_PRODUCTS)]: fetchPhotoProductRejected,
    [fullfilled(Actions.FETCH_SUPERMARKETS)]: fetchSupermarketsFullfilled,
    [rejected(Actions.FETCH_SUPERMARKETS)]: fetchSupermarketsRejected,
    [Actions.SET_FILTERS]: setFilters,
    [Actions.CLEAN_FILTERS]: cleanFilters,
    [fullfilled(Actions.FETCH_PRODUCT_BY_CODEBAR)]: fetchProductByCodebarFullFilled,
    [rejected(Actions.FETCH_PRODUCT_BY_CODEBAR)]: fetchProductByCodebarRejected
}

export default Crud