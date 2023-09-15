/* eslint-disable global-require */
import React, { useState } from 'react';
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
import {
  createResponse, updateResponse,
} from '../../actions/ResponseActions';

function CheckinSubmit({ navigation }) {
  const [response, setResponse] = useState('');
  const dispatch = useDispatch();

  const user = useSelector((state) => state.userState.userData);
  const userResponse = useSelector((state) => state.responseState.userResponse);
  const dailyQuestion = useSelector((state) => state.questionsState.dailyQuestion);
  const dailyResponseGroup = useSelector((state) => state.responseGroupState.dailyResponseGroup);

  const handleSubmitResponse = async () => {
    if (userResponse.response) {
      dispatch(updateResponse(userResponse._id, { response }));
    } else {
      dispatch(createResponse(user._id, { response, responseGroupId: dailyResponseGroup._id }));
    }
  };

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
              <Card.Title style={styles.question}>{dailyQuestion.question}</Card.Title>
              <Input value={response} onChangeText={setResponse} placeholder="Write response" multiline />
              <TouchableOpacity style={styles.button} onPress={() => handleSubmitResponse()}>
                <Text style={styles.buttonText}>
                  Submit
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

export default CheckinSubmit;
