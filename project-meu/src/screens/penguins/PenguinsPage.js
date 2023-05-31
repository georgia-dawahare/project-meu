/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
/* eslint-disable global-require */
import React, { useEffect, useState } from 'react';
import { Text, Button, SafeAreaView, StyleSheet, View, Image, Dimensions, Modal } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import axios from 'axios';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import TopBarPenguin from '../../components/TopBarPenguin';
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
  const [partnerId, setPartnerId] = useState('');

  const auth = getAuth();

  const [userName, setUserName] = useState('');
  const [partnerName, setPartnerName] = useState('');

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const { uid } = user;
        setUserId(uid);
      } else {
        // User is signed out
        console.log('Could not retrieve user');
      }
    });
  }, []);

  useEffect(() => {
    const getPartnerID = async () => {
      const response = await axios.get(`${apiUrl}/users/partner/${userId}`);
      const returnedPartnerId = response.data;
      setPartnerId(returnedPartnerId);
    };

    getPartnerID();
    console.log(partnerId);
  }, [userId]);

  useEffect(() => {
    const getNames = async () => {
      const response1 = await axios.get(`${apiUrl}/users/name/${userId}`);
      const name1 = response1.data;
      setUserName(name1[0]);
      const response2 = await axios.get(`${apiUrl}/users/name/${partnerId}`);
      const name2 = response2.data;
      setPartnerName(name2[0]);
    };

    getNames();
    if (partnerId) {
      try {
        initializeView();
      } catch (e) {
        console.log('Could not initialize view', e);
      }
    }

  }, [partnerId]);

  const initializeView = async () => {
    const returnEmotion = await getUserEmotion();
    setLastEmotionSent(Number(returnEmotion)); // set user's rendering emotion
    const returnPartnerEmotion = await getPartnerEmotion(); // yes, userId bc of logic below
    setPartnerLastEmotion(Number(returnPartnerEmotion)); // set partner's rendering emotion
    setSelectedIcon(Number(returnEmotion));
    return true;
  };

  // get user's emotion data, which includes their last sent emotion & their partner's last sent emotion
  const getUserEmotion = async () => {
    let userEmotion, emotion;
    try {
      userEmotion = await axios.get(`${apiUrl}/users/emotion/${userId}`);
      emotion = userEmotion.data;
    } catch (e) {
      console.log('Error retrieving user: ', e);
    }

    return emotion;
  };

  // get partner's emotion data
  const getPartnerEmotion = async () => {
    let partnerEmotion;
    try {
      partnerEmotion = await axios.get(`${apiUrl}/users/partner_emotion/${userId}`);
    } catch (e) {
      console.log('Error retrieving user: ', e);
    }
    return partnerEmotion.data;
  };

  const renderIconItem = ({ item, index }) => {
    const itemStyle = index === selectedIcon ? styles.selectedIcon : styles.unselectedIcon;
    const color = index === selectedIcon ? 'black' : 'gray';
    const marginLeft = (-screenWidth / 100) * 4.4;

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
        style={{ width: screenWidth * 0.5349, height: screenHeight * 0.4721 }}
      />
    );
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleButtonPress = () => {
    setModalVisible(true);
    setCarouselSpun(false);
    setLastEmotionSent(selectedIcon.toString());
    updateBothEmotion(lastEmotionSent, userId); // update both users' render emotion based on sender's emotion
  };

  // try catch for updating both user & partner's emotion (logic in backend)
  const updateBothEmotion = async () => {
    try {
      if (lastEmotionSent) {
        await axios.patch(`${apiUrl}/emotions/${userId}`, lastEmotionSent);
      }
    } catch (e) {
      console.log('Error updating emotions: ', e);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { paddingTop: screenHeight * 0.06974, paddingHorizontal: screenWidth * 0.0465 }]}>
      <Text style={[styles.text, { marginTop: screenHeight * 0.03 }]}>Penguins</Text>
      <View style={[styles.imageContainer, { marginTop: screenHeight * 0.06 }]}>
        {renderGif()}
        <Image
          // change this to other penguin's emotion
          source={gifDataPink[partnerLastEmotion]}
          style={{ width: screenWidth * 0.5349, height: screenHeight * 0.4721 }}
        />
      </View>
      <View style={[styles.penguinNamesContainer, { marginTop: -screenHeight * 0.045 }]}>
        <Text style={[styles.penguinName, { flex: 1 }]}>{userName}</Text>
        <Text style={[styles.penguinName, { flex: 1 }]}>{partnerName}</Text>
      </View>
      <View style={[styles.carouselContainer, { marginTop: screenHeight * 0.02, marginBottom: screenHeight * 0.0644 }]}>
        <View
          style={[styles.circle, {
            borderRadius: screenHeight * 0.1395,
            borderWidth: screenWidth * 0.0186,
            transform: [{ translateX: -screenWidth * 0.0865 }, { translateY: -screenHeight * 0.041 }],
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
        <View style={[styles.buttonContainer, { marginTop: -screenHeight * 0.035 }]}>
          <Button
            title="Send Emotion"
            onPress={handleButtonPress}
            color="white"
          />
        </View>
      ) : (
        <Text style={[styles.swipeText, { marginTop: -screenHeight * 0.035 }]}>
          Feel free to swipe to set a new emotion :)
          Partner Last Emotion:
          {' '}
          {partnerLastEmotion}
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
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
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
  carouselContainer: {},
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
    borderColor: 'rgb(230, 43, 133)',
    left: '50%',
    top: '50%',
    backgroundColor: 'transparent',
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
