import React, { useState } from 'react'
import { Input } from 'react-native-elements'

import { changeFormInfo } from '../../common/utilities/formFunctions'

const CustomInput = ({
    placeholder,
    changeFunction,
    id,
    formObject,
    defaultValue,
    isPasswordInput,
    type = 'text'
}) => {
    //Posible mejora visual apuntada en trello
    return(
        <Input 
            placeholder={placeholder}
            onChangeText={value => changeFormInfo(formObject, id, value, changeFunction)}
            secureTextEntry={isPasswordInput}
            value={defaultValue}
            keyboardType={type === 'number' ? 'numeric' : 'default'}
        />
    )
}

export default CustomInput