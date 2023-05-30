/* eslint-disable global-require */
import React from 'react';
import {
  StyleSheet, SafeAreaView, TouchableOpacity, Image, View, Text,
} from 'react-native';

function Homeplaceholder({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('HomeCalendar')}>
          <Image
            source={require('../../../assets/icons/Calendar.png')}
            style={styles.IconCalendar}
          />
        </TouchableOpacity>

        <Text style={styles.topTitle}>1302 Days</Text>

        <TouchableOpacity onPress={() => navigation.navigate('SettingPage')}>
          <Image
            source={require('../../../assets/icons/Cog.png')}
            style={styles.IconSetting}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    // flexDirection: 'row',
    // alignItems: 'center',
    // paddingHorizontal: 24,
    // paddingTop: 32,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // 수정된 부분
    paddingHorizontal: 24,
    paddingTop: 32,
  },
  IconCalendar: {
    height: 24,
    marginRight: 8,
  },
  IconSetting: {
    height: 24,
    // marginLeft: 8,
  },

  topTitle: {
    fontFamily: 'SF-Pro-Display-Medium',
    fontSize: 20,
  },
  backButton: {
    position: 'absolute',
    top: 32,
    left: 16,
    zIndex: 200,
  },
});

export default Homeplaceholder;
