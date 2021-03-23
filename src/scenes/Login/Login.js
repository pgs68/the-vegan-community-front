import React, { useState } from 'react'
import { View } from 'react-native';

import Header from '../../components/Header'
import CustomInput from '../../components/FormComponents/CustomInput'
import { Card, Button } from 'react-native-elements'

import styles from '../../styles/commonStyles'

import firebase from 'firebase/app'

const Login = ({navigation}) => {

    const [user, setUser] = useState({
        email: '',
        password: ''
    });

    const logIn = () => {
        firebase.auth()
            .signInWithEmailAndPassword(user.email, user.password)
            .then((e) => {
                console.log(e)
                console.log('User signed in!');
            })
            .catch(error => {
                /*
                if (error.code === 'auth/email-already-in-use') {
                console.log('That email address is already in use!');
                }

                if (error.code === 'auth/invalid-email') {
                console.log('That email address is invalid!');
                }*/

                console.error(error);
            });
    }

    const changeUserInfo = (id, value) => {
        setUser({
            ...user,
            [id]: value
        })
    }

    return (
        <View>
            <Header navigation={navigation} />
            <View style={styles.body}>
                <Card containerStyle={styles.mainCard}>
                    <Card.Title>Iniciar sesión</Card.Title>
                    <Card.Divider/>
                        <CustomInput
                            id={'email'} 
                            placeholder={'Correo electrónico'}
                            onChange={changeUserInfo}
                        />
                        <CustomInput
                            id={'password'} 
                            placeholder={'Contraseña'}
                            isPasswordInput={true}
                            onChange={changeUserInfo}
                        />
                        <Button 
                            title='Iniciar sesión'
                            type='outline'
                            onPress={() =>logIn()} 
                        />
                        <Button 
                            title='Registrarse'
                            type='clear'
                            titleStyle={styles.secondaryButtonTitle}
                            onPress={() => navigation.navigate('Register')}
                        />
                </Card>
            </View>
        </View>
    )
}

export default Login;