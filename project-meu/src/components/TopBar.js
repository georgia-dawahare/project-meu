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
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { apiUrl } from '../constants/constants';

function TopBar({ navigation, startDate }) {
  const [days, setDays] = useState(180);
  const [fontLoaded, setFontLoaded] = useState(false);
  const daysText = `${days} days`;
  const [userID, setUserID] = useState('');
  const auth = getAuth();
  

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const { uid } = user;
        setUserID(uid);
      }
    });
  }, []);

  // this is for future development 
  // useEffect(() => {
  //   const getPairDate = async () => {
  //     const response = await axios.get(`${apiUrl}/users/pairdate/${userID}`);
  //     const startDate = response.data;
  //     console.log(startDate);

  //     const dateSplit = startDate.split('/');
  //     console.log(dateSplit);
  //     // To set two dates to two variables
      
  //     // learning to parse to make new date object: https://stackoverflow.com/questions/20247628/calculating-the-difference-between-2-dates-with-the-format-of-dd-mm-yyyy-doesn
  //     console.log(dateSplit[1])
  //     const start = new Date(parseInt('20' + dateSplit[2]),parseInt(dateSplit[0])-1,parseInt(dateSplit[1]));
  //     const today = new Date();
  //     console.log(start)
  //     console.log(today)

  //     // used this resource for finding the diff between dates: https://stackoverflow.com/questions/3224834/get-difference-between-2-dates-in-javascript
  //     const diffTime = Math.abs(today - start);
  //     const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));    
      
  //     // setting days 
  //     setDays(diffDays-1);
  //   };

  //   getPairDate();
  // }, [userID]);

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
          source={require('../../assets/icons/Calendar.png')}
          style={styles.Icon}
        />
      </TouchableOpacity>

      <Text style={styles.header}>{daysText}</Text>

      <TouchableOpacity onPress={() => navigation.navigate('SettingPage')}>
        <Image
          source={require('../../assets/icons/Cog.png')}
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

export default TopBar;
