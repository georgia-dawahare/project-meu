// import React, {useState, useEffect} from 'react';
// import {Alert, Modal, StyleSheet, Text, Pressable, View, TouchableOpacity, Image} from 'react-native';
// import Button from '../../components/Button'
// import RegistrationInput from '../../components/RegistrationInput'
// import { Ionicons } from '@expo/vector-icons';
// import { FAB } from 'react-native-elements';

// const test = () => {
//   const [modalVisible, setModalVisible] = useState(false);

//   useEffect(() => {
//     async function loadFont() {
//       await Font.loadAsync({
//         'SF-Pro-Display-Bold': '../../../assets/fonts/SF-Pro-Display-Bold.otf',
//         // 'SF-Pro-Display-Semibold': '../../../assets/fonts/SF-Pro-Display-Semibold.otf',
//         // 'SF-Pro-Display-Medium': '../../../assets/fonts/SF-Pro-Display-Medium.otf',
//       });
//     }

//     loadFont();
//   }, []);

//   const handlePress = () => {
//     setModalVisible(true);
//   };

//   const closeModal = () => {
//     setModalVisible(false);
//   };

//   return (
//     <View style={styles.centeredView}>

//       <Modal
//         animationType="slide"
//         transparent={true}
//         visible={modalVisible}
//         onRequestClose={() => {
//           Alert.alert('Modal has been closed.');
//           setModalVisible(!modalVisible);
//         }}>

//         <View style={styles.centeredView}>
//           <View style={styles.modalView}>
//             <View style={styles.modalContent}>
//                 <Text style={styles.Title}>Date</Text>
//                 <Text style={styles.Title}>Title</Text>
//                 <RegistrationInput
//                 style={styles.Title}
//                 placeholder='Enter Title'
//                 />
//                 <Text style={styles.Title}>Repeat</Text>
//             </View>
//             <Pressable style={[styles.button, styles.buttonClose]} onPress={()=>setModalVisible(!modalVisible)}>
//                     <Ionicons name="ios-close" size={24} color="black" />
//             </Pressable>
//             <Button title="Add Event" buttonStyle={{ top: 395 }}/>
//           </View>
          
//         </View>
//       </Modal>

      

//       <FAB
//         icon={<Ionicons name="ios-add" size={24} color="white" />}
//         buttonStyle={styles.FAB}
//         size="large"
//         placement='right'
//         onPress={handlePress}
//     />

//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   FAB:{
//       backgroundColor:'rgba(230, 43, 133, 1)',
//   },
//   centeredView: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     flexDirection:'column',
//   },
//   modalView: {
//     margin: 20,
//     backgroundColor: 'white',
//     borderRadius: 15,
//     padding: 55,
//     alignItems: 'center',
//     // justifyContent:'space-between',
//     shadowColor: '#c4c4c4',
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 15,
//     elevation: 5,
//     width:342,
//     height:475,
//   },
//   modalContent: {
//     alignItems: 'flex-start',
//     marginBottom: 20,
    
//   },
//   button: {
//     borderRadius: 100,
//     padding: 10,
//     elevation: 2,
//   },
//   buttonOpen: {
//     backgroundColor: '#F194FF',
//   },
//   buttonClose: {
//     // backgroundColor: '#2196F3',
//   },
//   textStyle: {
//     color: 'white',
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
//   Title: {
//     fontFamily:'SF-Pro-Display-Bold',
//     fontSize:20,
//     marginBottom: 20,
//     lineHeight:24,
//     textAlign:'center',
//     left:-110,
//   },
// });

// export default test;


import React, { useState } from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Button from '../../components/Button';
import DatePicker from 'react-native-date-picker';
// import RegistrationInput from '../../components/RegistrationInput';

const Test = () => {
  const [modalVisible, setModalVisible] = useState(false);
  // const [date, setDate] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [title, setTitle] = useState('');
  const [repeat, setRepeat] = useState('');

  const handlePress = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleAddEvent = () => {
    // Perform event addition logic here
    console.log('Date:', date);
    console.log('Title:', title);
    console.log('Repeat:', repeat);

    // Close the modal
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <View style={styles.modalContent}>
              <Text style={styles.title}>Date</Text>
              {/* <View style={[styles.container2]}>
                <View style={[styles.inputContainer]}>
                  <TextInput style={styles.input} placeholder="{placeholder}" editable="true" />
                </View>
                <View style={styles.line} />
              </View> */}
              {/* <DatePicker date={date} onDateChange={setDate} /> */}
              {/* <DatePicker
        modal
        open='true'
        date={date}
        onConfirm={(date) => {
          setOpen(false)
          setDate(date)
        }}
        onCancel={() => {
          setOpen(false)
        }}
      /> */}

              <Text style={styles.title}>Title</Text>
              <View style={[styles.container2]}>
                <View style={[styles.inputContainer]}>
                  <TextInput style={styles.input} placeholder="Enter Title" editable="true" />
                </View>
                <View style={styles.line} />
              </View>

              <Text style={styles.title}>Repeat</Text>
              {/* <View style={[styles.container2]}>
                <View style={[styles.inputContainer]}>
                  <TextInput style={styles.input} placeholder="{placeholder}" editable="true" />
                </View>
                <View style={styles.line} />
              </View> */}
              <Button title="Save Event" onPress={handleAddEvent} buttonStyle={{ top: 376 }} />
            </View>

            <Pressable style={[styles.button, styles.buttonClose]} onPress={closeModal}>
              <Ionicons name="ios-close" size={24} color="black" />
            </Pressable>

            
          </View>
        </View>
      </Modal>

      <DatePicker
  date={date}
  onDateChange={setDate}
  mode="date"
/>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  title: {
    fontFamily: 'SF-Pro-Display-Bold',
    fontSize: 20,
    marginBottom: 10,
    lineHeight: 24,
    textAlign: 'center',
  },
  input: {
    height: 40,
    width: 300,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  inputContainer: {
    width: 300,
    height: 56,
    backgroundColor: 'rgba(0, 0, 0, 0)',
    justifyContent: 'center',
    paddingHorizontal: 0,
    alignItems: 'left',
  },
  input: {
    fontSize: 16,
    color: '#828282',
    textAlign: 'center',
  },
  line: {
    width: 300,
    height: 1,
    backgroundColor: '#4f4f4f',
    alignSelf: 'center',
  },
  container333: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Test;