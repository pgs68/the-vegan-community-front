import React, { useState } from 'react'
import { Input } from 'react-native-elements'

const CustomInput = ({
    placeholder,
    onChange,
    id,
    defaultValue,
    isPasswordInput
}) => {
    //Posible mejora visual apuntada en trello
    return(
        <Input 
            placeholder={placeholder}
            onChangeText={value => onChange(id, value)}
            secureTextEntry={isPasswordInput}
            value={defaultValue}
        />
    )
}

export default CustomInput