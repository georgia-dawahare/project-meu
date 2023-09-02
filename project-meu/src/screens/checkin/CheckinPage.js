/* eslint-disable global-require */
import React, { useEffect, useState, useCallback } from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
  RefreshControl,
  ScrollView,
} from 'react-native';
import {
  Card,
} from 'react-native-elements';
import * as Font from 'expo-font';
import { useSelector, useDispatch } from 'react-redux';
import TitleHeader from '../../components/TitleHeader';

import { fetchUserById } from '../../actions/UserActions';
import { fetchQuestions } from '../../actions/QuestionsActions';
import { fetchPair } from '../../actions/PairActions';
import { fetchPartner } from '../../actions/PartnerActions';
import { createResponseGroup, fetchResponseGroupByPairId } from '../../actions/ResponseGroupActions';
import { fetchResponseByUserId, fetchResponseByPartnerId } from '../../actions/ResponseActions';

function CheckinBothResponeded({ navigation }) {
  const [fontLoaded, setFontLoaded] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(1);
  const [refreshing, setRefreshing] = useState(false);
  // const [hasCreatedResponse, setHasCreatedResponse] = useState(false);

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

  // partner Data
  const partner = useSelector((state) => state.partnerState.partnerData);
  const partnerId = partner._id;
  // console.log('partnerId', partnerId);

  // questions Data
  const questions = useSelector((state) => state.questionsState.questionsData);

  // get reponseGroups of the pair
  const currUserResponseGroup = useSelector((state) => state.responseGroupState.allResponseGroups);
  let currQuestionId = '';
  let latestResonseGroup = '';
  // let currQuestionresponseId1 = '';
  // let currQuestionresponseId2 = '';

  if (currUserResponseGroup) {
    const sortedResponseGroup = Object.values(currUserResponseGroup).sort((a, b) => {
      return parseInt(b.questionId, 10) - parseInt(a.questionId, 10);
    });
    if (sortedResponseGroup) {
      latestResonseGroup = sortedResponseGroup[0];
    }

    if (latestResonseGroup) {
      currQuestionId = latestResonseGroup.questionId; // 11
    }

    // currQuestionresponseId1 = latestResonseGroup.responseId1;// undefined
    // currQuestionresponseId2 = latestResonseGroup.responseId2;// undefined
    console.log('latestResonseGroup', latestResonseGroup);
    // console.log('currQuestionresponseId2', currQuestionresponseId2);
  }

  const currQuestion = questions.length > 0 ? questions[currQuestionId] : null;
  let currQuestionText = '';
  if (currQuestion) {
    currQuestionText = currQuestion.question;
  }
  const nextQuestionId = currQuestionId + 1;

  // get User's Response
  const currUserResponse = useSelector((state) => state.responseState.allResponses);
  let latestUserResponse = '';
  let currUserResponseText = '';
  // let currUserResponseId = '';
  let currUserResponseCreatedAt = '';
  if (currUserResponse) {
    const sortedUserResponse = Object.values(currUserResponse).sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
    latestUserResponse = sortedUserResponse[0];
    if (latestUserResponse) {
      currUserResponseText = latestUserResponse.response;
      // currUserResponseId = latestUserResponse._id;
      currUserResponseCreatedAt = latestUserResponse.createdAt;
    }

    console.log('currUserResponseCreatedAt', currUserResponseCreatedAt);
  }

  // get partnerResponse
  const partnerResponse = useSelector((state) => state.responseState.partnerResponse);
  let latestPartnerResponse = '';
  let sortedPartnerResponse = '';
  let partnerResponseCreatedAt = '';
  let partnerResponseText = '';
  // const partnerResponseId = '';
  if (partnerResponse.length > 0) {
    sortedPartnerResponse = Object.values(partnerResponse).sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
    latestPartnerResponse = sortedPartnerResponse[0];
    // console.log('latestPartnerResponse', latestPartnerResponse);

    if (latestPartnerResponse) {
      partnerResponseText = latestPartnerResponse.response;
      // partnerResponseId = latestPartnerResponse._id;
      partnerResponseCreatedAt = latestPartnerResponse.createdAt;
    }

    // console.log('partnerResponseId', partnerResponseId);
  }
  const userResponseCheck = isResponseWithin24Hours(currUserResponseCreatedAt);
  const partnerResponseCheck = isResponseWithin24Hours(partnerResponseCreatedAt);

  console.log('userResponseCheck', userResponseCheck);
  console.log('partnerResponseCheck', partnerResponseCheck);

  // fetch Data
  useEffect(() => {
    async function fetchData() {
      if (currUserId) {
        dispatch(fetchUserById(currUserId));
        dispatch(fetchQuestions());
        dispatch(fetchPartner(currUserId));
        dispatch(fetchResponseByUserId(currUserId));
        // dispatch(fetchResponseByPartnerId(currUserId));
      }
    }
    fetchData();
  }, [currUserId]);

  useEffect(() => {
    async function pairData() {
      if (currUserId) {
        await dispatch(fetchPair(currUserId));
      }
    }
    pairData();
  }, [currUserId]);

  useEffect(() => {
    async function fetchGroupResponses() {
      if (currUserPairId) {
        await dispatch(fetchResponseGroupByPairId(currUserPairId));
      }
    }
    fetchGroupResponses();
  }, [currUserPairId]);

  useEffect(() => {
    async function fetchPartnerResponse() {
      if (partnerId) {
        await dispatch(fetchResponseByPartnerId(partnerId));
      }
    }
    fetchPartnerResponse();
  }, [partnerId]);

  // useEffect(() => {
  //   async function fetchLatestResponse1() {
  //     if (currQuestionresponseId1) {
  //       await dispatch(fetchResponse(currQuestionresponseId1));
  //     }
  //   }
  //   fetchLatestResponse1();
  // }, [currQuestionresponseId1]);

  // useEffect(() => {
  //   async function fetchLatestResponse2() {
  //     if (currQuestionresponseId2) {
  //       await dispatch(fetchResponse(currQuestionresponseId2));
  //     }
  //   }
  //   fetchLatestResponse2();
  // }, [currQuestionresponseId2]);

  // Refresh questions everyday
  useEffect(() => {
    const updateQuestionOnTime = () => {
      const currentDate = new Date();
      if (currentDate.getHours() === 17 && currentDate.getMinutes() === 16) {
        setCurrentQuestionIndex((prevIndex) => (prevIndex + 1) % questions.length);

        // by C
        dispatch(createResponseGroup(
          currUserPairId,
          nextQuestionId,
        ));
      }

      const nextDay = new Date(currentDate);
      nextDay.setDate(currentDate.getDate() + 1);
      nextDay.setHours(0);
      nextDay.setMinutes(4);
      const timeUntilNextUpdate = nextDay - currentDate;
      setTimeout(updateQuestionOnTime, timeUntilNextUpdate);
    };

    updateQuestionOnTime();
  }, [questions]);

  // fetch Font
  useEffect(() => {
    async function loadFont() {
      await Font.loadAsync({
        'SF-Pro-Display-Bold': require('../../../assets/fonts/SF-Pro-Display-Bold.otf'),
        'SF-Pro-Display-Semibold': require('../../../assets/fonts/SF-Pro-Display-Semibold.otf'),
        'SF-Pro-Display-Medium': require('../../../assets/fonts/SF-Pro-Display-Medium.otf'),
      });
      setFontLoaded(true);
    }
    loadFont();
  }, []);

  // scrollable page refresh 0.5s
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 500);
  }, []);

  // navigate pages
  // if (currUserResponseText && partnerResponseText && userResponseCheck && partnerResponseCheck) {
  //   navigation.navigate('CheckinBothResponeded');
  //   // navigation.navigate('CheckinUserResponded');
  // } else if (!currUserResponseText && partnerResponseText && partnerResponseCheck) {
  //   navigation.navigate('CheckinPartnerResponded');
  // } else if (currUserResponseText && !partnerResponseText && userResponseCheck) {
  //   navigation.navigate('CheckinUserResponded');
  // }

  // const getDailyResponses = async (responseGroupData) => {
  //   let currUserResponse, p1Date, p2Date;

  //   if (currUserResponse) {
  //     const p1Timestamp = currUserResponse.timestamp._seconds * 1000 + Math.floor(currUserResponse.timestamp._nanoseconds / 1000000);
  //     p1Date = new Date(p1Timestamp);
  //   }
  //   if (partnerResponse) {
  //     const p2Timestamp = partnerResponse.timestamp._seconds * 1000 + Math.floor(partnerResponse.timestamp._nanoseconds / 1000000);
  //     p2Date = new Date(p2Timestamp);
  //   }

  //   // Current user is pair creator
  //   if (currUserId === currUserResponse?.user_id || partnerId === partnerResponse?.user_id) {
  //     //  Add user response
  //     if (currUserResponse) {
  //       setUserResponse(currUserResponse.response);
  //       // createResponse(currUserUid, currUserResponse);
  //       setUserResponseTime(`${p1Date.getHours().toString()}:${p1Date.getMinutes().toString()}`);
  //     }
  //     // Add partner response
  //     if (partnerResponse) {
  //       const minutes = ((p2Date.getMinutes() < 10 ? '0' : '') + p2Date.getMinutes()).toString();
  //       setPartnerResponseTime(`${p2Date.getHours().toString()}:${minutes}`);
  //       setPartnerResponse(partnerResponse.response);
  //     }
  //     // Current user is p2
  //   } else if (currUserId === partnerResponse?.user_id || partnerId === currUserResponse?.user_id) {
  //     // Add user response
  //     if (partnerResponse) {
  //       setUserResponse(partnerResponse.response);
  //       setUserResponseTime(`${p2Date.getHours().toString()}:${p2Date.getMinutes().toString()}`);
  //     }
  //     // Add partner response
  //     if (currUserResponse) {
  //       setPartnerResponseTime(`${p1Date.getHours().toString()}:${p1Date.getMinutes().toString()}`);
  //       setPartnerResponse(currUserResponse.response);
  //     }
  //   }
  // };

  const displayNoResponses = () => {
    return (
      <View>
        <Card containerStyle={styles.cardContainer}>
          <Text style={styles.cardTitle}>Daily Question</Text>
          <Card.Title style={styles.question}>{currQuestionText}</Card.Title>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('CheckinSubmit')}>
            <Text style={styles.buttonTxt}>Submit a Response</Text>
          </TouchableOpacity>
        </Card>
      </View>
    );
  };

  if (!fontLoaded) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <TitleHeader title="Check-In" />
      <ScrollView contentContainerStyle={styles.contentContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
      >
        {displayNoResponses()}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
  },
  cardContainer: {
    borderRadius: 15,
    padding: 20,
    marginBottom: 100,
  },
  cardTitle: {
    fontFamily: 'SF-Pro-Display-Medium',
  },
  question: {
    textAlign: 'center',
    fontSize: 28,
    fontFamily: 'SF-Pro-Display-Bold',
    lineHeight: 34,
    margin: 30,
  },
  button: {
    borderRadius: 15,
    marginTop: 20,
    backgroundColor: 'rgba(230, 43, 133, 1)',
    height: 56,
    width: 300,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonTxt: {
    fontFamily: 'SF-Pro-Display-Medium',
    color: 'white',
    fontSize: 20,
    lineHeight: 30,
  },
  responseHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImg: {
    width: 40,
    height: 80,
    alignSelf: 'flex-end',
  },
  partnerNameTxt: {
    marginLeft: 10,
  },
  blurText: {
    height: 3,
    width: '90%',
    shadowOpacity: 1,
    shadowColor: '#000',
    shadowOffset: { width: 10, height: 10 },
    shadowRadius: 5,
    elevation: 5,
    borderWidth: 0.5,
    borderColor: 'white',
    backgroundColor: 'rgba(255, 255, 255, 1)',
    marginBottom: 20,
  },
  seeMoreButtonWrapper: {
    alignSelf: 'flex-end',
  },
  seeMoreButton: {
    backgroundColor: 'rgba(230, 43, 133, 1)',
    borderRadius: 30,
    width: 138,
    height: 36,
    alignItems: 'center',
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  seeMoreButtonTxt: {
    fontFamily: 'SF-Pro-Display-Medium',
    color: 'white',
    fontSize: 14,
    lineHeight: 21,
  },
  myResponseHeader: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
    alignItems: 'center',
  },
  userNameTxt: {
    marginRight: 10,
  },
  leftText: {
    textAlign: 'right',
  },
  editButton: {
    marginTop: 10,
    alignSelf: 'flex-end',
    alignItems: 'center',
    justifyContent: 'center',
  },
  editImg: {
    width: 45,
    height: 45,
  },
  viewMoreButtonWrapper: {
    alignItems: 'center',
  },
  responseWrapper: {
    flex: 1,
    justifyContent: 'center',
  },
  editButtonContainer: {
    width: 45,
    height: 45,
  },
});

export default CheckinBothResponeded;
