/* eslint-disable global-require */
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as Font from 'expo-font';

function Button(props) {
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    async function loadFont() {
      await Font.loadAsync({
        'SF-Pro-Display-Bold': require('../../assets/fonts/SF-Pro-Display-Bold.otf'),
        'SF-Pro-Display-Semibold': require('../../assets/fonts/SF-Pro-Display-Semibold.otf'),
      });
      setFontLoaded(true);
    }

    loadFont();
  }, []);

  if (!fontLoaded) {
    return <Text>Loading...</Text>;
  }

  let { buttonStyle, newBtnTxt } = props;
  const { title } = props;

  if (!buttonStyle) {
    buttonStyle = {};
  }
  if (!newBtnTxt) {
    newBtnTxt = {};
  }

  return (
    <View style={[styles.buttonContainer, buttonStyle]}>
      <Text style={[styles.buttonText, newBtnTxt]}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: 'rgba(230, 43, 133, 1)',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    height: 56,
    width: 300,
    borderRadius: 15,
  },
  buttonText: {
    fontFamily: 'SF-Pro-Display-Semibold',
    color: 'white',
    fontSize: 20,
  },
});

export default Button;
