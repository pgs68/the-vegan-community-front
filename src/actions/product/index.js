import {
    TypeActionsCrud,
    createProduct,
    fetchProducts,
    changeProductFormInfo
} from './crud'

const Actions = {
    ...TypeActionsCrud
}

export {
    Actions,
    createProduct,
    fetchProducts,
    changeProductFormInfo
}