import React, {useState, useLayoutEffect} from 'react';
import { ScrollView } from 'react-native';
// import styled from 'styled-components';
import SQLite from 'react-native-sqlite-storage';

//modules
import MView from './components/View';

SQLite.DEBUG(true);

function MainView(){
    const count = [1,2,3,4,5,6,7,8];
    // const [db, setDB] = useState(null);

    useLayoutEffect(()=>{
        var db = SQLite.openDatabase({name : "catchPieDB.db",createFromLocation: 1});
        console.log("db",db)
        db.transaction(tx => {
            tx.executeSql('SELECT * FROM catchPie', [], (ttx, results)=>{
                let len = results.rows.length;
                for (let i = 0; i < len; i++) {
                    let row = results.rows.item(i);
                    console.log("item", row);
                }
            })
        })
    }, [])

    return (
        <ScrollView>
            {
                count.map( (i, idx ) =>{
                    return (
                        <MView key={idx} idx={idx}/>
                    )
                })
            }
            {/* <MView /> */}
        </ScrollView>
    )
}

export default MainView