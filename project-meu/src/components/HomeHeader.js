/* eslint-disable global-require */
import React, { useEffect, useState } from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
  Image,
} from 'react-native';
import * as Font from 'expo-font';
import axios from 'axios';
import { getAuth } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { apiUrl } from '../constants/constants';
import { updateUser } from '../actions/UserActions';

function HomeHeader({ navigation }) {
  const [days, setDays] = useState('');
  const [fontLoaded, setFontLoaded] = useState(false);
  const [userId, setUserId] = useState('');
  const [userDoc, setUserDoc] = useState('');
  const dispatch = useDispatch();

  const auth = getAuth();

  useEffect(() => {
    setUserId(auth?.currentUser?.uid);
  }, []);

  useEffect(() => {
    const getUser = async () => {
      const user = await axios.get(`${apiUrl}/users/${userId}`);
      const userInfo = user.data;
      if (userInfo) {
        setUserDoc(userInfo);
      }
    };
    if (userId) {
      getUser();
    }
  }, [userId]);

  // this is for future development
  useEffect(() => {
    const getPairDate = async () => {
      const pair = await axios.get(`${apiUrl}/pairs/${userDoc.pair_id}`);
      const relationshipStart = pair?.data?.relationship_start;

      if (relationshipStart) {
        const startDate = new Date(relationshipStart);
        const today = new Date();

        const diffTime = Math.abs(today - startDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        // setting days
        setDays(`${diffDays} Days`);
        const userUpdate = { days_together: diffDays };
        dispatch(updateUser(userUpdate));
        // console.log('first startd ate"      ', startDate);
      } else {
        console.log('Could not retrieve start date');
      }
    };

    getPairDate();
  }, [userDoc]);

  useEffect(() => {
    async function loadFont() {
      await Font.loadAsync({
        'SF-Pro-Display-Medium': require('../../assets/fonts/SF-Pro-Display-Medium.otf'),
        'SF-Pro-Display-Semibold': require('../../assets/fonts/SF-Pro-Display-Semibold.otf'),
      });
      setFontLoaded(true);
    }

    loadFont();
  }, []);

  if (!fontLoaded) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.topbar}>
      <TouchableOpacity onPress={() => navigation.navigate('HomeCalendar')}>
        <Image
          source={require('../../assets/icons/calendar-heart.png')}
          style={styles.Icon}
        />
      </TouchableOpacity>
      <Text style={styles.header}>{days}</Text>
      <TouchableOpacity onPress={() => navigation.navigate('SettingPage')}>
        <Image
          source={require('../../assets/icons/setting.png')}
          style={styles.Icon}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  topbar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 32,
    backgroundColor: 'white',
    paddingBottom: 16,
  },
  Icon: {
    height: 24,
    marginRight: 8,
    zIndex: 10,
  },
  header: {
    textAlign: 'center',
    fontSize: 20,
    fontFamily: 'SF-Pro-Display-Semibold',
    flex: 1,
    flexWrap: 'wrap',
  },
});

export default HomeHeader;
