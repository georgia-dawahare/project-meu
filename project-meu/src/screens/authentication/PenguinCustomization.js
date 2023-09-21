/* eslint-disable global-require */
import React, { useEffect, useState } from 'react';
import {
  Text, TouchableOpacity, SafeAreaView, StyleSheet, View, Image, Dimensions,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import * as Font from 'expo-font';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../../actions/UserActions';

const gifDataColors = {
  0: require('../../../assets/animations/hello/hello_black.gif'),
  1: require('../../../assets/animations/hello/hello_pink.gif'),
  2: require('../../../assets/animations/hello/hello_blue.gif'),
  3: require('../../../assets/animations/hello/hello_golden_brown.gif'),
  4: require('../../../assets/animations/hello/hello_gray.gif'),
  5: require('../../../assets/animations/hello/hello_lime.gif'),
  6: require('../../../assets/animations/hello/hello_purple.gif'),
  7: require('../../../assets/animations/hello/hello_red.gif'),
  8: require('../../../assets/animations/hello/hello_sky.gif'),
  9: require('../../../assets/animations/hello/hello_orange.gif'),
  10: require('../../../assets/animations/hello/hello_lavender.gif'),
  11: require('../../../assets/animations/hello/hello_teal.gif'),
};

const iconColors = [
  require('../../../assets/penguin_colors/black.png'),
  require('../../../assets/penguin_colors/pink.png'),
  require('../../../assets/penguin_colors/blue.png'),
  require('../../../assets/penguin_colors/golden_brown.png'),
  require('../../../assets/penguin_colors/gray.png'),
  require('../../../assets/penguin_colors/lime.png'),
  require('../../../assets/penguin_colors/purple.png'),
  require('../../../assets/penguin_colors/red.png'),
  require('../../../assets/penguin_colors/sky.png'),
  require('../../../assets/penguin_colors/orange.png'),
  require('../../../assets/penguin_colors/lavender.png'),
  require('../../../assets/penguin_colors/teal.png'),
];

const colorsMap = {
  0: 'black',
  1: 'pink',
  2: 'blue',
  3: 'golden_brown',
  4: 'gray',
  5: 'lime',
  6: 'purple',
  7: 'red',
  8: 'sky',
  9: 'orange',
  10: 'lavender',
  11: 'teal',
};

function PenguinCustomization({ navigation }) {
  const [fontLoaded, setFontLoaded] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState(null);
  const screenWidth = Dimensions.get('window').width;
  const user = useSelector((state) => state.userState.userData);
  const currUserId = user._id;

  const dispatch = useDispatch();

  useEffect(() => {
    async function loadFont() {
      await Font.loadAsync({
        'SF-Pro-Display-Semibold': require('../../../assets/fonts/SF-Pro-Display-Semibold.otf'),
        'SF-Pro-Display-Medium': require('../../../assets/fonts/SF-Pro-Display-Medium.otf'),
      });

      setFontLoaded(true);
    }
    loadFont();
  }, []);

  // TODO: add error catching before navigation?
  const updatePenguin = async () => {
    const color = colorsMap[selectedIcon].toString();
    try {
      const userData = {
        penguinColor: color,
      };
      dispatch(updateUser(currUserId, userData));
    } catch (e) {
      console.log('Error updating user: ', e);
    }
  };

  const handleNext = async () => {
    updatePenguin();
    navigation.navigate('Welcome');
  };

  const renderIconItem = ({ item, index }) => {
    const itemStyle = index === selectedIcon ? styles.selectedIcon : styles.unselectedIcon;

    return (
      <Image
        source={item}
        style={[styles.icon, itemStyle]}
      />
    );
  };

  const handleCarouselItemChange = (index) => {
    setSelectedIcon(index);
  };

  const calculateItemWidth = () => {
    return screenWidth / 5;
  };

  const renderGif = () => {
    if (selectedIcon === null) {
      setSelectedIcon(0);
    }

    return (
      <Image
        // set this to user's penguin color
        source={gifDataColors[selectedIcon]}
        style={styles.image}
      />
    );
  };

  if (!fontLoaded) {
    return <Text>Loading...</Text>;
  }
  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.backWrapper}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.gobackIcon}>
          <Image
            source={require('../../../assets/icons/back-arrow.png')}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.mainContent}>
        <View style={styles.clearContainer}>
          <Text style={styles.buttonTxt} />
        </View>
        <Text style={styles.Text}>Customize your Penguin</Text>
        <View style={styles.imageContainer}>
          {renderGif()}
        </View>

        <View style={styles.carouselContainer}>
          <View style={styles.circle} />
          <Carousel
            data={iconColors}
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

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleNext}>
            <Text style={styles.buttonTxt}>Let&apos;s start</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.clearContainer}>
          <Text style={styles.buttonTxt} />
        </View>

      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 24,
    marginRight: 24,
  },
  backWrapper: {
    marginLeft: 24,
    marginTop: 30,
    alignItems: 'flex-start',
  },
  gobackIcon: {
    position: 'absolute',
    alignSelf: 'flex-start',
  },
  mainContent: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  Text: {
    alignSelf: 'center',
    textAlign: 'center',
    fontFamily: 'SF-Pro-Display-Semibold',
    fontColor: '#212121',
    fontSize: 20,
    lineHeight: 27,
    marginTop: 60,
  },
  imageContainer: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  image: {
    flex: 1,
    marginTop: -60,
    aspectRatio: 332 / 255, // Set the aspect ratio of the image
    alignSelf: 'center',
    maxWidth: '100%', // Set a maximum width to prevent it from exceeding the screen width
  },
  carouselContainer: {
    flex: 1,
    marginTop: -36,
  },
  icon: {
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: -22,
  },
  selectedIcon: {
    transform: [{ scale: 0.5 }],
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: -22,
  },
  unselectedIcon: {
    transform: [{ scale: 0.3 }],
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: {
    position: 'absolute',
    width: 74,
    height: 74,
    borderColor: 'rgb(230, 43, 133)', // 'transparent'
    borderRadius: 100,
    borderWidth: 6, // 7 on SE
    opacity: 0.4,
    transform: [{ translateX: 1 }, { translateY: 25 }],
    backgroundColor: 'transparent',
    alignSelf: 'center',
  },
  Subtitle: {
    fontFamily: 'SF-Pro-Display-Medium',
    fontSize: 14,
    lineHeight: 21,
    color: 'rgba(106,108,115,1)',
    alignSelf: 'center',
    width: 225,
    textAlign: 'center',
    top: 600,
  },
  errorText: {
    color: '#E62B85',
    fontFamily: 'SF-Pro-Display-Regular',
    lineHeight: 24,
    fontSize: 12,
    textAlign: 'center',
  },
  buttonTxt: {
    fontFamily: 'SF-Pro-Display-Semibold',
    color: 'white',
    fontSize: 20,
  },
  button: {
    backgroundColor: 'rgba(230, 43, 133, 1)',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    height: 60,
    width: 342,
    borderRadius: 15,
    margin: 20,
    marginBottom: 48,
  },
  buttonContainer: {},
  clearContainer: {
    marginTop: 20,
  },
});

export default PenguinCustomization;
