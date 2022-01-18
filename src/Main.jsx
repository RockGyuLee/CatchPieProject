import React, {useState, useEffect} from 'react';
import { ScrollView } from 'react-native';
// import styled from 'styled-components';

//modules
import MView from './components/View';


<<<<<<< HEAD
function MainView(){
    const count = [1,2,3,4,5,6,7,8];
    const [data, setData] = useState(null);

    useEffect(()=>{
        let db = SQLite.openDatabase({name : "catchPieDB.db",createFromLocation: 1});
        db.transaction(tx => {
            tx.executeSql('SELECT * FROM catchPie', [], (ttx, results)=>{
                setData(results);
                // let len = results.rows.length;
                // for (let i = 0; i < len; i++) {
                //     let row = results.rows.item(i);
                //     console.log("item", row);
                // }
            })
        })
        
        return () => {
            db.close();
        }
    }, [])
=======
function MainView(props){
    const { rows } = props.data;

    const count = Array.from(Array(rows.length).keys());
>>>>>>> master

    console.log("data",data);

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