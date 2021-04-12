import React, { useState } from 'react'
import { connect } from 'react-redux'
import { View } from 'react-native';
import { Header } from 'react-native-elements';
import { DrawerActions } from '@react-navigation/native';
import { logout } from '../common/utilities/firebaseFunctions'
import { isLoggedInChange } from '../actions/user'

function CustomHeader({
    navigation,
    userLogged,
    isLoggedInChange
}){
    return (
        <View>
            {userLogged ? 
                <Header 
                    //containerStyle={{backgroundColor:'darkslategrey',width: '100%', borderBottomWidth: 5, marginBottom:'10px' }}
                    leftComponent={{ icon: 'menu', color: '#fff', underlayColor: '#3488C0', onPress: () => navigation.dispatch(DrawerActions.openDrawer())}}
                    centerComponent={{ 
                        text: 'TheVeganCommunity', 
                        style: { color: '#fff', fontWeight: 'bold', fontSize: 20},
                        onPress: () => navigation.navigate('Home')
                    }}
                    rightComponent={{
                        icon: 'add',
                        type: 'material-icons',
                        color: '#fff',
                        onPress: () => navigation.navigate('AddProduct')
                    }}
                />
                :
                <Header 
                    //containerStyle={{backgroundColor:'darkslategrey',width: '100%', borderBottomWidth: 5, marginBottom:'10px' }}
                    leftComponent={{ icon: 'menu', color: '#fff', underlayColor: '#3488C0', onPress: () => navigation.dispatch(DrawerActions.openDrawer())}}
                    centerComponent={{ 
                        text: 'TheVeganCommunity', 
                        style: { color: '#fff', fontWeight: 'bold', fontSize: 20},
                        onPress: () => navigation.navigate('Home')
                    }}
                />
            }
            
        </View>
    )
}

const mapStateToProps = state => ({
    userLogged: state.user.isLoggedIn
})

const mapDispatchToProps = {
    isLoggedInChange
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomHeader)