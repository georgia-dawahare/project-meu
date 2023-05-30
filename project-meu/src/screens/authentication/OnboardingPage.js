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
        <Image
          source={require('../../../assets/images/Onboarding.png')}
          style={styles.graphicsImg}
        />
        <View style={styles.textWrapper}>
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
          <Image
            source={require('../../../assets/images/progress-1.png')}
            style={styles.progress}
          />
        </View>
        <TouchableOpacity onPress={() => { navigation.navigate('SignUpSignIn'); }}>
          <Button title="Let's MeU" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentWrapper: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'space-evenly',
    marginBottom: 100,
    top: 20,
  },
  graphicsImg: {
    width: 342,
    height: 329,
    alignSelf: 'center',
  },
  textWrapper: {
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
    marginBottom: 27,
  },
  progressWrapper: {
    alignItems: 'center',
  },
  progress: {
    alignSelf: 'center',
  },
  buttonWrapper: {
  },
});

export default OnboardingPage;
