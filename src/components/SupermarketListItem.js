import React from 'react'
import { Card, Paragraph, Button  } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import { Icon } from 'react-native-elements';


const SupermarketListItem = ({
    supermarket,
    navigation,
    filtros,
    setFilters
}) => {
    return (
        <Card style={styles.card} onPress={() => {
            setFilters({...filtros, supermercado: supermarket.nombre})
            navigation.navigate('Home')
        }}>
            <Card.Cover source={{ uri: supermarket.imagen }} />
            <Card.Title title={supermarket.nombre} />
        </Card>
    )
}

const styles = StyleSheet.create({
    card: {
        marginVertical: 8,
        marginHorizontal: 25,
        maxWidth: 700
    }
})

export default SupermarketListItem