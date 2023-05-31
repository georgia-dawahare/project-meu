/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
/* eslint-disable global-require */
import React, { useEffect, useState } from 'react';
import { Text, Button, SafeAreaView, StyleSheet, View, Image, Dimensions, Modal } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import TopBarPenguin from '../../components/TopBarPenguin';
import axios from 'axios';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { apiUrl } from '../../constants/constants';

const iconData = [
  require('../../../assets/penguin_icons/neutral.png'),
  require('../../../assets/penguin_icons/hello.png'),
  require('../../../assets/penguin_icons/send_love.png'),
  require('../../../assets/penguin_icons/sad.png'),
  require('../../../assets/penguin_icons/confetti.png'),
  require('../../../assets/penguin_icons/angry.png'),
  require('../../../assets/penguin_icons/tired.png'),
  require('../../../assets/penguin_icons/dance.png'),
  require('../../../assets/penguin_icons/selfie.png'),
];

const gifDataBlack = [
  require('../../../assets/animations/neutral/neutral_black.gif'),
  require('../../../assets/animations/hello/hello_black.gif'),
  require('../../../assets/animations/send_love/send_love_black.gif'),
  require('../../../assets/animations/sad/sad_black.gif'),
  require('../../../assets/animations/confetti/confetti_black.gif'),
  require('../../../assets/animations/angry/angry_black.gif'),
  require('../../../assets/animations/tired/tired_black.gif'),
  require('../../../assets/animations/dancing/dancing_black.gif'),
  require('../../../assets/animations/selfie/selfie_black.gif'),
];

const gifDataPink = [
  require('../../../assets/animations/neutral/neutral_pink.gif'),
  require('../../../assets/animations/hello/hello_pink.gif'),
  require('../../../assets/animations/send_love/send_love_pink.gif'),
  require('../../../assets/animations/sad/sad_pink.gif'),
  require('../../../assets/animations/confetti/confetti_pink.gif'),
  require('../../../assets/animations/angry/angry_pink.gif'),
  require('../../../assets/animations/tired/tired_pink.gif'),
  require('../../../assets/animations/dancing/dancing_pink.gif'),
  require('../../../assets/animations/selfie/selfie_pink.gif'),
];

