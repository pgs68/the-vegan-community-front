//Utilities
import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import Constants from 'expo-constants';
import { useFocusEffect } from '@react-navigation/native';

//Library components
import { Text, View, Platform, Dimensions, StyleSheet, Image, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker'
import { BarCodeScanner } from 'expo-barcode-scanner'
import { Card, Button, Icon } from 'react-native-elements'
import DropDownPicker from 'react-native-dropdown-picker'

//Own components
import Header from '../../components/Header'
import styles from './styles'
import CustomInput from '../../components/FormComponents/CustomInput'
import CustomSwitch from '../../components/FormComponents/CustomSwitch'
import ErrorMessage from '../../components/ErrorMessage'

//Actions and functions
import { subirImagenProductoFromUri } from '../../common/utilities/firebaseFunctions'
import { createProduct  } from '../../actions/product'


const { width } = Dimensions.get('window');
const qrSize = width * 0.7;

const AddProduct = ({
    navigation,
    currentUser, 
    supermercados,
    createProduct
}) => {

    const [fotoGeneral, setFotoGeneral] = useState(null);
    const [fotoIngredientes, setFotoIngredientes] = useState(null);
    const [permisoScaner, setPermisoScaner] = useState(null) //Solo hace falta para movil
    const [scanned, setScanned] = useState(true);
    const [supermercadoSelected, setSupermercadoSelected] = useState(null)
    const [supermercadosDropdown, setSupermercadosDropdrown] = useState([])
    const [producto, setProducto] = useState({ 
        fotoGeneral: null, 
        fotoIngredientes: null,  
        codigoBarras: '', 
        nombre: '',
        precio: '',
        supermercado: [],
        vegano: false,
        vegetariano: false
    })
    const [error, setError] = useState(null)

    useFocusEffect(
        React.useCallback(() => {
            //ComponentWillMount
            console.log(producto)
            return () => {
                //ComponentWillUnmount
                    setFotoGeneral(null)
                    setFotoIngredientes(null)
                    setSupermercadoSelected(null)
                    setError(null)
                    setScanned(true)
                    setProducto({
                        fotoGeneral: null, 
                        fotoIngredientes: null,  
                        codigoBarras: '', 
                        nombre: '',
                        precio: '',
                        supermercado: [],
                        vegano: false,
                        vegetariano: false
                    })
            }
        }, [])
    )
    
    useEffect(() => {
        var supermercadosAux = []
        supermercados.map(s => {
            supermercadosAux.push({label: s.nombre, value: s.nombre})
        })
        setSupermercadosDropdrown(supermercadosAux)
    }, [])

    useEffect(() => {
        setProducto({
            ...producto,
            fotoGeneral: fotoGeneral,
            fotoIngredientes: fotoIngredientes
        })
    }, [fotoGeneral, fotoIngredientes])

    async function getPermisoScaner(){
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setPermisoScaner(status)
    }

    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        setProducto({ ...producto, codigoBarras: data })
    };

    async function openImagePickerAsync(setImageFunction){
        const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    
        if (permissionResult.granted === false) {
          alert("Permission to camara roll is required");
          return;
        }
    
        const pickerResult = await ImagePicker.launchImageLibraryAsync({
            base64: true
        });
        if (pickerResult.cancelled === true) {
          return;
        }
        if (Platform.OS === "OS") {
            await setImageFunction(pickerResult.uri.replace('file://', ''))
        } else {
            await setImageFunction(pickerResult.uri);
        }
      };

    async function publicarProducto(currentUser){ 
        let precio = producto.precio
        precio = precio.replace(',', '.')
        if(
            producto.fotoGeneral === null || 
            producto.fotoIngredientes === null || 
            producto.codigoBarras === '' || 
            producto.nombre === '' || 
            precio === '' ||
            producto.supermercado.length === 0
        ){
            setError({ message: 'Faltan campos obligatorios por rellenar' })
        } else if(isNaN(precio)){
            setError({ message: 'El formato del precio no es correcto' })
        }else {
            setError(null)
            const urlFotoGeneral = await subirImagenProductoFromUri(producto.fotoGeneral)
            const urlFotoIngredientes = await subirImagenProductoFromUri(producto.fotoIngredientes)
            var productoFinal = {
                ...producto,
                precio: precio,
                fotoGeneral: urlFotoGeneral,
                fotoIngredientes: urlFotoIngredientes
            }
            createProduct(productoFinal, currentUser)
        }
    }

    return (scanned ||  Platform.OS === 'web') ? 
        (
            <View style={{flex: 1}}>
                <Header navigation={navigation} />
                <ScrollView>
                    <View style={styles.body}>
                        <Card containerStyle={styles.mainCard}>
                            <Card.Title>Subir un producto</Card.Title>
                            <Card.Divider/>
                            <View style={fotoGeneral !== null ? styles.addImageCardSuccess : styles.addImageCard}>
                                <Text style={{ marginRight: 10 }}> Sube una foto general del producto</Text>
                                <Icon onPress={() => {openImagePickerAsync(setFotoGeneral)}} name='add-photo-alternate' type='material-icons'/>
                            </View>
                            <View style={fotoIngredientes !== null ? styles.addImageCardSuccess : styles.addImageCard} >
                                <Text style={{ marginRight: 10 }}>Sube una foto de los ingredientes</Text>
                                <Icon onPress={() => {openImagePickerAsync(setFotoIngredientes)}} name='add-photo-alternate' type='material-icons'/>
                            </View>
                            {
                                (Platform.OS === 'web' || (permisoScaner !== null && !permisoScaner)) ? 
                                    <CustomInput 
                                        id={'codigoBarras'}
                                        changeFunction={setProducto}
                                        formObject={producto}
                                        placeholder={'Codigo de barras'}
                                        defaultValue={producto.codigoBarras}
                                    />
                                :
                                    <View style={producto.codigoBarras !== '' ? styles.addImageCardSuccess : styles.addImageCard} >
                                        <Text style={{ marginRight: 10 }}>Escanea el código de barras</Text>
                                        <Icon onPress={() => {
                                            getPermisoScaner()
                                            if(permisoScaner){
                                                setScanned(false)
                                            }
                                        }} name='barcode' type='font-awesome-5'/>
                                    </View>
                            }
                            <CustomInput 
                                id={'nombre'}
                                changeFunction={setProducto}
                                formObject={producto}
                                placeholder={'Nombre'}
                                defaultValue={producto.nombre}
                            />
                            <CustomInput 
                                id={'precio'}
                                changeFunction={setProducto}
                                formObject={producto}
                                placeholder={'Precio €'}
                                type={'number'}
                                defaultValue={producto.precio}
                            />
                            <View>
                                <DropDownPicker 
                                    items={supermercadosDropdown}
                                    placeholder="Selecciona un supermercado"
                                    onChangeItem={item => {
                                        setProducto({
                                            ...producto,
                                            supermercado: [item.value]
                                        })
                                        setSupermercadoSelected(item.value)
                                    }}
                                    style={{ backgroundColor: '#fff' }}
                                    containerStyle={{height: 40}}
                                    defaultValue={supermercadoSelected}
                                />
                            </View>
                            <View style={styles.switchRow}>
                                <CustomSwitch 
                                    id={'vegano'}
                                    object={producto}
                                    value={producto.vegano}
                                    setValueFunction={setProducto}
                                    label={'Vegano'}
                                />
                                <CustomSwitch 
                                    id={'vegetariano'}
                                    object={producto}
                                    value={producto.vegetariano}
                                    setValueFunction={setProducto}
                                    label={'Vegetariano'}
                                />
                            </View>
                            {
                                error && 
                                <ErrorMessage message={error.message} />
                            }
                            <Button 
                                title='Publicar producto'
                                type='outline'
                                onPress={() => publicarProducto(currentUser)}
                            />
                        </Card>
                    </View>
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
    },
  });

const mapStateToProps = state => ({
    supermercados: state.product.supermercados,
    currentUser: state.user.currentUser
})
const mapDispatchToProps = {
    createProduct
}

const AddProductConnected = connect(mapStateToProps, mapDispatchToProps)(AddProduct)

export default AddProductConnected;
export { AddProduct }