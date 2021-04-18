//Utilities
import React, { useState, useEffect} from 'react';
import { connect } from 'react-redux'
import { useFocusEffect } from '@react-navigation/native';

//Library components
import {
    View,
    Text,
    ScrollView,
} from 'react-native';
import { Icon } from 'react-native-elements';
import {
    Paragraph,
    Title,
    Avatar
} from 'react-native-paper'

//Own components
import Header from '../../components/Header'
import Carousel from '../../components/Carousel'
import styles from './styles'

//Actions and functions


const getAllSupermarkets = (supermarkets) => {
    var supermarketsText = ''
    supermarkets.map(s => {
        if(supermarkets.indexOf(s) === (supermarkets.length - 1)){
            supermarketsText += s
        } else {
            supermarketsText += (s + ', ')
        }
    })
    return supermarketsText
}


const DetailsProduct = ({
    navigation,
    producto
}) => {

    const [supermercados, setSupermercados] = useState('')

    useEffect(() => {
        setSupermercados(getAllSupermarkets(producto.supermercados))
    }, [producto])


    return (
        <View style={{flex: 1}}>
            <Header navigation={navigation} />
            <ScrollView>
                <View style={styles.bodyDetails}>
                    <Carousel images={[producto.fotoPrincipal, producto.detalles.fotoIngredientes]}/>
                    <View style={styles.rowTitleDetails}>
                        <Title>{producto.nombre}</Title>
                        <View style={styles.productRating}>
                            <Paragraph>{producto.valoracion}</Paragraph>
                            <Icon name='star-o' type='font-awesome' color='#efdf74'/>
                            {
                                // Cuando se implementen las votaciones, y el usuario haya votado el producto, se usará este icono:
                                //    <Icon name='star' type='font-awesome'/>
                                
                            }
                        </View>
                    </View>
                    <View style={styles.rowDetails}>
                        <View style={styles.row}>
                            <Paragraph>{producto.precio}€</Paragraph>
                            <Paragraph style={{ marginHorizontal: 5 }} >|</Paragraph>
                            <Paragraph>{supermercados}</Paragraph>
                        </View>
                        <View style={styles.row}>
                            <Avatar.Image size={24} color={'#dcdcdc'} style={{ marginRight: 5 }} source={{ uri: producto.detalles.imagenAutor }} />
                            <Paragraph>{producto.detalles.autor}</Paragraph>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}


const mapStateToProps = state => ({
    producto: state.product.producto
})

const mapDispatchToProps = {

}

const DetailsProductConnected = connect(mapStateToProps, mapDispatchToProps)(DetailsProduct)

export default DetailsProductConnected
export { DetailsProduct }