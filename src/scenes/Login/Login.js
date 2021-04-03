import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { View } from 'react-native';

import Header from '../../components/Header'
import CustomInput from '../../components/FormComponents/CustomInput'
import ErrorMessage from '../../components/ErrorMessage'
import { login } from '../../common/utilities/firebaseFunctions'
import { Card, Button } from 'react-native-elements'
import { setUserInformation } from '../../actions/user'

import styles from '../../styles/commonStyles'


const Login = ({
    navigation,
    userLogged,
    setUserInformation
}) => {

    const [user, setUser] = useState({
        email: '',
        password: ''
    });  

    const [error, setError] = useState(null)

    useEffect(() => {
         if(userLogged){
            navigation.navigate('Home')
         }  
    }, [])

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
                            onPress={() =>{
                                login(user, navigation, setError)
                                setUserInformation('TngQoo9FLbh5BvVSPhocoil2APH2')
                            }}
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

const mapStateToProps = state => ({
    userLogged: state.user.isLoggedIn
})

const mapDispatchToProps = {
    setUserInformation
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)