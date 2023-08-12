/* eslint-disable global-require */
import React, { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, Image, TouchableOpacity, Modal, Dimensions, Alert, SafeAreaView,
} from 'react-native';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { useSelector, useDispatch } from 'react-redux';
import { updateUser } from '../../actions/UserActions';

const { width } = Dimensions.get('window');

function BackgroundChange({
  toggleMenu, setMenuVisible, isMenuVisible,
}) {
  const [backgroundImage, setBackgroundImage] = useState('');
  const partner = useSelector((state) => state.partnerState.partnerData);
  const dispatch = useDispatch();

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

  // Set partner background
  useEffect(() => {
    if (!backgroundImage) {
      setBackgroundImage(partner.backgroundPhoto);
    }
  }, []);

  const updatePartnerBackground = async (photoUri) => {
    setBackgroundImage(photoUri);

    // Update partner's background in MongoDB & Redux
    const updatedPhoto = { backgroundPhoto: photoUri };
    dispatch(updateUser(partner._id, updatedPhoto));
    toggleMenu();
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
    <View style={styles.container}>
      {backgroundImage ? (
        <Image
          source={{ uri: backgroundImage }}
          style={styles.image}
          resizeMode="cover"
        />
      ) : (
        <Image
          source={require('../../../assets/images/defaultPartnerBackground.png')}
          style={styles.image}
        />
      )}

      <View style={styles.container}>

        {backgroundImage ? (
          <View style={styles.iconButton}>
            <Image
              source={require('../../../assets/icons/edit-white.png')}
              style={styles.iconEdit}
            />
          </View>

        ) : (
          <View style={styles.iconButton}>
            <Image
              source={require('../../../assets/icons/edit.png')}
              style={styles.iconEdit}
            />
          </View>

        )}
        <SafeAreaView>
          <Modal
            visible={isMenuVisible}
            transparent
            animationType="fade"
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
        </SafeAreaView>
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
    backgroundColor: 'rgba(83, 83, 83, 0.8',
  },
  icon: {
    width: 24,
    height: 24,
  },
  iconEdit: {
    width: 18,
    height: 18,
    right: 74,
    top: -6,
  },

  image: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 15,
    backgroundColor: 'rgba(175, 175, 175, 0.8)',
  },

  containerText: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    color: '#808080',
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
    top: 510,
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
