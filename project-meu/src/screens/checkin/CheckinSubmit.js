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

function CheckinSubmit({ navigation, route }) {
  const { handleNewResponse } = route.params;
  const [textAnswer, setTextAnswer] = useState('');
  const [newResponse, setNewResponse] = useState(false);
  const [responseId, setResponseId] = useState('');
  const [currentPartner, setCurrentPartner] = useState('');

  // dumby user data
  const userId = 'user1';
  const pairId = 'pair1';

  const refreshData = async () => {
    const groupId = pairId + moment().format('MMDDYY');
    const data = await getResponseGroup(groupId);
    let p1Response = null;
    let p2Response = null;
    if (data.p1_response_id !== '') { p1Response = await getResponse(data.p1_response_id); }
    if (data.p2_response_id !== '') { p2Response = await getResponse(data.p2_response_id); }
    if (p1Response != null && p1Response.user_id === userId) {
      setTextAnswer(p1Response.response);
      setResponseId(data.p1_response_id);
      setCurrentPartner('p1');
    } else if (p2Response != null && p2Response.user_id === userId) {
      setTextAnswer(p2Response.response);
      setResponseId(data.p2_response_id);
      setCurrentPartner('p2');
    } else {
      setNewResponse(true);
      setCurrentPartner('p1');
    }
  };
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', refreshData);
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    navigation.setOptions({
      handleNewResponse,
    });
  }, []);

  const handleOnSubmit = () => {
    navigation.navigate('Checkin');
    const groupId = pairId + moment().format('MMDDYY');
    if (newResponse) {
      addResponse({
        response: textAnswer,
        user_id: userId,
      }, groupId, currentPartner);
      handleNewResponse(textAnswer);
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
