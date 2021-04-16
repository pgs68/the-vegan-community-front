import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from "prop-types";
import { fetchProducts, fetchPhotoProduct } from '../../actions/product'
import { Text } from 'react-native';
import { View } from 'react-native';
import { Button, ScrollView } from 'react-native'
import { ActivityIndicator } from 'react-native';
import { Image } from 'react-native-elements';
import { Icon } from 'react-native-elements';

import Header from '../../components/Header'
import styles from './styles'

const Home = ({
    navigation,
    isLoggedIn,
    currentUser,
    productos,
}) => {
        
    return (
        <View style={{flex: 1}}>
            <Header navigation={navigation} />
            <ScrollView>
                <View style={styles.productsList}>
                    {
                        productos.map(p => {
                            return (
                                <View style={styles.productCard}>
                                    <Image 
                                        source={{ uri: p.fotoPrincipal }}
                                        style={{ width: 200, height: 200 }}
                                        PlaceholderContent={<ActivityIndicator />}
                                    />
                                    <View style={styles.productDetails}>
                                        <View style={styles.productRowDetails}>
                                            <Text style={{fontWeight: '700'}}>{p.nombre}</Text>
                                            <Text>{p.precio}€</Text>
                                        </View>
                                        <View style={styles.productRowDetails}>
                                            <Text>{p.supermercados[0]}</Text>
                                            <View style={styles.productRating}>
                                                <Text>{p.valoracion}</Text>
                                                <Icon name='star-o' type='font-awesome' color='#efdf74'/>
                                                {
                                                    /* Cuando se implementen las votaciones, y el usuario haya votado el producto, se usará este icono:
                                                        <Icon name='star' type='font-awesome'/>
                                                    */
                                                }
                                            </View>
                                            
                                        </View>
                                        <View style={styles.productButton}>
                                            <Button 
                                                title='Ver detalles'
                                            />
                                        </View>
                                    </View>
                                </View>
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
    loadingProductos: state.product.productosIsLoading,
    isLoggedIn: state.user.isLoggedIn,
    currentUser: state.user.currentUser
})

const mapDispatchToProps = {

}

const HomeConnected = connect(mapStateToProps, mapDispatchToProps)(Home)

export default HomeConnected
export { Home }

