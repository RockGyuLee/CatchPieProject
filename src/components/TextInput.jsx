import React from "react";
import {t} from 'react-native-tailwindcss';
import styled from 'styled-components';
import { View, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

const MoNoText = styled(TextInput)`
    ${[t.fontMono ]}
    border-bottom-color: #000000;
`

const TextInputView = styled(View)`
    border-bottom-color: #000000;
    border-bottom-width: 1;
`
export const STextInput = styled(MoNoText)`
    ${[ t.textBase,  t.mT2, t.mB1,t.textBlack	]}
`

export const RowView = styled(View)`
    ${[t.mT2, t.flexRow, t.itemsCenter,t.contentCenter, t.pL5,]}
`

export const HTextInput = styled(MoNoText)`
    ${[t.textXl, t.mT2, t.mB1, t.fontBold, t.textBlack	]}
`

export function HeaderInput({title, onChangeText}){

    const changeText = (evt) => {
        onChangeText && onChangeText(evt);
    }

    return (
        <TextInputView>
            <HTextInput defaultValue={title} onChangeText={changeText} />
        </TextInputView>
    )
}

export function InfoTextInput({id, pw, onChangeText}){

    const changeText = (updateCase, evt) => {
        onChangeText && onChangeText(updateCase, evt);
    }

    return (
        <View>
            <RowView >
                <Icon name={"wifi"} color={'#000'} size={30}/>
                <TextInputView style={[t.mL5]}>
                    <STextInput defaultValue={id} onChangeText={changeText.bind(null, "wifi_name")}/>
                </TextInputView>
            </RowView>
            <RowView style={[t.mT1, t.flexRow, t.itemsCenter]}>
                <Icon name={"lock1"} color={'#000'} size={30}/>
                <TextInputView style={[t.mL5]}>
                    <STextInput defaultValue={pw} onChangeText={changeText.bind(null, "wifi_pw")}>{pw}</STextInput>
                </TextInputView>
            </RowView>
        </View>
    )
}