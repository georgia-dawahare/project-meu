import React, { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, Image, TouchableOpacity, Modal, Dimensions, Alert,
} from 'react-native';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { FontAwesome5 } from '@expo/vector-icons';
import axios from 'axios';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { apiUrl } from '../../constants/constants';

const { width } = Dimensions.get('window');

function BackgroundChange({ navigation }) {
  const [backgroundImage, setBackgroundImage] = useState('https://www.figma.com/file/PYeh3GKvg4VwmsTEXIc0Bs/image/72d9c95e3b736ee06dd3ba6eacc4b048d82d7218?fuid=1112504140237920766');
  const [isMenuVisible, setMenuVisible] = useState(false);
  const [userId, setUserId] = useState('');
  const backgroundColor = 'rgba(83, 83, 83, 0.8';
  const auth = getAuth();

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Permission to access camera was denied');
      }

      const { status: rollStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (rollStatus !== 'granted') {
        Alert.alert('Permission Denied', 'Permission to access camera roll was denied');
      }
    })();
  }, []);

  useEffect(() => {
    // Get current user from auth
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        console.log('No user logged in');
      }
    });
  }, []);

  const updatePartnerBackground = async (photoUri) => {
    let userDoc, pair, pairId, partnerDoc;

    setBackgroundImage(photoUri);

    // Get user from Firestore
    if (userId) {
      userDoc = await axios.get(`${apiUrl}/users/${userId}`);
      pairId = userDoc?.data?.pair_id;
    }

    // Get pair from Firestore
    if (pairId) {
      pairDoc = await axios.get(`${apiUrl}/pairs/${pairId}`);
      const pair = pairDoc.data;
    }

    // Get partner from Firestore
    if (pair) {
      // Figure out which user the current user is
      console.log(pair.user1_id);
      if (userId === pair.user1_id) {
        console.log('yes');
        partnerDoc = await axios.get(`${apiUrl}/users/${pair.user2_id}`);
      } else if (userId === pair.user2_id) {
        partnerDoc = await axios.get(`${apiUrl}/users/${pair.user1_id}`);
      } else {
        console.log('Could not find partner');
      }
      console.log('partner doc', partnerDoc);
    }

    // console.log('partner', partnerDoc.data);

    // Update partner's background
    // if (partnerDoc) {
    //   // partnerDoc = await axios.patch(`${apiUrl}/users/${userId}`);
    //   console.log(userId);
    // }

    // return pair;
  };

  const toggleMenu = () => {
    setMenuVisible(!isMenuVisible);
  };

  const handleMenuOptionClick = async (option) => {
    // Menu option handling code...
    if (option === 'Camera') {
      const { status } = await Camera.requestCameraPermissionsAsync();
      if (status === 'granted') {
        const result = await ImagePicker.launchCameraAsync({
          allowsEditing: true,
          quality: 1,
        });
        if (!result.canceled) {
          await updatePartnerBackground(result.assets[0].uri);
        }
      } else {
        Alert.alert('Permission to access camera was denied');
      }
    } else if (option === 'Gallery') {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status === 'granted') {
        const result = await ImagePicker.launchImageLibraryAsync({
          allowsEditing: true,
          quality: 1,
        });
        if (!result.canceled) {
          await updatePartnerBackground(result.assets[0].uri);
        }
      } else {
        Alert.alert('Permission to access camera roll was denied');
      }
    } else if (option === 'Remove Widget') {
      setBackgroundImage(null);
    }
  };

  const handleOverlayPress = () => {
    setMenuVisible(false);
  };

  return (
    <View style={[styles.container, { backgroundColor }]}>
      {backgroundImage && (
        <Image
          source={{ uri: backgroundImage }}
          style={styles.image}
          resizeMode="cover"
        />
      )}

      <View style={styles.container}>

        <TouchableOpacity style={styles.iconButton} onPress={toggleMenu}>
          <FontAwesome5 name="edit" size={22} color="white" />
        </TouchableOpacity>
        <Modal
          visible={isMenuVisible}
          transparent
          animationType="slide"
        >
          <TouchableOpacity style={styles.overlay} onPress={handleOverlayPress} activeOpacity={1}>
            <View style={styles.menuContainer}>
              <View style={styles.menuMask}>
                <TouchableOpacity
                  style={styles.menuOption1}
                  onPress={() => handleMenuOptionClick('Gallery')}
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
                  style={styles.menuOption2}
                  onPress={() => handleMenuOptionClick('Remove Widget')}
                >
                  <Text style={styles.menuOptionText}>Remove Widget Image</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.closeButton} onPress={toggleMenu}>
                  <Text style={styles.closeButtonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        </Modal>
      </View>
    </View>
  );
}

export default BackgroundChange;

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    height: 120,
    width: 120,
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },

  image: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 15,
    backgroundColor: 'rgba(175, 175, 175, 0.8)',
  },

  iconButton: {
    marginTop: 0,
    marginLeft: 0,
    padding: 10,
  },

  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    borderRadius: 15,
  },

  menuContainer: {
    position: 'absolute',
    width: 359,
    height: 213,
    left: (width - 359) / 2 + 0.5,
    top: 553,
    backgroundColor: 'transparent',
    borderRadius: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },

  menuMask: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },

  menuOption: {
    paddingVertical: 20,
    paddingHorizontal: 30,
    backgroundColor: 'lightgray',
    borderTopWidth: 1,
    borderColor: 'darkgray',
    alignItems: 'center',
  },

  menuOption1: {
    paddingVertical: 20,
    paddingHorizontal: 30,
    backgroundColor: 'lightgray',
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    borderTopWidth: 1,
    borderColor: 'darkgray',
    alignItems: 'center',
  },

  menuOption2: {
    paddingVertical: 20,
    paddingHorizontal: 30,
    backgroundColor: 'lightgray',
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 18,
    borderTopWidth: 1,
    borderColor: 'darkgray',
    alignItems: 'center',
  },

  closeButton: {
    paddingVertical: 20,
    paddingHorizontal: 30,
    backgroundColor: 'white',
    marginTop: 10,
    borderRadius: 15,
    alignItems: 'center',
  },

  menuOptionText: {
    textAlign: 'center',
    color: '#007AFF',
    fontWeight: '500',
    fontSize: 18,
  },

  menuOptionText2: {
    textAlign: 'center',
    color: 'darkgray',
    fontWeight: '500',
    fontSize: 14,
  },

  closeButtonText: {
    fontSize: 18,
    color: '#007AFF',
    fontWeight: '500',
  },
});
