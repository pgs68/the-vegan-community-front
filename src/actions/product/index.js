import {
    TypeActionsCrud,
    createProduct,
    fetchProducts,
    changeProductFormInfo,
    fetchPhotoProduct,
    fetchSupermarkets
} from './crud'

const Actions = {
    ...TypeActionsCrud
}

export {
    Actions,
    createProduct,
    fetchProducts,
    changeProductFormInfo,
    fetchPhotoProduct,
    fetchSupermarkets
}