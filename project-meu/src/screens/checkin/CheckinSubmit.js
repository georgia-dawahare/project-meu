/* eslint-disable global-require */
import React, { useEffect, useState } from 'react';
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
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import axios from 'axios';
// import auth from '../../services/datastore';
import { apiUrl } from '../../constants/constants';

import { fetchQuestions } from '../../actions/QuestionsActions';
import { fetchUserById } from '../../actions/UserActions';
import { createResponse, fetchResponse } from '../../actions/ResponseActions';
import { updateResponseGroup, fetchResponseGroupByPairId, fetchResponseGroup } from '../../actions/ResponseGroupActions';

function CheckinSubmit({ navigation }) {
  const [textAnswer, setTextAnswer] = useState('');
  const [newResponse, setNewResponse] = useState(true);
  const [userDoc, setUserDoc] = useState('');
  // const [submit, setSubmit] = useState(false);

  const dispatch = useDispatch();

  // userData
  const user = useSelector((state) => state.userState.userData);
  const currUserId = user._id;
  const currUserPairId = user.pairId;
  // console.log('user :      ', user);

  // questions Data
  const questionsTest = useSelector((state) => state.questionsState.questionsData);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const currQuestion = questionsTest.length > 0
    ? questionsTest[currentQuestionIndex % questionsTest.length]?.question
    : null;

  // fetch ResponseGroupData
  const currUserResponseGroup = useSelector((state) => state.responseGroupState.allResponseGroups);
  // const currUserResponseGroupId = currUserResponseGroup._id;

  // console.log('currUserResponseGroup:     ', currUserResponseGroup);
  let latestQuestionId = 0;
  let currUserResponseGroupId = '';
  if (currUserResponseGroup.length > 0) {
    const sortedResponseGroup = Object.values(currUserResponseGroup).sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    const latestResponseGroup = sortedResponseGroup[0];
    latestQuestionId = latestResponseGroup.questionId;
    currUserResponseGroupId = latestResponseGroup._id;

    console.log('latestQId : ', latestQuestionId);
    console.log('currUserREsponseGroupId: ', currUserResponseGroupId);
    // console.log('latestResponseGroup', latestResponseGroup);
  }

  // response Data
  // const response = useSelector((state) => state.responseState.responseData);
  // const userR = response.userId;

  useEffect(() => {
    async function fetchData() {
      if (currUserId) {
        await dispatch(fetchUserById(currUserId));
        await dispatch(fetchQuestions());
        await dispatch(fetchResponse(currUserId));
        await dispatch(fetchResponseGroupByPairId(currUserPairId));
        await dispatch(fetchResponseGroup());
      }
    }
    fetchData();
  }, [currUserId]);

  useEffect(() => {
    refreshData();
  }, [currUserId, userDoc]);

  // const updateResponse = async (currResponseId, updatedResponse) => {
  //   const id = await axios.put(`${apiUrl}/responses/group`, { currResponseId, updatedResponse });
  //   return id;
  // };

  // const addResponse = async (responseData, currPairId, groupId) => {
  //   const id = await axios.post(`${apiUrl}/responses/`, { responseData, currPairId, groupId });
  //   return id;
  // };
  const getPair = async () => {
    return axios.get(`${apiUrl}/pairs/${userDoc.pair_id}`);
  };

  const getResponse = async (id) => {
    const response1 = await axios.get(`${apiUrl}/responses/${id}`);
    return response1.data;
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
        if (currUserId === pairCreatorId) {
          if (responseGroupData.p1_response_id) {
            userResponse = await getResponse(responseGroupData.p1_response_id);
            // setResponseId(responseGroupData?.p1_response_id);
          }
        } else if (currUserId !== pairCreatorId) {
          if (responseGroupData.p2_response_id) {
            userResponse = await getResponse(responseGroupData.p2_response_id);
            // setResponseId(responseGroupData?.p2_response_id);
          }
        }
        if (userResponse) {
          setTextAnswer(userResponse.response);
          setNewResponse(false);
        }

        // Set daily question
        // setQuestion(questionData.questions[responseGroupData.question_id].question);
      }
    } catch (error) {
      console.error('Error occurred during data refresh:', error);
    }
  };

  const handleOnSubmit = async () => {
    // const groupId = userDoc.pair_id + moment().format('MMDDYY');
  //   try {
  //     if (newResponse) {
  //       setSubmit(true);
  //     } else {
  //       updateResponse(
  //         currUserId,
  //         {
  //           response: textAnswer,
  //           user_id: currUserId,
  //         },
  //       );
  //     }
  //     navigation.navigate('Checkin');
  //   } catch (e) {
  //     console.log('Failed to submit response: ', e);
  //   }
  // };

    try {
      if (newResponse) {
        await dispatch(createResponse(currUserId, {
          response: textAnswer,
          userId: currUserId,
          responseGroupId: currUserPairId,
        }));

        // await dispatch(updateResponseGroup(currUserResponseGroupId,))

        if (!newResponse) {
          // update Response

        }
        // } else {
        //   await updateResponse(
        //     currUserId,
        //     {
        //       response: textAnswer,
        //       user_id: currUserId,
        //     },
        //   );
        // }
        navigation.navigate('CheckinUserResponded');
      }
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
              <Card.Title style={styles.question}>{currQuestion}</Card.Title>
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
