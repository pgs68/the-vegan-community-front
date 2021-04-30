//Utilities
import React, { useEffect } from 'react'
import { connect } from 'react-redux'

//Library components
import {
    DrawerContentScrollView,
    DrawerItem, 
    createDrawerNavigator 
} from '@react-navigation/drawer';
import { Icon } from 'react-native-elements';

//Own components
import Home from './scenes/Home'
import Login from './scenes/Login'
import Register from './scenes/Register'
import IsVegan from './scenes/IsVegan'
import AddProduct from './scenes/AddProduct'
import ListaSupermercados from './scenes/ListaSupermercados'
import DetailsProduct from './scenes/DetailsProduct'
import Report from './scenes/Report'

//Actions and functions
import { isLoggedInChange, setUserInformation } from './actions/user'
import { fetchSupermarkets } from './actions/product'
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
                label="Supermercados"
                icon={() => <Icon name='shopping-cart' type='font-awesome-5'/>}
                onPress={() => props.navigation.navigate('ListaSupermercados')}
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
                    onPress={() => {
                        logout(props.navigation, isLoggedInChange)
                    }}
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
    fetchSupermarkets
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
        fetchSupermarkets()
    }, [])

    return (
            <Drawer.Navigator initialRouteName={userLogged ? "Home" : "Login"} drawerContent={props => <SideMenu props={props} userLogged={userLogged}/>}>
                {
                    userLogged ? (
                        <>
                            <Drawer.Screen name="Home" component={Home}/>
                            <Drawer.Screen name="IsVegan" component={IsVegan} />
                            <Drawer.Screen name="AddProduct" component={AddProduct} />
                            <Drawer.Screen name="ListaSupermercados" component={ListaSupermercados} />
                            <Drawer.Screen name="DetailsProduct" component={DetailsProduct} />
                            <Drawer.Screen name="Report" component={Report} />
                        </>
                    ) : (
                        <>
                            <Drawer.Screen name="Home" component={Home}/>
                            <Drawer.Screen name="Login" component={Login} />
                            <Drawer.Screen name="Register" component={Register} />
                            <Drawer.Screen name="IsVegan" component={IsVegan} />
                            <Drawer.Screen name="ListaSupermercados" component={ListaSupermercados} />
                            <Drawer.Screen name="DetailsProduct" component={DetailsProduct} />
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
    fetchSupermarkets
}

export default connect(mapStateToProps, mapDispatchToProps)(MainPage)