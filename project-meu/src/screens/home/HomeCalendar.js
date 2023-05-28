/* eslint-disable global-require */
import React, { useEffect, useRef, useState } from 'react';
import {
  StyleSheet, Text, SafeAreaView, Animated, Image, View, TouchableOpacity, Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Font from 'expo-font';
import axios from 'axios';
import FloatingButton from '../../components/FloatingButton';
import FabandModal from '../../components/FabandModal';
import { apiUrl } from '../../constants/constants';

function DdayList({
  date, title, iconName, eventId,
}) {
  const [icon, setIcon] = useState(iconName);
  const [previousIcon, setPreviousIcon] = useState('');

  const handlePress = () => {
    console.log(eventId);
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

  const deleteEventConfirmation = async () => {
    await axios.delete(`${apiUrl}/events/${eventId}`);
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.ddayItem}>
      <Text style={styles.ddaydate}>{date}</Text>
      <Text style={styles.ddayTitle}>{title}</Text>
      <Ionicons name={icon} size={24} color="black" style={styles.icon} />
    </TouchableOpacity>
  );
}

// const printEventTitlesAndDates = () => {
//   getEvents()
//     .then((events) => {
//       const ddayList = events.map((event) => {
//         const { title, date } = event;
//         return (
//           <DdayList
//             key={event.id} // 적절한 key 값을 제공해야 합니다.
//             date={date}
//             title={title}
//             iconName="yourIconName" // 필요한 아이콘 이름을 제공해야 합니다.
//           />
//         );
//       });

//       // ddayList 변수에는 각 이벤트에 대한 DdayList 컴포넌트들이 저장되어 있습니다.
//       // 이제 이 변수를 화면에 렌더링하거나 필요한 곳에서 사용할 수 있습니다.
//       console.log('Dday List:', ddayList);
//     })
//     .catch((error) => {
//       console.error('Error getting events:', error);
//     });
// };

// Modified from: https://github.com/kosaikham/twitter-scrollable-header-clone
function HomeCalendarComponent({ scrollY, navigation }) {
  const THRESHOLD = 480;
  const HEADER_HEIGHT = 600;
  const STICKY_HEADER_HEIGHT = 120;

  const inputRange = [0, THRESHOLD];
  const outputRange = [0, -(HEADER_HEIGHT - STICKY_HEADER_HEIGHT)];

  const [fontLoaded, setFontLoaded] = useState(false);
  const [eventData, setEventData] = useState([]);

  // TODO: Need to filter by pairId
  const printEventTitlesAndDates = async () => {
    const events = await axios.get(`${apiUrl}/events/`);
    const ddayList = events.data.map((event) => {
      const {
        title, repeat, date, id,
      } = event;
      const formattedDate = date.slice(0, 5);
      return (
        <DdayList
          key={event.id}
          date={formattedDate}
          title={title}
          repeat={repeat}
          eventId={id}
          iconName="ios-heart"
        />
      );
    });

    setEventData(ddayList);
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
    printEventTitlesAndDates();
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
      <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.backButton}>
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
