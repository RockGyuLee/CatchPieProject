import React, {useState, useLayoutEffect} from 'react';
import { ScrollView } from 'react-native';
// import styled from 'styled-components';

//modules
import MView from './components/View';


function MainView(props){
    const { rows } = props.data;

    const count = Array.from(Array(rows.length).keys());

    return (
        <ScrollView>
            {
                count.map( (i, idx ) =>{
                    let { TITLE, WIFI_NAME, WIFI_PW} = rows.item(idx);
                    return (
                        <MView key={idx} idx={idx} data={{
                            title : TITLE,
                            wifiName : WIFI_NAME,
                            wifiPw : WIFI_PW
                        }}/>
                    )
                })
            }
        </ScrollView>
    )
}

export default MainView