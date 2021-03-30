import firebase from 'firebase/app'

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



const login = (user, navigation, setError) => {
    firebase.auth()
        .signInWithEmailAndPassword(user.email, user.password)
        .then((e) => {
            console.log(e)
            console.log('User signed in!');
            navigation.navigate('Home')
        })
        .catch(error => {
            setError({message: firebaseCodes(error.code)})
            console.error(error);
        });
}

const logout = (navigation) => {
    
    firebase.auth()
        .signOut()
        .then(() => {
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
                console.log('User account created & signed in!');
                navigation.navigate('Home')
            })
            .catch(error => {
                setError({message: firebaseCodes(error.code)})
            });
    }
}

export { login, logout, register }