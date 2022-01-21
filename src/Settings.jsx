import React from "react";
import { SafeAreaView, ScrollView } from 'react-native';


//modules
import { styles } from "../App";
import UpdateCard from "./components/UpdateCard";

function Settings( props ){

    const { rows } = props.data;

    const count = Array.from(Array(rows.length).keys());

    return(
        <SafeAreaView style={styles.container}>
            <ScrollView>
                {
                    count.map( (i, idx ) =>{
                        let { TITLE, WIFI_NAME, WIFI_PW} = rows.item(idx);
                        return (
                            <UpdateCard key={idx} idx={idx} data={{
                                title : TITLE,
                                wifiName : WIFI_NAME,
                                wifiPw : WIFI_PW
                            }}/>
                        )
                    })
                }
            </ScrollView>
            {/* <DefaultBtn>
            <Text>저장</Text>
            </DefaultBtn>
            <DefaultBtn >
            <Text>취소</Text>
            </DefaultBtn> */}
        </SafeAreaView>
    )
}

export default Settings;