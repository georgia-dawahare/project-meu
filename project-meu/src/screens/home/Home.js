/* eslint-disable global-require */
import React, { useState, useEffect } from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import HomeHeader from '../../components/HomeHeader';
import ClockAndLocation from '../../components/ClockAndLocation';
import BackgroundChange from './BackgroundChange';
// import { apiUrl } from '../../constants/constants';
import { fetchUserById, updateUser } from '../../actions/UserActions';
import { fetchPartnerById, fetchPartnerId, updatePartner } from '../../actions/PartnerActions';

function Home({ navigation }) {
  const [userBackgroundImage, setUserBackgroundImage] = useState('');
  const [partnerBackgroundImage, setPartnerBackgroundImage] = useState('');
  const [isMenuVisible, setMenuVisible] = useState(false);
  const user = useSelector((state) => state.userState.userData);
  const partner = useSelector((state) => state.partnerState.partnerData);

  const dispatch = useDispatch();

  useEffect(() => {
    console.log('here');
    async function setUserBackground() {
      console.log('use', user);
      dispatch(fetchUserById(user._id));
      if (user && user.backgroundPhoto) {
        setUserBackgroundImage(user.backgroundPhoto);
      }
    }

    async function setPartnerBackground() {
      dispatch(fetchPartnerId(user._id));

      if (partner._id) {
        dispatch(fetchPartnerById(partner._id));
        if (partner.backgroundPhoto) {
          setPartnerBackgroundImage(partner.backgroundPhoto);
        }
      }
    }

    setUserBackground();
    setPartnerBackground();
    console.log(userBackgroundImage);
    console.log(partnerBackgroundImage);
  }, []);

  const toggleMenu = () => {
    setMenuVisible(!isMenuVisible);
  };

  const renderBackground = () => {
    if (userBackgroundImage) {
      return (
        <ImageBackground
          source={{ uri: userBackgroundImage }}
          style={styles.userBackground}
        />
      );
    } else {
      return (
        <Image
          style={styles.defaultImage}
          source={require('../../../assets/images/defaultUserBackground.png')}
        />
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* <HomeHeader navigation={navigation} /> */}
      <View style={styles.separate}>
        <TouchableOpacity style={styles.partnerWidget} onPress={toggleMenu}>
          {/* <BackgroundChange background={partnerBackgroundImage} uid={userId} toggleMenu={toggleMenu} setMenuVisible={setMenuVisible} isMenuVisible={isMenuVisible} /> */}
        </TouchableOpacity>
        {renderBackground()}
        <View />
        <View style={styles.clockWidget}>
          {/* <ClockAndLocation /> */}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  partnerWidget: {
    position: 'absolute',
    zIndex: 1,
    top: 0,
    right: 0,
    height: 124,
    width: 124,
    margin: 10,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  clockWidget: {
    flex: 1,
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.2,
    // shadowRadius: 4,
    justifyContent: 'flex-end',
  },
  defaultImage: {
    ...StyleSheet.absoluteFillObject,
  },
  userBackground: {
    width: '100%',
    height: '100%',
  },
  separate: {
    flex: 2,
    backgroundColor: 'white',
  },
});

export default Home;
