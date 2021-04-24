//Utilities
import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

//Library components
import { Text, View, Platform, Dimensions, StyleSheet, Image, ScrollView } from 'react-native';

//Own components
import Header from '../../components/Header'

//Actions and functions

const Report = ({
    navigation
}) => {
    return (
        <View style={{flex: 1}}>
            <Header navigation={navigation} />
            <ScrollView>
                <Text>Página de reporte</Text>
            </ScrollView>

        </View>
    )
}

const mapStateToProps = state => ({
})

const mapDispatchToProps = {
}

const ReportConnected = connect(mapStateToProps, mapDispatchToProps)(Report)
export default ReportConnected
export { Report }