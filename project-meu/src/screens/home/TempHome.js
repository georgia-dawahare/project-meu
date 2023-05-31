/* eslint-disable global-require */
import React, { useState, useEffect } from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  Image,
  Text,
} from 'react-native';
import * as Font from 'expo-font';
import axios from 'axios';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import TopBar from '../../components/TopBar';
import ClockAndLocation from '../../components/ClockAndLocation';
import BackgroundChange from './BackgroundChange';
import { apiUrl } from '../../constants/constants';

function TempHome({ navigation }) {
  const [backgroundImage, setBackgroundImage] = useState('');
  const backgroundColor = 'white';
  const auth = getAuth();

  const [userId, setUserId] = useState('');
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    async function loadFont() {
      await Font.loadAsync({
        'SF-Pro-Display-Bold': require('../../../assets/fonts/SF-Pro-Display-Bold.otf'),
        'SF-Pro-Display-Semibold': require('../../../assets/fonts/SF-Pro-Display-Semibold.otf'),
      });

      setFontLoaded(true);
    }

    loadFont();
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
    if (userId) {
      setBackground();
    }
  }, []);

  const setBackground = async () => {
    let userDoc;

    // Get user from Firestore
    if (userId) {
      userDoc = await axios.get(`${apiUrl}/users/${userId}`);
    }

    if (userDoc) {
      setBackgroundImage(userDoc?.data?.background_photo);
    }
  };

  if (!fontLoaded) {
    return <Text>Loading...</Text>;
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>

      <TopBar navigation={navigation} />
      <View>
        <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
          <View style={styles.partnerWidget}>
            <BackgroundChange />
          </View>
        </View>
      </View>
      <View style={styles.separate}>
        {backgroundImage ? (
          <Image
            source={{ uri: backgroundImage }}
            style={styles.image}
            resizeMode="cover"
          />
        ) : (
          <Image
            source={require('../../../assets/images/defaultUserBackground.png')}
            style={styles.defaultImage}
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
  partnerWidget: {
    height: 124,
    width: 124,
    margin: 10,
    marginTop: 20,
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
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },

  image: {
    ...StyleSheet.absoluteFillObject,
  },
  defaultImage: {
    width: 300,
    height: 300,
    alignSelf: 'center',
  },
  separate: {
    flex: 2,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: 'white',
  },
});
