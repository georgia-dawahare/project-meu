import React, { useState } from 'react';
import {
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {
  Card, Input,
} from 'react-native-elements';
import { addDailyQuestionResponse } from '../../services/datastore';

function CheckinSubmit({ navigation }) {
  const [textAnswer, setTextAnswer] = useState('');

  const handleOnSubmit = () => {
    navigation.navigate('Checkin');
    addDailyQuestionResponse(
      {
        pair_id: 'example',
        question_id: 2,
        response: textAnswer,
        user_id: 'example',
      },
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Card containerStyle={styles.cardContainer}>
        <Text>Daily Question</Text>
        <Card.Title style={styles.question}>What is your most treasured memory of us?</Card.Title>
        <Input value={textAnswer} onChangeText={setTextAnswer} placeholder="Type your response" multiline />
        <TouchableOpacity style={styles.button} onPress={handleOnSubmit}>
          <Text style={styles.buttonText}>
            Submit
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