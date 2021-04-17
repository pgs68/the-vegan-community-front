import {
    TypeActionsCrud,
    createProduct,
    fetchProducts,
    changeProductFormInfo,
    fetchPhotoProduct,
    fetchSupermarkets,
    setFilters,
    cleanFilters
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
    setFilters,
    cleanFilters
}