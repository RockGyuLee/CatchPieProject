import React, {useState, useLayoutEffect} from 'react';
import { ScrollView } from 'react-native';
// import styled from 'styled-components';

//modules
import MView from './components/View';
import UpdateCard from "./components/UpdateCard";


function MainView(props){
    const { rows } = props.data;

    const count = Array.from(Array(rows.length).keys());

    const update2Data = (selected_idx) => {
        props.update2Data && props.update2Data(selected_idx);
    }

    return (
        <ScrollView>
            {
                count.map( (i, idx ) =>{
                    let { ID, TITLE, WIFI_NAME, WIFI_PW} = rows.item(idx);
                    if( idx == props.updateCard ){
                        return (
                            <UpdateCard key={idx} cardId={ID} 
                                update2Data={update2Data}
                                data={{
                                    title : TITLE,
                                    wifiName : WIFI_NAME,
                                    wifiPw : WIFI_PW
                            }}/>
                        )
                    }
                    return (
                        <MView key={idx} idx={idx} update2Data={update2Data} data={{
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