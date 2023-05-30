import React from 'react';
import {
  Text,

  StyleSheet,
  View,
} from 'react-native';

function TopBarCheckin({ navigation }) {
  return (
    <View style={styles.topbar}>
      <Text style={styles.header}>
        Meu Check-in
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  topbar: {
    width: '100%',
    height: 60,
    backgroundColor: 'white',
    position: 'fixed',
    top: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
  header: {
    textAlign: 'center',
    fontSize: 20,
    fontFamily: 'SF-Pro-Display',
    flex: 1,
    flexWrap: 'wrap',
  },
});

export default TopBarCheckin;
