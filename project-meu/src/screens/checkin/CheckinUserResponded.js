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
// import Modal from 'react-native-modal';
import * as Font from 'expo-font';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { apiUrl } from '../../constants/constants';
import TitleHeader from '../../components/TitleHeader';

import { fetchUserById, fetchPartnerDataById } from '../../actions/UserActions';
import { fetchQuestions } from '../../actions/QuestionsActions';
import { fetchResponseByUserId } from '../../actions/ResponseActions';
import { fetchPair } from '../../actions/PairActions';
// import { fetchResponseGroup } from '../../actions/ResponseGroupActions';

function CheckinUserResponeded({ navigation }) {
  const [fontLoaded, setFontLoaded] = useState(false);

  const [userResponseTime, setUserResponseTime] = useState('');
  const [partnerResponseTime, setPartnerResponseTime] = useState('');
  const [userResponse, setUserResponse] = useState('');
  const [partnerResponse, setPartnerResponse] = useState('');

  // const [userDoc, setUserDoc] = useState('');
  // const [partnerDoc, setPartnerDoc] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const emojis = ['💖', '😜', '😘', '‼️', '😢'];

  const dispatch = useDispatch();

  // userData
  const user = useSelector((state) => state.userState.userData);
  const currUserId = user._id;
  const currUserFirstName = user.firstName;
  const currUserPairId = user.pairId;
  // console.log('user :      ', user);

  // To get partnerId from pairs
  const pairs = useSelector((state) => state.pairState.pairData);
  let partnerId;
  if (currUserPairId === pairs._id) {
    if (pairs.primaryUserId === currUserId) {
      partnerId = pairs.secondaryUserId;
    } else if (pairs.secondaryUserId === currUserId) {
      partnerId = pairs.primaryUserId;
    }
  }
  // console.log('partnerId :     ', partnerId);

  // partner Data
  const partner = useSelector((state) => state.partnerState.partnerData);
  const partnerFirstName = partner.firstName;
  // console.log('partner Info : ', partner);
  console.log('partner Info : ', partnerFirstName);

  // questions Data
  const questions = useSelector((state) => state.questionsState.questionsData);

  // get reponseGroups of the pair
  const currUserResponseGroup = useSelector((state) => state.responseGroupState.allResponseGroups);
  let currQuestionId = '';
  // let currQuestionresponse1 = '';
  // let currQuestionresponse2 = '';
  if (currUserResponseGroup.length > 0) {
    const sortedResponseGroup = Object.values(currUserResponseGroup).sort((a, b) => {
      return parseInt(b.questionId, 10) - parseInt(a.questionId, 10);
    });

    const latestResonseGroup = sortedResponseGroup[0];
    currQuestionId = latestResonseGroup.questionId;
    // currQuestionresponse1 = latestResonseGroup.responseId1;
    // currQuestionresponse2 = latestResonseGroup.responseId2;
    // console.log('latestResonseGroup', latestResonseGroup);
  }

  const currQuestion = questions.length > 0 ? questions[currQuestionId].question : null;

  // response Data
  const responses = useSelector((state) => state.responseState.allResponses);
  let LatestCurrUserResponseText = '';
  let LatestResponseId = '';
  let LatestResponseTimeStamp = '';
  if (responses) {
    const sortedResponses = Object.values(responses).sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    const latestResponse = sortedResponses[0];
    if (latestResponse) {
      LatestCurrUserResponseText = latestResponse.response;
      LatestResponseId = latestResponse._id;
      LatestResponseTimeStamp = latestResponse.createdAt;

      console.log('latestResponseText', LatestCurrUserResponseText);
      console.log('responseId : ', LatestResponseId);
      console.log('TimeStamp : ', LatestResponseTimeStamp);
    }
  }

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
    async function fetchPartnerData() {
      if (partnerId && currUserId) {
        await dispatch(fetchPartnerDataById(partnerId));
      }
    }
    fetchPartnerData();
  }, [partnerId, currUserId]);

  // useEffect(() => {
  //   async function fetchResponses() {
  //     if (currUserResponses) {
  //       console.log('here');
  //       try {
  //         const response = await dispatch(fetchResponse(currUserId));
  //         console.log('Fetched user responses:', response);
  //       } catch (error) {
  //         console.log('Error fetching user responses:', error);
  //       }
  //     }
  //   }
  //   fetchResponses();
  //   console.log('GroupResponses');
  // }, [currUserResponses]);

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

  // for emoji
  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const selectEmoji = (emoji) => {
    setSelectedEmoji(emoji);
    closeModal();
  };

  // scrollable page refresh 0.5s
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 500);
  }, []);

  // reformatting Timestamp
  const TimeFormat = async (timestamp) => {
    const createdAtValue = new Date(timestamp);
    const userTimezoneOffset = -5 * 60; // EST TomeZone:  UTC-5
    const userCreatedAt = new Date(createdAtValue.getTime() + userTimezoneOffset * 60 * 1000);

    // Need to be fixed. Temporary EST Time zone
    const formattedUserCreatedAt = userCreatedAt.toLocaleString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
      timeZone: 'America/New_York',
    });

    return formattedUserCreatedAt;

    // console.log('Formatted User Created At (EST):', formattedUserCreatedAt);
  };

  const CurrFormattedTimeStamp = TimeFormat(LatestResponseTimeStamp);

  const getDailyResponses = async (responseGroupData) => {
    let currUserResponse, partnerResponse, p1Date, p2Date;

    // Populate partner responses if they exist

    if (responseGroupData.currUserId) {
      currUserResponse = await getResponse(responseGroupData.currUserId);
    }
    if (responseGroupData.partnerId) {
      partnerResponse = await getResponse(responseGroupData.partnerId);
    }

    if (currUserResponse) {
      const p1Timestamp = currUserResponse.timestamp._seconds * 1000 + Math.floor(currUserResponse.timestamp._nanoseconds / 1000000);
      p1Date = new Date(p1Timestamp);
    }
    if (partnerResponse) {
      const p2Timestamp = partnerResponse.timestamp._seconds * 1000 + Math.floor(partnerResponse.timestamp._nanoseconds / 1000000);
      p2Date = new Date(p2Timestamp);
    }

    // Current user is pair creator
    if (currUserId === currUserResponse?.user_id || partnerId === partnerResponse?.user_id) {
      //  Add user response
      if (currUserResponse) {
        setUserResponse(currUserResponse.response);
        // createResponse(currUserUid, currUserResponse);
        setUserResponseTime(`${p1Date.getHours().toString()}:${p1Date.getMinutes().toString()}`);
      }
      // Add partner response
      if (partnerResponse) {
        const minutes = ((p2Date.getMinutes() < 10 ? '0' : '') + p2Date.getMinutes()).toString();
        setPartnerResponseTime(`${p2Date.getHours().toString()}:${minutes}`);
        setPartnerResponse(partnerResponse.response);
      }
      // Current user is p2
    } else if (currUserId === partnerResponse?.user_id || partnerId === currUserResponse?.user_id) {
      // Add user response
      if (partnerResponse) {
        setUserResponse(partnerResponse.response);
        setUserResponseTime(`${p2Date.getHours().toString()}:${p2Date.getMinutes().toString()}`);
      }
      // Add partner response
      if (currUserResponse) {
        setPartnerResponseTime(`${p1Date.getHours().toString()}:${p1Date.getMinutes().toString()}`);
        setPartnerResponse(currUserResponse.response);
      }
    }
  };

  // const refreshData = async () => {
  //   if (userDoc && partnerDoc) {
  //     let responseGroup, responseGroupData, groupId;
  //     try {
  //       // Fetch user ID & user doc
  //       const pairId = userDoc.pair_id;
  //       groupId = pairId + moment().format('MMDDYY');
  //       responseGroup = await getResponseGroup(groupId);
  //     } catch (error) {
  //       console.error('Error occurred during data refresh:', error);
  //     }
  //     try {
  //       if (groupId) {
  //       // if there is no response group, create a new one!
  //         if (responseGroup.status === 202) {
  //           responseGroup = await createResponseGroup(groupId);
  //         }

  //         if (responseGroup) {
  //           responseGroupData = responseGroup.data;
  //         } else {
  //           return;
  //         }
  //       }
  //     } catch (error) {
  //       console.error('Error occurred during data refresh:', error);
  //     }

  //     try {
  //       if (responseGroupData) {
  //       // Retrieve couple responses
  //         await getDailyResponses(responseGroupData);
  //       }
  //     } catch (error) {
  //       console.error('Error occurred during data refresh:', error);
  //     }
  //   }
  // };

  const displayUserResponse = () => {
    return (
      <View style={styles.responseWrapper}>
        <Card containerStyle={styles.cardContainer}>
          <Text style={styles.cardTitle}>Daily Question</Text>
          <Card.Title style={styles.question}>{currQuestion}</Card.Title>
          <View>
            <View style={styles.myResponseHeader}>
              <View style={styles.userNameTxt}>
                <Text style={styles.leftText}>{currUserFirstName}</Text>
                <Text style={styles.leftText}>{userResponseTime}</Text>
              </View>
              <Image style={styles.profileImg}
                source={require('../../../assets/animations/neutral/neutral_pink.gif')}
              />
            </View>
            <Text style={styles.leftText}>{LatestCurrUserResponseText}</Text>
          </View>
          <TouchableOpacity style={styles.editButton} onPress={() => navigation.navigate('CheckinSubmit')}>
            <Image
              source={require('../../../assets/images/editButton.png')}
              style={styles.editImg}
            />
          </TouchableOpacity>
        </Card>
        <View style={styles.viewMoreButtonWrapper}>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('CheckinHistory')}>
            <Text style={styles.buttonTxt}>View More</Text>
          </TouchableOpacity>
        </View>
        <View />
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
        {displayUserResponse()}
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

export default CheckinUserResponeded;
