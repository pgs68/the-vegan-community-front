import Api from '../../common/utilities/api'
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/storage'

const baseUrl = 'http://localhost:5000/the-vegan-community-api/us-central1/app/api'

const api = token =>
    new Api({
        baseUrl: baseUrl,
        defaultOptions: { headers: { Authorization: `Bearer ${token}` } }
    })

const TypeActionsCrud = {
    CREATE_PRODUCT: 'CREATE_PRODUCT',
    FETCH_PRODUCTS: 'FETCH_PRODUCTS',
    CHANGE_PRODUCT_INFO: 'CHANGE_PRODUCT_INFO',
    FETCH_PHOTO_PRODUCTS: 'FETCH_PHOTO_PRODUCTS',
    FETCH_SUPERMARKETS: 'FETCH_SUPERMARKETS'
}

const transformProductObject = (producto, currentUser) => {
    const precio = (Math.round(Number(producto.precio) * 100) / 100).toFixed(2)
    return {
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

const fetchProducts = () => ({
    type: TypeActionsCrud.FETCH_PRODUCTS,
    payload: firebase.firestore().collection("productos").get()
})

const changeProductFormInfo = (id, value) => ({
    type: TypeActionsCrud.CHANGE_PRODUCT_INFO,
    payload: {
        id,
        value
    }
})

const fetchPhotoProduct = (id, photoName) => ({
    type: TypeActionsCrud.FETCH_PHOTO_PRODUCTS,
    payload: firebase.storage().ref().child('productos/' + photoName).getDownloadURL()
})

const fetchSupermarkets = () => ({
    type: TypeActionsCrud.FETCH_SUPERMARKETS,
    payload: firebase.firestore().collection("supermercados").get()
})


export {
    TypeActionsCrud,
    createProduct,
    fetchProducts,
    changeProductFormInfo,
    fetchPhotoProduct,
    fetchSupermarkets
}