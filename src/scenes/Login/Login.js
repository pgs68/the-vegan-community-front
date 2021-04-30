//Utilities
import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { useFocusEffect } from '@react-navigation/native';

//Library components
import { View, ScrollView } from 'react-native';
import { Card, Button } from 'react-native-elements'

//Own components
import Header from '../../components/Header'
import CustomInput from '../../components/FormComponents/CustomInput'
import ErrorMessage from '../../components/ErrorMessage'
import styles from '../../styles/commonStyles'

//Actions and functions
import { login } from '../../common/utilities/firebaseFunctions'
import { setUserInformation } from '../../actions/user'


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

    useFocusEffect(
        React.useCallback(() => {
            //ComponentWillMount
            return () => {
                //ComponentWillUnmount
                setError(null)
                setUser({
                    email: '',
                    password: ''
                })
            }
        }, [])
    )

    useEffect(() => {
         if(userLogged){
            navigation.navigate('Home')
         }  
    }, [])

    return (
        <View style={{flex: 1}}>
            <Header navigation={navigation} />
            <ScrollView>
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
                                    login(user, navigation, setError, setUserInformation)
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
            </ScrollView>
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