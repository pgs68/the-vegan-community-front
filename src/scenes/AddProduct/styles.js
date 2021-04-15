import React from "react";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
    addProductComponent:{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        flexGrow: 1
    },
    titleRow: {
        display: 'flex',
        justifyContent: 'center',
    },
    title:{
        fontWeight: '500',
        fontSize: 21,
        textAlign: 'center'
    },
    bodyRow:{
        flexGrow: 1,
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column'
    },
    addImageCard: {
        marginHorizontal: 20,
        marginVertical: 10,
        maxWidth: 700,
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'row',
        flexGrow: 1,
        backgroundColor: '#fbfbfb',
        paddingVertical: 30,
        alignItems: 'center',
        
    },
    addImageCardSuccess: {
        marginHorizontal: 20,
        marginVertical: 10,
        maxWidth: 700,
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'row',
        flexGrow: 1,
        backgroundColor: '#fbfbfb',
        paddingVertical: 30,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#87da72',
    }
})