import React from "react";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
    titleRow: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end',
        marginVertical: 10
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
    },
    button: {
        marginHorizontal: 20
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    column: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
    }
})