function PenguinsPage({ navigation }) {

  const [screenWidth, setScreenWidth] = useState(Dimensions.get('window').width);
  const [screenHeight, setScreenHeight] = useState(Dimensions.get('window').height);

  const [modalVisible, setModalVisible] = useState(false);
  const [carouselSpun, setCarouselSpun] = useState(false); // so that we can keep show button only when carousel is spunned

  const [lastEmotionSent, setLastEmotionSent] = useState(null);
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [partnerLastEmotion, setPartnerLastEmotion] = useState(null);

  const [userId, setUserId] = useState('');
  const auth = getAuth();

  useEffect(() => {;
    console.log("hi")
    onAuthStateChanged(auth, (user) => {
      if (user) {

        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const { uid } = user;
        setUserId(uid);
      } else {
        // User is signed out
        console.log("Could not retrieve user");      }
    });
    if (userId) {
      console.log("userid", userId);
      const emotion = getUserEmotion(userId);
      setLastEmotionSent(emotion); // set user's rendering emotion

      const partnerEmotion = getPartnerEmotion(userId); // yes, userId bc of logic below
      setPartnerLastEmotion(partnerEmotion); // set partner's rendering emotion
    }
  }, []);

  // get user's emotion data, which includes their last sent emotion & their partner's last sent emotion
  const getUserEmotion = async () => {
    try {
      const user = await axios.get(`${apiUrl}/users/${userId}`);
      console.log("user", user);
    } catch (e) {
      console.log("Error retrieving user: ", e);
      console.log(`${apiUrl}/users/${userId}`);
    }

    // how we actually get the user's emotions
    const userEmotion = await axios.patch(`${apiUrl}/users/emotion/${uid}`);
    return userEmotion;
  };

  // get partner's emotion data
  const getPartnerEmotion = async () => {

    // get the partner's id
    try {
      const user = await axios.get(`${apiUrl}/users/${userId}`);
      const pid = currUser.pair_id;
      try {
        const pair = await axios.get(`${apiUrl}/pair/${pid}`)
        let partnerId;
        if (userId === pair.user1_id) {
          partnerId = pair.user2_id;
        } else if (userId === pair.user2_id) {
          partnerId = pair.user1_id;
        } else {
          console.log("Unable to find partner")
        }
      } catch (e) {
        console.log("Error retrieving pair: ", e);
      }
    } catch (e) {
      console.log("Error retrieving user: ", e);
    }

    // to actually get partner's emotion
    const partnerEmotion = await axios.patch(`${apiUrl}/users/emotion/${partnerId}`);
    return partnerEmotion;
  }

  // // this allows us to listen to new data & refresh
  // const refreshData = async () => {
  //   try {
  //     // Fetch user ID & emotion doc
  //     const userId = auth.currentUser?.uid;
  //     getUserEmotion(userId);

  //     // Set user last emotion if it exist (it should unless first starting)
  //     try {
  //       const user_last_emotion = await getEmotion(userEmotion.user_last_emotion);
  //       if (user_last_emotion) {
  //         setLastEmotionSent(user_last_emotion);
  //         setSelectedIcon(user_last_emotion);
  //       } else {
  //         setLastEmotionSent(0); // if haven't sent any, initialize to neutral
  //         setSelectedIcon(0);
  //       }
  //     } catch (error) {
  //       console.error('Error fetching user emotion:', error);
  //     }

  //     // Set the partner's last emotion if it exist
  //     try {
  //       const partner_last_emotion = await getEmotion(userEmotion.partner_last_emotion);
  //       if (partner_last_emotion) {
  //         setPartnerLastEmotion(partner_last_emotion);
  //       } else {
  //         setPartnerLastEmotion(0); // if they haven't sent any, initialize to neutral
  //       }
  //     } catch (error) {
  //       console.error('Error fetching partner emotion:', error);
  //       setPartnerLastEmotion(0); // TODO: make a default partner not found emotion
  //     }
  //   } catch (error) {
  //     console.error('Error occurred during data refresh:', error);
  //   }
  // };

  // useEffect(() => {
  //   const unsubscribe = navigation.addListener('focus', refreshData);
  //   return () => {
  //     unsubscribe();
  //   };
  // }, []);

  // this is for responsive screen design
  // useEffect(() => {
  //   const updateScreenDimensions = () => {
  //     setScreenWidth(Dimensions.get('window').width);
  //     setScreenHeight(Dimensions.get('window').height);
  //   };
  //   Dimensions.addEventListener('change', updateScreenDimensions);

  //   return () => {
  //     Dimensions.removeEventListener('change', updateScreenDimensions);
  //   };
  // }, []);

  const renderIconItem = ({ item, index }) => {
    const itemStyle = index === selectedIcon ? styles.selectedIcon : styles.unselectedIcon;
    const color = index === selectedIcon ? 'black' : 'gray';
    const marginLeft = -screenWidth / 100 * 4.4;

    return (
      <Image
        source={item}
        style={[styles.icon, itemStyle, { marginLeft }]}
      />
    );
  };

  const handleCarouselItemChange = (index) => {
    setSelectedIcon(index);
    setCarouselSpun(true);

    if (lastEmotionSent !== null && index === lastEmotionSent) {
      setCarouselSpun(false);
    }
  };

  const calculateItemWidth = () => {
    return screenWidth / 5;
  };

  const renderGif = () => {
    return (
      <Image
        source={gifDataBlack[selectedIcon]}
        style={{width: screenWidth * 0.5349, height: screenHeight * 0.4721}}
      />
    );
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleButtonPress = () => {
    setModalVisible(true);
    setCarouselSpun(false);
    setLastEmotionSent(selectedIcon);
    updateBothEmotion(lastEmotionSent, userId) // update both users' render emotion based on sender's emotion
    // updateUserEmotion(selectedIcon);
    // getUserEmotion(userId); // we don't need this
  };

  // try catch for updating both user & partner's emotion (logic in backend)
  const updateBothEmotion = async () => {
    try {
      await axios.patch(`${apiUrl}/emotions/${userId}`, { emotionData, userId})
    } catch (e) {
      console.log("Error updating emotions: ", e);
    }
  };

  return (
    <SafeAreaView style={[styles.container, {paddingTop: screenHeight * 0.06974, paddingHorizontal: screenWidth * 0.0465}]}>
      <Text style={[styles.text, { marginTop: screenHeight * 0.03 }]}>Penguins</Text>
      <View style={[styles.imageContainer, {marginTop: screenHeight * 0.06}]}>
        {renderGif()}
        <Image
          // change this to other penguin's emotion
          source={gifDataPink[partnerLastEmotion]}
          style={{width: screenWidth * 0.5349, height: screenHeight * 0.4721}}
        />
      </View>
      <View style={[styles.penguinNamesContainer, {marginTop: -screenHeight * 0.045}]}>
        <Text style={[styles.penguinName, { flex: 1 }]}>Florian</Text>
        <Text style={[styles.penguinName, { flex: 1 }]}>Katherine</Text>
      </View>
      <View style={[styles.carouselContainer, {marginTop: screenHeight * 0.02, marginBottom: screenHeight * 0.0644}]}>
        <View 
          style={[styles.circle, {
            // width: screenWidth * 0.175, 
            // height: screenWidth * 0.175,
            borderRadius: screenHeight * 0.1395, 
            borderWidth: screenWidth * 0.0186, 
            transform: [{ translateX: -screenWidth * 0.0865}, { translateY: -screenHeight * 0.041 }]
          }]} 
        />

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
        <View style={[styles.buttonContainer, {marginTop: -screenHeight * 0.035}]}>
          <Button
            title="Send Emotion"
            onPress={handleButtonPress}
            color="white"
          />
        </View>
      ) : (
        <Text style={[styles.swipeText, {marginTop: -screenHeight * 0.035}]}>
          Feel free to swipe to set a new emotion :)
          User Last Emotion: {lastEmotionSent}
        </Text>
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    // paddingTop: 20,
    // paddingHorizontal: 20,
  },
  text: {
    textAlign: 'center',
    fontSize: 20,
  },
  // image: {
  //   width: 230,
  //   height: 440,
  // },
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    // marginTop: 80,
  },
  penguinNamesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  penguinName: {
    textAlign: 'center',
    fontSize: 16,
    color: 'rgb(79, 79, 79)',
  },
  carouselContainer: {
    // marginBottom: 60,
  },
  icon: {},
  selectedIcon: {
    transform: [{ scale: 0.5 }],
  },
  unselectedIcon: {
    transform: [{ scale: 0.25 }],
  },
  circle: {
    position: 'absolute',
    width: 75,
    height: 75,
    // borderRadius: 60,
    // borderWidth: 8,
    borderColor: 'rgb(230, 43, 133)',
    left: '50%',
    top: '50%',
    backgroundColor: 'transparent',
    // zIndex: 2, // this is more visually appealing but then the central one won't be touch responsive
    // transform: [{ translateX: -60 }, { translateY: -60 }],
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
  swipeText: {
    textAlign: 'center',
    fontSize: 16,
    marginTop: 20,
    color: 'gray',
  },
});

export default PenguinsPage;
