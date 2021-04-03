import React, { useState } from 'react'
import { Text, View } from 'react-native';
import { Icon } from 'react-native-elements';

import styles from '../styles/commonStyles'

const ErrorMessage = ({message}) => {
    return (
        <View style={styles.errorMessage}>
            <Icon name='warning' type='ionicon' color='#ec5e5e' />
            <Text>
                {message}
            </Text>
        </View>
    )
}

export default ErrorMessage