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
import auth from '../../services/datastore';
import { fetchFirestoreUser } from '../../actions/UserActions';
import { fetchPartner } from '../../actions/PartnerActions';
import { fetchPair } from '../../actions/PairActions';

function Home({ navigation }) {
  const [userBackgroundImage, setUserBackgroundImage] = useState('');
  const [isMenuVisible, setMenuVisible] = useState(false);
  const [userFirestoreID, setUserFirestoreID] = useState('');
  const user = useSelector((state) => state.userState.userData);
  const partner = useSelector((state) => state.partnerState.partnerData);
  const dispatch = useDispatch();

  const pair = useSelector((state) => state.pairState.pairData);

  // Get user ID
  useEffect(() => {
    setUserFirestoreID(auth?.currentUser?.uid);
  }, []);

  // Fetch user
  // BUG: Not fetching correctly
  useEffect(() => {
    async function getUser() {
      dispatch(fetchFirestoreUser(userFirestoreID));
    }

    if (userFirestoreID) getUser();
    console.log('LOGGED IN', user);
    console.log('PARTNER: ', partner);
  }, [userFirestoreID]);

  // Fetch partner
  // BUG: Not fetching correctly
  useEffect(() => {
    async function getPartner(userId) {
      dispatch(fetchPartner(userId));
    }
    if (user._id) getPartner(user._id);
  }, [user]);

  // Fetch pair
  useEffect(() => {
    async function getPair(userId) {
      dispatch(fetchPair(userId));
    }
    if (user._id) getPair(user._id);
    console.log('PAIR', pair);
  }, []);

  // TODO: Test if works
  useEffect(() => {
    if (partner._id && user._id) {
      if (user.backgroundPhoto) {
        setUserBackgroundImage(user.backgroundPhoto);
      }
    }
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
      <HomeHeader navigation={navigation} />
      <View style={styles.separate}>
        <TouchableOpacity style={styles.partnerWidget} onPress={toggleMenu}>
          <BackgroundChange toggleMenu={toggleMenu} setMenuVisible={setMenuVisible} isMenuVisible={isMenuVisible} />
        </TouchableOpacity>
        {renderBackground()}
        <View />
        <View style={styles.clockWidget}>
          <ClockAndLocation />
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
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
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
