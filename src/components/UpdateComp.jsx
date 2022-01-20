import React, {useState, useLayoutEffect, useRef, useEffect} from "react";
import {t} from 'react-native-tailwindcss';
import styled from 'styled-components';
import { View, Platform, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

//modules
import { Header, InfoText } from "./Text";
import { HeaderInput, InfoTextInput } from "./TextInput";

const DeleteBtn = styled(TouchableOpacity)`
    ${[t.absolute, t.top0, t.right0, t.itemsCenter, t.justifyCenter]}
`


const VerFlexView = styled(View)`
    background-color : #fff;
    border-width : 2;
    border-color :  #b794f4;
    
    ${[t.flexCol, t.mX3, t.mB3, t.pT2, t.pB2, t.pL3, t.roundedLg, t.pR3]};
`



function UpdateView({ data, ...props}){

    const {title, wifiName, wifiPw } = data;

    console.log("UpdateView");
    return(
        
        <VerFlexView style={{ ...Platform.select({
            ios: {
                shadowColor: 'rgba(0, 0, 0, 0.1)', 
                shadowOpacity: 0.5,
                shadowRadius: 25, 
                shadowOffset: {width: 0, height: 20}, 
            },
            android: {
                elevation: 3,
            },
          })}}>
                <HeaderInput title={title}/>
                <InfoTextInput id={wifiName} pw={wifiPw}/>
                <DeleteBtn >
                    <Icon name="closecircleo" color="#32127a"  size={25}/>
                </DeleteBtn>
        </VerFlexView>
    )
}

export default UpdateView