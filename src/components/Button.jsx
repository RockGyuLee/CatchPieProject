import React from "react";
import {Button, TouchableOpacity} from 'react-native';
import {t} from 'react-native-tailwindcss';
import styled from 'styled-components';

const CButton = styled(TouchableOpacity)`
    ${[t.roundedFull, t.w12, t.h12, t.mB5, t.mR5 , t.absolute, t.right0, t.bottom0, t.itemsCenter, t.justifyCenter]}
`

const DButton = styled(TouchableOpacity)`
    ${[t.roundedLg, t.w20, t.h12, t.mB5, t.mR5 , t.itemsCenter, t.justifyCenter]}
`

export function CirecleBtn(props){

    const handlePress = () => {
        props.onPress && props.onPress();
    }

    return (
        <CButton style={{backgroundColor : '#b794f4',  }} onPress={handlePress}>
            {props.children}
        </CButton>
    )
}

export function DefaultBtn(props){
    
    const handlePress = () => {
        props.onPress && props.onPress();
    }

    return (
        <DButton style={{borderWidth : 2, borderColor : '#b794f4'}} onPress={handlePress}>
            {props.children}
        </DButton>
    )
}