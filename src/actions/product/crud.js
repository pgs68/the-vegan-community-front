import Api from '../../common/utilities/api'

const baseUrl = 'http://localhost:5000/the-vegan-community-api/us-central1/app/api'

const api = token =>
    new Api({
        baseUrl: baseUrl,
        defaultOptions: { headers: { Authorization: `Bearer ${token}` } }
    })

const TypeActionsCrud = {
    CREATE_PRODUCT: 'CREATE_PRODUCT',
    FETCH_PRODUCTS: 'FETCH_PRODUCTS',
    CHANGE_PRODUCT_INFO: 'CHANGE_PRODUCT_INFO'
}

const createProduct = (product) => ({
    type: TypeActionsCrud.CREATE_PRODUCT,
    payload: api().post('/productos')
})

const fetchProducts = () => ({
    type: TypeActionsCrud.FETCH_PRODUCTS,
    payload: api().get('/productos')
})

const changeProductFormInfo = (id, value) => ({
    type: TypeActionsCrud.CHANGE_PRODUCT_INFO,
    payload: {
        id,
        value
    }
})

export {
    TypeActionsCrud,
    createProduct,
    fetchProducts,
    changeProductFormInfo
}