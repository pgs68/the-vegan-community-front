import {
    TypeActionsCrud,
    createProduct,
    fetchProducts,
    changeProductFormInfo,
    fetchPhotoProduct,
    fetchSupermarkets,
    postPhotoProduct
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
    fetchSupermarkets,
    postPhotoProduct
}