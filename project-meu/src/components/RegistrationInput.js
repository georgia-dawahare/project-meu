/* eslint-disable global-require */
import React, { useEffect, useState } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
} from 'react-native';
import * as Font from 'expo-font';

function RegistrationInput({
  placeholder, top, textAlign, onChangeText, value, editable = true,
}) {
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    async function loadFont() {
      await Font.loadAsync({
        'SF-Pro-Display-Regular': require('../../assets/fonts/SF-Pro-Display-Regular.otf'),
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
    <View style={[styles.container, { top }]}>
      <View style={[styles.inputContainer, { alignItems: textAlign }]}>
        {value ? (
          <TextInput style={styles.knownInput} editable={editable} onChangeText={onChangeText} value={value} />
        ) : (
          <TextInput style={styles.input} placeholder={placeholder} editable={editable} onChangeText={onChangeText} />
        )}
      </View>
      <View style={styles.line} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  inputContainer: {
    width: 300,
    height: 56,
    backgroundColor: 'rgba(0, 0, 0, 0)',
    justifyContent: 'center',
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  input: {
    fontSize: 16,
    color: '#828282',
    textAlign: 'center',
    fontFamily: 'SF-Pro-Display-Regular',
  },
  knownInput: {
    fontSize: 24,
    color: 'black',
    textAlign: 'center',
    fontFamily: 'SF-Pro-Display-Semibold',
  },
  line: {
    width: 300,
    height: 1,
    backgroundColor: '#4f4f4f',
    alignSelf: 'center',
  },
});

export default RegistrationInput;
