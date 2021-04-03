import React, { useState } from 'react'
import { Text, View } from 'react-native';

import Header from '../../components/Header'

const IsVegan = ({navigation}) => {
    return (
        <View>
            <Header navigation={navigation} />
            <Text>Esta es la página para ver si un producto es vegano o no</Text>
        </View>
    )
}

export default IsVegan;