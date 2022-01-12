import React from "react";
import { TouchableOpacity, View, Text, Button } from 'react-native';
import {t} from 'react-native-tailwindcss';
import styled from 'styled-components';
import Icon from 'react-native-vector-icons/Fontisto';
import Material from 'react-native-vector-icons/MaterialIcons'

//modules
import { SText } from "./Text";

const CategoryView = styled(View)`
    ${[ t.relative, t.bottom0,  t.justifyEnd, t.bgWhite,]}
`

const RowView = styled(View)`
    ${[t.flexRow, t.justifyAround, t.mT3]}
`


const ClickAbleView = styled(TouchableOpacity)`
    ${[t.flexCol, t.itemsCenter]}
`

function ImageModal(props){

    const toggleModal = () => {
        props.onPress && props.onPress()
    }
    return(
        <CategoryView>
            <RowView>
                <ClickAbleView>
                    <Icon name="camera" color='#b794f4' style={{ marginBottom: 12 }} size={30}/>
                    <SText>카메라</SText>
                </ClickAbleView>
                <ClickAbleView>
                    <Material name="photo-library" color='#b794f4' style={{ marginBottom: 12 }} size={30}/>
                    <SText>앨범</SText>
                </ClickAbleView>
            </RowView>
            <Button title="취소" onPress={toggleModal} />
        </CategoryView>
    )
}

export default ImageModal