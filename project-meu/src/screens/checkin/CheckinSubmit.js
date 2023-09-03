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

import { fetchQuestions } from '../../actions/QuestionsActions';
import { fetchUserById } from '../../actions/UserActions';
import {
  createResponse, fetchResponse, fetchResponseByUserId, fetchResponseByPartnerId,
} from '../../actions/ResponseActions';
import { updateResponseGroup, fetchResponseGroupByPairId } from '../../actions/ResponseGroupActions';

function CheckinSubmit({ navigation }) {
  const [textAnswer, setTextAnswer] = useState('');
  const [setHandleonSubmit, HandleonSumbit] = useState(false);
  const [newResponse, setNewResponse] = useState(true);
  // const [userDoc, setUserDoc] = useState('');
  const [submit, setSubmit] = useState(false);
  let userResponseCheck = '';
  let partnerResponseCheck = '';

  const dispatch = useDispatch();

  // check if it's within 24hrs
  const isResponseWithin24Hours = (responseCreatedAt) => {
    const twentyFourHoursAgo = new Date();
    twentyFourHoursAgo.setDate(twentyFourHoursAgo.getDate() - 1);
    return new Date(responseCreatedAt) >= twentyFourHoursAgo;
  };

  // userData
  const user = useSelector((state) => state.userState.userData);
  const currUserId = user._id;
  const currUserPairId = user.pairId;
  // console.log('user :      ', user);

  // // Partner Data
  const partner = useSelector((state) => state.partnerState.partnerData);
  const partnerId = partner._id;
  // console.log('partnerId', partnerId);

  // questions Data
  const questions = useSelector((state) => state.questionsState.questionsData);
  // const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  // fetch ResponseGroupData
  const currUserResponseGroup = useSelector((state) => state.responseGroupState.allResponseGroups);
  let currQuestionId = '';
  let currUserResponseGroupId12 = '';
  let latestResponseId1 = '';
  let latestResponseId2 = '';
  if (currUserResponseGroup.length > 0) {
    const sortedResponseGroup = Object.values(currUserResponseGroup).sort((a, b) => {
      return parseInt(b.questionId, 10) - parseInt(a.questionId, 10);
    });

    const latestResonseGroup = sortedResponseGroup[0];
    currQuestionId = latestResonseGroup.questionId;
    currUserResponseGroupId12 = latestResonseGroup._id;
    latestResponseId1 = latestResonseGroup.responseId1;
    latestResponseId2 = latestResonseGroup.responseId2;
    // console.log('currUserResponseGroupId', currUserResponseGroupId);
    // console.log('latestResponseId2', latestResponseId2);
  }

  const currQuestion = questions.length > 0 ? questions[currQuestionId].question : null;
  // console.log('currQuestion', currQuestion);

  // response Data
  // get User's Response
  const currUserResponse = useSelector((state) => state.responseState.allResponses);
  let latestUserResponse;
  // const currUserResponseText = '';
  let currUserResponseId = '';
  let currUserResponseCreatedAt = '';
  if (currUserResponse) {
    const sortedUserResponse = Object.values(currUserResponse).sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    console.log('latestUserResponse', latestUserResponse);
    if (latestUserResponse) {
      // currUserResponseText = latestUserResponse.response;
      currUserResponseId = latestUserResponse._id;
      currUserResponseCreatedAt = latestUserResponse.createdAt;
      userResponseCheck = isResponseWithin24Hours(currUserResponseCreatedAt);

      if (userResponseCheck) {
        latestUserResponse = sortedUserResponse[0];
      }
    }
  }

  // get partnerResponse
  const partnerResponse = useSelector((state) => state.responseState.partnerResponse);
  let latestPartnerResponse = '';
  let sortedPartnerResponse = '';
  let partnerResponseCreatedAt = '';
  // const partnerResponseText = '';
  // const partnerResponseId = '';
  if (partnerResponse) {
    sortedPartnerResponse = Object.values(partnerResponse).sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
    latestPartnerResponse = sortedPartnerResponse[0];
    // console.log('latestPartnerResponse', latestPartnerResponse);

    if (latestPartnerResponse) {
      // partnerResponseText = latestPartnerResponse.response;
      // partnerResponseId = latestPartnerResponse._id;
      partnerResponseCreatedAt = latestPartnerResponse.createdAt;
      partnerResponseCheck = isResponseWithin24Hours(partnerResponseCreatedAt);

      if (partnerResponseCheck) {
        latestPartnerResponse = sortedPartnerResponse[0];
      }
    }
  }

  // navigate pages
  // if (userResponseCheck && partnerResponseCheck) {
  //   navigation.navigate('CheckinBothResponeded');
  //   // navigation.navigate('CheckinUserResponded');
  // } else if (!userResponseCheck && partnerResponseCheck) {
  //   navigation.navigate('CheckinPartnerResponded');
  // } else if (userResponseCheck && !partnerResponseCheck) {
  //   navigation.navigate('CheckinUserResponded');
  // }

  useEffect(() => {
    async function fetchData() {
      if (currUserId) {
        await dispatch(fetchUserById(currUserId));
        await dispatch(fetchQuestions());
        await dispatch(fetchResponse(currUserId));
        await dispatch(fetchResponseGroupByPairId(currUserPairId));
      }
    }
    fetchData();
  }, [currUserId]);

  useEffect(() => {
    async function fetchRepsonseData() {
      if (currUserId) {
        await dispatch(fetchResponse(currUserId));
      }
    }
    fetchRepsonseData();
  }, [currUserId, createResponse]);

  useEffect(() => {
    async function fetchPartnerResponse() {
      if (partnerId) {
        await dispatch(fetchResponseByPartnerId(partnerId));
      }
    }
    fetchPartnerResponse();
  }, [partnerId]);

  // const getPair = async () => {
  //   return axios.get(`${apiUrl}/pairs/${userDoc.pair_id}`);
  // };

  // const getResponse = async (id) => {
  //   const response1 = await axios.get(`${apiUrl}/responses/${id}`);
  //   return response1.data;
  // };

  // const refreshData = async () => {
  //   try {
  //   // Fetch user ID & user doc
  //     if (userDoc) {
  //       let userResponse;
  //       // const pair = await getPair();
  //       const groupId = userDoc.pair_id + moment().format('MMDDYY');
  //       const responseGroup = await axios.get(`${apiUrl}/responses/group/${groupId}`);
  //       const responseGroupData = responseGroup.data;
  //       const pairCreatorId = pair?.data?.pair_creator_id;
  //       if (currUserId === pairCreatorId) {
  //         if (responseGroupData.p1_response_id) {
  //           userResponse = await getResponse(responseGroupData.p1_response_id);
  //           // setResponseId(responseGroupData?.p1_response_id);
  //         }
  //       } else if (currUserId !== pairCreatorId) {
  //         if (responseGroupData.p2_response_id) {
  //           userResponse = await getResponse(responseGroupData.p2_response_id);
  //           // setResponseId(responseGroupData?.p2_response_id);
  //         }
  //       }
  //       if (userResponse) {
  //         setTextAnswer(userResponse.response);
  //         setNewResponse(false);
  //       }
  //     }
  //   } catch (error) {
  //     console.error('Error occurred during data refresh:', error);
  //   }
  // };

  // updateResponseGroup(responseGroupId, updatedFields)
  const handleOnSubmit = async () => {
    if (!userResponseCheck && !partnerResponseCheck) {
      await dispatch(createResponse(currUserId, {
        response: textAnswer,
        userId: currUserId,
        responseGroupId: currUserPairId,
      }));



      // await dispatch(updateResponseGroup(currUserResponseGroupId12, {
      //   responseId1: currUserResponseId,
      // }));
    }

    // else if (latestResponseId1 && !latestResponseId2) {
    //   await dispatch(updateResponseGroup(LatestResponseId, {
    //     responseId2: LatestResponseId,
    //   }));
    // }

    // Update the response group with the new response
    // if (latestResponseId1) {
    //   const updatedResponseGroup = {
    //     responseId1: latestResponseId1 || createResponse._id,
    //     responseId2: latestResponseId1 ? createResponse._id : latestResponseId2,
    //   };

    //   await dispatch(updateResponseGroup(currUserResponseGroupId, updatedResponseGroup));
    // }

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

  useEffect(() => {
    async function updateRG() {
      if (currUserResponseId) {
        await dispatch(updateResponseGroup(currUserResponseGroupId12, {
          responseId1: currUserResponseId,
        }));
      }
    }
    updateRG();
  }, [HandleonSumbit]);

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
