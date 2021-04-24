//Utilities
import React, { useState, useEffect, useRef} from 'react';
import { connect } from 'react-redux'
import { useFocusEffect } from '@react-navigation/native';

//Library components
import {
    View,
    Text,
    ScrollView,
    Dimensions,
    Platform
} from 'react-native';
import { Icon, Card, Input, Button, Tooltip } from 'react-native-elements';
import {
    Paragraph,
    Title,
    Avatar
} from 'react-native-paper'

//Own components
import Header from '../../components/Header'
import Carousel from '../../components/Carousel'
import styles from './styles'
import Comentario from '../../components/Comentario'

//Actions and functions
import { getComentariosFromProducto, postComentarioInProducto, setReportedProduct, setReportedComment } from '../../actions/product'


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

const { width } = Dimensions.get('window');

const DetailsProduct = ({
    navigation,
    producto,
    postComentarioInProducto,
    getComentariosFromProducto,
    usuario,
    isLoggedIn,
    setReportedProduct,
    setReportedComment
}) => {

    const [supermercados, setSupermercados] = useState('')
    const [newComment, setNewComment] = useState('')
    const tooltipRef = useRef(null)

    useEffect(() => {
        setSupermercados(getAllSupermarkets(producto.supermercados))
    }, [producto])


    return (
        <View style={{flex: 1}}>
            <Header navigation={navigation} />
            <ScrollView stickyHeaderIndices={[1]}>
                <View style={styles.bodyDetails}>
                    <Carousel images={[producto.fotoPrincipal, producto.detalles.fotoIngredientes]}/>
                    <View style={styles.rowTitleDetails}>
                        <Title>{producto.nombre}</Title>
                        {
                            isLoggedIn &&
                            <Tooltip 
                                skipAndroidStatusBar={Platform.OS === 'web'} 
                                backgroundColor='#aec5de'
                                ref={tooltipRef}
                                popover={
                                    <View style={styles.column}>
                                        <Text onPress={() => {
                                            tooltipRef.current.toggleTooltip();
                                            setReportedProduct(producto)
                                            navigation.navigate('Report')
                                        }}>Reportar</Text>
                                    </View>
                                }
                            >
                                <Icon name='options-vertical' type='simple-line-icon' color='#a5a5a5'/>
                            </Tooltip>
                        }
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
                <View style={styles.commentSectionTitle}>
                    <Card.Divider style={{ marginBottom: 5 }} />
                    <Text style={{ textAlign: 'center' }}>Comentarios</Text>
                    <Card.Divider style={{ marginTop: 5, marginBottom: 0 }} />
                </View>
                <View style={styles.commentSection}>   
                    {
                        producto.detalles.comentarios && 
                        producto.detalles.comentarios.map(comentario => {
                            return (
                                <Comentario 
                                    comentario={comentario} 
                                    navigation={navigation}
                                    setReportedComment={setReportedComment}
                                />
                            )
                        })
                    }
                </View>
            </ScrollView>
            {
                isLoggedIn &&
                <View style={styles.addCommentSection}>
                    <View style={styles.row}>
                        <Input
                            placeholder={'Comenta este producto'}
                            value={newComment} 
                            onChangeText={value => setNewComment(value)}
                            containerStyle={{ width: width*0.75, marginTop: 5 }}
                        />
                        <Button 
                            title='Enviar'
                            type='outline'
                            disabled={newComment === ''}
                            onPress={() => {
                                const comment = newComment.trimStart().trimEnd()
                                setNewComment(comment)

                                if(comment !== '')
                                {
                                    postComentarioInProducto(producto.codebar, comment, usuario)
                                    getComentariosFromProducto(producto.codebar)
                                    setNewComment('')
                                }
                            }}
                            style={{ width: width*0.2, marginTop: 5 }}
                        />
                    </View>
                </View>
            }
        </View>
    )
}


const mapStateToProps = state => ({
    producto: state.product.producto,
    usuario: state.user.currentUser,
    isLoggedIn: state.user.isLoggedIn
})

const mapDispatchToProps = {
    postComentarioInProducto,
    getComentariosFromProducto,
    setReportedProduct,
    setReportedComment
}

const DetailsProductConnected = connect(mapStateToProps, mapDispatchToProps)(DetailsProduct)

export default DetailsProductConnected
export { DetailsProduct }