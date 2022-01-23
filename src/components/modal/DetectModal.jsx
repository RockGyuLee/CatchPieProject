import React, {useState } from "react";
import { View, TextInput, ScrollView, Image, Alert, Dimensions} from 'react-native';
import {t} from 'react-native-tailwindcss';
import styled from 'styled-components';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import Material from 'react-native-vector-icons/MaterialIcons';
import { ReactNativeZoomableView } from '@openspacelabs/react-native-zoomable-view';
import SQLite from 'react-native-sqlite-storage';

//modules
import { SText } from "../Text";
import { DefaultBtn } from "../Button";

const screen = Dimensions.get('window');

const ModalCard = styled(View)`
    ${[  t.relative, t.bgWhite, t.roundedLg, t.p3 ]};
    margin-top : 10%;
    height : 90%;
`

const ModalBody = styled(View)`
    ${[  t.justifyAround]}
    height : 90%;
`

const ScrollArea = styled(ScrollView)`
    width : 100%;
`

const ModalFoot = styled(View)`
    ${[ t.flexRow,  t.relative, ]}
`

const FlexRow = styled(View)`
    ${[t.p2, t.flexRow, t.itemsCenter,t.contentCenter, t.m2, t.roundedLg]}
`

function DetectModal({texts, disableModal, image, closeAllModal}){

    const [detectTexts, setDetectTexts ] = useState(texts);
    const [ title, setTitle] = useState(undefined);
    const [ pw, setPw ] = useState(undefined);


    const pressTitle = (idx, check) => { 
        return check ? setTitle(idx) : setTitle(null)
    }

    const pressPW = (idx, check) => {
        return check ? setPw(idx) : setPw(null);
    }

    const changeText = (idx, text) => {
        setDetectTexts( (data)=> data.map( (t, iidx) => iidx == idx ? text : t) )
    }

    const insertWifiData = () => {
        if( !detectTexts[title] || !detectTexts[pw] ){
            return Alert.alert("","제목과 패스워드의 입력을 확인해주세요.");
        }

        let db = SQLite.openDatabase({name : "catchPieDB.db",createFromLocation: 1});
        db.transaction( tx => {
            // SELECT * FROM catchPie
            //'Insert into testTable (AWG, metric) VALUES (?,?)'
            tx.executeSql('Insert into catchPie (TITLE, WIFI_NAME, WIFI_PW ) VALUES (?,?,?)', ['',detectTexts[title],detectTexts[pw]], 
            (tx,results) => {
                console.log("Results", results.rowsAffected);
                closeAllModal();
            },(err) => {
                console.error(err);
            })
        })
    }

    return(
        <ModalCard>
            <ModalBody>
                <View style={{  height : screen.height / 3, width: "100%" }}>
                    <ReactNativeZoomableView maxZoom={30} >
                        <Image style={{ width: '100%', height: '100%', }} source={{ uri: image }} resizeMode="contain"/> 
                    </ReactNativeZoomableView>
                </View>
                <ScrollArea>
                    {
                        detectTexts.map( ( text, idx) => (
                            <FlexRow key={idx} style={{borderWidth : 2, borderColor : '#b794f4'}}>
                                <BouncyCheckbox key={Math.random()} size={25} isChecked={idx == title ? true : false}  onPress={pressTitle.bind(null, idx)} fillColor="red"
                                    unfillColor="#FFFFFF" iconComponent={
                                        <Material name="title" />
                                        }
                                />
                                <BouncyCheckbox key={Math.random()} rsize={25} isChecked={idx == pw ? true : false} onPress={pressPW.bind(null, idx)} iconComponent={
                                        <Material name="lock" />
                                    }
                                />
                                <TextInput style={{fontSize:18, padding: 10, width : "75%"}} defaultValue={text} onChangeText={changeText.bind(null, idx)}/>
                            </FlexRow>
                        ))
                    }
                </ScrollArea>
            </ModalBody>
            <ModalFoot>
                <DefaultBtn  onPress={insertWifiData}>
                    <SText style={[{ color : '#b794f4'}, t.textLg, t.fontBold]}>저장</SText>
                </DefaultBtn>
                <DefaultBtn  onPress={disableModal}>
                    <SText style={[{ color : '#b794f4'}, t.textLg, t.fontBold]}>취소</SText>
                </DefaultBtn>
            </ModalFoot>
        </ModalCard>
    )
}

export default DetectModal