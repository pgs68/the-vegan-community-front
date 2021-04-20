import Crud from './crud'
import { initialFilters } from './utils'

const initialState = {
    producto: {
        nombre: '',
        precio: '',
        codebar: '',
        vegano: false,
        detalles: {},
        supermercados: []
    },
    productos: [],
    productosIsLoading: false,
    error: false,
    supermercados: [],
    notification: {
        show: false,
        message: ''
    },
    filtros: initialFilters,
    productFromOFF: {
        loading: false,
        status: -1,
        product_name_es: '',
        product_name: '',
        image_front_url: '',
        ingredients: [],
        vegano: null
    }
}

const Managers = {
    ...Crud
}

export default (state = initialState, action = { type: '' }) => {
    const finded = Managers[action.type]
    return finded ? finded(state, action) : { ...state }
  }