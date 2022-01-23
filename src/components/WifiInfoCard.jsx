import React, {useState, useLayoutEffect} from "react";
import { Text, Platform, View, Pressable, TouchableOpacity } from 'react-native';
import {t} from 'react-native-tailwindcss';
import styled from 'styled-components';
import Accordion from 'react-native-collapsible/Accordion';
import Icon from 'react-native-vector-icons/MaterialIcons';
import QRCode from "react-qr-code";

//modules
import { Header, InfoText } from "./Text";

const VerFlexView = styled(TouchableOpacity)`
    background-color : #D8E5C4;
    ${[t.flexCol, t.mX3, t.mB3, t.pT2, t.pB2, t.pL2, t.roundedLg]};
`

const RigthIcon = styled(Icon)`
    ${[ t.absolute, t.right0, t.bottom0, t.mR3, t.mB3]};
`

function WifiInfoCard({data, update2Data, idx, ...props}){
    
    //초기 스크롤뷰에 표시하는 데이터셋.
    const [ sectionDatas, setSectionDatas ] = useState([]);

    // 선택한 section 
    const [ activeSection, setActiveSection ] = useState([])
    

    useLayoutEffect(()=>{
        let { rows } = data;
        let temp_array = []
        for( let i = 0; i < rows.length; i++){
            let { ID, TITLE, WIFI_NAME, WIFI_PW} = rows.item(i);
            temp_array.push({
                id : ID,
                index : i,
                editData : false,
                title : TITLE,
                wifiName : WIFI_NAME,
                wifiPw : WIFI_PW
            })
        }
        setSectionDatas(temp_array);
    }, [])

    const onPressLong = () => {
        update2Data && update2Data();
    }

    const longPress = () => {
        alert('You long-pressed the button!')
    }

    const renderSectionHeader = ({ id, index, title, wifiName, wifiPw }) => {
        return (
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
              })}} onPress={updateSections.bind(null,[ index ])} onLongPress={longPress}>
                <Header title={title}/>
                <InfoText id={wifiName} pw={wifiPw}/>
                <RigthIcon
                    name={
                        activeSection[0] == index
                        ? "keyboard-arrow-up"
                        : "keyboard-arrow-down"
                    } size={24} 
                />
                
            </VerFlexView>
        )
    }

    const renderSectionContent = ({ id, title, wifiName, wifiPw}) => {
        return (
            <View style={{display : 'flex', alignItems : 'center', marginBottom : '5%'}}>
                <QRCode value={`WIFI:S:${wifiName};T:WPA;P:${wifiPw};;`} size={80}/>
            </View>
        )
    }

    const updateSections = (active) => {
        
        setActiveSection((state)=>{
           return state.toString() == active.toString() ? [] : active
        });
    }
    
    return(
        <Accordion 
            sections={sectionDatas}
            activeSections={activeSection}
            renderHeader={renderSectionHeader}
            renderContent={renderSectionContent}
            onChange={updateSections}
            underlayColor={"white"}
        />
    )
}

export default WifiInfoCard;
