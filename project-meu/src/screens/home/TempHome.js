/* eslint-disable global-require */
import React, { useState, useEffect } from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  Image,
  Text,
} from 'react-native';
import TopBar from '../../components/TopBar';
import ClockAndLocation from '../../components/ClockAndLocation';
<<<<<<< HEAD
// import PartnerWidget from '../../components/PartnerWidget';
import BackgroundChange from './PartnerWidget';
=======
import BackgroundChange from './BackgroundChange';
>>>>>>> f98577cd07b4a7ca93561e9a6219c55c94d9e3d1

function TempHome({ navigation }) {
  const backgroundImage = 'https://www.figma.com/file/PYeh3GKvg4VwmsTEXIc0Bs/image/d8a98af1d41d8274cf130bbb5bf82d5862df78f6?fuid=1112504140237920766';
  // const [isMenuVisible, setMenuVisible] = useState(false);
  const backgroundColor = 'white';

  const [fontLoaded, setFontLoaded] = useState(false);

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

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <View style={styles.separate}>
        {backgroundImage && (
        <Image
          source={{ uri: backgroundImage }}
          style={styles.image}
          resizeMode="cover"
        />
        )}
        <View>
          <TopBar navigation={navigation} />
          <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
            <View style={styles.partnerWidget}>
              <BackgroundChange />
            </View>
          </View>
        </View>
        <View>
          <ClockAndLocation />
        </View>
      </View>
    </SafeAreaView>
  );
}

export default TempHome;

const styles = StyleSheet.create({
  partnerWidget: {
    height: 124,
    width: 124,
    margin: 10,
    marginTop: 20,
    borderRadius: 15,
  },

  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },

  image: {
    ...StyleSheet.absoluteFillObject,
  },

  separate: {
    flex: 2,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: 'grey',
  },

});
