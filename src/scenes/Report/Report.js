//Utilities
import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

//Library components
import { Text, View, Platform, Dimensions, StyleSheet, Image, ScrollView } from 'react-native';
import { Icon, Button, Input, Card } from 'react-native-elements';

//Own components
import Header from '../../components/Header'
import ProductListItem from '../../components/ProductListItem'
import styles from './styles'
import Comentario from '../../components/Comentario'

//Actions and functions
import { fetchProductByCodebar, reportProducto, reportComentario } from '../../actions/product'


const { width } = Dimensions.get('window');

const Report = ({
    navigation,
    reportObject,
    fetchProductByCodebar,
    reportComentario,
    reportProducto,
    usuario
}) => {
    const [reportComment, setReportComment] = useState('')
    return (
        <View style={{flex: 1}}>
            <Header navigation={navigation} />
            <View style={styles.column}>
                <View style={styles.row}>
                    {reportObject.isReportedProduct && <Text style={{ fontSize: 19, marginRight: 7 }}>Reportar producto</Text>}
                    {reportObject.isReportedComment && <Text style={{ fontSize: 19, marginRight: 7 }}>Reportar comentario</Text>}
                    <Icon name='report' type='material-icons'/>
                </View>
                <Card.Divider style={{ marginTop: 5, marginBottom: 0 }} />
            </View>
            <ScrollView>
                {
                    reportObject.isReportedProduct && (
                        <ProductListItem
                            product={reportObject.object}
                            navigation={navigation}
                            fetchProduct={fetchProductByCodebar} 
                        />
                    )
                }
                {
                    reportObject.isReportedComment && (
                        <View style={{marginTop: 5}}>
                            <Comentario 
                                comentario={reportObject.object}
                                navigation={navigation}
                                reportEnabled={false}
                            />
                        </View>
                    )
                }
                <Card.Divider style={{ marginTop: 5, marginBottom: 5 }} />
                <View style={styles.row}>
                    <View style={styles.column}>
                        <Text style={{ width: width*0.9 }}>Detalla cuál es el problema:</Text>
                        <Input 
                            placeholder={'Explica el problema'}
                            value={reportComment}
                            onChangeText={value => setReportComment(value)}
                            caretHidden={true}
                            multiline={true}
                            inputContainerStyle={styles.input}
                            numberOfLines={6}
                        />
                        <View style={styles.row}>
                            <Button 
                                title='Enviar reporte'
                                type='outline'
                                buttonStyle={styles.button}
                                disabled={reportComment === ''}
                                onPress={() => {
                                    reportObject.isReportedComment && reportComentario(reportComment, reportObject.object.codebar, reportObject.object.id, usuario)
                                    reportObject.isReportedProduct && reportProducto(reportComment, reportObject.object.codebar, usuario)
                                    navigation.navigate('Home')
                                }}
                            />
                        </View>
                    </View>
                </View>
            </ScrollView>
            
        </View>
    )
}

const mapStateToProps = state => ({
    reportObject: state.product.reportObject,
    usuario: state.user.currentUser
})

const mapDispatchToProps = {
    fetchProductByCodebar,
    reportComentario,
    reportProducto
}

const ReportConnected = connect(mapStateToProps, mapDispatchToProps)(Report)
export default ReportConnected
export { Report }