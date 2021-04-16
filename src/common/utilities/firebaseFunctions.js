import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/storage'

const firebaseCodes = (code) => {
    switch(code){
        case 'auth/email-already-in-use':
            return 'El email ya está en uso'
        case 'auth/invalid-email':
            return 'El email no tiene un formato válido'
        case 'auth/user-not-found':
            return 'El usuario no existe'
        case 'auth/wrong-password':
            return 'Contraseña incorrecta'
        default:
            console.log(code)
            return 'Ha ocurrido un error'
    }
}

const getCurrentUser = () => {
    return firebase.auth().currentUser
}

const getUserInformation = (uid) => {
    firebase.firestore().collection("usuarios").where('UID', '==', uid).get()
        .then((snapshot) => {
            console.log(snapshot.docs)
        })
}


const login = (user, navigation, setError) => {
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
        .then(() => {
            firebase.auth()
                .signInWithEmailAndPassword(user.email, user.password)
                .then((e) => {
                    navigation.navigate('Home')
                })
                .catch(error => {
                    setError({message: firebaseCodes(error.code)})
                    console.error(error);
                });
        })
}

const logout = (navigation, changeLoggedIn) => {   
    firebase.auth()
        .signOut()
        .then(() => {
            changeLoggedIn(false)
            console.log('User signed out!')
            navigation.navigate('Login')
        })
}

const register = (user, navigation, setError) => {
    if(user.password !== user.repeatPassword){
        setError({message: 'Las contraseñas no coinciden'})
    } else {
        firebase.auth()
            .createUserWithEmailAndPassword(user.email, user.password)
            .then(() => {
                firebase.firestore()
                    .collection("usuarios")
                    .doc(user.userName)
                    .get()
                    .then((doc) => {
                        if(doc.exists){
                            setError({message: 'El nombre de usuario está en uso'})
                            var currentUser = firebase.auth().currentUser
                            currentUser.delete()
                        } else {
                            firebase.firestore().collection("usuarios").doc(user.userName).set({
                                "cantidadComentarios": 0,
                                "email": user.email,
                                "estado": "activa",
                                "fechaRegistro": firebase.firestore.Timestamp.fromDate(new Date()),
                                "imagenUsuario": "",
                                "nombreCompleto": user.name,
                                "nombreUsuario": user.userName
                            })
                            .then(() => {
                                console.log('User account created & signed in!');  
                                navigation.navigate('Home')
                            })
                            .catch(error => {
                                setError({message: firebaseCodes(error.code)})
                            })
                        }
                    })     
            })
            .catch(error => {
                setError({message: firebaseCodes(error.code)})
            });
    }
}

async function transformImageToBlob(uri) {
    const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function() {
          resolve(xhr.response);
        };
        xhr.onerror = function(e) {
          console.log(e);
          reject(new TypeError('Network request failed'));
        };
        xhr.responseType = 'blob';
        xhr.open('GET', uri, true);
        xhr.send(null);
      });
    return blob
}

async function subirImagenProductoFromUri(localUri){
    const blob = await transformImageToBlob(localUri)
    const formato = '.png'
    const nombreImagen = Date.now() + Math.random().toString(36).substring(3) + formato
    var downloadURL = ''
    await firebase.storage().ref('productos/' + nombreImagen)
        .put(blob)
        .then(async function(snapshot){
            await snapshot.ref.getDownloadURL().then(function(url){
                downloadURL = url
            })
        })
        .catch(error => {
            console.log('Error: ', error)
        })
    return downloadURL
}

async function subirImagenProductoFromBlob(nombreImagen, blob){
    let downloadURL = ''
    await firebase.storage().ref('productos/' + nombreImagen)
        .put(blob)
        .then(async function(snapshot){
            await snapshot.ref.getDownloadURL().then(function(url){
                downloadURL = url
            })
        })
        .catch(error => {
            console.log('Error: ', error)
        })
    console.log(downloadURL)
    return downloadURL
}

async function subirProducto(producto, usuario){
    /*
        fotoGeneral: null, 
        fotoIngredientes: null,  
        codigoBarras: '', 
        nombre: '',
        precio: '',
        supermercado: []
    */
    var docProduct = {
        nombre: producto.nombre,
        supermercados: producto.supermercado,
        fotoPrincipal: producto.fotoGeneral,
        precio: producto.precio,
        valoracion: 5,
        vegano: producto.vegano,
        vegetariano: producto.vegetariano,
        alergenos: [],
        fechaPublicacion: firebase.firestore.Timestamp.fromDate(new Date()),
        vecesVisto: 0,
        detalles: {
            fotoIngredientes: producto.fotoIngredientes
        }
    }
    await firebase.firestore().collection("productos")
        .doc(producto.codigoBarras)
        .set(docProduct)
        .then(() => {
            console.log("Document successfully written!");
        })
        .catch((error) => {
            console.log(error)
        })
}


export { 
    login, 
    logout, 
    register, 
    getCurrentUser, 
    getUserInformation, 
    subirImagenProductoFromUri, 
    transformImageToBlob, 
    subirImagenProductoFromBlob,
    subirProducto 
}