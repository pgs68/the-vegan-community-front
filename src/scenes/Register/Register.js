//Utilities
import React, { useState } from 'react'
import { connect } from 'react-redux'
import { useFocusEffect } from '@react-navigation/native';

//Library components
import { Text, View, ScrollView } from 'react-native';
import { Card, Button } from 'react-native-elements'

//Own components
import Header from '../../components/Header'
import CustomInput from '../../components/FormComponents/CustomInput'
import ErrorMessage from '../../components/ErrorMessage'
import styles from '../../styles/commonStyles'

//Actions and functions
import { register } from '../../common/utilities/firebaseFunctions'
import { setUserInformation } from '../../actions/user'


const Register = ({
    navigation,
    setUserInformation
}) => {

    const [user, setUser] = useState({
        email: '',
        password: '',
        userName: '',
        name: '',
        repeatPassword: ''
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
                    password: '',
                    userName: '',
                    name: '',
                    repeatPassword: ''
                })
            }
        }, [])
    )

    return (
        <View style={{flex: 1}}>
            <Header navigation={navigation} />
            <ScrollView>
                <View style={styles.body}>
                    <Card containerStyle={styles.mainCard}>
                        <Card.Title>Registrarse</Card.Title>
                        <Card.Divider/>
                            <CustomInput
                                id={'userName'}
                                changeFunction={setUser}
                                formObject={user}
                                placeholder={'Nombre de usuario'}
                            />
                            <CustomInput
                                id={'name'}
                                changeFunction={setUser}
                                formObject={user} 
                                placeholder={'Nombre completo'}
                            />
                            <CustomInput
                                id={'email'}
                                changeFunction={setUser}
                                formObject={user} 
                                placeholder={'Correo electr??nico'}
                            />
                            <CustomInput
                                id={'password'}
                                changeFunction={setUser}
                                formObject={user} 
                                placeholder={'Contrase??a'}
                                isPasswordInput={true}
                            />
                            <CustomInput
                                id={'repeatPassword'}
                                changeFunction={setUser}
                                formObject={user} 
                                placeholder={'Repetir contrase??a'}
                                isPasswordInput={true}
                            />
                            {
                                error && 
                                <ErrorMessage message={error.message} />
                            }
                            <Button 
                                title='Registrarse'
                                type='outline'
                                onPress={() =>register(user, navigation, setError, setUserInformation)}
                                disabled={
                                    user.email === '' || 
                                    user.password === '' ||
                                    user.name === '' ||
                                    user.userName === '' ||
                                    user.repeatPassword === ''
                                }   
                            />
                            <Button 
                                title='Iniciar sesi??n'
                                type='clear'
                                titleStyle={styles.secondaryButtonTitle}
                                onPress={() => navigation.navigate('Login')}
                            />
                    </Card>
                </View>
            </ScrollView>
        </View>
    )
}

const mapStateToProps = state => ({
})

const mapDispatchToProps = {
    setUserInformation
}

export default connect(mapStateToProps, mapDispatchToProps)(Register)

export { Register };