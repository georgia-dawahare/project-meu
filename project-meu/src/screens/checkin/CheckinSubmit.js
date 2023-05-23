import React from 'react';
import {
  Text,
  // Button,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {
  Card,
} from 'react-native-elements';

function CheckinSubmit({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <Card containerStyle={styles.cardContainer}>
        <Text>HELLO</Text>
        <Card.Title style={styles.question}>What is your most treasured memory of us?</Card.Title>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('CheckinSubmit')}>
          <Text style={styles.buttonText}>
            Submit a Response
          </Text>
        </TouchableOpacity>
      </Card>
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
  cardContainer: {
    borderRadius: 15,
    padding: 20,
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
});

export default CheckinSubmit;
