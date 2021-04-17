import Crud from './crud'
import { initialFilters } from './utils'

const initialState = {
    producto: {
        nombre: '',
        precio: '',
        codebar: '',
        vegano: false
    },
    productos: [],
    productosIsLoading: false,
    error: false,
    supermercados: [],
    notification: {
        show: false,
        message: ''
    },
    filtros: initialFilters
}

const Managers = {
    ...Crud
}

export default (state = initialState, action = { type: '' }) => {
    const finded = Managers[action.type]
    return finded ? finded(state, action) : { ...state }
  }