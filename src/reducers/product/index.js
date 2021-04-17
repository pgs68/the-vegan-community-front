import Crud from './crud'

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
    }
}

const Managers = {
    ...Crud
}

export default (state = initialState, action = { type: '' }) => {
    const finded = Managers[action.type]
    return finded ? finded(state, action) : { ...state }
  }