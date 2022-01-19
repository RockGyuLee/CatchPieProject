import React, { useState, useEffect, Fragment} from "react";
import { TouchableOpacity, View, Button, Image, Text } from 'react-native';
import {t} from 'react-native-tailwindcss';
import styled from 'styled-components';
import Icon from 'react-native-vector-icons/Fontisto';
import Material from 'react-native-vector-icons/MaterialIcons';
import ImagePicker from 'react-native-image-crop-picker';
import Modal from "react-native-modal";

//modules
import { SText } from "../Text";
import DetectModal from "./DetectModal";
import {  API_URL } from "../../googlekey";

const CategoryView = styled(View)`
    ${[ t.relative, t.bottom0,  t.justifyEnd, t.bgWhite]}
`

const RowView = styled(View)`
    ${[t.flexRow, t.justifyAround, t.mT3]}
`


const ClickAbleView = styled(TouchableOpacity)`
    ${[t.flexCol, t.itemsCenter]}
`

function ImageModal(props){

    
    const [base64Image, setBase64Image ] = useState('');
    const [ pathImage, setPathImage ] = useState('');
    const [convertImage2Text , setConvertImage2Text] = useState([]);
    
    const [ isDetect, setIsDetect] = useState(false);

    useEffect(()=>{
        if(base64Image == ''){
            return;
        }

        let callGoogleVIsionApi = async (base64) => {
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
                setIsDetect(true);
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
            setPathImage(image.path);
            setBase64Image(image.data)
        });
    };

    const choosePhotoFromLibrary = () =>{
        ImagePicker.openPicker({
            cropping : true,
            includeBase64 : true
        }).then(image => {
            setPathImage(image.path);
            setBase64Image(image.data)
        });
    };

    const disableDetectModal = () => {
        setIsDetect(false)
    }

    // if(isDetect){
    //     return (
    //         <Modal isVisible={isDetect}>
    //             <DetectModal disableModal={disableDetectModal} image={pathImage} texts={convertImage2Text}/>
    //             {/* <DetectModal disableModal={disableDetectModal} texts={["안녕하세요", "이것은 테스트입니다.","스크롤도 테스트해야합니다."]}/> */}
    //         </Modal>
    //     )
    // }

    // detect modal test 진행 
    if(true){
        return (
            <Modal isVisible={true}>
                <DetectModal texts={["안녕하세요", "이것은 테스트입니다.","스크롤도 테스트해야합니다.","스크롤 테스트 1"]} image={'https://reactnative.dev/img/tiny_logo.png'}/>
            </Modal>
        )
    }

    
    
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
            <Button title="취소" onPress={toggleModal} />
        </CategoryView>
    )
}

export default ImageModal