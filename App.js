import React, { useState, useCallback, useLayoutEffect } from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Modal from "react-native-modal";
import SQLite from 'react-native-sqlite-storage';
// modules
import MainView from './src/Main';
import { CirecleBtn } from './src/components/Button';
import ImageModal from './src/components/Modal';


SQLite.DEBUG(true);

export default function App() {

  
  const [isModalVisible, setModalVisible] = useState(false);

  const [data, setData] = useState(null);

  useLayoutEffect(()=>{
      var db = SQLite.openDatabase({name : "catchPieDB.db",createFromLocation: 1});
      db.transaction(tx => {
          tx.executeSql('SELECT * FROM catchPie', [], (ttx, results)=>{
              setData(results);
          })
      })
      return ()=>{
          db.close()
      }
  }, [])

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <SafeAreaView style={styles.container}>
      {
        data && <MainView data={data}/>
      }
      <CirecleBtn  onPress={toggleModal}>
        <Icon name="plus" color="white" size={25}/>
      </CirecleBtn>
      <Modal isVisible={isModalVisible}>
        <ImageModal onPress={toggleModal} setVisible={setModalVisible}/>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop : '10%',
    width : "100%",
    height : "100%"
  },
});