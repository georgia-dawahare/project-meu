/* eslint-disable global-require */
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import * as Font from 'expo-font';
import SignUpGraphic from '../../components/SignUpGraphic';

function HomePage({ navigation }) {
  // Example font loading
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    async function loadFont() {
      await Font.loadAsync({
        'SF-Pro-Display-Bold': require('../../../assets/fonts/SF-Pro-Display-Bold.otf'),
        'SF-Pro-Display-Semibold': require('../../../assets/fonts/SF-Pro-Display-Semibold.otf'),
      });

      setFontLoaded(true);
    }

    loadFont();
  }, []);

  if (!fontLoaded) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <SignUpGraphic />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Checkin')}>
          <Text style={styles.buttonText}>
            Check-in
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Penguins')}>
          <Text style={styles.buttonText}>
            Penguins
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('BackgroundChange')}>
          {/** dont forget you added the above  */}
          <Text style={styles.buttonText}>
            BackgroundChange
          </Text>
        </TouchableOpacity>
<<<<<<< HEAD
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('SignIn')}>
          {/** dont forget you added the above  */}
=======
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('BackgroundChange')}>
>>>>>>> bc0c406f2e7588b8f62e6dc4638632e733216cc9
          <Text style={styles.buttonText}>
            SignIn
          </Text>
        </TouchableOpacity>
<<<<<<< HEAD
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Homeplaceholder')}>
          {/** dont forget you added the above  */}
=======
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('SettingPage')}>
>>>>>>> bc0c406f2e7588b8f62e6dc4638632e733216cc9
          <Text style={styles.buttonText}>
            Homeplaceholder
          </Text>
        </TouchableOpacity>
<<<<<<< HEAD
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('testAnniv')}>
          {/** dont forget you added the above  */}
=======
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('VersionPage')}>
          <Text style={styles.buttonText}>
            Version-Setting
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('SignIn')}>
>>>>>>> bc0c406f2e7588b8f62e6dc4638632e733216cc9
          <Text style={styles.buttonText}>
            testAnniv
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('SignUpSignIn')}>
          <Text style={styles.buttonText}>
            SignUpSignIn
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('TempHome')}>
          {/** dont forget you added the above  */}
          <Text style={styles.buttonText}>
            TempHome
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Onboarding')}>
          <Text style={styles.buttonText}>
            Onboarding
          </Text>
        </TouchableOpacity>
      </View>

      {/* Empty view to center button */}
      <View />
    </View>
  );
}

// Example StyleSheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  buttonContainer: {
    alignItems: 'center',
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'rgb(230, 43, 133)',
    marginBottom: 20,
  },
  buttonText: {
    fontFamily: 'SF-Pro-Display-Bold',
    color: 'white',
  },
});

export default HomePage;
