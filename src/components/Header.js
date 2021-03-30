import React, { useState } from 'react'
import { Header } from 'react-native-elements';
import { DrawerActions } from '@react-navigation/native';
import { logout } from '../common/utilities/firebaseFunctions'

function CustomHeader({navigation}){
    return (
        <Header 
            //containerStyle={{backgroundColor:'darkslategrey',width: '100%', borderBottomWidth: 5, marginBottom:'10px' }}
            leftComponent={{ icon: 'menu', color: '#fff', underlayColor: '#3488C0', onPress: () => navigation.dispatch(DrawerActions.openDrawer())}}
            centerComponent={{ 
                text: 'ExampleApp', 
                style: { color: '#fff', fontWeight: 'bold', fontSize: 20},
                onPress: () => navigation.navigate('Home')
            }}
            rightComponent={{
                icon: 'sign-out-alt',
                type: 'font-awesome-5',
                color: '#fff',
                onPress: () => logout(navigation)
            }}
        />
    )
}

export default CustomHeader