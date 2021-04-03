import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from "prop-types";
import { fetchProducts } from '../../actions/product'
import { Text } from 'react-native';
import { View } from 'react-native';

import { getCurrentUser, getUserInformation } from '../../common/utilities/firebaseFunctions'

import Header from '../../components/Header'

const Home = ({
    fetchProducts,
    navigation,
    isLoggedIn,
    currentUser
}) => {
    useEffect(() => {
        //fetchProducts()
        
    })
    return (
        <View>
            <Header navigation={navigation} />
            {isLoggedIn ? 
                <Text>Bienvenido {currentUser.nombreCompleto}</Text>
                :
                <Text>No estás logueado</Text>
            }
            
        </View>
    )
}

const mapStateToProps = state => ({
    productos: state.product.productos,
    isLoggedIn: state.user.isLoggedIn,
    currentUser: state.user.currentUser
})

const mapDispatchToProps = {
    fetchProducts
}

const HomeConnected = connect(mapStateToProps, mapDispatchToProps)(Home)

export default HomeConnected
export { Home }

