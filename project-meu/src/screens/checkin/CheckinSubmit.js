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
  createResponse, fetchResponse, fetchResponseByUserId, fetchResponseByPartnerId, fetchResponse2,
} from '../../actions/ResponseActions';
import { fetchResponseGroupByPairId } from '../../actions/ResponseGroupActions';

function CheckinSubmit({ navigation }) {
  const [textAnswer, setTextAnswer] = useState('');
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
  let latestResponseGroup = '';
  let currQuestionId = '';
  let currQuestionresponseId1 = '';
  let currQuestionresponseId2 = '';
  if (currUserResponseGroup.length > 0) {
    const sortedResponseGroup = Object.values(currUserResponseGroup).sort((a, b) => {
      return parseInt(b.questionId, 10) - parseInt(a.questionId, 10);
    });

    latestResponseGroup = sortedResponseGroup[0];
    currQuestionId = latestResponseGroup.questionId;
    currQuestionresponseId1 = latestResponseGroup.responseId1;
    currQuestionresponseId2 = latestResponseGroup.responseId2;
    // console.log('latestResponseGroupId', latestResponseGroupId);
    // console.log('latestResponseId2', latestResponseId2);
  }

  const currQuestion = questions.length > 0 ? questions[currQuestionId].question : null;
  // console.log('currQuestion', currQuestion);

  // response Data
  // get User's Response
  const latestResponse = useSelector((state) => state.responseState.allResponses);
  let latestUserResponse;
  let latestResponseCreatedAt = '';
  if (latestResponse) {
    const sortedUserResponse = Object.values(latestResponse).sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    console.log('latestUserResponse', latestUserResponse);
    if (latestUserResponse) {
      latestResponseCreatedAt = latestUserResponse.createdAt;
      userResponseCheck = isResponseWithin24Hours(latestResponseCreatedAt);

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

  if (partnerResponse) {
    sortedPartnerResponse = Object.values(partnerResponse).sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
    latestPartnerResponse = sortedPartnerResponse[0];
    // console.log('latestPartnerResponse', latestPartnerResponse);

    if (latestPartnerResponse) {
      partnerResponseCreatedAt = latestPartnerResponse.createdAt;
      partnerResponseCheck = isResponseWithin24Hours(partnerResponseCreatedAt);

      if (partnerResponseCheck) {
        latestPartnerResponse = sortedPartnerResponse[0];
      }
    }
  }

  // fetch responseId1 Response
  const Id1Response = useSelector((state) => state.responseState.currResponse);
  let Id1UserId = '';
  if (Id1Response) {
    Id1UserId = Id1Response.userId;
    console.log('Id1UserId', Id1UserId);
  }

  // fetch responseId2 Response
  const Id2Response = useSelector((state) => state.responseState.anotherResponse);
  console.log(Id2Response);
  console.log('Id2Response', Id2Response);

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

  useEffect(() => {
    async function fetchId1Response() {
      if (currQuestionresponseId1) {
        await dispatch(fetchResponse(currQuestionresponseId1));
      }
    }
    fetchId1Response();
  }, [currQuestionresponseId1]);

  useEffect(() => {
    async function fetchId2Response() {
      if (currQuestionresponseId2) {
        await dispatch(fetchResponse2(currQuestionresponseId2));
      }
    }
    fetchId2Response();
  }, [currQuestionresponseId2]);

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
              <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('PartnerCheckinSubmit')}>
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
