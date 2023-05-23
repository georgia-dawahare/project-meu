import React from 'react';
import {
  Text,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';

function CheckinPage({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>
        Check-In Page
      </Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')}>
          <Text style={styles.buttonText}>
            Home
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('BackgroundChange')}>
          {/**dont forget you added the above  */}
          <Text style={styles.buttonText}>
            BackgroundChange
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('CheckinSubmit')}>
          <Text style={styles.buttonText}>
            Check-In Submit
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('CheckinHistory')}>
          <Text style={styles.buttonText}>
            Check-In History
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>
            Back
          </Text>
        </TouchableOpacity>
      </View>
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
  buttonContainer: {
    alignItems: 'center',
  },
});

export default CheckinPage;
