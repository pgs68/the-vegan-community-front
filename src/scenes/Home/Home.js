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
import FiltersAccordion from '../../components/FiltersAccordion'

//Actions and functions
import { 
    fetchProducts, 
    setFilters, 
    cleanFilters,
    fetchProductByCodebar,
    getComentariosFromProducto 
} from '../../actions/product'

const Home = ({
    navigation,
    productos,
    filtros,
    setFilters,
    cleanFilters,
    fetchProducts,
    supermercados,
    fetchProductByCodebar,
    getComentariosFromProducto
}) => {
    const [expandedFilters, setExpandedFilters] = React.useState(false);

    useFocusEffect(
        React.useCallback(() => {
            //ComponentWillMount
            return () => {
                //ComponentWillUnmount
                setExpandedFilters(false)
                cleanFilters()
            }
        }, [])
    )

    useEffect(() => {
        fetchProducts(filtros)
    }, [filtros])

    async function fetchProduct(codebar){
        await fetchProductByCodebar(codebar)
        getComentariosFromProducto(codebar)
    }
        
    return (
        <View style={{flex: 1}}>
            <Header navigation={navigation} />
            <ScrollView>
                <View style={styles.productsList}>
                    <FiltersAccordion 
                        expandedFilters={expandedFilters} 
                        setExpandedFilters={setExpandedFilters}
                        filtros={filtros}
                        supermercados={supermercados}
                        setFiltros={setFilters}
                        cleanFiltros={cleanFilters}
                    />
                    {
                        productos.map(p => {
                            return (
                                <ProductListItem 
                                    product={p} 
                                    navigation={navigation}
                                    fetchProduct={fetchProduct}
                                />
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
    filtros: state.product.filtros,
    supermercados: state.product.supermercados
})

const mapDispatchToProps = {
    fetchProducts,
    setFilters,
    cleanFilters,
    fetchProductByCodebar,
    getComentariosFromProducto
}

const HomeConnected = connect(mapStateToProps, mapDispatchToProps)(Home)

export default HomeConnected
export { Home }

