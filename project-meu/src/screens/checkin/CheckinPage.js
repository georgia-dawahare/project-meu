/* eslint-disable global-require */
import React, { useEffect, useState } from 'react';
import {
  Text,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import {
  Card,
} from 'react-native-elements';
import * as Font from 'expo-font';
import { getDailyQuestionResponses } from '../../services/datastore';

function CheckinPage({ navigation }) {
  const [fontLoaded, setFontLoaded] = useState(false);
  const handleGetDailyQuestionResponses = () => {
    getDailyQuestionResponses('example');
  };

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
    <SafeAreaView style={styles.container}>
      <Card containerStyle={styles.cardContainer}>
        <Text>Daily Question</Text>
        <Card.Title style={styles.question}>What is your most treasured memory of us?</Card.Title>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('CheckinSubmit')}>
          <Text style={styles.buttonText}>
            Submit a Response
          </Text>
        </TouchableOpacity>
      </Card>
      <TouchableOpacity style={styles.buttonSecondary} onPress={handleGetDailyQuestionResponses}>
        <Text style={styles.buttonText}>
          Get Responses
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
  text: {
    textAlign: 'center',
    fontSize: 20,
    fontFamily: 'SF-Pro-Display-Bold',
    marginBottom: 20,
  },
  buttonSecondary: {
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'rgb(230, 43, 133)',
    alignItems: 'center',
    margin: 20,
  },
  question: {
    textAlign: 'center',
    fontSize: 28,
    fontFamily: 'SF-Pro-Display-Bold',
    margin: 20,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'rgb(230, 43, 133)',
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: 'SF-Pro-Display-Bold',
    color: 'white',
  },
  buttonContainer: {
    alignItems: 'center',
  },
  cardContainer: {
    borderRadius: 15,
    padding: 20,
  },
});

export default CheckinPage;