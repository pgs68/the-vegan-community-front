import React, { useState } from 'react'
import { Text, View } from 'react-native';

import Header from '../../components/Header'

const AddProduct = ({navigation}) => {
    return (
        <View>
            <Header navigation={navigation} />
            <Text>Esta es la página para añadir un producto</Text>
        </View>
    )
}

export default AddProduct;