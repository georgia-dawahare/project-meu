/* eslint-disable global-require */
import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import * as Font from 'expo-font';
import SignUpGraphic from '../../components/SignUpGraphic';

function SignUpSignIn({ navigation }) {
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    async function loadFont() {
      await Font.loadAsync({
        'SF-Pro-Display-Regular': require('../../../assets/fonts/SF-Pro-Display-Regular.otf'),
        'SF-Pro-Display-Semibold': require('../../../assets/fonts/SF-Pro-Display-Semibold.otf'),
      });

      setFontLoaded(true);
    }

    loadFont();
  }, []);

  if (!fontLoaded) {
    return <Text>Loading...</Text>;
  }

  const handleSignIn = () => {
    navigation.navigate('SignIn');
  };

  const handleSignUp = () => {
    navigation.navigate('RegisterEmailPassword');
  };

  return (
    <View style={styles.container}>
      <SignUpGraphic />
      <View style={styles.contentWrapper}>
        <TouchableOpacity onPress={handleSignUp} style={styles.button}>
          <Text style={styles.buttonTxt}>Sign Up</Text>
        </TouchableOpacity>
        <View style={styles.signInPress}>
          <Text style={styles.buttonOutLineText}>
            Already have an ID?
            <TouchableOpacity>
              <Text style={styles.signInText} onPress={handleSignIn}>  Sign In</Text>
            </TouchableOpacity>
          </Text>
        </View>
      </View>

      <View />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: 'white',
  },
  contentWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'rgba(230, 43, 133, 1)',
    alignItems: 'center',
    justifyContent: 'center',
    height: 56,
    width: 300,
    borderRadius: 15,
  },
  buttonTxt: {
    fontFamily: 'SF-Pro-Display-Semibold',
    color: 'white',
    fontSize: 20,
  },
  signInPress: {
    margin: 24,
  },
  buttonOutLineText: {
    fontFamily: 'SF-Pro-Display-Regular',
    fontSize: 16,
  },
  signInText: {
    color: '#E62B85',
    fontFamily: 'SF-Pro-Display-Semibold',
    fontSize: 16,
  },
});

export default SignUpSignIn;
