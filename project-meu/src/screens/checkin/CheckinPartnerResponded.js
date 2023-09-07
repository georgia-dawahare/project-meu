/* eslint-disable global-require */
import React, { useEffect, useState, useCallback } from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
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
import { fetchResponseByUserId, fetchResponse, fetchResponse2 } from '../../actions/ResponseActions';
import { fetchPair } from '../../actions/PairActions';
import { updateResponseGroup } from '../../actions/ResponseGroupActions';

function CheckinPartnerResponded({ navigation }) {
  const [fontLoaded, setFontLoaded] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

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
  // const currUserFirstName = user.firstName;

  // partner Data
  const partner = useSelector((state) => state.partnerState.partnerData);
  const partnerFirstName = partner.firstName;
  const partnerId = partner._id;
  // console.log('partnerId  : ', partnerId);

  // questions Data
  const questions = useSelector((state) => state.questionsState.questionsData);

  // get reponseGroups of the pair
  const currUserResponseGroup = useSelector((state) => state.responseGroupState.allResponseGroups);
  let latestResponseGroup = '';
  let currQuestionId = '';
  let latestResponseGroupId = '';
  let currQuestionresponseId1 = '';
  let currQuestionresponseId2 = '';
  if (currUserResponseGroup.length > 0) {
    const sortedResponseGroup = Object.values(currUserResponseGroup).sort((a, b) => {
      return parseInt(b.questionId, 10) - parseInt(a.questionId, 10);
    });

    latestResponseGroup = sortedResponseGroup[0];
    currQuestionId = latestResponseGroup.questionId;
    latestResponseGroupId = latestResponseGroup._id;
    currQuestionresponseId1 = latestResponseGroup.responseId1;
    currQuestionresponseId2 = latestResponseGroup.responseId2;

    // console.log('latestResponseGroupId', latestResponseGroupId);
  }

  const currQuestion = questions.length > 0 ? questions[currQuestionId].question : null;

  // response Data
  const responses = useSelector((state) => state.responseState.allResponses);
  let latestResponse = '';
  let LatestCurrUserResponseText = '';
  let LatestResponseId = '';
  let LatestResponseTimeStamp = '';
  let LatestResponseUserId = '';

  if (responses && isResponseWithin24Hours(responses.createdAt)) {
    const sortedResponses = Object.values(responses).sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    latestResponse = sortedResponses[0];
    if (latestResponse) {
      LatestCurrUserResponseText = latestResponse.response;
      LatestResponseId = latestResponse._id;
      LatestResponseTimeStamp = latestResponse.createdAt;
      LatestResponseUserId = latestResponse.userId;
    }
  }

  // fetch responseId1 Response
  const Id1Response = useSelector((state) => state.responseState.currResponse);
  let Id1UserId,
    Id1CreatedAt;
  let Id1ResponseText = '';
  if (Id1Response) {
    Id1UserId = Id1Response.userId;
    Id1CreatedAt = Id1Response.createdAt;
    Id1ResponseText = Id1Response.response;
    // console.log('Id1UserId', Id1UserId);
  }
  // console.log('Id1Response', Id1Response);

  // fetch responseId2 Response //partnerResponse
  const Id2Response = useSelector((state) => state.responseState.anotherResponse);
  // console.log('Id2Response', Id2Response);
  let Id2UserId = '';
  let Id2ResponseText = '';
  if (Id2Response && isResponseWithin24Hours(Id2Response.createdAt)) {
    Id2UserId = Id2Response.userId;
    Id2ResponseText = Id2Response.response;
    // const Id2CreatedAt = Id2Response.createdAt;
    // console.log('Id2UserId', Id2UserId);
  }
  // console.log('Id2Response', Id2Response);

  // 24hr check
  // const Id2ResponseCheck = isResponseWithin24Hours(Id2CreatedAt);
  // const Id1ResponseCheck = isResponseWithin24Hours(Id1CreatedAt);

  // fetch Data
  useEffect(() => {
    async function fetchData() {
      if (currUserId) {
        await dispatch(fetchUserById(currUserId));
        await dispatch(fetchQuestions());
        await dispatch(fetchPair(currUserId));
        await dispatch(fetchResponseByUserId(currUserId));
      }
    }
    fetchData();
  }, [currUserId]);

  useEffect(() => {
    async function updateResponseGroupData() {
      // console.log('currQuestionresponseId1', currQuestionresponseId1);
      // console.log('currQuestionresponseId2', currQuestionresponseId2);
      console.log('Id1Response', Id1Response);
      console.log('latestResponse', latestResponse);
      console.log('latestResponseGroup', latestResponseGroup);

      if (latestResponse) {
        await dispatch(updateResponseGroup(latestResponseGroupId, {
          responseId2: LatestResponseId,
        }));
      }

      // if (!currQuestionresponseId1 && !currQuestionresponseId2) {
      //   await dispatch(updateResponseGroup(latestResponseGroupId, {
      //     responseId1: LatestResponseId,
      //   }));
      // } else if (currQuestionresponseId1 && !currQuestionresponseId2 && LatestResponseUserId === Id1Response) {
      //   await dispatch(updateResponseGroup(latestResponseGroupId, {
      //     responseId1: LatestResponseId,
      //   }));
      // } else if (currQuestionresponseId1 && !currQuestionresponseId2 && LatestResponseUserId !== Id1Response) {
      //   await dispatch(updateResponseGroup(latestResponseGroupId, {
      //     responseId2: LatestResponseId,
      //   }));
      // } else if (!currQuestionresponseId1 && currQuestionresponseId2 && LatestResponseUserId === Id2Response) {
      //   await dispatch(updateResponseGroup(latestResponseGroupId, {
      //     responseId2: LatestResponseId,
      //   }));
      // } else if (!currQuestionresponseId1 && currQuestionresponseId2 && LatestResponseUserId !== Id2Response) {
      //   await dispatch(updateResponseGroup(latestResponseGroupId, {
      //     responseId1: LatestResponseId,
      //   }));
      // } else if (currQuestionresponseId1 && currQuestionresponseId2 && LatestResponseUserId === Id1Response) {
      //   await dispatch(updateResponseGroup(latestResponseGroupId, {
      //     responseId1: LatestResponseId,
      //   }));
      // } else if (currQuestionresponseId1 && currQuestionresponseId2 && LatestResponseUserId !== Id1Response) {
      //   if (LatestResponseUserId === Id2Response) {
      //     await dispatch(updateResponseGroup(latestResponseGroupId, {
      //       responseId2: LatestResponseId,
      //     }));
      //   }
      // } else {
      //   console.log('failed to updating Response Group in CheckinUserResponded');
      // }
    }
    updateResponseGroupData();
  }, [latestResponseGroupId, LatestResponseId, Id1UserId]);

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

  // reformatting Timestamp
  const TimeFormat = async (TimeStamp) => {
    const createdAtValue = new Date(TimeStamp);
    const userTimezoneOffset = -5 * 60; // EST TomeZone:  UTC-5
    const userCreatedAt = new Date(createdAtValue.getTime() + userTimezoneOffset * 60 * 1000);

    // Need to be fixed. Temporary EST Time zone
    const formattedUserCreatedAt = userCreatedAt.toLocaleString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
      timeZone: 'America/New_York',
    });
    // console.log('Formatted User Created At (EST):', formattedUserCreatedAt);

    return formattedUserCreatedAt;
  };

  const PartnerFormattedTimeStamp = TimeFormat(Id1CreatedAt)._j;
  // console.log('CurrFormattedTimeStamp', CurrFormattedTimeStamp);

  const displayPartnerResponse = () => {
    return (
      <View style={styles.responseWrapper}>
        <Card containerStyle={styles.cardContainer}>
          <Text style={styles.cardTitle}>Daily Question</Text>
          <Text style={styles.cardTitle}>Heloooooooo CheckinPartnerResponded</Text>
          <Card.Title style={styles.question}>{currQuestion}</Card.Title>
          <View>
            <View style={styles.responseHeader}>
              <Image style={styles.profileImg}
                source={require('../../../assets/animations/neutral/neutral_black.gif')}
              />
              <View style={styles.partnerNameTxt}>
                <Text>{partnerFirstName}</Text>
                <Text>{PartnerFormattedTimeStamp}</Text>
              </View>

            </View>
            <Text style={styles.blurText}>{Id1ResponseText}</Text>
          </View>
        </Card>
        <View style={styles.viewMoreButtonWrapper}>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('PartnerCheckinSubmit')}>
            <Text style={styles.buttonTxt}>Answer To see</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <TitleHeader title="Check-In" />
      <ScrollView contentContainerStyle={styles.contentContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
      >
        {displayPartnerResponse()}
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
    marginTop: -60,
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
});

export default CheckinPartnerResponded;
