import React from 'react';
import {
  Text,
  StyleSheet,
  View,
} from 'react-native';

function TopBarCheckin({ navigation }) {
  return (
    <View style={styles.header}>
      <Text style={styles.topTitle}>Check-in</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  // topbar: {
  //   width: '100%',
  //   height: 60,
  //   backgroundColor: 'white',
  //   position: 'fixed',
  //   top: 0,
  //   flexDirection: 'row',
  //   alignItems: 'center',
  // },
  // header: {
  //   textAlign: 'center',
  //   fontSize: 20,
  //   fontFamily: 'SF-Pro-Display',
  //   flex: 1,
  //   flexWrap: 'wrap',
  // },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    height: 60,
    // backgroundColor: 'white',
  },
  topTitle: {
    fontFamily: 'SF-Pro-Display-Medium',
    fontSize: 20,
    alignSelf: 'center',

  },
});

export default TopBarCheckin;
