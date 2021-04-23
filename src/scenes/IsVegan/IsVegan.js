//Utilities
import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { useFocusEffect } from '@react-navigation/native';
import Constants from 'expo-constants';

//Library components
import { Text, View, Platform, Dimensions, StyleSheet, Image, ScrollView } from 'react-native';
import { Icon, Button, Input, Card } from 'react-native-elements';
import { BarCodeScanner } from 'expo-barcode-scanner'

//Own components
import Header from '../../components/Header'
import styles from './styles'
import ProductAnalysisInfo from '../../components/ProductAnalysisInfo'

//Actions and functions


const { width } = Dimensions.get('window');
const qrSize = width * 0.7;

async function getProductoFromOFF(codebar, setProducto){
    const data = await fetch('https://world.openfoodfacts.org/api/v0/product/' + codebar)
    const response = await data.json()
    var product = {}
    if(response.status === 1){
        product = {
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
    } else {
        product = {
            loading: false,
            status: response.status,
            product_name_es: '',
            product_name: '',
            image_front_url: '',
            ingredients: [],
            vegano: null
        }
    }
    setProducto(product)
    console.log(product)
}

const IsVegan = ({
    navigation
}) => {

    const [scanned, setScanned] = useState(true);
    const [codigoBarras, setCodigoBarras] = useState('')
    const [permisoScaner, setPermisoScaner] = useState(null) //Solo hace falta para movil
    const [producto, setProducto] = useState(null)

    useFocusEffect(
        React.useCallback(() => {
            //ComponentWillMount

            return () => {
                //ComponentWillUnmount
                setCodigoBarras('')
                setScanned(true)
                setProducto(null)
            }
        }, [])
    )

    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        setCodigoBarras(data)
        getProductoFromOFF(data, setProducto)
    };

    async function getPermisoScaner(){
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setPermisoScaner(status)
    }

    return (scanned ||  Platform.OS === 'web') ?
    (
        <View style={{flex: 1}}>
            <Header navigation={navigation} />
            <ScrollView>
                <Card>
                    <Card.Title>
                        <Icon name='seedling' type='font-awesome-5'/>
                        <Text>Comprueba si el producto es vegano</Text>
                    </Card.Title>
                    <Card.Divider/>
                    {
                        producto === null ? (
                            (Platform.OS === 'web' || (permisoScaner !== null && !permisoScaner)) ?
                                <View>
                                    <Input
                                        placeholder={'Codigo de barras'}
                                        value={codigoBarras} 
                                        onChangeText={value => setCodigoBarras(value)}
                                    />
                                    <Button 
                                        title='Comprobar producto'
                                        type='outline'
                                        disabled={codigoBarras === ''}
                                        onPress={() => getProductoFromOFF(codigoBarras, setProducto)}
                                        style={styles.button}
                                    />
                                </View> 
                            :
                                <View style={codigoBarras !== '' ? styles.addImageCardSuccess : styles.addImageCard} >
                                    <Text style={{ marginRight: 10 }}>Escanea el código de barras</Text>
                                    <Icon onPress={() => {
                                        getPermisoScaner()
                                        if(permisoScaner){
                                            setScanned(false)
                                        }
                                    }} name='barcode' type='font-awesome-5'/>
                                </View>
                        ) : 
                        (
                            <View>
                                <ProductAnalysisInfo producto={producto} />
                                <Button 
                                    title='Comprobar otro producto'
                                    type='outline'
                                    onPress={() => {
                                        setCodigoBarras('')
                                        setProducto(null)
                                    }}
                                    style={styles.button}
                                />
                            </View>
                            
                        )
                        
                }
                </Card>
            </ScrollView>
        </View>
    )
    :
    (
        <View
            style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'flex-end',
            }}
        >
            <BarCodeScanner 
                onBarCodeScanned={handleBarCodeScanned}
                style={[StyleSheet.absoluteFillObject, scanerStyles.container]}
            >
                <Text style={scanerStyles.description}>Escanea el código de barras</Text>
                <Image
                    style={scanerStyles.qr}
                    source={{
                        uri: '../../../assets/scanner.png',
                    }}
                />
                <Text onPress={() => setScanned(true)} style={scanerStyles.cancel}>
                    Cancel
                </Text>
            </BarCodeScanner>
        </View> 
    )
}

const scanerStyles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: Constants.statusBarHeight,
      backgroundColor: '#ecf0f1',
      padding: 8,
    },
    qr: {
      marginTop: '20%',
      marginBottom: '20%',
      width: qrSize,
      height: qrSize,
    },
    description: {
      fontSize: width * 0.09,
      marginTop: '10%',
      textAlign: 'center',
      width: '70%',
      color: 'white',
    },
    cancel: {
      fontSize: width * 0.05,
      textAlign: 'center',
      width: '70%',
      color: 'white',
    }
  });

const mapStateToProps = state => ({
})

const mapDispatchToProps = {
}

const IsVeganConnected = connect(mapStateToProps, mapDispatchToProps)(IsVegan)

export default IsVeganConnected
export { IsVegan }