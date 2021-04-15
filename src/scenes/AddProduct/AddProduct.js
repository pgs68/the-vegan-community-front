import React, { useState, useEffect } from 'react'
import { Text, View, Platform, Dimensions, StyleSheet, Image } from 'react-native';
import { Icon } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker'
import uploadAnonymousFilesAsync from "anonymous-files";
import { BarCodeScanner } from 'expo-barcode-scanner'
import Constants from 'expo-constants';

import { Card, Button } from 'react-native-elements'

import Header from '../../components/Header'
import styles from './styles'
import CustomInput from '../../components/FormComponents/CustomInput'

const { width } = Dimensions.get('window');
const qrSize = width * 0.7;

const AddProduct = ({navigation}) => {

    const [fotoGeneral, setFotoGeneral] = useState(null);
    const [fotoIngredientes, setFotoIngredientes] = useState(null);
    const [permisoScaner, setPermisoScaner] = useState(null) //Solo hace falta para movil
    const [scanned, setScanned] = useState(true);
    const [producto, setProducto] = useState({ 
        fotoGeneral: '', 
        fotoIngredientes: '',  
        codigoBarras: '', 
        nombre: '',
        precio: '',
        supermercado: ''
    })

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

    let openImagePickerAsync = async (setImageFunction) => {
        const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    
        if (permissionResult.granted === false) {
          alert("Permission to camara roll is required");
          return;
        }
    
        const pickerResult = await ImagePicker.launchImageLibraryAsync();
    
        if (pickerResult.cancelled === true) {
          return;
        }
    
        if (Platform.OS === "web") {
          let remoteUri = await uploadAnonymousFilesAsync(pickerResult.uri);
          await setImageFunction({ localUri: pickerResult.uri, remoteUri });
        } else {
          await setImageFunction({ localUri: pickerResult.uri });
        }
      };

    return (scanned ||  Platform.OS === 'web') ? 
        (
            <View >
                <Header navigation={navigation} />
                <View style={styles.body}>
                    <Card containerStyle={styles.mainCard}>
                        <Card.Title>Subir un producto</Card.Title>
                        <Card.Divider/>
                        <View style={fotoGeneral !== null ? styles.addImageCardSuccess : styles.addImageCard}>
                            <Text style={{ marginRight: 10 }}> Sube una foto general del producto</Text>
                            <Icon onPress={() => openImagePickerAsync(setFotoGeneral)} name='add-photo-alternate' type='material-icons'/>
                        </View>
                        <View style={fotoIngredientes !== null ? styles.addImageCardSuccess : styles.addImageCard} >
                            <Text style={{ marginRight: 10 }}>Sube una foto de los ingredientes</Text>
                            <Icon onPress={() => openImagePickerAsync(setFotoIngredientes)} name='add-photo-alternate' type='material-icons'/>
                        </View>
                        {
                            (Platform.OS === 'web' || (permisoScaner !== null && !permisoScaner)) ? 
                                <CustomInput 
                                    id={'codigoBarras'}
                                    changeFunction={setProducto}
                                    formObject={producto}
                                    placeholder={'Codigo de barras'}
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
                        />
                        <CustomInput 
                            id={'precio'}
                            changeFunction={setProducto}
                            formObject={producto}
                            placeholder={'€'}
                        />
                    </Card>
                </View>
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

export default AddProduct;