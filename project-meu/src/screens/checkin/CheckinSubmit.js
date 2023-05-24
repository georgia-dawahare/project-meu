import React, { useState } from 'react';
import {
  View, Text,
  SafeAreaView,
  StyleSheet, Image, TouchableOpacity, Modal,
} from 'react-native';
import {
  Card,
} from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';

function BackgroundChange() {
  const [backgroundImage, setBackgroundImage] = useState(null);
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
      {backgroundImage && (
        <Image
          source={{ uri: backgroundImage }}
          style={styles.image}
          resizeMode="cover"
        />
      )}
      <Card containerStyle={styles.cardContainer}>
        <Text>HELLO</Text>
        <Card.Title style={styles.question}>What is your most treasured memory of us?</Card.Title>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('CheckinSubmit')}>
          <Text style={styles.buttonText}>
            Submit a Response
          </Text>
        </TouchableOpacity>
      </Card>
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
              <Text style={styles.menuOptionText2}>Edit Partners Widget</Text>
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
  text: {
    textAlign: 'center',
    fontSize: 20,
    fontFamily: 'SF-Pro-Display-Bold',
    marginBottom: 20,
  },
  cardContainer: {
    borderRadius: 15,
    padding: 20,
  },
  question: {
    textAlign: 'center',
    fontSize: 28,
    fontFamily: 'SF-Pro-Display-Bold',
    margin: 20,
  },
  buttonText: {
    fontFamily: 'SF-Pro-Display-Bold',
    color: 'white',
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
});
