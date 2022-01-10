import React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/Fontisto';

// modules
import MainView from './src/Main';
import { CirecleBtn } from './src/components/Button';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <MainView />
      <CirecleBtn>
        <Icon name="camera" color="white"/>
      </CirecleBtn>
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