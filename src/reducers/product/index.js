import Crud from './crud'

const initialState = {
    producto: {
        nombre: '',
        precio: '',
        codebar: '',
        vegano: false
    },
    productos: []
}

const Managers = {
    ...Crud
}

export default (state = initialState, action = { type: '' }) => {
    const finded = Managers[action.type]
    return finded ? finded(state, action) : { ...state }
  }