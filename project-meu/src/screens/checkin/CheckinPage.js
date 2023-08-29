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
import Modal from 'react-native-modal';
import * as Font from 'expo-font';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { apiUrl } from '../../constants/constants';
import TitleHeader from '../../components/TitleHeader';
import Button from '../../components/Button';

import { fetchUserById, fetchPartnerDataById } from '../../actions/UserActions';
import { fetchQuestions } from '../../actions/QuestionsActions';
import { fetchPair } from '../../actions/PairActions';
import { fetchResponseGroupByPairId, createResponseGroup } from '../../actions/ResponseGroupActions';

function CheckinPage({ navigation }) {
  const [fontLoaded, setFontLoaded] = useState(false);

  const [userResponseTime, setUserResponseTime] = useState('');
  const [partnerResponseTime, setPartnerResponseTime] = useState('');
  const [userResponse, setUserResponse] = useState('');
  const [partnerResponse, setPartnerResponse] = useState('');

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
  const partner = useSelector((state) => state.userState.partnerData);
  const partnerFirstName = partner.firstName;
  // console.log('partner Info : ', partnerFirstName);

  // questions Data
  const questionsTest = useSelector((state) => state.questionsState.questionsData);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const currQuestion = questionsTest.length > 0
    ? questionsTest[currentQuestionIndex % questionsTest.length]?.question
    : null;
  // console.log('questiosTEST:           ', questionsTest);
  // console.log('first Q :       ', currQuestion);

  // fetch ResponseGroupData
  const currUserResponseGroup = useSelector((state) => state.responseGroupState.allResponseGroups);
  // console.log('currUserResponseGroup:     ', currUserResponseGroup);
  let latestQuestionId = 0;
  if (currUserResponseGroup.length > 0) {
    const sortedResponseGroup = Object.values(currUserResponseGroup).sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    const latestResponseGroup = sortedResponseGroup[0];
    latestQuestionId = latestResponseGroup.questionId;

    console.log('latestQId : ', latestQuestionId);
    console.log('latestResponseGroup', latestResponseGroup);
  }
  const nextQuestionId = latestQuestionId + 1;

  // fetch Data
  useEffect(() => {
    async function fetchData() {
      if (currUserId) {
        await dispatch(fetchUserById(currUserId));
        await dispatch(fetchQuestions());
        await dispatch(fetchResponseGroupByPairId(currUserPairId));
      }
    }
    fetchData();
  }, [currUserId, currUserPairId]);

  useEffect(() => {
    async function pairData() {
      if (currUserId) {
        await dispatch(fetchPair(currUserId));
      }
    }
    pairData();
  }, [currUserId]);

  useEffect(() => {
    async function fetchPartnerData() {
      if (partnerId) {
        await dispatch(fetchPartnerDataById(partnerId));
      }
    }
    fetchPartnerData();
  }, [partnerId]);

  // Refresh questions everyday
  useEffect(() => {
    const updateQuestionOnTime = () => {
      const currentDate = new Date();
      if (currentDate.getHours() === 17 && currentDate.getMinutes() === 8) {
        setCurrentQuestionIndex((prevIndex) => (prevIndex + 1) % questionsTest.length);

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
  }, [questionsTest]);

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

  const getResponse = async (id) => {
    const response = await axios.get(`${apiUrl}/responses/${id}`);
    return response.data;
  };

  // const getResponseGroup = async (groupId) => {
  //   return axios.get(`${apiUrl}/responses/group/${groupId}`);
  // };

  // const createResponseGroup = async (pairId) => {
  //   // get responses of the pair from mongo
  //   // find the highest number +1
  //   // find the question id and assign
  //   fetchResponseGroup(pairId);

  //   let questionId = Math.round(Math.random() * 100);
  //   // Ignore all image questions until we have a way to display them
  //   while (questionData.questions[questionId].type === 'image') {
  //     questionId = Math.round(Math.random() * 100);
  //   }
  //   await addResponseGroup(
  //     {
  //       p1_response_id: '',
  //       p2_response_id: '',
  //       question_id: questionId,
  //     },
  //     pairId,
  //   );
  //   // Set responseGroup to newly created response group
  //   return axios.get(`${apiUrl}/responses/group/${pairId}`);
  // };

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

  const displayNoResponses = () => {
    return (
      <View>
        <Card containerStyle={styles.cardContainer}>
          <Text style={styles.cardTitle}>Daily Question</Text>
          <Card.Title style={styles.question}>{currQuestion}</Card.Title>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('CheckinSubmit')}>
            <Text style={styles.buttonTxt}>Submit a Response</Text>
          </TouchableOpacity>
        </Card>
      </View>
    );
  };

  const displayPartnerResponded = () => {
    return (
      <View>
        <Card containerStyle={styles.cardContainer}>
          <Text style={styles.cardTitle}>Daily Question</Text>
          <Card.Title style={styles.question}>{currQuestion}</Card.Title>
          <View>
            <View style={styles.responseHeader}>
              <Image style={styles.profileImg}
                source={require('../../../assets/animations/neutral/neutral_black.gif')}
              />
              <View style={styles.partnerNameTxt}>
                <Text>{partnerFirstName}</Text>
                <Text>{partnerResponseTime}</Text>
              </View>
            </View>
            <Text style={styles.blurText}>{partnerResponse}</Text>
          </View>
          <View style={styles.seeMoreButtonWrapper}>
            <TouchableOpacity style={styles.seeMoreButton} onPress={() => navigation.navigate('CheckinSubmit')}>
              <Text style={styles.seeMoreButtonTxt}>
                Answer to see
              </Text>
              <Image style={styles.chevronRight}
                source={require('../../../assets/icons/chevron-right.png')}
              />
            </TouchableOpacity>
          </View>
        </Card>
      </View>
    );
  };

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
            <Text style={styles.leftText}>{userResponse}</Text>
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

  const displayBothResponses = () => {
    return (
      <View style={styles.responseWrapper}>
        <Card containerStyle={styles.cardContainer}>
          <Text style={styles.cardTitle}>Daily Question</Text>
          {/* <Card.Title style={styles.question}>{question}</Card.Title> */}
          <Card.Title style={styles.question}>{currQuestion}</Card.Title>
          <View>
            <View style={styles.responseHeader}>
              <Image style={styles.profileImg}
                source={require('../../../assets/animations/neutral/neutral_black.gif')}
              />
              <View style={styles.partnerNameTxt}>
                <Text>{partnerFirstName}</Text>
                <Text>{partnerResponseTime}</Text>
              </View>
              {/* added */}
              <TouchableOpacity
                style={styles.responseHeader}
                onLongPress={openModal}
              >
                {selectedEmoji ? (
                  <Text style={styles.selectedEmoji}>{selectedEmoji}</Text>
                ) : (
                  <Text style={styles.defaultEmoji}>+</Text>
                )}
              </TouchableOpacity>

              <Modal isVisible={isModalVisible} onBackdropPress={closeModal}>
                <View style={styles.modalContainer}>
                  {emojis.map((emoji, index) => (
                    <TouchableOpacity
                      key={index}
                      style={styles.emojiOption}
                      onPress={() => selectEmoji(emoji)}
                    >
                      <Text style={styles.emoji}>{emoji}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </Modal>

            </View>
            <Text>{partnerResponse}</Text>
          </View>
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
            <Text style={styles.leftText}>{userResponse}</Text>
          </View>
          <TouchableOpacity style={styles.editButton} onPress={() => navigation.navigate('CheckinSubmit')}>
            <Image
              style={styles.editButtonContainer}
              source={require('../../../assets/images/editButton.png')}
            />
          </TouchableOpacity>
        </Card>
        <View style={styles.viewMoreButtonWrapper}>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('CheckinHistory')}>
            <Button title="View  More" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  if (!fontLoaded) {
    return <Text>Loading...</Text>;
  }

  if (userResponse && partnerResponse) {
    return (
      <View style={styles.container}>
        <TitleHeader title="Check-In" />
        <ScrollView contentContainerStyle={styles.contentContainer}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {displayBothResponses()}
        </ScrollView>
      </View>
    );
  } else if (userResponse) {
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
  } else if (partnerResponse) {
    return (
      <View style={styles.container}>
        <TitleHeader title="Check-In" />
        <ScrollView contentContainerStyle={styles.contentContainer}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {displayPartnerResponded()}
        </ScrollView>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <TitleHeader title="Check-In" />
        <ScrollView contentContainerStyle={styles.contentContainer}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {displayNoResponses()}
          <View />
        </ScrollView>
      </View>
    );
  }
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
