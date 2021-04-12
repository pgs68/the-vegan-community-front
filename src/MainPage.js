import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import {
    DrawerContentScrollView,
    DrawerItem, 
    createDrawerNavigator 
} from '@react-navigation/drawer';

import Home from './scenes/Home'
import Login from './scenes/Login'
import Register from './scenes/Register'
import IsVegan from './scenes/IsVegan'
import AddProduct from './scenes/AddProduct'
import { Icon } from 'react-native-elements';

import { isLoggedInChange, setUserInformation } from './actions/user'
import { fetchProducts } from './actions/product'
import { logout } from './common/utilities/firebaseFunctions'

const Drawer = createDrawerNavigator();

function SideMenu({props, userLogged}){
    return (
        <DrawerContentScrollView {...props}>
            {!userLogged && 
                <DrawerItem  
                    label="Iniciar sesión"
                    icon={() => <Icon name='user-circle' type='font-awesome-5'/>}
                    onPress={() => props.navigation.navigate('Login')}
                />
            }         
            <DrawerItem  
                label="Productos"
                icon={() => <Icon name='shopping-bag' type='font-awesome-5'/>}
                onPress={() => props.navigation.navigate('Home')}
            />
            <DrawerItem  
                label="¿Es vegano?"
                icon={() => <Icon name='carrot' type='font-awesome-5'/>}
                onPress={() => props.navigation.navigate('IsVegan')}
            />
            {userLogged &&
                <DrawerItem 
                    label="Cerrar sesión"
                    icon={() => <Icon name='sign-out-alt' type='font-awesome-5'/>}
                    onPress={() => logout(props.navigation, isLoggedInChange)}
                />
            }
        </DrawerContentScrollView>
    )
}

const MainPage = ({
    firebase,
    userLogged,
    isLoggedInChange,
    setUserInformation,
    fetchProducts
}) => {
    
    useEffect(() => {
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                setUserInformation(firebase.auth().currentUser.uid)
                isLoggedInChange(true)
            } else {
                // No user is signed in.
                isLoggedInChange(false)
            }
          });    
    }, [userLogged])

    useEffect(() => {
        fetchProducts()
    }, [])

    return (
        <Drawer.Navigator initialRouteName={"Home"} drawerContent={props => <SideMenu props={props} userLogged={userLogged}/>}>
            {
                userLogged ? (
                    <>
                        <Drawer.Screen name="Home" component={Home}/>
                        <Drawer.Screen name="IsVegan" component={IsVegan} />
                        <Drawer.Screen name="AddProduct" component={AddProduct} />
                    </>
                ) : (
                    <>
                        <Drawer.Screen name="Home" component={Home}/>
                        <Drawer.Screen name="Login" component={Login} />
                        <Drawer.Screen name="Register" component={Register} />
                        <Drawer.Screen name="IsVegan" component={IsVegan} />
                    </>
                )
            }
        </Drawer.Navigator>
    );
}

const mapStateToProps = state => ({
    userLogged: state.user.isLoggedIn
})

const mapDispatchToProps = {
    isLoggedInChange,
    setUserInformation,
    fetchProducts
}

export default connect(mapStateToProps, mapDispatchToProps)(MainPage)