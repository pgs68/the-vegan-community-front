import {
    TypeActionsCrud,
    createProduct,
    fetchProducts,
    fetchPhotoProduct,
    fetchSupermarkets,
    setFilters,
    cleanFilters,
    fetchProductByCodebar,
    getComentariosFromProducto,
    postComentarioInProducto
} from './crud'

const Actions = {
    ...TypeActionsCrud
}

export {
    Actions,
    createProduct,
    fetchProducts,
    fetchPhotoProduct,
    fetchSupermarkets,
    setFilters,
    cleanFilters,
    fetchProductByCodebar,
    getComentariosFromProducto,
    postComentarioInProducto
}