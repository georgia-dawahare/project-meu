/* eslint-disable global-require */
import React, { useEffect, useState } from 'react';
import {
  StyleSheet, Text, Image, SafeAreaView, TouchableOpacity, View,
} from 'react-native';
import * as Font from 'expo-font';
import Button from '../../components/Button';

function OnboardingPage({ navigation }) {
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    async function loadFont() {
      await Font.loadAsync({
        'SF-Pro-Display-Medium': require('../../../assets/fonts/SF-Pro-Display-Medium.otf'),
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
    <SafeAreaView style={styles.container}>
      <View style={styles.contentWrapper}>
        <View style={styles.imageWrapper}>
          <Image
            source={require('../../../assets/animations/hello/hello_black.gif')}
            style={styles.graphicsImg}
          />
          <Image
            source={require('../../../assets/animations/neutral/neutral_pink.gif')}
            style={styles.graphicsImg}
          />
        </View>
        <Text style={styles.title}>
          Whenever You Are,
          {'\n'}
          MeU Connects You
        </Text>
        <Text style={styles.subtitle}>
          MeU connects long-distance couples with
          {'\n'}
          various interactions.
        </Text>
        <View>
          <TouchableOpacity onPress={() => { navigation.navigate('SignUpSignIn'); }}>
            <Button title="Let's MeU" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  contentWrapper: {
    marginTop: 100,
  },
  graphicsImg: {
    width: 150,
    height: 300,
  },
  imageWrapper: {
    flexDirection: 'row',
  },
  title: {
    fontFamily: 'SF-Pro-Display-Semibold',
    fontSize: 22,
    color: 'rgba(0,0,0,1)',
    lineHeight: 30,
    textAlign: 'center',
    marginBottom: 15,
  },
  subtitle: {
    fontFamily: 'SF-Pro-Display-Medium',
    fontSize: 16,
    color: 'rgba(106, 109, 115, 1)',
    lineHeight: 24,
    textAlign: 'center',
    marginBottom: 30,
  },
});

export default OnboardingPage;
