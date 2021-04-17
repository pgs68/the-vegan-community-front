import React from 'react'
import { Card, Paragraph, Button  } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import { Icon } from 'react-native-elements';

const ProductListItem = ({product}) => {
    return (
        <Card style={styles.card}>
            <Card.Cover source={{ uri: product.fotoPrincipal }} />
            <Card.Title title={product.nombre} subtitle={product.supermercados[0]}/>
            <Card.Content style={styles.productRowDetails}>
                <Paragraph>{product.precio}€</Paragraph>
                <View style={styles.productRating}>
                    <Paragraph>{product.valoracion}</Paragraph>
                    <Icon name='star-o' type='font-awesome' color='#efdf74'/>
                    {
                        // Cuando se implementen las votaciones, y el usuario haya votado el producto, se usará este icono:
                        //    <Icon name='star' type='font-awesome'/>
                        
                    }
                </View>
            </Card.Content>
            <Card.Actions>
                    <Button>Ver detalles</Button>
            </Card.Actions>
        </Card>
    )
}

const styles = StyleSheet.create({
    card: {
        marginVertical: 8,
        marginHorizontal: 25,
        maxWidth: 700
    },
    productRowDetails: {
        display: 'flex', 
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    productRating: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
})


export default ProductListItem