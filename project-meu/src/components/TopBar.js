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

function TopBar({ navigation }) {
  const [days, setDays] = useState(0);
  const [fontLoaded, setFontLoaded] = useState(false);
  const daysExample = 1293;
  const daysText = `${days} days`;

  useEffect(() => {
    async function loadData() {
      await setDays(daysExample);
    }

    loadData();
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
