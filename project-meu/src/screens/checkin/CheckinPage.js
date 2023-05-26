/* eslint-disable global-require */
import React, { useEffect, useState } from 'react';

import {
  Text,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  Image,
  View,
} from 'react-native';
import {
  Card,
} from 'react-native-elements';
import * as Font from 'expo-font';
import moment from 'moment';
import { getResponseGroup, getResponse, addResponseGroup } from '../../services/datastore';

function CheckinPage({ navigation }) {
  const [fontLoaded, setFontLoaded] = useState(false);
  const [answered, setAnswered] = useState(false);
  const [partnerAnswered, setPartnerAnswered] = useState(false);
  const [question, setQuestion] = useState('');

  const [partnerResponse, setPartnerResponse] = useState('');
  const [userResponse, setUserResponse] = useState('');
  const [partnerResponseTime, setPartnerResponseTime] = useState('');
  const [userResponseTime, setUserResponseTime] = useState('');

  // using more dumby user data here
  const [userFirstName, setUserFirstName] = useState('Kaylie');
  const [partnerFirstName, setPartnerFirstName] = useState('Steve');

  // dumby user data
  const userId = 'user1';
  const partnerId = 'user2';
  const pairId = 'pair1';

  const handleGetResponseGroup = async () => {
    // const data = await getResponseGroup('pair1052623');
    // const p1_response = await getResponse(data.p1_response_id);
    // const p2_response = await getResponse(data.p2_response_id);
    // if (p1esponse.user_id == user_id) {
    //   setUserResponse(p1_response.response);
    //   setPartnerResponse(p2_response.response);
    // } else {
    //   setUserResponse(p2_response.response);
    //   setPartnerResponse(p1_response.response);
    // }
  };

  const refreshData = async () => {
    const groupId = pairId + moment().format('MMDDYY');
    const data = await getResponseGroup(groupId);
    // if there is no response group, create a new one!
    if (data === null) {
      addResponseGroup(
        {
          p1_response_id: null,
          p2_response_id: null,
          question_id: Math.random() * 100,
        },
        groupId,
      );
    }
    const p1Response = await getResponse(data.p1_response_id);
    const p2Response = await getResponse(data.p2_response_id);

    const questionData = require('../../../assets/data/questions.json');
    setQuestion(questionData.questions[data.question_id].question);

    if (p1Response !== null) {
      const p1Timestamp = p1Response.timestamp.seconds * 1000 + Math.floor(p1Response.timestamp.nanoseconds / 1000000);
      const p1Date = new Date(p1Timestamp);
      if (p1Response.user_id === userId) {
        setUserResponse(p1Response.response);
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
    // Cleanup function to remove the listener when the component unmounts
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
          <TouchableOpacity onPress={() => navigation.navigate('CheckinSubmit')}>
            <Image style={styles.editButton}
              source={require('../../../assets/images/editButton.png')}
            />
          </TouchableOpacity>
        </Card>
        <TouchableOpacity style={styles.buttonSecondary} onPress={handleGetResponseGroup}>
          <Text style={styles.buttonText}>
            View More
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  } else if (answered) {
    return (
      <SafeAreaView style={styles.container}>
        <Card containerStyle={styles.cardContainer}>
          <Text>Daily Question</Text>
          <Card.Title style={styles.question}>What is your most treasured memory of us?</Card.Title>
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
          <TouchableOpacity onPress={() => navigation.navigate('CheckinSubmit')}>
            <Image style={styles.editButton}
              source={require('../../../assets/images/editButton.png')}
            />
          </TouchableOpacity>
        </Card>
        <TouchableOpacity style={styles.buttonSecondary} onPress={handleGetResponseGroup}>
          <Text style={styles.buttonText}>
            View More
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  } else if (partnerAnswered) {
    return (
      <SafeAreaView style={styles.container}>
        <Card containerStyle={styles.cardContainer}>
          <Text>Daily Question</Text>
          <Card.Title style={styles.question}>What is your most treasured memory of us?</Card.Title>
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
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('CheckinSubmit')}>
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
          <Card.Title style={styles.question}>What is your most treasured memory of us?</Card.Title>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('CheckinSubmit')}>
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
  editButton: {
    marginTop: 20,
    width: 45,
    height: 45,
    alignSelf: 'flex-end',
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
});

export default CheckinPage;
