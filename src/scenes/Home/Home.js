//Utilities
import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from "prop-types";
import { useFocusEffect } from '@react-navigation/native';

//Library components
import { View, ScrollView, ActivityIndicator } from 'react-native';

//Own components
import Header from '../../components/Header'
import styles from './styles'
import ProductListItem from '../../components/ProductListItem'

//Actions and functions
import { fetchProducts } from '../../actions/product'

const Home = ({
    navigation,
    productos,
    fetchProducts
}) => {

    useFocusEffect(
        React.useCallback(() => {
            //ComponentWillMount
            fetchProducts()
            return () => {
                //ComponentWillUnmount
                
            }
        }, [])
    )
        
    return (
        <View style={{flex: 1}}>
            <Header navigation={navigation} />
            <ScrollView>
                <View style={styles.productsList}>
                    {
                        productos.map(p => {
                            return (
                                <ProductListItem product={p}/>
                            )                
                        })
                    }
                </View>
            </ScrollView>
        </View>
    )
}

const mapStateToProps = state => ({
    productos: state.product.productos,
    loadingProductos: state.product.productosIsLoading
})

const mapDispatchToProps = {
    fetchProducts
}

const HomeConnected = connect(mapStateToProps, mapDispatchToProps)(Home)

export default HomeConnected
export { Home }

