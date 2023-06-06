/* eslint-disable global-require */
import React, { useState, useEffect } from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
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
  const [isMenuVisible, setMenuVisible] = useState(false);
  const [userDoc, setUserDoc] = useState('');

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
  }, []);

  useEffect(() => {
    let partnerId, partnerDoc, pairId, pairDoc;
    async function getUserBackground() {
      // Get user from Firestore
      if (userId) {
        const resUser = await axios.get(`${apiUrl}/users/${userId}`);
        const userBackground = resUser?.data?.background_photo;
        setUserDoc(resUser?.data);
        if (userBackground) {
          setBackgroundImage(userBackground);
        }
      }
    }
    async function getPartnerBackground() {
      // Get user from Firestore
      if (userId) {
        pairId = userDoc.pair_id;
        if (pairId) {
          const pair = await axios.get(`${apiUrl}/pairs/${pairId}`);
          pairDoc = pair?.data;
          if (pairDoc) {
            if (userId === pair?.data?.pair_creator_id) {
              partnerId = pair?.data?.user2_id;
            } else {
              partnerId = pair?.data?.user1_id;
            }
            if (partnerId) {
              partnerDoc = await axios.get(`${apiUrl}/users/${partnerId}`);
              const partnerBackground = partnerDoc?.data?.background_photo;
              if (partnerBackground) {
                setPartnerBackgroundImage(partnerBackground);
              }
            }
          }
        }
      }
    }
    getUserBackground();
    getPartnerBackground();
  }, [userId]);

  const toggleMenu = () => {
    setMenuVisible(!isMenuVisible);
  };

  const renderBackground = () => {
    if (backgroundImage) {
      return (
        <ImageBackground
          source={{ uri: backgroundImage }}
          style={styles.userBackground}
          resizeMode="cover"
        />
      );
    } else {
      return (
        <Image
          style={styles.defaultImage}
          source={require('../../../assets/images/defaultUserBackground.png')}
        />
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TopBar navigation={navigation} />
      <View style={styles.separate}>
        <View style={styles.partnerWidget}>
          <TouchableOpacity style={styles.changeBackground} onPress={toggleMenu}>
            <BackgroundChange background={partnerBackgroundImage} uid={userId} toggleMenu={toggleMenu} setMenuVisible={setMenuVisible} isMenuVisible={isMenuVisible} />
          </TouchableOpacity>
        </View>
        {renderBackground()}
        <View />
        <View style={styles.clockWidget}>
          <ClockAndLocation />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  changeBackground: {
    position: 'absolute',
  },
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
  defaultImage: {
    ...StyleSheet.absoluteFillObject,
  },
  userBackground: {
    width: '100%',
    height: '100%',
  },
  separate: {
    flex: 2,
    backgroundColor: 'white',
  },
});

export default TempHome;
