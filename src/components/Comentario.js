import React, { useState, useEffect, useRef} from 'react';
import { StyleSheet } from "react-native";
import {
    View,
    Text,
    ScrollView,
    Dimensions,
    Platform
} from 'react-native';
import { Icon, Card, Tooltip } from 'react-native-elements';
import {
    Paragraph,
    Title,
    Avatar
} from 'react-native-paper'

const { width } = Dimensions.get('window');

const Comentario = ({
    comentario,
    navigation,
    setReportedComment,
    reportEnabled = true 
}) => {
    const tooltipRef = useRef(null)
    return (
        <View style={styles.commentRow}>
            <View style={styles.growRow}>
                <View style={styles.column}>
                    <Avatar.Image 
                        size={40} 
                        color={'#dcdcdc'} 
                        style={{ marginHorizontal: 5 }} 
                        source={{ uri: comentario.imagenAutor }} 
                    />
                </View>
                <View style={styles.column}>
                    <View style={styles.row}>
                        <Text style={styles.autor}>{comentario.autor}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.texto}>{comentario.texto}</Text>
                    </View>
                </View>
            </View>
            {reportEnabled &&
                <View style={styles.column}>
                    <Tooltip 
                        skipAndroidStatusBar={Platform.OS === 'web'} 
                        backgroundColor='#aec5de'
                        ref={tooltipRef}
                        popover={
                            <View style={styles.column}>
                                <Text onPress={() => {
                                    tooltipRef.current.toggleTooltip();
                                    setReportedComment(comentario)
                                    navigation.navigate('Report')
                                }}>Reportar</Text>
                            </View>
                        }
                    >
                        <Icon name='options-vertical' type='simple-line-icon' color='#a5a5a5'/>
                    </Tooltip>
                </View>
            }
            
            
        </View>
    )
}

const styles = StyleSheet.create({
    row: {
        display: 'flex',
        flexDirection: 'row',
    },
    column: {
        display: 'flex',
        flexDirection: 'column'
    },
    commentRow: {
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 5
    },
    autor: {
        fontWeight: '700'
    },
    texto: {
        maxWidth: width - 70
    },
    growRow: {
        display: 'flex',
        flexDirection: 'row',
        flexGrow: 1
    }
})

export default Comentario