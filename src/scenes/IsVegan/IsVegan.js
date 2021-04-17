import React, { useState } from 'react'
import { Text, View, ScrollView } from 'react-native';

import Header from '../../components/Header'

const IsVegan = ({navigation}) => {
    return (
        <View style={{flex: 1}}>
            <Header navigation={navigation} />
            <ScrollView>
                <Text>Esta es la página para ver si un producto es vegano o no</Text>
            </ScrollView>
        </View>
    )
}

export default IsVegan;