import React from "react";
import {t} from 'react-native-tailwindcss';
import styled from 'styled-components';
import { Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

const MoNoText = styled(Text)`
    ${[t.fontMono]}
`

export const HText = styled(MoNoText)`
    ${[t.textXl, t.mT2, t.mB1, t.fontBold, t.textBlack	]}
`

export const SText = styled(MoNoText)`
    ${[ t.textBase, t.textBlack	]}
`

export const RowView = styled(View)`
    ${[t.mT1, t.flexRow, t.itemsCenter,t.contentCenter, t.pL5]}
`

export function Header({title}){
    return (
        <HText>{title}</HText>
    )
}

export function SubText({title}){
    return (
        <SText selectable={true}>{title}</SText>
    )
}

export function InfoText({id, pw}){

    return (
        <View>
            <RowView>
                <Icon name={"wifi"} color={'#000'} size={30}/>
                <SText style={[t.pL5]} selectable={true}>{id}</SText>
            </RowView>
            <RowView style={[t.mT1, t.flexRow, t.itemsCenter]}>
                <Icon name={"lock1"} color={'#000'} size={30}/>
                <SText style={[t.pL5]} selectable={true}>{pw}</SText>
            </RowView>
        </View>
    )
}