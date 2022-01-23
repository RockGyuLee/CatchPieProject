import React, {useState, useLayoutEffect, useRef, useEffect} from "react";
import {t} from 'react-native-tailwindcss';
import styled from 'styled-components';
import { Text, Animated, Platform, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import QRCode from "react-qr-code";

//modules
import { Header, InfoText } from "./Text";

const AnimatedTouchable = Animated.createAnimatedComponent(Pressable);

const VerFlexView = styled(AnimatedTouchable)`
    background-color : #D8E5C4;
    ${[t.flexCol, t.mX3, t.mB3, t.pT2, t.pB2, t.pL2, t.roundedLg]};
`

const RigthIcon = styled(Icon)`
    ${[ t.absolute, t.right0, t.bottom0, t.mR3, t.mB3]};
`

const defaultH = t.h32['height'];
const increaseH = t.h64['height'];


function MView({ data, update2Data, idx, ...props}){

    const {title, wifiName, wifiPw } = data;


    const fadeAnim = useRef(new Animated.Value(0)).current;

    // 카드의 열고닫힌 상태
    const [isOpenCard, setIsOpenCard] = useState(false);

    // card의 dynamic size 변수
    const [size, ] = useState(new Animated.Value(defaultH))

    useLayoutEffect(() => {
        if(isOpenCard){
            Animated.timing(
                size,
                {
                    toValue:  increaseH,
                    duration: 500,
                    useNativeDriver: false
                },
            ).start()
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 500,
                useNativeDriver: false
            }).start();
        }else {
            Animated.timing(
                size,
                {
                    toValue:  defaultH,
                    duration: 500,
                    useNativeDriver: false
                },
            ).start()
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 500,
                useNativeDriver: false
            }).start();
        }
        
    }, [isOpenCard]);
    
    // 카드의 열림/닫힘 상태 변환 함수.
    const changeCardState = () => {
        setIsOpenCard(s => !s)
    }

    const onPressLong = () => {        
        update2Data && update2Data(idx);
    }

    return(
        <VerFlexView isOpen={isOpenCard} style={{ height: size, ...Platform.select({
            ios: {
                shadowColor: 'rgba(0, 0, 0, 0.1)', 
                shadowOpacity: 0.5,
                shadowRadius: 25, 
                shadowOffset: {width: 0, height: 20}, 
            },
            android: {
                elevation: 3,
            },
          })}} onPress={changeCardState} onLongPress={onPressLong}>
                <Header title={title}/>
                <InfoText id={wifiName} pw={wifiPw}/>
                <RigthIcon key={Math.random()} name={
                    isOpenCard ? "keyboard-arrow-up" : "keyboard-arrow-down"
                } size={24} />
                <Animated.View style={{ marginTop : '5%', opacity : fadeAnim, display : 'flex',alignItems : 'center', justifyContent : 'center'}}>
                    <QRCode value={`WIFI:S:${wifiName};T:WPA;P:${wifiPw};;`} size={80}/>
                </Animated.View>
        </VerFlexView>
    )
}

export default MView