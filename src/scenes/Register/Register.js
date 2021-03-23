import React, { useState } from 'react'
import { Text, View } from 'react-native';

import Header from '../../components/Header'
import CustomInput from '../../components/FormComponents/CustomInput'
import { Card, Button } from 'react-native-elements'

import styles from '../../styles/commonStyles'

import firebase from 'firebase/app'

const Register = ({navigation}) => {

    const [user, setUser] = useState({
        email: '',
        password: ''
    });

    const changeUserInfo = (id, value) => {
        setUser({
            ...user,
            [id]: value
        })
    }

    const register = () => {
        firebase.auth()
            .createUserWithEmailAndPassword(user.email, user.password)
            .then(() => {
                console.log('User account created & signed in!');
            })
            .catch(error => {
                
                if (error.code === 'auth/email-already-in-use') {
                console.log('That email address is already in use!');
                }

                if (error.code === 'auth/invalid-email') {
                console.log('That email address is invalid!');
                }

                console.error(error);
            });
    }

    return (
        <View>
            <Header navigation={navigation} />
            <View style={styles.body}>
                <Card containerStyle={styles.mainCard}>
                    <Card.Title>Registrarse</Card.Title>
                    <Card.Divider/>
                        <CustomInput 
                            placeholder={'Nombre de usuario'}
                        />
                        <CustomInput 
                            placeholder={'Nombre completo'}
                        />
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
                        <CustomInput 
                            placeholder={'Repetir contraseña'}
                            isPasswordInput={true}
                        />
                        <Button 
                            title='Registrarse'
                            type='outline'
                            onPress={() =>register()}  
                        />
                        <Button 
                            title='Iniciar sesión'
                            type='clear'
                            titleStyle={styles.secondaryButtonTitle}
                            onPress={() => navigation.navigate('Login')}
                        />
                </Card>
            </View>
        </View>
    )
}

export default Register;