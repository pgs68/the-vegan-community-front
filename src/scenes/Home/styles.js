import React from "react";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
    productCard:{
        borderWidth: 1,
        borderRadius: 5,
        borderColor: 'grey',
        marginHorizontal: 20,
        marginVertical: 10,
        maxWidth: 600,
        display: 'flex',
        flexDirection: 'row'
    },
    productsList: {
        display: 'flex',
        justifyContent: 'center'
    },
    productDetails: {
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        justifyContent: 'space-evenly'
    },
    productRowDetails: {
        display: 'flex', 
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    productRating: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    productButton: {
        marginHorizontal: 20
    }
})