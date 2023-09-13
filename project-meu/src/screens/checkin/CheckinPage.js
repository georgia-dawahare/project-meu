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

import { fetchDailyQuestion } from '../../actions/QuestionActions';
import { createDailyResponseGroup } from '../../actions/ResponseGroupActions';
import { fetchUserResponse, fetchPartnerResponse } from '../../actions/ResponseActions';

function CheckinPage({ navigation }) {
  // Set up dispatch
  const dispatch = useDispatch();

  // Retrieve objects from redux
  const user = useSelector((state) => state.userState.userData);
  const dailyQuestion = useSelector((state) => state.questionsState.dailyQuestion);
  const dailyResponseGroup = useSelector((state) => state.responseGroupState.dailyResponseGroup);
  const partnerResponse = useSelector((state) => state.responseState.partnerResponse);
  const userResponse = useSelector((state) => state.responseState.userResponse);

  // Set initial data
  const [fontLoaded, setFontLoaded] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const { pairId } = user;

  useEffect(() => {
    // Check if user response or partner response exists
    // if no responses, then try to create daily response group
    dispatch(createDailyResponseGroup(pairId));
  }, []);

  useEffect(() => {
    // Fetch user response group
    if (dailyResponseGroup.userResponseId) {
      dispatch(fetchUserResponse(dailyResponseGroup.userResponseId));
    }

    // Fetch partner response group
    if (dailyResponseGroup.partnerResponseId) {
      dispatch(fetchPartnerResponse(dailyResponseGroup.partnerResponseId));
    }

    // Fetch daily question
    if (dailyResponseGroup.questionId) {
      dispatch(fetchDailyQuestion(dailyResponseGroup.questionId));
    }
  }, [dailyResponseGroup.userResponseId, dailyResponseGroup.partnerResponseId, dailyResponseGroup.questionId]);

  useEffect(() => {
    if (dailyResponseGroup) {
      const userResponseText = userResponse.response;
      const partnerResponseText = partnerResponse.response;

      if (userResponseText && !partnerResponseText) {
        navigation.navigate('CheckinUserResponded');
      } else if (partnerResponseText && !userResponseText) {
        navigation.navigate('CheckinPartnerResponded');
      } else if (userResponseText && partnerResponseText) {
        navigation.navigate('CheckinBothResponded');
      }
    }
  }, [userResponse, partnerResponse]);

  // fetch font
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

  const displayNoResponses = () => {
    return (
      <View>
        <Card containerStyle={styles.cardContainer}>
          <Text style={styles.cardTitle}>Daily Question</Text>
          <Card.Title style={styles.question}>{dailyQuestion.question}</Card.Title>
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
