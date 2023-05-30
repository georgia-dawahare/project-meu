/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
/* eslint-disable global-require */
import React, { useEffect, useState } from 'react';
import { Text, Button, SafeAreaView, StyleSheet, View, Image, Dimensions, Modal } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import TopBarCheckin from '../../components/TopBarCheckin';
import TopBarPenguin from '../../components/TopBarPenguin';

const iconData = [
  { name: 'emoticon-happy-outline' },
  { name: 'hand-wave-outline' },
  { name: 'heart-outline' },
  { name: 'emoticon-cry-outline' },
  { name: 'party-popper' },
];

const gifData = [
  require('../../../assets/animations/neutral/neutral_black.gif'),
  require('../../../assets/animations/hello/hello_black.gif'),
  require('../../../assets/animations/send_love/send_love_black.gif'),
  require('../../../assets/animations/sad/sad_black.gif'),
  require('../../../assets/animations/confetti/confetti_black.gif'),
];

function PenguinsPage({ navigation }) {
  const [screenWidth, setScreenWidth] = useState(Dimensions.get('window').width);
  const [screenHeight, setScreenHeight] = useState(Dimensions.get('window').height);
  const [selectedItem, setSelectedItem] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [carouselSpun, setCarouselSpun] = useState(false); // so that we can keep show button only when carousel is spunned
  const [lastEmotionSent, setLastEmotionSent] = useState(null);

  useEffect(() => {
    const updateScreenDimensions = () => {
      setScreenWidth(Dimensions.get('window').width);
      setScreenHeight(Dimensions.get('window').height);
    };
    Dimensions.addEventListener('change', updateScreenDimensions);

    return () => {
      Dimensions.removeEventListener('change', updateScreenDimensions);
    };
  }, []);

  const renderIconItem = ({ item, index }) => {
    const itemStyle = index === selectedItem ? styles.selectedItem : styles.unselectedItem;
    const color = index === selectedItem ? 'black' : 'gray';

    return (
      <MaterialCommunityIcons
        name={item.name}
        size={screenWidth / 5}
        color={color}
        style={[styles.icon, itemStyle]}
      />
    );
  };

  const handleCarouselItemChange = (index) => {
    setSelectedItem(index);
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
        source={gifData[selectedItem]}
        style={styles.image}
      />
    );
  };

  const handleButtonPress = () => {
    setModalVisible(true);
    setCarouselSpun(false);
    setLastEmotionSent(selectedItem);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <TopBarPenguin />
      <View style={styles.imageContainer}>
        {renderGif()}
        <Image
          source={require('../../../assets/animations/neutral/neutral_pink.gif')}
          style={styles.image}
        />
      </View>
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
        />
      </View>
      {carouselSpun ? (
        <View style={styles.buttonContainer}>
          <Button
            title="Send Emotion"
            onPress={handleButtonPress}
            color="white"
          />
        </View>
      ) : (
        <Text style={styles.swipeText}>Feel free to swipe to set a new emotion :)</Text>
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
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  text: {
    textAlign: 'center',
  },
  image: {
    width: 230,
    height: 440,
  },
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 80,
  },
  carouselContainer: {
    marginBottom: 60,
  },
  icon: {},
  selectedItem: {
    transform: [{ scale: 1 }],
  },
  unselectedItem: {
    transform: [{ scale: 0.5 }],
  },
  circle: {
    position: 'absolute',
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 8,
    borderColor: 'rgb(230, 43, 133)',
    left: '50%',
    top: '50%',
    transform: [{ translateX: -60 }, { translateY: -60 }],
  },
  buttonContainer: {
    backgroundColor: 'rgb(230, 43, 133)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignSelf: 'center',
    textAlign: 'center',
    width: '70%',
    height: '7%',
    borderRadius: 10,
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
    height: '30%',
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
