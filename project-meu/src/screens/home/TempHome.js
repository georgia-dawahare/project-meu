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
  const [partnerBackgroundImage, setPartnerBackgroundImage] = useState('');
  const [backgrounds, setBackgrounds] = useState([]);

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
    initializeView();
  }, [backgrounds]);

  useEffect(() => {
    setBackgroundImage(backgrounds[0]);
    setPartnerBackgroundImage(backgrounds[1]);
  }, [backgrounds]);

  const initializeView = async () => {
    if (!backgrounds[0]) {
      const background = await setBackground();
      const partnerBackground = await setPartnerBackground();
      setBackgrounds([background, partnerBackground]);
    }
  };

  const setPartnerBackground = async () => {
    let userDoc, pair, pairId, pairDoc, partnerDoc;

    // Get user from Firestore
    if (userId) {
      userDoc = await axios.get(`${apiUrl}/users/${userId}`);
      pairId = userDoc?.data?.pair_id;
    }

    // Get pair from Firestore
    if (pairId) {
      pairDoc = await axios.get(`${apiUrl}/pairs/${pairId}`);
      pair = pairDoc.data;
    }

    // Get partner from Firestore
    if (pair) {
      // Figure out which user the current user is
      if (userId === pair.user1_id) {
        partnerDoc = await axios.get(`${apiUrl}/users/${pair.user2_id}`);
      } else if (userId === pair.user2_id) {
        partnerDoc = await axios.get(`${apiUrl}/users/${pair.user1_id}`);
      } else {
        console.log('Could not find partner');
      }
    }
    return partnerDoc?.data?.background_photo;
  };

  const setBackground = async () => {
    let userDoc;

    // Get user from Firestore
    try {
      if (userId) {
        userDoc = await axios.get(`${apiUrl}/users/${userId}`);
      }
    } catch (e) {
      console.log('Error setting user background: ', e);
    }
    return userDoc?.data?.background_photo;
  };

  const renderBackground = () => {
    if (backgroundImage) {
      return (
        <Image
          source={{ uri: backgroundImage }}
          style={styles.image}
          resizeMode="cover"
        />
      );
    } else {
      return (
        <Image
          source={require('../../../assets/images/defaultUserBackground.png')}
          style={styles.image}
        />
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TopBar navigation={navigation} />
      <View style={styles.separate}>
        <View style={styles.partnerWidget}>
          <BackgroundChange background={partnerBackgroundImage} uid={userId} />
        </View>
        {renderBackground()}
        <View style={styles.clockWidget}>
          <ClockAndLocation />
        </View>
      </View>
    </SafeAreaView>
  );
}

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

export default TempHome;
