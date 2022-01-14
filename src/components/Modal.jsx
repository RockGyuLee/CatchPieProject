import React, { useState, useCallback} from "react";
import { TouchableOpacity, View, Button, Image, Text } from 'react-native';
import {t} from 'react-native-tailwindcss';
import styled from 'styled-components';
import Icon from 'react-native-vector-icons/Fontisto';
import Material from 'react-native-vector-icons/MaterialIcons';
import ImagePicker from 'react-native-image-crop-picker';
import RNTextDetector from "rn-text-detector";

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

    const [image, setImage] = useState(null);
    const [textAr , setTextAr] = useState([]);

    const toggleModal = () => {
        props.onPress && props.onPress()
    }

    const takePhotoFromCamera = () => {
        ImagePicker.openCamera({
            width: 300,
            height: 400,
            cropping: true,
          }).then(image => {
            console.warn(image);
          });
    };



    const choosePhotoFromLibrary = () =>{
        ImagePicker.openPicker({
            cropping : true
          }).then(image => {
            detectText(image.sourceURL);
            setImage( image.path )
          });
    };

    detectText = async (pp) => {
        let visionResp = [];
        try {
          visionResp = await RNTextDetector.detectFromUri(pp);
          setTextAr(visionResp);
        } catch (e) {
          console.warn(e);
        } finally {
            console.log("vision",visionResp);
        }
      };

    console.log("textAr", textAr, this.camera)
    
    return(
        <CategoryView>
            <RowView>
                <ClickAbleView onPress={takePhotoFromCamera}>
                    <Icon name="camera" color='#b794f4' style={{ marginBottom: 12 }} size={30}/>
                    <SText>카메라</SText>
                </ClickAbleView>
                <ClickAbleView onPress={choosePhotoFromLibrary}>
                    <Material name="photo-library" color='#b794f4' style={{ marginBottom: 12 }} size={30}/>
                    <SText>앨범</SText>
                </ClickAbleView>
            </RowView>
            {
                // image && <Image style={{width : 100, height : 100}} source={{ uri : image}}/>
                textAr.map( (item, idx) => {
                    return (
                        <Text key={idx}>
                            {item.text}
                        </Text>
                    )
                })
            }
            <Button title="취소" onPress={toggleModal} />
        </CategoryView>
    )
}

export default ImageModal