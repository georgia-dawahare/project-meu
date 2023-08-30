/* eslint-disable global-require */
import React, { useEffect, useState, useCallback } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  Image,
  View,
  TouchableOpacity,
  Alert,
  Share,
  TextInput,
  ScrollView,
  RefreshControl,
} from 'react-native';
import * as Font from 'expo-font';
import { useSelector, useDispatch } from 'react-redux';
import { updateUser } from '../../actions/UserActions';
import { connectPair, fetchPair } from '../../actions/PairActions';

function CreatePair({ navigation }) {
  const [fontLoaded, setFontLoaded] = useState(false);
  const [code, setCode] = useState('');
  const [inputCode, setInputCode] = useState('');
  const [isPairCreator, setIsPairCreator] = useState(false);
  const [error, setError] = useState('');
  const [isActiveNext, setIsActiveNext] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userState.userData);
  const pair = useSelector((state) => state.pairState.pairData);
  const currUserId = user._id;

  useEffect(() => {
    async function checkPartner() {
      if (currUserId) {
        dispatch(fetchPair(currUserId));
        if (pair._id) {
          setIsActiveNext(true);
        }
      }
    }
    checkPartner();
  }, [refreshing]);

  useEffect(() => {
    async function loadFont() {
      await Font.loadAsync({
        'SF-Pro-Display-Medium': require('../../../assets/fonts/SF-Pro-Display-Medium.otf'),
        'SF-Pro-Display-Semibold': require('../../../assets/fonts/SF-Pro-Display-Semibold.otf'),
      });

      setFontLoaded(true);
    }
    loadFont();
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 500);
  }, []);

  const goBack = async () => {
    // TODO: Clear current pair
    navigation.goBack();
  };

  const generateCode = () => {
    let randomCode = '';
    for (let i = 0; i < 6; i++) {
      const randomNumber = Math.floor(Math.random() * 10) + 1;
      randomCode += randomNumber.toString();
    }
    return randomCode;
  };

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: `Join Me On MeU! Pair Code: ${code}`,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
          console.log(`Shared Code via${result.activityType}`);
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
        console.log('dismissed share');
      }
    } catch (e) {
      Alert.alert(e.message);
    }
  };

  // create pair
  const handleCreatePair = async () => {
    setIsPairCreator(true);
    const newCode = generateCode();
    setCode(newCode);
    dispatch(updateUser(currUserId, { pairCode: newCode }));
  };

  // TODO: add error catching before navigation?
  const createPair = async () => {
    // TODO: Add error setting in backend to display no partner found
    if (inputCode) {
      try {
        dispatch(connectPair(currUserId, { pairCode: inputCode }));
        if (pair.primaryUserId && pair.secondaryUserId) {
          const update = {
            pairCode: inputCode,
            pairId: pair._id,
          };
          dispatch(updateUser(currUserId, update));
        }
      } catch (e) {
        setError('Invalid code');
        console.log('Failed to pair');
      }
    } else {
      setError('Please enter a valid code');
    }
  };

  // received partner's code
  const handleConnect = async () => {
    setIsPairCreator(false);

    // TODO: Add error handling
    createPair();
    navigation.navigate('ProfileInfo');
  };

  const handleNext = async () => {
    if (isActiveNext) {
      navigation.navigate('ProfileInfo');
    }
  };

  if (!fontLoaded) {
    return <Text>Loading...</Text>;
  }

  return (
    <SafeAreaView style={styles.mainContainer}>
      <TouchableOpacity onPress={goBack}>
        <Image
          source={require('../../../assets/icons/back-arrow.png')}
          style={styles.backButton}
        />
      </TouchableOpacity>
      <View style={styles.contentContainer}>
        <Image
          source={require('../../../assets/images/progress-2.png')}
          style={styles.progress}
        />

        {isPairCreator ? (
          <ScrollView contentContainerStyle={styles.contentContainer}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          >
            <Text style={styles.title}>
              Please share your pair code with your partner
            </Text>

            <View>
              <Text style={styles.partnerTitle}>
                Pair Code
              </Text>
              <View style={styles.textInputWrapper}>
                <TextInput style={styles.input} value={code} editable={false} />
                <TouchableOpacity style={styles.connectShare} onPress={onShare}>
                  <Text style={styles.connectShareButtonText}>Share</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.line} />
              <Text style={styles.infoText}>
                Waiting for your partner... (pull to refresh)
              </Text>
            </View>

            <TouchableOpacity onPress={handleNext} style={isActiveNext ? (styles.mainButton) : (styles.inactiveButton)}>
              <Text style={styles.mainButtonTxt}>Next</Text>
            </TouchableOpacity>
          </ScrollView>
        ) : (
          <View style={styles.contentContainer}>
            <Text style={styles.title}>
              Please create a pair or enter a pair code to connect!
            </Text>

            <View>
              <Text style={styles.partnerTitle}>
                Did you receive your partner&apos;s pair code?
              </Text>
              <View style={styles.textInputWrapper}>
                <TextInput style={styles.input} placeholder="Enter pair code" onChangeText={(text) => setInputCode(text)} />
                <TouchableOpacity style={styles.connectShare} onPress={handleConnect}>
                  <Text style={styles.connectShareButtonText}>Connect</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.line} />
            </View>
            <Text style={styles.infoText}>
              If not, create a pair and send the code to your partner
            </Text>

            <TouchableOpacity onPress={handleCreatePair} style={styles.mainButton}>
              <Text style={styles.mainButtonTxt}>Create Pair</Text>
            </TouchableOpacity>

          </View>
        )}
        {error ? (
          <Text style={styles.errorText}>
            Error:
            {' '}
            {error}
          </Text>
        ) : (null)}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  backButton: {
    top: 50,
    left: 25,
    marginBottom: 150,
  },
  progress: {
    marginBottom: 37,
  },
  contentContainer: {
    alignItems: 'center',
    height: '100%',
  },
  title: {
    fontFamily: 'SF-Pro-Display-Semibold',
    fontSize: 18,
    lineHeight: 27,
    textAlign: 'center',
    marginBottom: 33,
  },
  partnerTitle: {
    fontFamily: 'SF-Pro-Display-Medium',
    fontSize: 14,
    marginBottom: 20,
  },
  textInputWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  input: {
    fontSize: 24,
    fontFamily: 'SF-Pro-Display-Semibold',
  },
  connectShare: {
    width: 72,
    height: 28,
    backgroundColor: 'rgba(230, 43, 133, 1)',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  connectShareButtonText: {
    fontFamily: 'SF-Pro-Display-Medium',
    fontSize: 14,
    color: 'white',
  },
  line: {
    width: 300,
    height: 1,
    backgroundColor: '#4f4f4f',
  },
  infoText: {
    fontFamily: 'SF-Pro-Display-Medium',
    fontSize: 14,
    color: 'rgba(51,51,51,1)',
    margin: 15,
  },
  errorText: {
    color: 'rgba(230, 43, 133, 1)',
    fontFamily: 'SF-Pro-Display-Regular',
    lineHeight: 21,
    fontSize: 12,
    textAlign: 'center',
  },
  mainButton: {
    backgroundColor: 'rgba(230, 43, 133, 1)',
    height: 56,
    width: 300,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inactiveButton: {
    backgroundColor: '#FFB2D7',
    height: 56,
    width: 300,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainButtonTxt: {
    fontFamily: 'SF-Pro-Display-Semibold',
    color: 'white',
    fontSize: 20,
    lineHeight: 30,
  },
});

export default CreatePair;
