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
import { getDailyQuestionResponses } from '../../services/datastore';

function CheckinPage({ navigation }) {
  const [fontLoaded, setFontLoaded] = useState(false);
  const [answered, setAnswered] = useState(true);
  const [partnerAnswered, setPartnerAnswered] = useState(false);

  // hard-coded data until we figure out backend data
  const partnerResponse = {
    response: 'When we went to the ice cream store and danced on the counter',
    time: '04:05pm',
  };
  const partner = {
    firstName: 'Peter',
  };

  const myResponse = {
    response: 'When we were dancing in the rain after my cousins wedding',
    time: '09:47pm',
  };
  const user = {
    firstName: 'Kaylie',
  };

  const handleGetDailyQuestionResponses = () => {
    getDailyQuestionResponses('example');
  };

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
          <Card.Title style={styles.question}>What is your most treasured memory of us?</Card.Title>
          <View>
            <View style={styles.responseHeader}>
              <Image style={styles.profileImg}
                source={require('../../../assets/animations/neutral/neutral_black.gif')}
              />
              <View style={{ marginLeft: 10 }}>
                <Text>{partner.firstName}</Text>
                <Text>{partnerResponse.time}</Text>
              </View>
            </View>
            <Text>{partnerResponse.response}</Text>
          </View>
          <View>
            <View style={styles.myResponseHeader}>
              <View style={{ marginRight: 10 }}>
                <Text style={styles.leftText}>{user.firstName}</Text>
                <Text style={styles.leftText}>{myResponse.time}</Text>
              </View>
              <Image style={styles.profileImg}
                source={require('../../../assets/animations/neutral/neutral_pink.gif')}
              />
            </View>
            <Text style={styles.leftText}>{myResponse.response}</Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('CheckinSubmit')}>
            <Image style={styles.editButton}
              source={require('../../../assets/images/editButton.png')}
            />
          </TouchableOpacity>
        </Card>
        <TouchableOpacity style={styles.buttonSecondary} onPress={handleGetDailyQuestionResponses}>
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
                <Text style={styles.leftText}>{user.firstName}</Text>
                <Text style={styles.leftText}>{myResponse.time}</Text>
              </View>
              <Image style={styles.profileImg}
                source={require('../../../assets/animations/neutral/neutral_pink.gif')}
              />
            </View>
            <Text style={styles.leftText}>{myResponse.response}</Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('CheckinSubmit')}>
            <Image style={styles.editButton}
              source={require('../../../assets/images/editButton.png')}
            />
          </TouchableOpacity>
        </Card>
        <TouchableOpacity style={styles.buttonSecondary} onPress={handleGetDailyQuestionResponses}>
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
                <Text>{partner.firstName}</Text>
                <Text>{partnerResponse.time}</Text>
              </View>
            </View>
            <Text style={styles.blurText}>{partnerResponse.response}</Text>
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
