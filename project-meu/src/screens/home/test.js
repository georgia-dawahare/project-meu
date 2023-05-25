import React, {useState, useEffect} from 'react';
import {Alert, Modal, StyleSheet, Text, Pressable, View, TouchableOpacity, Image} from 'react-native';
import Button from '../../components/Button'
import RegistrationInput from '../../components/RegistrationInput'
import { Ionicons } from '@expo/vector-icons';
import { FAB } from 'react-native-elements';

const test = () => {
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    async function loadFont() {
      await Font.loadAsync({
        'SF-Pro-Display-Bold': '../../../assets/fonts/SF-Pro-Display-Bold.otf',
        // 'SF-Pro-Display-Semibold': '../../../assets/fonts/SF-Pro-Display-Semibold.otf',
        // 'SF-Pro-Display-Medium': '../../../assets/fonts/SF-Pro-Display-Medium.otf',
      });
    }

    loadFont();
  }, []);

  const handlePress = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.centeredView}>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>

        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.modalContent}>
                <Text style={styles.Title}>Date</Text>
                <Text style={styles.Title}>Title</Text>
                <RegistrationInput
                style={styles.Title}
                placeholder='Enter Title'
                />
                <Text style={styles.Title}>Repeat</Text>
            </View>
            <Pressable style={[styles.button, styles.buttonClose]} onPress={()=>setModalVisible(!modalVisible)}>
                    <Ionicons name="ios-close" size={24} color="black" />
            </Pressable>
            <Button title="Add Event" buttonStyle={{ top: 395 }}/>
          </View>
          
        </View>
      </Modal>

      

      <FAB
        icon={<Ionicons name="ios-add" size={24} color="white" />}
        buttonStyle={styles.FAB}
        size="large"
        placement='right'
        onPress={handlePress}
    />

    </View>
  );
};

const styles = StyleSheet.create({
  FAB:{
      backgroundColor:'rgba(230, 43, 133, 1)',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection:'column',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width:342,
    height:475,
  },
  modalContent: {
    alignItems: 'flex-start',
    marginBottom: 20,
    
  },
  button: {
    borderRadius: 100,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    // backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  Title: {
    fontFamily:'SF-Pro-Display-Bold',
    fontSize:20,
    marginBottom: 20,
    lineHeight:24,
    textAlign:'center',
    left:-110,
  },
});

export default test;