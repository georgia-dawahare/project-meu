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
import { useSelector } from 'react-redux';

function HomeHeader({ navigation }) {
  const [days, setDays] = useState('');
  const [fontLoaded, setFontLoaded] = useState(false);
  const pair = useSelector((state) => state.pairState.pairData);

  useEffect(() => {
    const getPairDate = async () => {
      console.log(pair);
      const { relationshipStart } = pair;

      if (relationshipStart) {
        const startDate = new Date(relationshipStart);
        const today = new Date();

        const diffTime = Math.abs(today - startDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        // setting days
        if (diffDays > 1) setDays(`${diffDays} Days`);
        else setDays(`${diffDays} Day`);
      } else {
        console.log('Could not retrieve start date');
      }
    };

    getPairDate();
  }, []);

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
