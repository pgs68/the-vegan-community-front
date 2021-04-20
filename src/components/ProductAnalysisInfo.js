import React from 'react'

import { Text, View, Platform, Dimensions, StyleSheet, Image, ScrollView } from 'react-native';
import { Icon, Button, Input, Card } from 'react-native-elements';
import { BarCodeScanner } from 'expo-barcode-scanner'
import {
    Paragraph,
    Title,
    Avatar
} from 'react-native-paper'
import ProductCardInfo from './ProductCardInfo'


const ProductAnalysisInfo = ({producto}) => {
/*
        {
            loading: false,
            status: response.status,
            image_front_url: response.product.image_front_url,
            product_name: response.product.product_name,
            product_name_es: response.product.product_name_es,
            ingredients: response.product.ingredients,
            vegano: response.product.ingredients_analysis_tags?.includes('en:vegan'),
            noVegano: response.product.ingredients_analysis_tags?.includes('en:non-vegan'),
            unknownVeganStatus : response.product.ingredients_analysis_tags?.includes('en:vegan-status-unknown')
        }
*/
    return (
        <View>
            {
                //Si no se encuentra el producto
                (producto.status === 0 && 
                    <View style={styles.row}>
                        <Text style={{ textAlign: 'center' }}>Lo sentimos, todavía no tenemos información sobre este producto</Text>
                    </View>)
            }
            {
                //Si se encuentra y no es vegano
                (producto.status === 1 && producto.noVegano && 
                <View>
                    <ProductCardInfo producto={producto} />
                    <Card.Divider/>
                    <View style={styles.column}>
                        <View style={styles.row}>
                            <Title style={{color: '#c32323', marginRight: 8}}>No es vegano</Title>
                            <Icon color='#c32323' name='close' type='font-awesome' />
                        </View>
                    </View>
                </View>)
            }
            {
                //Si se encuentra y es vegano
                (producto.status === 1 && producto.vegano && 
                <View>
                    <ProductCardInfo producto={producto} />
                    <Card.Divider/>
                    <View style={styles.column}>
                        <View style={styles.row}>
                            <Title style={{color: '#3fb33e', marginRight: 8}}>Es vegano</Title>
                            <Icon color='#3fb33e' name='check' type='font-awesome-5' />
                        </View>
                    </View>
                </View>)
            }
            {
                //Si se encuentra pero se desconoce si es vegano o no
                (producto.status === 1 && (
                    producto.unknownVeganStatus ||
                    ( producto.vegano === undefined &&
                      producto.noVegano === undefined &&
                      producto.unknownVeganStatus === undefined )
                ) && (
                <View>
                    <ProductCardInfo producto={producto} />
                    <Card.Divider/>
                    <View style={styles.row}>
                        <Text style={{ textAlign: 'center' }}>Lo sentimos, no disponemos de suficiente información sobre este producto</Text>
                    </View>
                </View>))
            }
        </View>
    )
}

const styles = StyleSheet.create({
    row: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15
    },
    column: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
    }
})

export default ProductAnalysisInfo