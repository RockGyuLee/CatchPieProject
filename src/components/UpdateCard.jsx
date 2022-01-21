import React, {useState, useLayoutEffect, useRef, useEffect} from "react";
import {t} from 'react-native-tailwindcss';
import styled from 'styled-components';
import { View, Platform, TouchableOpacity, Text, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import SQLite from 'react-native-sqlite-storage';

//modules
import { HeaderInput, InfoTextInput } from "./TextInput";
import { DefaultBtn, RowBtnGroup } from "./Button";

const DeleteBtn = styled(TouchableOpacity)`
    ${[t.absolute, t.top0, t.right0, t.itemsCenter, t.justifyCenter]}
`

const VerFlexView = styled(View)`
    background-color : #fff;
    border-width : 2;
    border-color :  #b794f4;
    ${[t.flexCol, t.mX3, t.mB3, t.pT2, t.pL3, t.roundedLg, t.pR3]};
`
const db = SQLite.openDatabase({name : "catchPieDB.db",createFromLocation: 1});


function UpdateCard({ data, cardId, update2Data, ...props}){

    const {title, wifiName, wifiPw } = data;

    const [ updateTitle, setUpdateTitle ] = useState(title);
    const [ updateWifiName, setUpdateWifiName ] = useState(wifiName);
    const [ updateWifiPw, setUpdateWifiPw ] = useState(wifiPw);

    const updateText = ( updateCase, text) => {
        switch(updateCase){
            case "header" :
                setUpdateTitle(text);
                break;
            case "wifi_name" :
                setUpdateWifiName(text);
                break;
            case "wifi_pw" :
                setUpdateWifiPw(text);
                break;
        }
    }

    const deleteCardData = () => {
        Alert.alert("","지운 데이터는 복구가 불가능합니다. 그래도 지우시겠습니까?",
        [                              
            {
              text: "아니요",                             
              onPress: () =>{},     
              style: "cancel"
            },
            { text: "네", onPress: () => {
                try{
                    db.transaction(tx => {
                        tx.executeSql('delete from catchPie where ID = ?', [cardId], (tx,results) => {
                            db.close();
                        },(err) => {
                            console.error(err);
                        })
                    })
                } finally{
                    update2Data(-1);
                }
            }}
          ]);
    }

    const cancelSaveData = () => {
        update2Data(-1);
    }
    

    const updateSaveData = () =>{
        try{
            db.transaction(tx => {
                tx.executeSql(
                    'update catchPie set TITLE = ?, WIFI_NAME = ?, WIFI_PW = ? where ID = ?', 
                    [
                        updateTitle,
                        updateWifiName,
                        updateWifiPw,
                        cardId
                    ], (ttx, results)=>{
                        db.close();
                },(err) => {
                    console.error(err);
                })
            })
        }finally{
            update2Data(-1);
        }
        
    }

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
                {/* <TextInput defaultValue={updateTitle} onChangeText={updateText.bind(null, "header")}/> */}
                <HeaderInput title={updateTitle}  onChangeText={updateText.bind(null, "header")} />
                <InfoTextInput id={wifiName} pw={wifiPw} onChangeText={updateText}/>
                <DeleteBtn onPress={deleteCardData}>
                    <Icon name="closecircleo" color="#32127a"  size={25}/>
                </DeleteBtn>
                <RowBtnGroup>
                    <DefaultBtn onPress={updateSaveData}>
                        <Text>저장</Text>
                    </DefaultBtn>
                    <DefaultBtn onPress={cancelSaveData}>
                        <Text>취소</Text>
                    </DefaultBtn> 
                </RowBtnGroup>
        </VerFlexView>
    )
}

export default UpdateCard