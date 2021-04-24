import Api from '../../common/utilities/api'
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/storage'

const baseUrl = 'http://localhost:5000/the-vegan-community-api/us-central1/app/api'
const urlOFF = 'https://world.openfoodfacts.org/api/v0/product/'

const apiBack = token =>
    new Api({
        baseUrl: baseUrl,
        defaultOptions: { headers: { Authorization: `Bearer ${token}` } }
    })

const apiOFF = () =>
    new Api({
        baseUrl: urlOFF,
        defaultOptions: {  }
    })

const TypeActionsCrud = {
    CREATE_PRODUCT: 'CREATE_PRODUCT',
    FETCH_PRODUCTS: 'FETCH_PRODUCTS',
    CHANGE_PRODUCT_INFO: 'CHANGE_PRODUCT_INFO',
    FETCH_PHOTO_PRODUCTS: 'FETCH_PHOTO_PRODUCTS',
    FETCH_SUPERMARKETS: 'FETCH_SUPERMARKETS',
    SET_FILTERS: 'SET_FILTERS',
    CLEAN_FILTERS: 'CLEAN_FILTERS',
    FETCH_PRODUCT_BY_CODEBAR: 'FETCH_PRODUCT_BY_CODEBAR',
    GET_COMENTARIOS_FROM_PRODUCTO: 'GET_COMENTARIOS_FROM_PRODUCTO',
    POST_COMENTARIO_IN_PRODUCTO: 'POST_COMENTARIO_IN_PRODUCTO',
    SET_REPORTED_PRODUCT: 'SET_REPORTED_PRODUCT',
    SET_REPORTED_COMMENT: 'SET_REPORTED_COMMENT',
    CLEAN_REPORTED_OBJECT: 'CLEAN_REPORTED_OBJECT'
}

const transformProductObject = (producto, currentUser) => {
    const precio = (Math.round(Number(producto.precio) * 100) / 100).toFixed(2)
    return {
        codebar: producto.codigoBarras,
        nombre: producto.nombre,
        supermercados: producto.supermercado,
        fotoPrincipal: producto.fotoGeneral,
        precio: Number(precio), 
        valoracion: 5,
        vegano: producto.vegano,
        vegetariano: producto.vegetariano,
        alergenos: [],
        fechaPublicacion: firebase.firestore.Timestamp.fromDate(new Date()),
        vecesVisto: 0,
        detalles: {
            fotoIngredientes: producto.fotoIngredientes,
            autor: currentUser.nombreUsuario,
            imagenAutor: currentUser.imagenUsuario
        }
    }
}

const createProduct = (producto, usuario) => ({
    type: TypeActionsCrud.CREATE_PRODUCT,
    payload: firebase.firestore().collection("productos").doc(producto.codigoBarras).set(transformProductObject(producto, usuario))
})

const fetchProducts = (filtros) => {
    var query = firebase.firestore().collection("productos")
    if(filtros.supermercado !== ''){
        query = query.where("supermercados", "array-contains", filtros.supermercado)
    }
    return {
        type: TypeActionsCrud.FETCH_PRODUCTS,
        payload: query.get()
    }
}

const fetchPhotoProduct = (id, photoName) => ({
    type: TypeActionsCrud.FETCH_PHOTO_PRODUCTS,
    payload: firebase.storage().ref().child('productos/' + photoName).getDownloadURL()
})

const fetchSupermarkets = () => ({
    type: TypeActionsCrud.FETCH_SUPERMARKETS,
    payload: firebase.firestore().collection("supermercados").get()
})

const setFilters = (filters) => ({
    type: TypeActionsCrud.SET_FILTERS,
    payload: {
        filters
    }
})

const cleanFilters = () => ({
    type: TypeActionsCrud.CLEAN_FILTERS,
})

const fetchProductByCodebar = (codebar) => ({
    type: TypeActionsCrud.FETCH_PRODUCT_BY_CODEBAR,
    payload: firebase.firestore().collection("productos").doc(codebar).get()
})

const getComentariosFromProducto = (codebar) => ({
    type: TypeActionsCrud.GET_COMENTARIOS_FROM_PRODUCTO,
    payload: firebase.firestore().collection("productos/" + codebar + "/comentarios")
                .orderBy('fecha', 'desc').get()
})

const postComentarioInProducto = (codebar, comentario, usuario) => ({
    type: TypeActionsCrud.POST_COMENTARIO_IN_PRODUCTO,
    payload: firebase.firestore().collection("productos/" + codebar + "/comentarios")
                .add({
                    autor: usuario.nombreUsuario,
                    imagenAutor: usuario.imagenUsuario,
                    fecha: firebase.firestore.Timestamp.fromDate(new Date()),
                    texto: comentario
                })
})

const setReportedProduct = (product) => ({
    type: TypeActionsCrud.SET_REPORTED_PRODUCT,
    payload: {
        product
    }
})

const setReportedComment = (comment) => ({
    type: TypeActionsCrud.SET_REPORTED_COMMENT,
    payload: {
        comment
    }
})

const cleanReportedObject = () => ({
    type: TypeActionsCrud.CLEAN_REPORTED_OBJECT
})

export {
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
}