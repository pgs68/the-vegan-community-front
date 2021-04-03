import firebase from 'firebase/app'
import 'firebase/firestore'

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
    console.log('UID: ', uid)
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

export { login, logout, register, getCurrentUser, getUserInformation }