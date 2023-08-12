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
import moment from 'moment';
// import axios from 'axios';
// import { onAuthStateChanged } from 'firebase/auth';
import { apiUrl } from '../../constants/constants';
import auth from '../../services/datastore';
import TitleHeader from '../../components/TitleHeader';
import Button from '../../components/Button';

function CheckinPage({ navigation }) {
  const questionData = require('../../../assets/data/questions.json');
  const [fontLoaded, setFontLoaded] = useState(false);
  const [question, setQuestion] = useState('');
  const [userResponseTime, setUserResponseTime] = useState('');
  const [partnerResponseTime, setPartnerResponseTime] = useState('');
  const [userResponse, setUserResponse] = useState('');
  const [partnerResponse, setPartnerResponse] = useState('');

  const [userId, setUserId] = useState('');
  const [userName, setUserName] = useState('');
  const [partnerId, setPartnerId] = useState('');
  const [partnerName, setPartnerName] = useState('');
  const [userDoc, setUserDoc] = useState('');
  const [partnerDoc, setPartnerDoc] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  // added
  const [selectedEmoji, setSelectedEmoji] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const emojis = ['💖', '😜', '😘', '‼️', '😢'];

  useEffect(() => {
    const getUser = async () => {
      const user = await axios.get(`${apiUrl}/users/${userId}`);
      const userInfo = user.data;
      if (userInfo) {
        setUserDoc(userInfo);
      }
    };
    setUserId(auth?.currentUser?.uid);
    if (userId) {
      getUser();
    }
  }, [partnerId]);

  useEffect(() => {
    const getPartnerId = async () => {
      const response = await axios.get(`${apiUrl}/users/partner/${userId}`);
      const returnedPartnerId = response.data;
      if (returnedPartnerId) {
        setPartnerId(returnedPartnerId);
      }
    };

    if (userId) {
      getPartnerId();
    }
  }, [userId]);

  useEffect(() => {
    const getPartner = async () => {
      const partner = await axios.get(`${apiUrl}/users/${partnerId}`);
      const partnerInfo = partner.data;
      if (partnerInfo) {
        setPartnerDoc(partnerInfo);
      }
    };
    if (partnerId) {
      getPartner();
    }
  }, [partnerId]);

  useEffect(() => {
    refreshData();
  }, [refreshing, userDoc, partnerDoc]);

  useEffect(() => {
    const getNames = async () => {
      const response1 = await axios.get(`${apiUrl}/users/name/${userId}`);
      const name1 = response1.data;
      if (name1) {
        setUserName(name1[0]);
      }

      const response2 = await axios.get(`${apiUrl}/users/name/${partnerId}`);
      const name2 = response2.data;
      if (name2) {
        setPartnerName(name2[0]);
      }
    };

    getNames();
  }, [partnerId]);

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

  // added
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

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 500);
  }, []);

  const addResponseGroup = async (groupData, groupId) => {
    const id = await axios.post(`${apiUrl}/responses/group`, { groupData, groupId });
    return id;
  };

  const getResponse = async (id) => {
    const response = await axios.get(`${apiUrl}/responses/${id}`);
    return response.data;
  };

  const getResponseGroup = async (groupId) => {
    return axios.get(`${apiUrl}/responses/group/${groupId}`);
  };

  const createResponseGroup = async (groupId) => {
    let questionId = Math.round(Math.random() * 100);
    // Ignore all image questions until we have a way to display them
    while (questionData.questions[questionId].type === 'image') {
      questionId = Math.round(Math.random() * 100);
    }
    await addResponseGroup(
      {
        p1_response_id: '',
        p2_response_id: '',
        question_id: questionId,
      },
      groupId,
    );
    // Set responseGroup to newly created response group
    return axios.get(`${apiUrl}/responses/group/${groupId}`);
  };

  const getDailyResponses = async (responseGroupData) => {
    let p1Response, p2Response, p1Date, p2Date;

    // Populate partner responses if they exist

    if (responseGroupData.p1_response_id) {
      p1Response = await getResponse(responseGroupData.p1_response_id);
    }
    if (responseGroupData.p2_response_id) {
      p2Response = await getResponse(responseGroupData.p2_response_id);
    }

    if (p1Response) {
      const p1Timestamp = p1Response.timestamp._seconds * 1000 + Math.floor(p1Response.timestamp._nanoseconds / 1000000);
      p1Date = new Date(p1Timestamp);
    }
    if (p2Response) {
      const p2Timestamp = p2Response.timestamp._seconds * 1000 + Math.floor(p2Response.timestamp._nanoseconds / 1000000);
      p2Date = new Date(p2Timestamp);
    }

    // Current user is pair creator
    if (userId === p1Response?.user_id || partnerId === p2Response?.user_id) {
      //  Add user response
      if (p1Response) {
        setUserResponse(p1Response.response);
        setUserResponseTime(`${p1Date.getHours().toString()}:${p1Date.getMinutes().toString()}`);
      }
      // Add partner response
      if (p2Response) {
        const minutes = ((p2Date.getMinutes() < 10 ? '0' : '') + p2Date.getMinutes()).toString();
        setPartnerResponseTime(`${p2Date.getHours().toString()}:${minutes}`);
        setPartnerResponse(p2Response.response);
      }
      // Current user is p2
    } else if (userId === p2Response?.user_id || partnerId === p1Response?.user_id) {
      // Add user response
      if (p2Response) {
        setUserResponse(p2Response.response);
        setUserResponseTime(`${p2Date.getHours().toString()}:${p2Date.getMinutes().toString()}`);
      }
      // Add partner response
      if (p1Response) {
        setPartnerResponseTime(`${p1Date.getHours().toString()}:${p1Date.getMinutes().toString()}`);
        setPartnerResponse(p1Response.response);
      }
    }
  };

  const refreshData = async () => {
    if (userDoc && partnerDoc) {
      let responseGroup, responseGroupData, groupId;
      try {
        // Fetch user ID & user doc
        const pairId = userDoc.pair_id;
        groupId = pairId + moment().format('MMDDYY');
        responseGroup = await getResponseGroup(groupId);
      } catch (error) {
        console.error('Error occurred during data refresh:', error);
      }
      try {
        if (groupId) {
        // if there is no response group, create a new one!
          if (responseGroup.status === 202) {
            responseGroup = await createResponseGroup(groupId);
          }

          if (responseGroup) {
            responseGroupData = responseGroup.data;
          } else {
            return;
          }

          // Set daily question
          setQuestion(questionData.questions[responseGroupData.question_id].question);
        }
      } catch (error) {
        console.error('Error occurred during data refresh:', error);
      }

      try {
        if (responseGroupData) {
        // Retrieve couple responses
          await getDailyResponses(responseGroupData);
        }
      } catch (error) {
        console.error('Error occurred during data refresh:', error);
      }
    }
  };

  const displayNoResponses = () => {
    return (
      <View>
        <Card containerStyle={styles.cardContainer}>
          <Text style={styles.cardTitle}>Daily Question</Text>
          <Card.Title style={styles.question}>{question}</Card.Title>
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
          <Card.Title style={styles.question}>{question}</Card.Title>
          <View>
            <View style={styles.responseHeader}>
              <Image style={styles.profileImg}
                source={require('../../../assets/animations/neutral/neutral_black.gif')}
              />
              <View style={styles.partnerNameTxt}>
                <Text>{partnerName}</Text>
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
          <Card.Title style={styles.question}>{question}</Card.Title>
          <View>
            <View style={styles.myResponseHeader}>
              <View style={styles.userNameTxt}>
                <Text style={styles.leftText}>{userName}</Text>
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
              // source={require('../../../assets/icons/checkin-answer.png')}
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
          <Card.Title style={styles.question}>{question}</Card.Title>
          <View>
            <View style={styles.responseHeader}>
              <Image style={styles.profileImg}
                source={require('../../../assets/animations/neutral/neutral_black.gif')}
              />
              <View style={styles.partnerNameTxt}>
                <Text>{partnerName}</Text>
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
                <Text style={styles.leftText}>{userName}</Text>
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
