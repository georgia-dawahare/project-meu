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
import {
  fetchResponseByUserId, fetchResponseByPartnerId, fetchResponse, fetchResponse2,
} from '../../actions/ResponseActions';

function CheckinPage({ navigation }) {
  const [fontLoaded, setFontLoaded] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(1);
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();

  console.log('*********** Checkin Page **************');

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
  let latestResponseGroup = '';
  // let latestResponseGroupId = '';
  let currQuestionresponseId1 = '';
  let currQuestionresponseId2 = '';

  if (currUserResponseGroup) {
    const sortedResponseGroup = Object.values(currUserResponseGroup).sort((a, b) => {
      return parseInt(b.questionId, 10) - parseInt(a.questionId, 10);
    });
    if (sortedResponseGroup) {
      latestResponseGroup = sortedResponseGroup[0];
    }

    if (latestResponseGroup) {
      currQuestionId = latestResponseGroup.questionId; // 11
      // latestResponseGroupId = latestResponseGroup._id;
      currQuestionresponseId1 = latestResponseGroup.responseId1;
      currQuestionresponseId2 = latestResponseGroup.responseId2;
    }
    // console.log('latestResponseGroup', latestResponseGroup);
  }

  const currQuestion = questions.length > 0 ? questions[currQuestionId] : null;
  let currQuestionText = '';
  if (currQuestion) {
    currQuestionText = currQuestion.question;
  }
  const nextQuestionId = currQuestionId + 1;

  // fetch responseId1 Response
  const Id1Response = useSelector((state) => state.responseState.currResponse);
  let Id1UserId = '';
  let Id1CreatedAt = '';
  if (Id1Response && isResponseWithin24Hours(Id1Response.createdAt)) {
    Id1UserId = Id1Response.userId;
    Id1CreatedAt = Id1Response.createdAt;
    // console.log('Id1Response', Id1Response);
  }

  // fetch responseId2 Response
  const Id2Response = useSelector((state) => state.responseState.anotherResponse);
  let Id2UserId = '';
  let Id2CreatedAt = '';
  if (Id2Response && isResponseWithin24Hours(Id2Response.createAt)) {
    Id2UserId = Id2Response.userId;
    Id2CreatedAt = Id2Response.createdAt;
  }
  // console.log('Id2Response', Id2Response);

  // here problem : // automatically change the pages depends on the conditions ,but cannot access submit response
  useEffect(() => {
    if (Id1Response !== '' && Id2Response !== '' && latestResponseGroup !== '') {
      checkConditionsAndNavigate();
      setIsLoading(false);
    }
  }, [Id1Response, Id2Response, latestResponseGroup]);

  useEffect(() => {
    async function fetchData() {
      if (currUserId) {
        dispatch(fetchUserById(currUserId));
        dispatch(fetchQuestions());
        dispatch(fetchPartner(currUserId));
        dispatch(fetchResponseByUserId(currUserId));
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

  // Refresh questions everyday
  useEffect(() => {
    const updateQuestionOnTime = () => {
      const currentDate = new Date();
      if (currentDate.getHours() === 18 && currentDate.getMinutes() === 4 && currentDate.getSeconds() === 0) {
        setCurrentQuestionIndex((prevIndex) => (prevIndex + 1) % questions.length);

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

  const checkConditionsAndNavigate = () => {
    console.log('latestResponseGroup tRYUEEE', latestResponseGroup);

    if (Id1UserId !== undefined && Id2Response && latestResponseGroup) {
      console.log('latestResponseGroup', latestResponseGroup);
      if (currQuestionresponseId1 !== undefined && currQuestionresponseId2 === undefined && Id1Response && Id1UserId === currUserId) {
        navigation.navigate('CheckinUserResponded');
      } else if (currQuestionresponseId1 !== undefined && currQuestionresponseId2 === undefined && Id1Response && Id1UserId === partnerId) {
        navigation.navigate('CheckinPartnerResponded');
      } else if (currQuestionresponseId1 !== undefined && currQuestionresponseId2 !== undefined) {
        navigation.navigate('CheckinBothResponded');
      } else {
        console.log('fail to navigate to proper pages in CheckinPage');
      }
    }
  };
  // useEffect(() => {
  //   if (Id1Response !== '' && Id2Response !== '' && latestResponseGroup !== '') {
  //     checkConditionsAndNavigate();
  //     // dispatch(fetchResponse(currQuestionresponseId1));
  //     // dispatch(fetchResponse2(currQuestionresponseId2));
  //     // dispatch(fetchResponseGroupByPairId(currUserPairId));
  //   }
  // }, []);

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

export default CheckinPage;
