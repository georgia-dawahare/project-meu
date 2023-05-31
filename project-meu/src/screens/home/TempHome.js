/* eslint-disable global-require */
import React, { useState, useEffect } from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  Image,
} from 'react-native';
import axios from 'axios';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import TopBar from '../../components/TopBar';
import ClockAndLocation from '../../components/ClockAndLocation';
import BackgroundChange from './BackgroundChange';
import { apiUrl } from '../../constants/constants';

function TempHome({ navigation }) {
  const [backgroundImage, setBackgroundImage] = useState('');
  const auth = getAuth();
  const [userId, setUserId] = useState('');

  useEffect(() => {
    // Get current user from auth
    onAuthStateChanged(auth, (userAuth) => {
      if (userAuth) {
        setUserId(userAuth.uid);
      } else {
        console.log('No user logged in');
      }
    });
    if (userId) {
      setBackground();
    }
  }, []);

  const setBackground = async () => {
    let userDoc;

    // Get user from Firestore
    try {
      if (userId) {
        userDoc = await axios.get(`${apiUrl}/users/${userId}`);
      }
      if (userDoc) {
        setBackgroundImage(userDoc?.data?.background_photo);
      }
    } catch (e) {
      console.log('Error setting user background: ', e);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TopBar navigation={navigation} />
      <View style={styles.separate}>
        <View style={styles.partnerWidget}>
          <BackgroundChange />
        </View>
        {backgroundImage ? (
          <Image
            source={{ uri: backgroundImage }}
            style={styles.image}
            resizeMode="cover"
          />
        ) : (
          <Image
            source={require('../../../assets/images/defaultUserBackground.png')}
            style={styles.image}
          />
        )}
        <View style={styles.clockWidget}>
          <ClockAndLocation />
        </View>
      </View>
    </SafeAreaView>
  );
}

export default TempHome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  partnerWidget: {
    position: 'absolute',
    zIndex: 1,
    top: 0,
    right: 0,
    height: 124,
    width: 124,
    margin: 10,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  clockWidget: {
    flex: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    justifyContent: 'flex-end',
  },
  image: {
    ...StyleSheet.absoluteFillObject,
  },
  separate: {
    flex: 2,
    backgroundColor: 'white',
  },
});
