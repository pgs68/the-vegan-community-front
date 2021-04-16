import React from 'react'
import { Switch, Text, View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    row:{
        display: 'flex',
        flexDirection: 'row',
        marginVertical: 10
    }
})

const CustomSwitch = ({
    id,
    object,
    value, 
    setValueFunction,
    label
}) => {
    return (
        <View style={styles.row}>
            <Text style={{marginRight: 7}}>{label}</Text>
            <Switch
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={value ? "#f5dd4b" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={(v) => setValueFunction({...object, [id]: v})}
                value={value}
            />
        </View>
        
    )
}



export default CustomSwitch