//Utilities
import React, { useState } from 'react'
import { connect } from 'react-redux'

//Library components
import { Text, View, ScrollView } from 'react-native';

//Own components
import styles from './styles'
import Header from '../../components/Header'
import SupermarketListItem from '../../components/SupermarketListItem'

//Actions and functions
import { setFilters } from '../../actions/product'



const ListaSupermercados = ({
    navigation,
    supermercados,
    filtros,
    setFilters
}) => {
    return (
        <View style={{flex: 1}}>
            <Header navigation={navigation} />
            <ScrollView>
                <View style={styles.supermarketsList}>
                    {
                        supermercados.map(s => {
                            return (
                                <SupermarketListItem navigation={navigation} supermarket={s} filtros={filtros} setFilters={setFilters}/>
                            )
                        })
                    }
                </View>
            </ScrollView>
        </View>
    )
}

const mapStateToProps = state => ({
    supermercados: state.product.supermercados,
    filtros: state.product.filtros
})

const mapDispatchToProps = {
    setFilters
}

const ListaSupermercadosConnected = connect(mapStateToProps, mapDispatchToProps)(ListaSupermercados)

export default ListaSupermercadosConnected;
export { ListaSupermercados }