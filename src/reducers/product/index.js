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

}

export default (state = initialState, action = { type: '' }) => {
    const finded = Managers[action.type]
    return finded ? finded(state, action) : { ...state }
  }