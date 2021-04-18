import React from "react";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
    bodyDetails: {
        display: 'flex',
        flexDirection: 'column'
    },
    rowTitleDetails: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 3,
        paddingVertical: 10
    },
    rowDetails: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 3
    },
    productRating: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
    }
})