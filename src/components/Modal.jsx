import React, { useState, useEffect} from "react";
import { TouchableOpacity, View, Button, Image, Text } from 'react-native';
import {t} from 'react-native-tailwindcss';
import styled from 'styled-components';
import Icon from 'react-native-vector-icons/Fontisto';
import Material from 'react-native-vector-icons/MaterialIcons';
import ImagePicker from 'react-native-image-crop-picker';

//modules
import { SText } from "./Text";
import { fetchBody, API_URL, googleFetch } from "../googleKey";

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

    const [base64Image, setBase64Image ] = useState('');
    const [convertImage2Text , setConvertImage2Text] = useState([]);


    useEffect(()=>{
        if(base64Image == ''){
            return;
        }

        callGoogleVIsionApi = async (base64) => {
            await fetch(API_URL, {
              method: 'POST',
              body: JSON.stringify({
                requests: [
                  {
                    image: {
                      content: base64,
                    },
                    features: [
                      { type: 'LABEL_DETECTION', maxResults: 10 },
                      { type: 'TEXT_DETECTION', maxResults: 5 },
                      { type: 'DOCUMENT_TEXT_DETECTION', maxResults: 5 },
                      { type: 'WEB_DETECTION', maxResults: 5 },
                    ],
                  },
                ],
              }),
            })
              .then((res) => res.json())
              .then((data) => {
                  let str = data.responses[0].fullTextAnnotation.text;
                  let splitStr = str.split(' ')
                setConvertImage2Text(splitStr);
              })
              .catch((err) => console.log('error : ', err));
        };
          callGoogleVIsionApi(base64Image)
        
    },[base64Image])

    const toggleModal = () => {
        props.onPress && props.onPress()
    }

    const takePhotoFromCamera = () => {
        ImagePicker.openCamera({
            width: 400,
            height: 500,
            cropping: true,
            includeBase64 : true
        }).then(image => {
            setBase64Image(image.data)
        });
    };

    const choosePhotoFromLibrary = () =>{
        ImagePicker.openPicker({
            cropping : true,
            includeBase64 : true
        }).then(image => {
            setBase64Image(image.data)
        });
    };

    console.log("convertImage2Text",convertImage2Text)
    
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
                convertImage2Text.map( (item, idx) => {
                    return (
                        <Text key={idx}>
                            {item}
                        </Text>
                    )
                })
            }
            <Button title="취소" onPress={toggleModal} />
        </CategoryView>
    )
}

export default ImageModal