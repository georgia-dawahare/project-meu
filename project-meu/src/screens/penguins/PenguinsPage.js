/* eslint-disable global-require */
import React, { useEffect, useState, useRef } from 'react';
import {
  Text, Button, TouchableOpacity, SafeAreaView, StyleSheet, View, Image, Dimensions, Modal, Platform,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import axios from 'axios';
import { getAuth } from 'firebase/auth';
import * as Notifications from 'expo-notifications';
// import expoPushTokensApi from './src/api/expoPushTokens';
import * as Device from 'expo-device';
import { apiUrl } from '../../constants/constants';
import {
  iconData, gifDataBlack, gifDataPink, gifDataMap,
} from './EmotionsData';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

function PenguinsPage() {
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;

  const [modalVisible, setModalVisible] = useState(false);
  const [carouselSpun, setCarouselSpun] = useState(false); // so that we can keep show button only when carousel is spunned

  const [selectedIcon, setSelectedIcon] = useState(null);

  const [userId, setUserId] = useState('');
  const [userDoc, setUserDoc] = useState('');
  const [userName, setUserName] = useState('');
  const [partnerId, setPartnerId] = useState('');
  const [partnerDoc, setPartnerDoc] = useState('');
  const [partnerName, setPartnerName] = useState('');
  const [userLastEmotion, setUserLastEmotion] = useState(null);
  const [partnerLastEmotion, setPartnerLastEmotion] = useState(null);
  const [userColorGifMap, setUserColorGifMap] = useState(gifDataBlack); // default user color = black
  const [partnerColorGifMap, setPartnerColorGifMap] = useState(gifDataPink); // default partner color = pink

  const [userNewEmotionSent, setUserNewEmotionSent] = useState(null);
  const [partnerNewEmotionSent, setPartnerNewEmotionSent] = useState(null);

  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  const auth = getAuth();

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

  // initialize partner emotion
  // set the partner's last sent emotion whenever a new emotion is sent by the partner
  useEffect(() => {
    if (partnerDoc) {
      setPartnerName(partnerDoc.first_name);
    }

    if (userDoc) {
      setUserName(userDoc.first_name);
      setPartnerLastEmotion(Number(userDoc.partner_last_emotion));
      setPartnerNewEmotionSent(false); // if this is just initialization, then we set it to false for now
      // setPartnerNewEmotionSent(true); // this is for push notification purposes
      // not sure if we would update it here?
    }
  }, [partnerDoc, userDoc]);

  // initialize user emotion
  // set the user's last sent emotion
  useEffect(() => {
    if (userDoc.user_last_emotion === null) {
      setSelectedIcon(0);
    } else {
      setSelectedIcon(Number(userDoc.user_last_emotion)); // initialize position
      setUserLastEmotion(selectedIcon);
      setUserNewEmotionSent(false); // if this is just initialization, then we set it to false for now
    }
  }, [userDoc]);

  // get partner and user's penguin color
  useEffect(() => {
    if (partnerDoc) {
      setPartnerColorGifMap(gifDataMap[partnerDoc.penguin_color]);
    }
    if (userDoc) {
      setUserColorGifMap(gifDataMap[userDoc.penguin_color]);
    }
  }, [partnerDoc, userDoc]);

  // ********************************************************************//
  // code for push notifications
  async function registerForPushNotificationsAsync() {
    let token;
    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log('Expo push token:', token);
    } else {
      // alert('Must use physical device for Push Notifications');
    }

    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }

    return token;
  }

  async function sendPushNotification(expoPushToken) {
    let notificationBody = '';

    if (userNewEmotionSent) {
      notificationBody = 'Your new emotion has been sent to your partner';
      setUserNewEmotionSent(false);
    }
    if (partnerNewEmotionSent) {
      notificationBody = 'Your partner has sent you a message, go check it out!';
      setPartnerNewEmotionSent(false);
    }

    const message = {
      to: expoPushToken,
      sound: 'default',
      title: 'Emotion sent',
      body: notificationBody,
      data: { userLastEmotion },
    };

    await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Accept-encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });
  }

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => setExpoPushToken(token));

    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current = Notifications.addNotificationReceivedListener((notification) => { // need async here?
      console.log('--- notification received ---');
      console.log(notification);
      setNotification(notification);
      console.log('------');

      // Check if the notification contains partner's emotion data
      const partnerEmotionData = notification.notification.request.content.data.userLastEmotion;
      // at this point user last emotion is the partner's last emotion
      // this may be problematic later on...

      // in either case, if the new PartnerEmotionData gathered is a different one, we detect a new emotion sent from the parnter
      if (partnerEmotionData != partnerLastEmotion) {
        setPartnerNewEmotionSent(true);
      }
    });

    // This listener is fired whenever a user taps on or interacts with a notification
    // (works when app is foregrounded, backgrounded, or killed)
    responseListener.current = Notifications.addNotificationResponseReceivedListener((response) => { // need async here?
      console.log('--- notification tapped ---');
      console.log(response);
      console.log('------');
    });

    // Unsubscribe from events
    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);
  // ********************************************************************//

  const renderIconItem = ({ item, index }) => {
    const itemStyle = index === selectedIcon ? styles.selectedIcon : styles.unselectedIcon;
    // const marginLeft = (-screenWidth / 100) * 4.4;

    return (
      <Image
        source={item}
        style={[styles.icon, itemStyle]} // , { marginLeft }]}
      />
    );
  };

  const handleCarouselItemChange = (index) => {
    setSelectedIcon(index);
    setCarouselSpun(true);
  };

  const calculateItemWidth = () => {
    return screenWidth / 5;
  };

  const renderGif = () => {
    return (
      <Image
        // set this to user's penguin color
        source={userColorGifMap[selectedIcon]}
        style={styles.image}
      />
    );
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleButtonPress = () => {
    setCarouselSpun(false);
    if (selectedIcon !== null && selectedIcon !== '') {
      setUserLastEmotion(selectedIcon); // update this page's user's last sent emotion
      updateBothEmotion(selectedIcon); // update both users' render emotion based on sender's emotion in backend
      setModalVisible(true);
      setUserNewEmotionSent(true); // user has sent new emotion to partner
      sendPushNotification(expoPushToken, userLastEmotion); // Pass the user's last sent emotion as an argument
    }
  };

  // try catch for updating both user & partner's emotion (logic in backend)
  const updateBothEmotion = async (icon) => {
    try {
      if (icon !== null && icon !== '') {
        await axios.patch(`${apiUrl}/emotions/${userId}`, { emotion: icon });
      }
    } catch (e) {
      console.log('Error updating emotions: ', e);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Penguins</Text>
      <View style={styles.imageContainer}>
        <View style={styles.overlayImage}>
          {renderGif()}
        </View>
        <View style={styles.overlayImage2}>
          <Image
            // change this to partner's penguin's emotion
            source={partnerColorGifMap[partnerLastEmotion]}
            style={styles.image2}
          />
        </View>
      </View>
      <View style={styles.penguinNamesContainer}>
        <Text style={styles.penguinName}>{userName}</Text>
        <Text style={styles.penguinName}>{partnerName}</Text>
      </View>

      <View style={styles.mainContent}>
        <View style={styles.carouselContainer}>
          <View style={styles.circle} />
          <Carousel
            data={iconData}
            renderItem={renderIconItem}
            sliderWidth={screenWidth}
            itemWidth={calculateItemWidth()}
            layout="default"
            onSnapToItem={handleCarouselItemChange}
            lockScrollWhileSnapping={false}
            lockScrollTimeoutDuration={300}
            firstItem={selectedIcon}
          />
        </View>
        {carouselSpun ? (
          <View style={styles.buttonContainer}>
            <Button
              title="Send Emotion"
              onPress={() => {
                handleButtonPress();
                sendPushNotification(expoPushToken);
              }}
              color="white"
            />
          </View>
        ) : (
          <View style={styles.swipeTextContainer}>
            <Text style={styles.swipeText}>
              Feel free to swipe to set a new emotion :)
            </Text>
          </View>
        )}
        <Modal
          animationType="fade"
          transparent
          visible={modalVisible}
          onRequestClose={closeModal}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>Emotion sent!</Text>
              <Button title="Close" onPress={closeModal} />
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'yellow',
    flex: 1,
    justifyContent: 'space-between',
  },

  mainContent: {
    // backgroundColor: 'pink',
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  text: {
    // backgroundColor: 'cyan',
    flex: 0.2,
    textAlign: 'center',
    fontSize: 20,
    marginTop: 20,
  },
  image: {
    flex: 1,
    width: '200%',
    alignItems: 'center',
  },
  image2: {
    flex: 1,
    width: '200%',
    alignItems: 'center',
  },
  imageContainer: {
    // backgroundColor: 'red',
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  overlayImage: {
    // backgroundColor: 'lime',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    resizeMode: 'contain',
    marginRight: 200,
    marginBottom: -40,
    alignItems: 'center',
  },
  overlayImage2: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    resizeMode: 'cover',
    marginLeft: 200,
    marginBottom: -40,
    alignItems: 'center',
  },
  penguinNamesContainer: {
    // backgroundColor: 'green',
    flex: 0.6,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  penguinName: {
    flex: 1,
    textAlign: 'center',
    fontSize: 16,
    color: 'rgb(79, 79, 79)',
    marginTop: -50,
  },
  carouselContainer: {
    // backgroundColor: 'blue',
    flex: 1.5,
    marginTop: -60,
  },
  icon: {
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: -21,
  },
  selectedIcon: {
    transform: [{ scale: 0.5 }],
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: -21,
  },
  unselectedIcon: {
    transform: [{ scale: 0.25 }],
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: {
    position: 'absolute',
    width: 75,
    height: 75,
    borderColor: 'rgb(230, 43, 133)', // 'transparent'
    borderRadius: 93, // 93 on SE
    borderWidth: 7, // 7 on SE
    transform: [{ translateX: 2 }, { translateY: 25 }],
    backgroundColor: 'transparent',
    alignSelf: 'center',
  },
  buttonContainer: {
    backgroundColor: 'rgb(230, 43, 133)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignSelf: 'center',
    textAlign: 'center',
    width: 300,
    height: 56,
    borderRadius: 15,
    marginBottom: 40,
  },
  swipeTextContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignSelf: 'center',
    textAlign: 'center',
    height: 56,
    marginBottom: 40,
  },
  swipeText: {
    textAlign: 'center',
    fontSize: 16,
    marginTop: 10,
    color: 'gray',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    width: '80%',
    height: '20%',
    justifyContent: 'center',
    textAlign: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
});

export default PenguinsPage;
