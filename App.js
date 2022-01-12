import React, { useState, useCallback } from 'react';
import { StyleSheet, SafeAreaView, View, Text, Button } from 'react-native';
import Icon from 'react-native-vector-icons/Fontisto';
import Modal from "react-native-modal";
import * as ImagePicker from 'react-native-image-picker';

// modules
import MainView from './src/Main';
import { CirecleBtn } from './src/components/Button';
import ImageModal from './src/components/Modal';

export default function App() {

  const [pickerResponse, setPickerResponse] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const onCameraPress = useCallback(() => {
    const options = {
      saveToPhotos: true,
      mediaType: 'photo',
      includeBase64: false,
    };
    ImagePicker.launchCamera(options, setPickerResponse);
  }, []);

  const onImageLibraryPress = useCallback(() => {
    const options = {
      selectionLimit: 1,
      mediaType: 'photo',
      includeBase64: false,
    };
    ImagePicker.launchImageLibrary(options, setPickerResponse);
  }, []);

  console.log("picker",pickerResponse)

  return (
    <SafeAreaView style={styles.container}>
      <MainView />
      <CirecleBtn  onPress={toggleModal}>
        <Icon name="camera" color="white" size={20}/>
      </CirecleBtn>
      <Modal isVisible={isModalVisible}>
        <ImageModal onPress={toggleModal}/>
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