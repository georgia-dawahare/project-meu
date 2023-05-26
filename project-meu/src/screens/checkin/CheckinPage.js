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
  Pressable,
} from 'react-native';
import {
  Card,
} from 'react-native-elements';
import * as Font from 'expo-font';
import moment from 'moment';
import {
  getResponseGroup, getResponse, addResponseGroup, deleteResponse,
} from '../../services/datastore';

function CheckinPage({ navigation }) {
  const [fontLoaded, setFontLoaded] = useState(false);
  const [answered, setAnswered] = useState(false);
  const [partnerAnswered, setPartnerAnswered] = useState(false);
  const [question, setQuestion] = useState('');
  const [userResponseId, setUserResponseId] = useState('');

  const [partnerResponse, setPartnerResponse] = useState('');
  const [userResponse, setUserResponse] = useState('');
  const [partnerResponseTime, setPartnerResponseTime] = useState('');
  const [userResponseTime, setUserResponseTime] = useState('');

  // dumby user data
  const userId = 'user1';
  const pairId = 'pair1';
  const userFirstName = 'Kaylie';
  const partnerFirstName = 'Steve';

  const handleDeleteResponse = async () => {
    await deleteResponse(userResponseId);
    setUserResponse('');
    setAnswered(false);
  };

  const handleNewResponse = (textAnswer) => {
    setAnswered(true);
    setUserResponse(textAnswer);
  };

  const refreshData = async () => {
    const groupId = pairId + moment().format('MMDDYY');
    let data = await getResponseGroup(groupId);
    // if there is no response group, create a new one!
    if (data === null) {
      const questionId = Math.round(Math.random() * 100);
      addResponseGroup(
        {
          p1_response_id: '',
          p2_response_id: '',
          question_id: questionId,
        },
        groupId,
      );
      const questionData = require('../../../assets/data/questions.json');
      setQuestion(questionData.questions[data.question_id].question);
      data = await getResponseGroup(groupId);
    }
    let p1Response = null;
    let p2Response = null;
    if (data.p2_response_id !== '') p1Response = await getResponse(data.p1_response_id);
    if (data.p2_response_id !== '') p2Response = await getResponse(data.p2_response_id);

    const questionData = require('../../../assets/data/questions.json');
    setQuestion(questionData.questions[data.question_id].question);

    if (p1Response !== null) {
      const p1Timestamp = p1Response.timestamp.seconds * 1000 + Math.floor(p1Response.timestamp.nanoseconds / 1000000);
      const p1Date = new Date(p1Timestamp);
      if (p1Response.user_id === userId) {
        setUserResponse(p1Response.response);
        setUserResponseId(data.p1_response_id);
        setUserResponseTime(`${p1Date.getHours().toString()}:${p1Date.getMinutes().toString()}`);
        setAnswered(true);
      } else {
        setPartnerResponse(p1Response.response);
        setPartnerResponseTime(`${p1Date.getHours().toString()}:${p1Date.getMinutes().toString()}`);
        setPartnerAnswered(true);
      }
    }
    if (p2Response !== null) {
      const p2Timestamp = p2Response.timestamp.seconds * 1000 + Math.floor(p2Response.timestamp.nanoseconds / 1000000);
      const p2Date = new Date(p2Timestamp);
      if (p2Response.user_id === userId) {
        setUserResponse(p2Response.response);
        setUserResponseId(data.p2_response_id);
        setUserResponseTime(`${p2Date.getHours().toString()}:${p2Date.getMinutes().toString()}`);
        setAnswered(true);
      } else {
        setPartnerResponse(p2Response.response);
        setPartnerResponseTime(`${p2Date.getHours().toString()}:${p2Date.getMinutes().toString()}`);
        setPartnerAnswered(true);
      }
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
  if (answered && partnerAnswered) {
    return (
      <SafeAreaView style={styles.container}>
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
              <Pressable style={styles.deleteIcon} onPress={handleDeleteResponse}>
                <Icon name="trash-outline" type="ionicon" size={20} />
              </Pressable>
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
        {/* <TouchableOpacity style={styles.buttonSecondary} onPress={handleGetResponseGroup}>
          <Text style={styles.buttonText}>
            View More
          </Text>
        </TouchableOpacity> */}
      </SafeAreaView>
    );
  } else if (answered) {
    return (
      <SafeAreaView style={styles.container}>
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
        {/* <TouchableOpacity style={styles.buttonSecondary} onPress={handleGetResponseGroup}>
          <Text style={styles.buttonText}>
            View More
          </Text>
        </TouchableOpacity> */}
      </SafeAreaView>
    );
  } else if (partnerAnswered) {
    return (
      <SafeAreaView style={styles.container}>
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
      </SafeAreaView>
    );
  } else {
    return (
      <SafeAreaView style={styles.container}>
        <Card containerStyle={styles.cardContainer}>
          <Text>Daily Question</Text>
          <Card.Title style={styles.question}>{question}</Card.Title>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('CheckinSubmit', { handleNewResponse })}>
            <Text style={styles.buttonText}>
              Submit a Response
            </Text>
          </TouchableOpacity>
        </Card>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
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
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'rgb(230, 43, 133)',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    fontFamily: 'SF-Pro-Display-Bold',
    color: 'white',
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
  deleteIcon: {
    marginRight: 10,
  },
});

export default CheckinPage;
