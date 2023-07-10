/* eslint-disable global-require */
import React, { useState, useEffect } from 'react';
import {
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from 'react-native';
import {
  Card, Input,
} from 'react-native-elements';
import moment from 'moment';
import axios from 'axios';
import auth from '../../services/datastore';
import { apiUrl } from '../../constants/constants';

function CheckinSubmit({ navigation }) {
  const questionData = require('../../../assets/data/questions.json');
  const [question, setQuestion] = useState('');
  const [textAnswer, setTextAnswer] = useState('');
  const [newResponse, setNewResponse] = useState(true);
  const [responseId, setResponseId] = useState('');
  const [userId, setUserId] = useState('');
  const [userDoc, setUserDoc] = useState('');

  useEffect(() => {
    setUserId(auth?.currentUser?.uid);
  }, [userDoc]);

  useEffect(() => {
    const getUser = async () => {
      const user = await axios.get(`${apiUrl}/users/${userId}`);
      const userInfo = user.data;
      if (userInfo) {
        setUserDoc(userInfo);
      }
    };
    if (userId) {
      getUser();
    }
  }, [userId]);

  useEffect(() => {
    refreshData();
  }, [userId, userDoc]);

  const updateResponse = async (currResponseId, updatedResponse) => {
    const id = await axios.put(`${apiUrl}/responses/group`, { currResponseId, updatedResponse });
    return id;
  };

  const addResponse = async (responseData, currPairId, groupId) => {
    const id = await axios.post(`${apiUrl}/responses/`, { responseData, currPairId, groupId });
    return id;
  };

  const getPair = async () => {
    return axios.get(`${apiUrl}/pairs/${userDoc.pair_id}`);
  };

  const getResponse = async (id) => {
    const response = await axios.get(`${apiUrl}/responses/${id}`);
    return response.data;
  };

  const refreshData = async () => {
    try {
    // Fetch user ID & user doc
      if (userDoc) {
        let userResponse;
        const pair = await getPair();
        const groupId = userDoc.pair_id + moment().format('MMDDYY');
        const responseGroup = await axios.get(`${apiUrl}/responses/group/${groupId}`);
        const responseGroupData = responseGroup.data;
        const pairCreatorId = pair?.data?.pair_creator_id;
        if (userId === pairCreatorId) {
          if (responseGroupData.p1_response_id) {
            userResponse = await getResponse(responseGroupData.p1_response_id);
            setResponseId(responseGroupData?.p1_response_id);
          }
        } else if (userId !== pairCreatorId) {
          if (responseGroupData.p2_response_id) {
            userResponse = await getResponse(responseGroupData.p2_response_id);
            setResponseId(responseGroupData?.p2_response_id);
          }
        }
        if (userResponse) {
          setTextAnswer(userResponse.response);
          setNewResponse(false);
        }

        // Set daily question
        setQuestion(questionData.questions[responseGroupData.question_id].question);
      }
    } catch (error) {
      console.error('Error occurred during data refresh:', error);
    }
  };

  const handleOnSubmit = async () => {
    const groupId = userDoc.pair_id + moment().format('MMDDYY');
    try {
      if (newResponse) {
        addResponse({
          response: textAnswer,
          user_id: userId,
        }, userDoc.pair_id, groupId);
      } else {
        updateResponse(
          responseId,
          {
            response: textAnswer,
            user_id: userId,
          },
        );
      }
      navigation.navigate('Checkin');
    } catch (e) {
      console.log('Failed to submit response: ', e);
    }
  };
  return (

    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView>
          <ScrollView>
            <TouchableOpacity onPress={() => { navigation.goBack(); }}>
              <Image
                source={require('../../../assets/icons/back-arrow.png')}
                style={styles.icon}
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
          </ScrollView>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  icon: {
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
