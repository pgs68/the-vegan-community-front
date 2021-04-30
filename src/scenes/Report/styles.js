import React from "react";
import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get('window');

export default StyleSheet.create({
    row: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    column: {
        display: 'flex',
        flexDirection: 'column'
    },
    input: {
        width: width*0.9, 
        marginTop: 5,
        borderWidth: 1,
        borderRadius: 5,
    },
    button: {
        width: width*0.5
    }
})