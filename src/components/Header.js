import React, { useState } from 'react'
import { Header } from 'react-native-elements';
import { DrawerActions } from '@react-navigation/native';

import firebase from 'firebase/app'

function CustomHeader({navigation}){
    return (
        <Header 
            //containerStyle={{backgroundColor:'darkslategrey',width: '100%', borderBottomWidth: 5, marginBottom:'10px' }}
            leftComponent={{ icon: 'menu', color: '#fff', underlayColor: '#3488C0', onPress: () => navigation.dispatch(DrawerActions.openDrawer())}}
            centerComponent={{ 
                text: 'TheVeganCommunity', 
                style: { color: '#fff', fontWeight: 'bold', fontSize: 20},
                onPress: () => navigation.navigate('Home')
            }}
            rightComponent={{
                icon: 'sign-out-alt',
                type: 'font-awesome-5',
                color: '#fff',
                onPress: () => firebase.auth().signOut()
                .then(() => console.log('User signed out!'))
            }}
        />
    )
}

export default CustomHeader