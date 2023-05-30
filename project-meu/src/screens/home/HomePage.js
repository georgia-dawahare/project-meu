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
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('SignIn')}>
          {/** dont forget you added the above  */}
          <Text style={styles.buttonText}>
            SignIn
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Homeplaceholder')}>
          {/** dont forget you added the above  */}
          <Text style={styles.buttonText}>
            Homeplaceholder
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('testAnniv')}>
          {/** dont forget you added the above  */}
          <Text style={styles.buttonText}>
            testAnniv
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
