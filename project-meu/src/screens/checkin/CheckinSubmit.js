import React from 'react';
import {
  Text,
  Button,
  SafeAreaView,
  StyleSheet,
} from 'react-native';

function CheckinSubmit({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>
        Check-In Submit Page
      </Text>
      <Button title="Home" onPress={() => navigation.navigate('Home')} />
      <Button title="Back" onPress={() => navigation.goBack()} />
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
  },
});

export default CheckinSubmit;
