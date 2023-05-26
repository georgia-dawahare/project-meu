import React, { useState, useEffect } from 'react';
import {
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {
  Card, Input,
} from 'react-native-elements';
import moment from 'moment';
import {
  addResponse, getResponseGroup, getResponse, updateResponse,
} from '../../services/datastore';

function CheckinSubmit({ navigation }) {
  const [textAnswer, setTextAnswer] = useState('');
  const [newResponse, setNewResponse] = useState(true);
  const [responseId, setResponseId] = useState('');

  // dumby user data
  const userId = 'user1';
  const partnerId = 'user2';
  const pairId = 'pair1';

  useEffect(() => {
    async function loadData() {
      const groupId = pairId + moment().format('MMDDYY');
      const data = await getResponseGroup(groupId);
      const p1Response = await getResponse(data.p1_response_id);
      const p2Response = await getResponse(data.p2_response_id);
      if (p1Response.user_id === userId) {
        setTextAnswer(p1Response.response);
        setResponseId(data.p1_response_id);
      } else if (p2Response.user_id === userId) {
        setTextAnswer(p2Response.response);
        setResponseId(data.p2_response_id);
      }
      console.log(textAnswer);
      if (textAnswer !== null || textAnswer !== '') {
        setNewResponse(false);
      }
    }
    loadData();
  }, []);

  const handleOnSubmit = () => {
    navigation.navigate('Checkin');
    console.log(textAnswer);
    console.log(newResponse);
    if (newResponse) {
      addResponse(
        {
          response: textAnswer,
          user_id: userId,
        },
      );
    } else {
      updateResponse(
        responseId,
        {
          response: textAnswer,
          user_id: userId,
        },
      );
    }
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
