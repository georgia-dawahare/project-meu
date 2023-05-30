import React, { useState } from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet, Image,
} from 'react-native';
// import * as ImagePicker from 'expo-image-picker';
import TopBar from '../../components/TopBar';
import ClockAndLocation from '../../components/ClockAndLocation';
// import PartnerWidget from '../../components/PartnerWidget';
import BackgroundChange from './BackgroundChange';

function TempHome({ navigation }) {
  const [backgroundImage, setBackgroundImage] = useState('https://www.figma.com/file/PYeh3GKvg4VwmsTEXIc0Bs/image/d8a98af1d41d8274cf130bbb5bf82d5862df78f6?fuid=1112504140237920766');
  // const [isMenuVisible, setMenuVisible] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState('white');

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
    height: 120,
    width: 120,
    margin: 10,
    borderRadius: 20,
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
