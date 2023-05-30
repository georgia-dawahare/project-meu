/* eslint-disable global-require */
import React, { useEffect, useRef, useState } from 'react';
import {
  StyleSheet, Text, SafeAreaView, Animated, Image, View, TouchableOpacity, Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Font from 'expo-font';
import FloatingButton from '../../components/FloatingButton';
import FabandModal from '../../components/FabandModal';
import { getEvents, deleteEvent } from '../../services/datastore';

function DdayList({
  date, title, iconName, fetchData, /* onDelete */
}) {
  const [icon, setIcon] = useState(iconName);
  const [previousIcon, setPreviousIcon] = useState('');

  const handlePress = () => {
    if (icon === 'ios-trash') {
      Alert.alert(
        'Confirmation',
        'Are you sure you want to delete this anniversary?',
        [
          {
            text: 'Cancel',
            style: 'cancel',
            onPress: () => {
              setIcon(previousIcon);
            },
          },
          {
            text: 'Delete',
            onPress: deleteEventConfirmation,
            style: 'destructive',
          },
        ],
      );
    } else {
      setPreviousIcon(icon);
      setIcon('ios-trash');
    }
  };

  const deleteEventConfirmation = () => {
    // deleteEvent(title);
    deleteEvent(title);
    // fetchData();
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.ddayItem}>
      <Text style={styles.ddaydate}>{date}</Text>
      <Text style={styles.ddayTitle}>{title}</Text>
      <Ionicons name={icon} size={24} color="black" style={styles.icon} />
    </TouchableOpacity>
  );
}

// Modified from: https://github.com/kosaikham/twitter-scrollable-header-clone
function HomeCalendarComponent({ scrollY, navigation }) {
  const THRESHOLD = 480;
  const HEADER_HEIGHT = 600;
  const STICKY_HEADER_HEIGHT = 120;

  const inputRange = [0, THRESHOLD];
  const outputRange = [0, -(HEADER_HEIGHT - STICKY_HEADER_HEIGHT)];

  const [fontLoaded, setFontLoaded] = useState(false);
  const [eventData, setEventData] = useState([]);

  const fetchData = () => {
    setEventData([]);

    getEvents()
      .then((events) => {
        // tim: refactor this so that fetchData puts events into eventData state not components into state
        // take the below map and put it in separate renderEvents function that returns components like you have
        const ddayList = events.map((event) => {
          // const { date, title, repeat } = event;
          const { title, repeat } = event;
          return (
            <DdayList
              onDelete={deleteEvent}
              key={event.id}
              // date={date}
              title={title}
              repeat={repeat}
              iconName="ios-heart"
              fetchData={fetchData}
            />
          );
        });

        setEventData(ddayList);
      })
      .catch((error) => {
        console.error('Error getting events:', error);
      });
  };

  useEffect(() => {
    async function loadFont() {
      await Font.loadAsync({
        'SF-Pro-Display-Bold': require('../../../assets/fonts/SF-Pro-Display-Bold.otf'),
        'SF-Pro-Display-Semibold': require('../../../assets/fonts/SF-Pro-Display-Semibold.otf'),
        'SF-Pro-Display-Medium': require('../../../assets/fonts/SF-Pro-Display-Medium.otf'),
      });
      setFontLoaded(true);
    }
    loadFont();
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  if (!fontLoaded) {
    return <Text>Loading...</Text>;
  }

  const translateY = scrollY.interpolate({
    inputRange,
    outputRange,
    extrapolate: 'clamp',
  });

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('Homeplaceholder')} style={styles.backButton}>
        <View style={styles.buttonContent}>
          <Image source={require('../../../assets/icons/goback-black.png')} style={styles.Icon} />
        </View>
      </TouchableOpacity>
      <Animated.View
        style={[
          styles.headerContainer,
          {
            height: HEADER_HEIGHT,
            transform: [{ translateY }],
          },
        ]}
      >
        <Animated.Text
          style={[
            styles.headerText,
            {
              opacity: scrollY.interpolate({
                inputRange: [0, THRESHOLD],
                outputRange: [1, 0],
                extrapolate: 'clamp',
              }),
              textAlign: 'center',
            },
          ]}
        >
          Together for
          <Animated.Text
            style={styles.bgtextday}
          >
            {'\n'}
            1252
          </Animated.Text>
          <Animated.Text
            style={styles.bgtextdate}
          >
            {'\n'}
            October 20th, 2019
          </Animated.Text>
        </Animated.Text>
        <FloatingButton />
        <FabandModal />
      </Animated.View>

      <Animated.ScrollView
        scrollEventThrottle={16}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: false })}
        style={{
          flex: 1,
        }}
        contentContainerStyle={styles.scrollContent}
      >
        <Animated.View
          style={{
            width: 390,
            borderWidth: 3,
            borderColor: 'white',
            marginTop: HEADER_HEIGHT - 120,
            backgroundColor: 'white',
            overflow: 'hidden',
          }}
        />
        <View>
          <View>
            <Text style={styles.annivtitle}>
              Upcoming Anniversaries
            </Text>
            <View>
              <View>{eventData}</View>
            </View>
          </View>
        </View>

        <View />
      </Animated.ScrollView>
    </SafeAreaView>
  );
}

function HomeCalendar({ navigation }) {
  const scrollY = useRef(new Animated.Value(0)).current;

  return (
    <View style={styles.container}>
      <HomeCalendarComponent scrollY={scrollY} navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  backButton: {
    position: 'absolute',
    top: 32,
    left: 16,
    zIndex: 200,
  },
  Icon: {
    position: 'relative',
    top: 32,
    left: 24,
    height: 24,
    zIndex: 200,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 120,
    backgroundColor: 'lightskyblue',
    zIndex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontFamily: 'SF-Pro-Display-Medium',
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  scrollContent: {
    paddingTop: 120,
  },
  ddayItem: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 24,
    marginBottom: 24,
    paddingLeft: 24,
  },
  ddaydate: {
    fontSize: 16,
  },

  ddayTitle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontFamily: 'SF-Pro-Display-Medium',
    fontSize: 16,
    paddingLeft: 24,
  },
  DdayList: {
    flex: 1,
    flexDirection: 'column',
  },
  annivtitle: {
    fontFamily: 'SF-Pro-Display-Semibold',
    fontSize: 20,
    paddingLeft: 24,
    marginBottom: 36,
  },
  bgtextday: {
    fontFamily: 'SF-Pro-Display-Semibold',
    fontSize: 52,
  },
  bgtextdate: {
    fontFamily: 'SF-Pro-Display-Semibold',
    fontSize: 18,
    lineHeight: 36,
  },
});

export default HomeCalendar;
