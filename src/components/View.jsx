import React, {useState, useLayoutEffect, useRef} from "react";
import {t} from 'react-native-tailwindcss';
import styled from 'styled-components';
import { View, TouchableOpacity, Text, Animated, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

//modules
import { Header, InfoText } from "./Text";

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

const VerFlexView = styled(AnimatedTouchable)`
    background-color : #D8E5C4;
    ${[t.flexCol, t.mX3, t.mB3, t.pT2, t.pB2, t.pL2, t.roundedLg]};
`

const RigthIcon = styled(Icon)`
    ${[ t.absolute, t.right0, t.bottom0, t.mR3, t.mB3]};
`

function MView({ data, ...props}){

    const {title, wifiName, wifiPw } = data;

    const defaultH = t.h32['height'];
    const increaseH = t.h64['height']

    const fadeAnim = useRef(new Animated.Value(0)).current;

    // 카드의 열닫 상태
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
        
    }, [isOpenCard])
    
    // 카드의 열림/닫힘 상태 변환 함수.
    const changeCardState = () => {
        setIsOpenCard(s => !s)
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
          })}} onPress={changeCardState}>
                <Header title={title}/>
                <InfoText id={wifiName} pw={wifiPw}/>
                    <RigthIcon key={Math.random()} name={
                        isOpenCard ? "keyboard-arrow-up" : "keyboard-arrow-down"
                    } size={24} />
                <Animated.View style={{opacity : fadeAnim}}>
                    <Text>test</Text>
                </Animated.View>
        </VerFlexView>
    )
}

export default MView