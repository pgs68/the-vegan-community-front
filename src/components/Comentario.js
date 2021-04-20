import React from 'react';
import { StyleSheet } from "react-native";
import {
    View,
    Text,
    ScrollView,
    Dimensions
} from 'react-native';
import { Icon, Card } from 'react-native-elements';
import {
    Paragraph,
    Title,
    Avatar
} from 'react-native-paper'

const { width } = Dimensions.get('window');

const Comentario = ({
    comentario
}) => {
    return (
        <View style={styles.commentRow}>
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
        fontWeight: 700
    },
    texto: {
        maxWidth: width - 70
    },
})

export default Comentario