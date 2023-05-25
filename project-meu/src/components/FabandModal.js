import React, { useState } from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FAB } from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';
import SelectBox from 'react-native-multi-selectbox'

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
]

const FabandModal = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [date, setDate] = useState(new Date());
  const [title, setTitle] = useState('');
  const [repeat, setRepeat] = useState('');
  const [selectedTeam, setSelectedTeam] = useState({})
  const [selectedTeams, setSelectedTeams] = useState([])

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

  const handleAddEvent = () => {
    console.log('Date:', date);
    console.log('Title:', title);
    console.log('Repeat:', selectedTeam);

    setModalVisible(false);

    setModalVisible(false);
    setDate(new Date());
    setTitle('');
    setSelectedTeam('Never');
  };

  function onChange() {
    return (val) => setSelectedTeam(val)
  };

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
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
                style={[styles.dateTimePicker,{marginTop:10}]}
                  value={date}
                  mode="date"
                  display="default"
                  onChange={handleDateChange}
                />


              <Text style={[styles.title,{ marginTop: 32 }]}>Title</Text>
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
        backgroundColor: 'rgba(230, 43, 133, 1)',
        position:'relative',
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
    top:15,
    right:24,
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
  selectBox:{
    width:300,
    fontSize:14,
  },
  buttonContainer: {
    backgroundColor: 'rgba(230, 43, 133, 1)',
    fontFamily: 'SFProDisplay-Semibold',

    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',

    height: 56,
    width: 300,
    borderRadius: 15,
    marginTop:20,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
  },

});

export default FabandModal;