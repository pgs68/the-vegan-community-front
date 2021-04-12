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
    FETCH_PHOTO_PRODUCTS: 'FETCH_PHOTO_PRODUCTS'
}

const createProduct = (product) => ({
    type: TypeActionsCrud.CREATE_PRODUCT,
    payload: api().post('/productos')
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

export {
    TypeActionsCrud,
    createProduct,
    fetchProducts,
    changeProductFormInfo,
    fetchPhotoProduct
}