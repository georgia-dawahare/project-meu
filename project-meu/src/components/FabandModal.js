/* eslint-disable global-require */
import React, { useState, useEffect } from 'react';
import {
  Alert, Modal, StyleSheet, Text, Pressable, View, TextInput, TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FAB } from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';
import SelectBox from 'react-native-multi-selectbox';
import * as Font from 'expo-font';
import axios from 'axios';
import auth from '../services/datastore';
import { apiUrl } from '../constants/constants';

const K_OPTIONS = [
  {
    item: 'Never',
    id: 'NV',
  },
  {
    item: 'Every Month',
    id: 'EM',
  },
  {
    item: 'Every Year',
    id: 'EY',
  },
];

function FabandModal({ fetchData }) {
  const [fontLoaded, setFontLoaded] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [date, setDate] = useState(new Date());
  const [title, setTitle] = useState('');
  const [selectedTeam, setSelectedTeam] = useState({});
  const [anniversaries, setAnniversaries] = useState([]);
  const [userpairID, setuserpairID] = useState('');
  const [userId, setUserId] = useState('');

  useEffect(() => {
    async function loadFont() {
      await Font.loadAsync({
        'SF-Pro-Display-Bold': require('../../assets/fonts/SF-Pro-Display-Bold.otf'),
        'SF-Pro-Display-Semibold': require('../../assets/fonts/SF-Pro-Display-Semibold.otf'),
      });

      setFontLoaded(true);
    }

    loadFont();
  }, []);

  useEffect(() => {
    setUserId(auth?.currentUser?.uid);
  }, [userpairID]);

  useEffect(() => {
    const getUser = async () => {
      const user = await axios.get(`${apiUrl}/users/${userId}`);
      const userInfo = user.data;

      if (userInfo) {
        setuserpairID(userInfo.pair_id);
      }
    };
    if (userId) {
      getUser();
    }
  }, [userId]);

  // console.log('userID :    ', userpairID);

  if (!fontLoaded) {
    return <Text>Loading...</Text>;
  }

  const handlePress = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
  };

  const handleAddEvent = async () => {
    const eventData = {
      date,
      title,
      repeat: selectedTeam.item,
      pairId: userpairID,
    };

    // Push to db
    const eventId = await axios.post(`${apiUrl}/events/`, eventData);

    setAnniversaries([...anniversaries, {
      date, title, eventId, repeat: selectedTeam.item, pairId: '1',
    }]);

    await fetchData();

    setModalVisible(false);
    setDate(new Date());
    setTitle('');
    setSelectedTeam('Never');
  };

  function onChange() {
    return (val) => setSelectedTeam(val);
  }

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(false);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <View style={styles.modalContent}>
              <Text style={[styles.title]}>Date</Text>
              <DateTimePicker
                style={[styles.dateTimePicker, { marginTop: 10 }]}
                value={date}
                mode="date"
                display="default"
                onChange={handleDateChange}
              />

              <Text style={[styles.title, { marginTop: 32 }]}>Title</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter Title"
                value={title}
                onChangeText={setTitle}
              />
              <View style={styles.line} />
              <Text style={[styles.title, { marginTop: 32 }]}>Repeat</Text>
              <View style={styles.selectBox}>
                <SelectBox
                  label=""
                  options={K_OPTIONS}
                  value={selectedTeam}
                  onChange={onChange()}
                  hideInputFilter={false}
                />
              </View>
            </View>

            <Pressable style={[styles.button, styles.buttonClose]} onPress={closeModal}>
              <Ionicons name="ios-close" size={24} color="black" />
            </Pressable>

            <TouchableOpacity style={[styles.buttonContainer]} onPress={handleAddEvent}>
              <Text style={styles.buttonText}>Add Event</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <FAB
        icon={<Ionicons name="ios-add" size={30} color="white" />}
        buttonStyle={styles.FAB}
        size="large"
        placement="right"
        onPress={handlePress}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  FAB: {
    backgroundColor: 'rgba(230, 43, 133, 1)',
    top: -3,
    left: -1,
    // position: 'relative',
    // alignItems: 'center',
  },
  container: {
    flex: 1,
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalContent: {
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  button: {
    borderRadius: 100,
    position: 'absolute',
    top: 15,
    right: 24,
    elevation: 2,

  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  title: {
    fontFamily: 'SF-Pro-Display-Bold',
    fontSize: 20,
    marginBottom: 10,
    lineHeight: 24,
    textAlign: 'center',
  },
  input: {
    height: 56,
    width: 300,
    borderColor: 'gray',
    fontSize: 16,
    color: '#828282',
  },
  line: {
    width: 300,
    height: 0.5,
    backgroundColor: '#4f4f4f',
    alignSelf: 'center',
  },
  selectBox: {
    width: 300,
    fontSize: 14,
  },
  buttonContainer: {
    backgroundColor: 'rgba(230, 43, 133, 1)',
    fontFamily: 'SF-Pro-Display-Semibold',

    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',

    height: 56,
    width: 300,
    borderRadius: 15,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
  },

});

export default FabandModal;
