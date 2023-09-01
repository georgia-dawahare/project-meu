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
import { apiUrl } from '../../constants/constants';

import { fetchQuestions } from '../../actions/QuestionsActions';
import { fetchUserById } from '../../actions/UserActions';
import { createResponse, fetchResponse, fetchResponseByUserId } from '../../actions/ResponseActions';
import { updateResponseGroup, fetchResponseGroupByPairId } from '../../actions/ResponseGroupActions';

function CheckinSubmit({ navigation }) {
  const [textAnswer, setTextAnswer] = useState('');
  const [newResponse, setNewResponse] = useState(true);
  const [userDoc, setUserDoc] = useState('');
  const [submit, setSubmit] = useState(false);

  const dispatch = useDispatch();

  // userData
  const user = useSelector((state) => state.userState.userData);
  const currUserId = user._id;
  const currUserPairId = user.pairId;
  // console.log('user :      ', user);

  // // Partner Data
  // const pairs = useSelector((state) => state.pairState.pairData);
  // let partnerId = '';
  // if (currUserPairId === pairs._id) {
  //   if (pairs.primaryUserId === currUserId) {
  //     partnerId = pairs.secondaryUserId;
  //   } else if (pairs.secondaryUserId === currUserId) {
  //     partnerId = pairs.primaryUserId;
  //   }
  // }
  // console.log('partnerId :     ', partnerId);

  // // partner Data
  // const partner = useSelector((state) => state.partnerState.partnerData);
  // const partnerFirstName = partner.firstName;
  // console.log('partnerFirstName :     ', partnerFirstName);

  // questions Data
  const questions = useSelector((state) => state.questionsState.questionsData);
  // const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  // fetch ResponseGroupData
  const currUserResponseGroup = useSelector((state) => state.responseGroupState.allResponseGroups);
  let currQuestionId = '';
  let currUserResponseGroupId = '';
  let latestResponseId1 = '';
  let latestResponseId2 = '';
  if (currUserResponseGroup.length > 0) {
    const sortedResponseGroup = Object.values(currUserResponseGroup).sort((a, b) => {
      return parseInt(b.questionId, 10) - parseInt(a.questionId, 10);
    });

    const latestResonseGroup = sortedResponseGroup[0];
    currQuestionId = latestResonseGroup.questionId;
    currUserResponseGroupId = latestResonseGroup._id;
    latestResponseId1 = latestResonseGroup.responseId1;
    latestResponseId2 = latestResonseGroup.responseId2;
    console.log('latestResponseId1', latestResponseId1);
    console.log('latestResponseId2', latestResponseId2);
  }

  const currQuestion = questions.length > 0 ? questions[currQuestionId].question : null;
  // console.log('currQuestion', currQuestion);

  // response Data
  const responses = useSelector((state) => state.responseState.allResponses);
  let LatestCurrUserResponseText = '';
  let LatestResponseId = '';
  if (responses) {
    const sortedResponses = Object.values(responses).sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    const latestResponse = sortedResponses[0];
    if (latestResponse) {
      LatestCurrUserResponseText = latestResponse.response;
      LatestResponseId = latestResponse._id;

      // console.log('latestResponseText', LatestCurrUserResponseText);
      // console.log('responseId : ', LatestResponseId);
    }
  }
  // console.log('userResponses', responses);

  useEffect(() => {
    async function fetchData() {
      if (currUserId) {
        await dispatch(fetchUserById(currUserId));
        await dispatch(fetchQuestions());
        await dispatch(fetchResponse(currUserId));
        await dispatch(fetchResponseGroupByPairId(currUserPairId));
        // await dispatch(fetchResponseByUserId(currUserId));
      }
    }
    fetchData();
  }, [currUserId]);

  useEffect(() => {
    refreshData();
  }, [currUserId, userDoc]);

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
    // try {
    // if (newResponse) {
    //   await dispatch(createResponse(currUserId, {
    //     response: textAnswer,
    //     userId: currUserId,
    //     responseGroupId: currUserPairId,
    //   }));
    // console.log('currUserResponseGroupId', currUserResponseGroupId);
    if (!latestResponseId1 && !latestResponseId2) {
      await dispatch(createResponse(currUserId, {
        response: textAnswer,
        userId: currUserId,
        responseGroupId: currUserPairId,
      }));
    }
    // else if (latestResponseId1 && !latestResponseId2) {
    //   await dispatch(updateResponseGroup(LatestResponseId, {
    //     responseId2: LatestResponseId,
    //   }));
    // }

    // Update the response group with the new response
    if (createdResponse?._id) {
      const updatedResponseGroup = {
        responseId1: latestResponseId1 || createdResponse._id,
        responseId2: latestResponseId1 ? createdResponse._id : latestResponseId2,
      };

      await dispatch(updateResponseGroup(currUserResponseGroupId, updatedResponseGroup));
    }

    // await dispatch(updateResponseGroup(currUserResponseGroupId, {
    //   // need to be fixed
    //   responseId2: '64cb119616340a8f7439781',
    // }));

    // if (latestResponseId1) {
    //   await dispatch(updateResponseGroup(currUserResponseGroupId, {
    //     // need to be fixed
    //     responseId2: '64cb119616340a8f7439781',
    //   }));
    // } else if (!latestResponseId1) {
    //   await dispatch(updateResponseGroup(currUserResponseGroupId, {
    //     responseId1: LatestResponseId,
    //   }));
    // }

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
    setSubmit(true);
    navigation.navigate('CheckinUserResponded');
    setSubmit(false);
  };
  // } catch (e) {
  //   console.log('Failed to submit response: ', e);
  // }
  // };

  useEffect(() => {
    async function fetchResponseData() {
      if (submit) {
        await dispatch(fetchResponseByUserId(currUserId));
      }
    }
    fetchResponseData();
  }, [submit]);

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
