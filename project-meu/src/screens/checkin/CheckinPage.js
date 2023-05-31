/* eslint-disable global-require */
import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  Text,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  Image,
  View,
  // Pressable,
} from 'react-native';
import {
  Card,
} from 'react-native-elements';
import * as Font from 'expo-font';
import moment from 'moment';
import axios from 'axios';
import { apiUrl } from '../../constants/constants';
import auth from '../../services/datastore';
import TopBarCheckin from '../../components/TopBarCheckin';
import Button from '../../components/Button';

function CheckinPage({ navigation }) {
  const [fontLoaded, setFontLoaded] = useState(false);

  const [question, setQuestion] = useState('');
  const [userResponseTime, setUserResponseTime] = useState('');
  const [partnerResponseTime, setPartnerResponseTime] = useState('');
  const [userResponse, setUserResponse] = useState('');
  const [partnerResponse, setPartnerResponse] = useState('');
  const [responseId, setResponseId] = useState('');

  // dumby user data
  const userFirstName = 'Kaylie';
  const partnerFirstName = 'Steve';
  const tempPairId = 'pair1';

  const getUser = async (uid) => {
    const userResult = await axios.get(`${apiUrl}/users/${uid}`);
    return userResult;
  };

  const addResponseGroup = async (groupData, groupId) => {
    const id = await axios.post(`${apiUrl}/responses/group`, { groupData, groupId });
    return id;
  };

  const getResponse = async (id) => {
    const response = await axios.get(`${apiUrl}/responses/${id}`);
    return response;
  };

  // const handleDeleteResponse = async () => {
  //   await axios.delete(`${apiUrl}/responses/${responseId}`);
  //   setUserResponse('');
  // };

  const handleNewResponse = (textAnswer) => {
    setUserResponse(textAnswer);
  };

  const refreshData = async () => {
    try {
    // Fetch user ID & user doc
      const userId = auth.currentUser?.uid;
      getUser(userId);

      const groupId = tempPairId + moment().format('MMDDYY');
      let responseGroup = await axios.get(`${apiUrl}/responses/group/${groupId}`);
      const questionData = require('../../../assets/data/questions.json');
      // if there is no response group, create a new one!
      if (responseGroup.status === 202) {
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
        responseGroup = await axios.get(`${apiUrl}/responses/group/${groupId}`);
      }

      const responseGroupData = responseGroup.data;
      // Set daily question
      setQuestion(questionData.questions[responseGroupData.question_id].question);

      // Populate partner responses if they exist
      let p1Response = null;
      let p2Response = null;
      if (responseGroupData.p1_response_id) {
        p1Response = await getResponse(responseGroupData.p1_response_id);
      }
      if (responseGroupData.p2_response_id) {
        p2Response = await getResponse(responseGroupData.p2_response_id);
      }

      // Find out if P1 or P2 is user/partner
      if (p1Response && p1Response.status === 200) {
        const p1Timestamp = p1Response.data.timestamp._seconds * 1000 + Math.floor(p1Response.data.timestamp._nanoseconds / 1000000);
        const p1Date = new Date(p1Timestamp);
        // If P1 is user, then store P1 as user and P2 as partner
        if (p1Response.data.user_id === userId) {
          setUserResponse(p1Response.data.response);
          setResponseId(responseGroupData.p1_response_id);
          setUserResponseTime(`${p1Date.getHours().toString()}:${p1Date.getMinutes().toString()}`);
        } else {
        // If P1 is not user, then user must be P2 and P1 will be assigned partner response time
          const minutes = ((p1Date.getMinutes() < 10 ? '0' : '') + p1Date.getMinutes()).toString();
          setPartnerResponseTime(`${p1Date.getHours().toString()}:${minutes}`);
          setPartnerResponse(p1Response.data.response);
        }
      }
      if (p2Response && p2Response.status === 200) {
        const p2Timestamp = p2Response.data.timestamp._seconds * 1000 + Math.floor(p2Response.data.timestamp._nanoseconds / 1000000);
        const p2Date = new Date(p2Timestamp);
        // If P2 is the user, then store P2 as user and P1 as partner
        if (p2Response.data.user_id === userId) {
          setUserResponse(p2Response.data.response);
          setResponseId(responseGroupData.p2_response_id);
          setUserResponseTime(`${p2Date.getHours().toString()}:${p2Date.getMinutes().toString()}`);
        } else {
          setPartnerResponseTime(`${p2Date.getHours().toString()}:${p2Date.getMinutes().toString()}`);
          setPartnerResponse(p2Response.data.response);
        }
      }
    } catch (error) {
      console.error('Error occurred during data refresh:', error);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', refreshData);
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    async function loadFont() {
      await Font.loadAsync({
        'SF-Pro-Display-Bold': require('../../../assets/fonts/SF-Pro-Display-Bold.otf'),
        'SF-Pro-Display-Semibold': require('../../../assets/fonts/SF-Pro-Display-Semibold.otf'),
      });
      setFontLoaded(true);
    }
    loadFont();
  }, []);

  if (!fontLoaded) {
    return <Text>Loading...</Text>;
  }
  if (userResponse && partnerResponse) {
    return (
      <SafeAreaView style={styles.container}>
        <TopBarCheckin />
        <View style={{ marginTop: '10%' }}>
          <Card containerStyle={styles.cardContainer}>
            <Text>Daily Question</Text>
            <Card.Title style={styles.question}>{question}</Card.Title>
            <View>
              <View style={styles.responseHeader}>
                <Image style={styles.profileImg}
                  source={require('../../../assets/animations/neutral/neutral_black.gif')}
                />
                <View style={{ marginLeft: 10 }}>
                  <Text>{partnerFirstName}</Text>
                  <Text>{partnerResponseTime}</Text>
                </View>
              </View>
              <Text>{partnerResponse}</Text>
            </View>
            <View>
              <View style={styles.myResponseHeader}>
                {/* <Pressable style={styles.deleteIcon} onPress={handleDeleteResponse}>
                  <Icon name="trash-outline" type="ionicon" size={20} />
                </Pressable> */}
                <View style={{ marginRight: 10 }}>
                  <Text style={styles.leftText}>{userFirstName}</Text>
                  <Text style={styles.leftText}>{userResponseTime}</Text>
                </View>
                <Image style={styles.profileImg}
                  source={require('../../../assets/animations/neutral/neutral_pink.gif')}
                />
              </View>
              <Text style={styles.leftText}>{userResponse}</Text>
            </View>
            <TouchableOpacity style={styles.editButton} onPress={() => navigation.navigate('CheckinSubmit', { handleNewResponse })}>
              <Image
                style={styles.editButtonContainer}
                source={require('../../../assets/images/editButton.png')}
              />
            </TouchableOpacity>
          </Card>
          {/* <Button title="View More" buttonStyle={{ top: 507, left: 45 }} onPress={CheckinPage} /> */}
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('CheckinHistory')}>
            <Button title="View  More" />
          </TouchableOpacity>

        </View>
      </SafeAreaView>
    );
  } else if (userResponse) {
    return (
      <SafeAreaView style={styles.container}>
        <TopBarCheckin />
        <View style={{ marginTop: '15%' }}>
          <Card containerStyle={styles.cardContainer}>
            <Text>Daily Question</Text>
            <Card.Title style={styles.question}>{question}</Card.Title>
            <View>
              <View style={styles.myResponseHeader}>
                <View style={{ marginRight: 10 }}>
                  <Text style={styles.leftText}>{userFirstName}</Text>
                  <Text style={styles.leftText}>{userResponseTime}</Text>
                </View>
                <Image style={styles.profileImg}
                  source={require('../../../assets/animations/neutral/neutral_pink.gif')}
                />
              </View>
              <Text style={styles.leftText}>{userResponse}</Text>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('CheckinSubmit', { handleNewResponse })}>
              <Image style={styles.editButton}
                source={require('../../../assets/images/editButton.png')}
              />
            </TouchableOpacity>
          </Card>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('CheckinHistory')}>
            <Button title="View  More" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  } else if (partnerResponse) {
    return (
      <SafeAreaView style={styles.container}>
        <TopBarCheckin />
        <View style={{ marginTop: '15%' }}>
          <Card containerStyle={styles.cardContainer}>
            <Text>Daily Question</Text>
            <Card.Title style={styles.question}>{question}</Card.Title>
            <View>
              <View style={styles.responseHeader}>
                <Image style={styles.profileImg}
                  source={require('../../../assets/animations/neutral/neutral_black.gif')}
                />
                <View style={{ marginLeft: 10 }}>
                  <Text>{partnerFirstName}</Text>
                  <Text>{partnerResponseTime}</Text>
                </View>
              </View>
              <Text style={styles.blurText}>{partnerResponse}</Text>
            </View>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('CheckinSubmit', { handleNewResponse })}>
              <Text style={styles.buttonText}>
                Submit a Response
              </Text>
            </TouchableOpacity>
          </Card>
        </View>
      </SafeAreaView>
    );
  } else {
    return (
      <SafeAreaView style={styles.container}>
        <TopBarCheckin />
        <View style={{ marginTop: '40%' }}>
          <Card containerStyle={styles.cardContainer}>
            <Text>Daily Question</Text>
            <Card.Title style={styles.question}>{question}</Card.Title>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('CheckinSubmit', { handleNewResponse })}>
              <Text style={styles.buttonText}>
                Submit a Response
              </Text>
            </TouchableOpacity>
          </Card>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('CheckinHistory')}>
            <Button title="View  More" />
          </TouchableOpacity>
        </View>

      </SafeAreaView>
    );
  }
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
  profileImg: {
    width: 40,
    height: 80,
    alignSelf: 'flex-end',
  },
  editButtonContainer: {
    width: 45,
    height: 45,
  },
  editButton: {
    marginTop: 20,
    width: 45,
    height: 45,
    alignSelf: 'flex-end',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonSecondary: {
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'rgb(230, 43, 133)',
    alignItems: 'center',
    margin: 20,
  },
  responseHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  question: {
    textAlign: 'center',
    fontSize: 28,
    fontFamily: 'SF-Pro-Display-Bold',
    margin: 20,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 15,
    elevation: 3,
    // backgroundColor: 'rgb(230, 43, 133)',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    fontFamily: 'SF-Pro-Display-Medium',
    color: 'white',
    fontSize: 20,
  },
  buttonContainer: {
    alignItems: 'center',
  },
  leftText: {
    textAlign: 'right',
  },
  blurText: {
    height: 3,
    width: '80%',
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
  myResponseHeader: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardContainer: {
    borderRadius: 15,
    padding: 20,
  },
  // deleteIcon: {
  //   marginRight: 10,
  // },
});

export default CheckinPage;
