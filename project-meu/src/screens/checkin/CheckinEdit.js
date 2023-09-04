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
  fetchResponse, fetchResponseByUserId, fetchResponseByPartnerId, updateResponse,
} from '../../actions/ResponseActions';
import { updateResponseGroup, fetchResponseGroupByPairId } from '../../actions/ResponseGroupActions';

function CheckinEdit({ navigation }) {
  // need to be fixed : edit answer => no create Response & update the response
  const [textAnswer, setTextAnswer] = useState('');
  const [setHandleonSubmit, HandleonSumbit] = useState(false);
  const [newResponse, setNewResponse] = useState(true);
  const [submit, setSubmit] = useState(false);
  const [edit, setEdit] = useState(false);
  const userResponseCheck = '';
  const partnerResponseCheck = '';

  const dispatch = useDispatch();

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
    // console.log('latestResonseGroup', latestResonseGroup);
    // console.log('currUserResponseGroupId', currUserResponseGroupId);
  }

  const currQuestion = questions.length > 0 ? questions[currQuestionId].question : null;

  // response Data
  // get User's Response
  const currUserResponse = useSelector((state) => state.responseState.allResponses);
  let latestUserResponse = '';
  let currUserResponseId = '';
  let currUserResponseCreatedAt = '';
  if (currUserResponse) {
    const sortedUserResponse = Object.values(currUserResponse).sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
    latestUserResponse = sortedUserResponse[0];
    if (latestUserResponse) {
      // currUserResponseText = latestUserResponse.response;
      currUserResponseId = latestUserResponse._id;
      currUserResponseCreatedAt = latestUserResponse.createdAt;
    }

    console.log('currUserResponseId222222', currUserResponseId);
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

      if (partnerResponseCheck) {
        latestPartnerResponse = sortedPartnerResponse[0];
      }
    }
  }

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
  }, [currUserId]);

  useEffect(() => {
    async function fetchPartnerResponse() {
      if (partnerId) {
        await dispatch(fetchResponseByPartnerId(partnerId));
      }
    }
    fetchPartnerResponse();
  }, [partnerId]);

  console.log('currUserResponseId', currUserResponseId);
  const handleOnEdit = async () => {
    // if (currUserResponseId) {
    // await dispatch(updateResponse(currUserResponseId, {
    //   response: textAnswer,
    // }));
    // }

    await dispatch(updateResponse('64f53db6210ed4715f62b443', {
      response: textAnswer,
    }));

    // if (!userResponseCheck && !partnerResponseCheck) {
    //   await dispatch(createResponse(currUserId, {
    //     response: textAnswer,
    //     userId: currUserId,
    //     responseGroupId: currUserPairId,
    //   }));
    // }

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
    setSubmit(false);
  };

  useEffect(() => {
    async function fetchResponseData() {
      if (currUserId) {
        await dispatch(fetchResponseByUserId(currUserId));
      }
    }
    fetchResponseData();
  }, [currUserId]);

  // useEffect(() => {
  //   async function updateRG() {
  //     if (currUserResponseId) {
  //       await dispatch(updateResponseGroup(currUserResponseGroupId, {
  //         responseId1: currUserResponseId,
  //       }));
  //     }
  //   }
  //   updateRG();
  // }, [HandleonSumbit]);

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
              <TouchableOpacity style={styles.button} onPress={handleOnEdit}>
                <Text style={styles.buttonText}>
                  Edit the Answer
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

export default CheckinEdit;
