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
import Button from '../../components/Button';

function LoginScreen({ navigation }) {
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
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleSignUp} style={styles.button}>
          <Button title="Sign Up" />
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
  buttonContainer: {
    alignItems: 'center',
  },
  button: {
    padding: 28,
  },
  signInPress: {
    marginTop: 24,
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

export default LoginScreen;
