/* eslint-disable global-require */
import React, { useEffect, useState } from 'react';
import {
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from 'react-native';
import {
  Card, Input,
} from 'react-native-elements';
import { useSelector, useDispatch } from 'react-redux';

import { fetchQuestions } from '../../actions/QuestionsActions';
import { fetchUserById } from '../../actions/UserActions';
import {
  fetchResponse, fetchResponseByUserId, updateResponse,
} from '../../actions/ResponseActions';
import { fetchResponseGroupByPairId } from '../../actions/ResponseGroupActions';

function CheckinEdit({ navigation }) {
  // need to be fixed : navigate to the right pages depends on the state
  const [textAnswer, setTextAnswer] = useState('');
  const [submit, setSubmit] = useState(false);

  const dispatch = useDispatch();

  console.log('********* Checkin Edit ************');

  // userData
  const user = useSelector((state) => state.userState.userData);
  const currUserId = user._id;
  const currUserPairId = user.pairId;

  // questions Data
  const questions = useSelector((state) => state.questionsState.questionsData);

  // fetch ResponseGroupData
  const currUserResponseGroup = useSelector((state) => state.responseGroupState.allResponseGroups);
  let latestResponseGroup = '';
  let currQuestionId = '';
  let latestResponseGroupId1 = '';
  let latestResponseGroupId2 = '';
  if (currUserResponseGroup.length > 0) {
    const sortedResponseGroup = Object.values(currUserResponseGroup).sort((a, b) => {
      return parseInt(b.questionId, 10) - parseInt(a.questionId, 10);
    });
    latestResponseGroup = sortedResponseGroup[0];
    currQuestionId = latestResponseGroup.questionId;
    latestResponseGroupId1 = latestResponseGroup.responseId1;
    latestResponseGroupId2 = latestResponseGroup.responseId2;
  }

  const currQuestion = questions.length > 0 ? questions[currQuestionId].question : null;

  // response Data
  const currUserResponse = useSelector((state) => state.responseState.allResponses);
  let latestUserResponse = '';
  let currUserResponseId = '';
  if (currUserResponse) {
    const sortedUserResponse = Object.values(currUserResponse).sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
    latestUserResponse = sortedUserResponse[0];
    if (latestUserResponse) {
      currUserResponseId = latestUserResponse._id;
    }
  }
  console.log('latestResonseGroup', latestResponseGroup);

  useEffect(() => {
    async function fetchData() {
      if (currUserId) {
        await dispatch(fetchUserById(currUserId));
        await dispatch(fetchQuestions());
        await dispatch(fetchResponse(currUserId));
        await dispatch(fetchResponseGroupByPairId(currUserPairId));
      }
    }
    fetchData();
  }, [currUserId]);

  useEffect(() => {
    async function fetchRepsonseData() {
      if (currUserId) {
        await dispatch(fetchResponse(currUserId));
      }
    }
    fetchRepsonseData();
  }, [currUserId]);

  console.log('currUserResponseId', currUserResponseId);
  const handleOnEdit = async () => {
    await dispatch(updateResponse(currUserResponseId, {
      response: textAnswer,
    }));

    setSubmit(true);

    console.log('latestUserResponse', latestUserResponse);

    await dispatch(fetchResponseByUserId(currUserId));
    if (latestUserResponse) {
      console.log('latestResponseGroupId1', latestResponseGroupId1);
      console.log('latestResponseGroupId2', latestResponseGroupId2);
      if (latestResponseGroupId1 !== undefined && latestResponseGroupId2 !== undefined) {
        navigation.navigate('CheckinBothResponded');
      } else if (latestResponseGroupId1 !== undefined && latestResponseGroupId2 === undefined) {
        navigation.navigate('CheckinUserResponded');
      }
    }

    setSubmit(false);
  };

  useEffect(() => {
    async function fetchResponseData() {
      if (currUserId) {
        await dispatch(fetchResponseByUserId(currUserId));
      }
    }
    fetchResponseData();
  }, [currUserId]);

  return (

    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView>
          <ScrollView>
            <TouchableOpacity onPress={() => { navigation.goBack(); }}>
              <Image
                source={require('../../../assets/icons/back-arrow.png')}
                style={styles.icon}
              />
            </TouchableOpacity>
            <Card containerStyle={styles.cardContainer}>
              <Text>Daily Question</Text>
              <Card.Title style={styles.question}>{currQuestion}</Card.Title>
              <Input value={textAnswer} onChangeText={setTextAnswer} placeholder="Type your response" multiline />
              <TouchableOpacity style={styles.button} onPress={handleOnEdit}>
                <Text style={styles.buttonText}>
                  Edit the Answer
                </Text>
              </TouchableOpacity>
            </Card>
          </ScrollView>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>

  );
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

  cardContainer: {
    borderRadius: 15,
    padding: 20,
  },

  question: {
    textAlign: 'center',
    fontSize: 28,
    fontFamily: 'SF-Pro-Display-Bold',
    margin: 20,
  },
  icon: {
    margin: 20,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 15,
    elevation: 3,
    backgroundColor: 'rgb(230, 43, 133)',
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: 'SF-Pro-Display-Medium',
    color: 'white',
    fontSize: 20,
  },

});

export default CheckinEdit;
