import React, { useState } from 'react';
import {
  View, Text,
  SafeAreaView,
  StyleSheet, Image, TouchableOpacity, Modal,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import TopBar from '../../components/TopBar';
import ClockAndLocation from '../../components/ClockAndLocation';
import PictureThumbnail from '../../components/PictureThumbnail'; 

function BackgroundChange({navigation}) {
  const [backgroundImage, setBackgroundImage] = useState('https://www.figma.com/file/PYeh3GKvg4VwmsTEXIc0Bs/image/d8a98af1d41d8274cf130bbb5bf82d5862df78f6?fuid=1112504140237920766');
  const [isMenuVisible, setMenuVisible] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState('transparent');

  const toggleMenu = () => {
    setMenuVisible(!isMenuVisible);
  };

  // using expo's now, let's see how it goes
  const handleMenuOptionClick = async (option) => {
    console.log(`Clicked option:, ${option}`);

    if (option === 'Remove Widget') {
      // need to get this working soon
      setBackgroundColor('white');
    } else {
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled) {
        setBackgroundImage(result.assets[0].uri);

        console.log(result);
      } else {
        console.log('You did not select any image.');
      }
    }
  };

  return (

    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <TopBar />
      {backgroundImage && (
        <Image
          source={{ uri: backgroundImage }}
          style={styles.image}
          resizeMode="cover"
        />
      )}
      <View>
        <TopBar navigation={navigation}/>
        <PictureThumbnail/>
      </View>
      <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={toggleMenu}>
          <Text>Open Menu</Text>
        </TouchableOpacity>
        <Modal
          visible={isMenuVisible}
          transparent
          animationType="slide"
        >
          <View style={styles.menuContainer}>
            <TouchableOpacity
              style={styles.menuOption}
              onPress={() => handleMenuOptionClick('Edit Partners Widget')}
            >
              <Text style={styles.menuOptionText2}>Edit Partner&apos;s Widget</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.menuOption}
              onPress={() => handleMenuOptionClick('Gallery')}
            >
              <Text style={styles.menuOptionText}>Choose From Gallery</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.menuOption}
              onPress={() => handleMenuOptionClick('Camera')}
            >
              <Text style={styles.menuOptionText}>Camera</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.menuOption}
              onPress={() => handleMenuOptionClick('Remove Widget')}
            >
              <Text style={styles.menuOptionText}>Remove Widget Image </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.closeButton} onPress={toggleMenu}>
              <Text>Close</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
      <View>
        <ClockAndLocation/>
      </View>
    </SafeAreaView>
  );
}

export default BackgroundChange;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },

  image: {
    ...StyleSheet.absoluteFillObject,
  },

  containerText: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    color: '#808080',
  },

  // mainly for testing purposes, this must be replaced with an the edit icon i believe
  button: {
    marginTop: 700,
    padding: 10,
    backgroundColor: 'lightblue',
    borderRadius: 5,
  },

  menuContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',

  },

  menuOption: {
    paddingVertical: 20,
    paddingHorizontal: 30,
    backgroundColor: 'lightgray',
    borderTopWidth: 1,
    borderColor: 'darkgray',
    alignItems: 'center',
  },

  closeButton: {
    paddingVertical: 20,
    paddingHorizontal: 30,
    backgroundColor: 'white',
    marginTop: 10,
    alignItems: 'center',
  },

  menuOptionText: {
    textAlign: 'center',
    color: '#007AFF',
    fontWeight: 500,
    fontSize: 18,

  },
  menuOptionText2: {
    textAlign: 'center',
    color: '#000000',
    fontWeight: 300,
    fontSize: 15,
  },

  calendarModal: {

  },
});
