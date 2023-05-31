/* eslint-disable global-require */
import React, { useState, useEffect } from 'react';
import {
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import {
  Card, Input,
} from 'react-native-elements';
import moment from 'moment';
import axios from 'axios';
import auth from '../../services/datastore';
import { apiUrl } from '../../constants/constants';

function CheckinSubmit({ navigation, route }) {
  const [question, setQuestion] = useState('');
  const { handleNewResponse } = route.params;
  const [textAnswer, setTextAnswer] = useState('');
  const [newResponse, setNewResponse] = useState(true);
  const [responseId, setResponseId] = useState('');

  // dumby user data
  const tempPairId = 'pair1';

  const getUser = async (uid) => {
    const userResult = await axios.get(`${apiUrl}/users/${uid}`);
    return userResult;
  };

  const getResponse = async (id) => {
    const response = await axios.get(`${apiUrl}/responses/${id}`);
    return response;
  };

  const updateResponse = async (currResponseId, updatedResponse) => {
    const id = await axios.put(`${apiUrl}/responses/group`, { currResponseId, updatedResponse });
    return id;
  };

  const addResponse = async (responseData, currPairId, groupId) => {
    const id = await axios.post(`${apiUrl}/responses/`, { responseData, currPairId, groupId });
    return id;
  };

  const refreshData = async () => {
    try {
    // Fetch user ID & user doc
      const userId = auth.currentUser?.uid;
      getUser(userId);

      const groupId = tempPairId + moment().format('MMDDYY');
      const responseGroup = await axios.get(`${apiUrl}/responses/group/${groupId}`);

      const questionData = require('../../../assets/data/questions.json');

      const responseGroupData = responseGroup.data;
      // Set daily question
      setQuestion(questionData.questions[responseGroupData.question_id].question);

      // Populate partner responses if they exist
      let p1Response = null;
      let p2Response = null;
      if (responseGroupData.p1_response_id) {
        p1Response = await getResponse(responseGroupData.p1_response_id);
      }
      if (responseGroupData.p2_response_id) {
        p2Response = await getResponse(responseGroupData.p2_response_id);
      }
      // Find out if P1 or P2 is user/partner
      if (p1Response !== null && p1Response.status === 200) {
        console.log(userId);
        console.log(p2Response.data.user_id);
        if (p1Response.data.user_id === userId) {
          console.log('h');
          setTextAnswer(p1Response.data.response);
          setResponseId(responseGroupData.p1_response_id);
          setNewResponse(false);
        }
      }
      if (p2Response !== null && p2Response.status === 200) {
        console.log('arg');
        if (p2Response.data.user_id === userId) {
          setTextAnswer(p2Response.data.response);
          setResponseId(responseGroupData.p2_response_id);
          setNewResponse(false);
        }
      }
    } catch (error) {
      console.error('Error occurred during data refresh:', error);
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
    const groupId = tempPairId + moment().format('MMDDYY');
    if (newResponse) {
      addResponse({
        response: textAnswer,
        user_id: auth.currentUser?.uid,
      }, tempPairId, groupId);
      handleNewResponse(textAnswer);
    } else {
      updateResponse(
        responseId,
        {
          response: textAnswer,
          user_id: auth.currentUser?.uid,
        },
      );
    }
    navigation.navigate('Checkin');
  };
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => { navigation.goBack(); }}>
        <Image
          source={require('../../../assets/icons/goback-black.png')}
          style={styles.Icon}
        />
      </TouchableOpacity>
      <Card containerStyle={styles.cardContainer}>
        <Text>Daily Question</Text>
        <Card.Title style={styles.question}>{question}</Card.Title>
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
    marginTop: '40%',
  },

  question: {
    textAlign: 'center',
    fontSize: 28,
    fontFamily: 'SF-Pro-Display-Bold',
    margin: 20,
  },
  Icon: {
    margin: 20,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 15,
    elevation: 3,
    backgroundColor: 'rgb(230, 43, 133)',
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: 'SF-Pro-Display-Medium',
    color: 'white',
    fontSize: 20,
  },

});

export default CheckinSubmit;
