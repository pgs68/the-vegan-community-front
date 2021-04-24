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
    postComentarioInProducto,
    setReportedProduct,
    setReportedComment,
    cleanReportedObject
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
    postComentarioInProducto,
    setReportedProduct,
    setReportedComment,
    cleanReportedObject
}