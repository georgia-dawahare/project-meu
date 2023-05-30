import React, { useEffect, useState } from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
  Image,
} from 'react-native';

function TopBar({ navigation }) {
  const daysExample = 1293;
  const [days, setDays] = useState(0);
  const daysText = `${days} days`;

  useEffect(() => {
    async function loadData() {
      await setDays(daysExample);
    }

    loadData();
  }, []);

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
    fontFamily: 'SF-Pro-Display',
    flex: 1,
    flexWrap: 'wrap',
  },
});

export default TopBar;
