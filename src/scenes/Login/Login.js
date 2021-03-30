import React, { useState } from 'react'
import { View } from 'react-native';

import Header from '../../components/Header'
import CustomInput from '../../components/FormComponents/CustomInput'
import ErrorMessage from '../../components/ErrorMessage'
import { login } from '../../common/utilities/firebaseFunctions'
import { Card, Button } from 'react-native-elements'

import styles from '../../styles/commonStyles'


const Login = ({navigation}) => {

    const [user, setUser] = useState({
        email: '',
        password: ''
    });  

    const [error, setError] = useState(null)

    return (
        <View>
            <Header navigation={navigation} />
            <View style={styles.body}>
                <Card containerStyle={styles.mainCard}>
                    <Card.Title>Iniciar sesión</Card.Title>
                    <Card.Divider/>
                        <CustomInput
                            id={'email'}
                            changeFunction={setUser}
                            formObject={user} 
                            placeholder={'Correo electrónico'}
                        />
                        <CustomInput
                            id={'password'}
                            changeFunction={setUser}
                            formObject={user}  
                            placeholder={'Contraseña'}
                            isPasswordInput={true}
                        />
                        {
                            error && 
                            <ErrorMessage message={error.message} />
                        }
                        <Button 
                            title='Iniciar sesión'
                            type='outline'
                            onPress={() =>login(user, navigation, setError)}
                            disabled={user.email === '' || user.password === ''} 
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