import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { View, Text } from 'react-native';
import {
    DrawerContentScrollView,
    DrawerItem, 
    createDrawerNavigator 
} from '@react-navigation/drawer';

import Home from './scenes/Home'
import Login from './scenes/Login'
import Register from './scenes/Register'
import IsVegan from './scenes/IsVegan'
import { Icon } from 'react-native-elements';

const Drawer = createDrawerNavigator();

function SideMenu(props){
    return (
        <DrawerContentScrollView {...props}>
            <DrawerItem  
                label="Iniciar sesión"
                icon={() => <Icon name='user-circle' type='font-awesome-5'/>}
                onPress={() => props.navigation.navigate('Login')}
            />
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
        </DrawerContentScrollView>
    )
}

function LoggedSideMenu(props){
    return (
        <DrawerContentScrollView {...props}>
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
        </DrawerContentScrollView>
    )
}

const MainPage = ({
    isLoggedIn,
    firebase
}) => {

    // Set an initializing state whilst Firebase connects
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();

    // Handle user state changes
    function onAuthStateChanged(user) {
        setUser(user);
        if (initializing) setInitializing(false);
    }

    useEffect(() => {
        const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);

    if (initializing) return null;
    return (
        <Drawer.Navigator initialRouteName={"Login"} drawerContent={props => user ? <LoggedSideMenu {...props} /> : <SideMenu {...props} />}>
            <Drawer.Screen name="Home" component={Home}/>
            <Drawer.Screen name="Login" component={Login} />
            <Drawer.Screen name="Register" component={Register} />
            <Drawer.Screen name="IsVegan" component={IsVegan} />
        </Drawer.Navigator>
    );
}

const mapStateToProps = state => ({
    isLoggedIn: state.user.isLoggedIn
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(MainPage)