/* eslint-disable global-require */
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  Image,
  View,
  Animated,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import * as Font from 'expo-font';
import { useSelector } from 'react-redux';
import { apiUrl } from '../../constants/constants';
import FloatingButton from '../../components/FloatingButton';
import FabandModal from '../../components/FabandModal';
import auth from '../../services/datastore';
import anniversariesData from '../../../assets/data/anniversaries.json';

function HomeCalendar({ navigation }) {
  const [fontLoaded, setFontLoaded] = useState(false);
  const [extractedFirebaseData, setExtractedFirebaseData] = useState([]);
  const [clickedItem, setClickedItem] = useState(null);
  const [clickedItemId, setClickedItemId] = useState(null);
  const currUser = useSelector((state) => state.user);
  const [userID, setuserID] = useState('');
  const [userId, setUserId] = useState('');
  const [userFirstDate, setUserFirstDate] = useState('');

  const THRESHOLD = 480;
  const HEADER_HEIGHT = 600;
  const STICKY_HEADER_HEIGHT = 120;
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const inputRange = [0, THRESHOLD];
  const outputRange = [0, -(HEADER_HEIGHT - STICKY_HEADER_HEIGHT)];
  const today = new Date();

  const scrollY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loadFont = async () => {
      await Font.loadAsync({
        'SF-Pro-Display-Medium': require('../../../assets/fonts/SF-Pro-Display-Medium.otf'),
        'SF-Pro-Display-Regular': require('../../../assets/fonts/SF-Pro-Display-Regular.otf'),
      });

      setFontLoaded(true);
    };

    loadFont();
  }, []);

  useEffect(() => {
    setUserId(auth?.currentUser?.uid);
  }, [userID]);

  useEffect(() => {
    const getUser = async () => {
      const user = await axios.get(`${apiUrl}/users/${userId}`);
      const userInfo = user.data;

      if (userInfo) {
        setuserID(userInfo.pair_id);
      }
    };
    if (userId) {
      getUser();
    }
  }, [userId]);

  // here
  useEffect(() => {
    const getPairDate = async () => {
      const pair = await axios.get(`${apiUrl}/pairs/${userID}`);
      const relationshipStart = pair?.data?.relationship_start;

      if (relationshipStart) {
        const startDate = new Date(relationshipStart);
        setUserFirstDate(startDate);
      } else {
        console.log('Could not retrieve start date');
      }
    };
    getPairDate();
  }, [userID]);
  console.log('first startd dateee"      ', userFirstDate);
  useEffect(() => {
    axios
      .get(`${apiUrl}/events/`)
      .then((response) => {
        const eventData = response.data;

        const extractedData = eventData.map((event) => {
          const extractDday = (dateString) => {
            const date = new Date(dateString);
            const today2 = new Date();
            const timeDiff = date.getTime() - today2.getTime();
            const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
            return daysDiff > 0 ? `D-${daysDiff}` : `D+${Math.abs(daysDiff)}`;
          };

          const extractedDate = extractDday(event.date);
          const name = `${event.title}`;
          const id = `${event.id}`;
          const pairId = `${event.pairId}`;
          return {
            date: extractedDate,
            name,
            id,
            pairId,
          };
        });

        setExtractedFirebaseData(extractedData);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const printEventTitlesAndDates = async () => {
    axios
      .get(`${apiUrl}/events/`)
      .then((response) => {
        const eventData = response.data;

        const extractedData = eventData.map((event) => {
          const extractDday = (dateString) => {
            const date = new Date(dateString);
            const today2 = new Date();
            const timeDiff = date.getTime() - today2.getTime();
            const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
            return daysDiff > 0 ? `D-${daysDiff}` : `D+${Math.abs(daysDiff)}`;
          };

          const extractedDate = extractDday(event.date);
          const name = `${event.title}`;
          const id = `${event.id}`;
          const pairId = `${event.pairId}`;

          return {
            date: extractedDate,
            name,
            id,
            pairId,
          };
        });

        // console.log('Extracted Firebase Data:', extractedData);
        setExtractedFirebaseData(extractedData);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const renderItem = ({ item }) => {
    let itemStyle = styles.item;
    let dateText = item.date;

    if (item.date.startsWith('D+') && item.date !== 'D+0') {
      return null;
    } else if (item.date.startsWith('D+')) {
      const days = parseInt(item.date.substring(2), 10);
      if (days === 0) {
        itemStyle = styles.coloredItem;
        dateText = 'D+0';
      } else if (days <= 7) {
        dateText = `D-${item.date.substring(2)}`;
      } else {
        const date = new Date(item.date);
        const formattedDate = `${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}/${date.getFullYear()}`;

        dateText = formattedDate;
      }
    } else if (item.date.startsWith('D-')) {
      const days = parseInt(item.date.substring(2), 10);
      if (days <= 7) {
        dateText = `D-${item.date.substring(2)}`;
      } else {
        const currentDate = new Date();
        const futureDate = new Date(currentDate.getTime() + (days * 24 * 60 * 60 * 1000));
        futureDate.setDate(futureDate.getDate());
        const formattedDate = `${(futureDate.getMonth() + 1).toString().padStart(2, '0')}/${futureDate.getDate().toString().padStart(2, '0')}/${futureDate.getFullYear()}`;

        dateText = formattedDate;
      }
    } else {
      const days = parseInt(item.date.substring(2), 10);
      const currentDate = new Date();
      const futureDate = new Date(currentDate.getTime() + (days * 24 * 60 * 60 * 1000));
      futureDate.setDate(futureDate.getDate() + 1);
      const formattedDate = `${futureDate.getMonth() + 1}/${futureDate.getDate()}/${futureDate.getFullYear()}`;
      dateText = formattedDate;
    }

    const handlePress = () => {
      if (item.id) {
        setClickedItem(item);
        if (clickedItemId === null) {
          setClickedItemId(item.id);
        } else if (clickedItemId === item.id) {
          Alert.alert(
            'Confirmation',
            'Are you sure you want to delete this anniversary?',
            [
              {
                text: 'Cancel',
                style: 'cancel',
              },
              {
                text: 'Delete',
                onPress: () => deleteEventConfirmation(item.id),
                style: 'destructive',
              },
            ],
          );
          setClickedItemId(null);
        } else {
          setClickedItemId(item.id);
        }
      }
    };
    const deleteEventConfirmation = async (eventId) => {
      try {
        await axios.delete(`${apiUrl}/events/${eventId}`);
        const updatedData = extractedFirebaseData.filter((event) => event.id !== item.id);
        setExtractedFirebaseData(updatedData);
      } catch (error) {
        console.error('Failed to delete event:', error);
      }
    };

    const icon = clickedItemId === item.id ? (
      <Image source={require('../../../assets/icons/trash.png')} style={styles.icon} />
    ) : (
      <Image source={require('../../../assets/icons/heart.png')} style={styles.icon} />
    );

    return (
      <TouchableOpacity onPress={handlePress} style={itemStyle}>
        <View style={styles.rowContainer}>
          <Text style={item.date === 'D+0' ? styles.coloredItemText : styles.itemText}>
            {dateText}
          </Text>
          <Text style={item.date === 'D+0' ? styles.coloredItemText : styles.itemText}>
            {item.name}
          </Text>
          {icon}
        </View>
      </TouchableOpacity>
    );
  };

  const getCurrentAnniversary = () => {
    if (userFirstDate) {
      const anniversaryDate = new Date(userFirstDate);
      const currentDate = new Date();

      const yearsDiff = currentDate.getFullYear() - anniversaryDate.getFullYear();
      const monthsDiff = currentDate.getMonth() - anniversaryDate.getMonth();
      const daysDiff = currentDate.getDate() - anniversaryDate.getDate();

      let currentAnniversary = yearsDiff;

      if (monthsDiff < 0 || (monthsDiff === 0 && daysDiff < 0)) {
        currentAnniversary--;
      }

      return currentAnniversary;
    }

    return null;
  };

  // render Anniversaries from json
  const renderAnniversaries = () => {
    const currentYear = new Date().getFullYear();
    const endYear = currentYear + 2;
    const Defaultdata = [];

    const extractDday = (dateString) => {
      const date = new Date(dateString);
      const timeDiff = date.getTime() - today.getTime();
      const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
      return daysDiff > 0 ? `D-${daysDiff}` : `D+${Math.abs(daysDiff)}`;
    };

    for (let year = currentYear; year <= endYear; year++) {
      for (const anniversary of anniversariesData.anniversaries) {
        if (anniversary.yearly) {
          const anniversaryDate = new Date(anniversary.date);
          anniversaryDate.setFullYear(year);
          const extractedDate = extractDday(anniversaryDate);

          Defaultdata.push({
            date: extractedDate,
            name: `${anniversary.name}`,
          });
        } else {
          Defaultdata.push({
            id: `${anniversary.id}`,
            title: `${anniversary.name}`,
          });
        }
      }
    }

    const currentAnniversary = getCurrentAnniversary();
    if (currentAnniversary !== null) {
      const upcomingTwoYearAnniversary = currentAnniversary + 2;
      const upcomingAnniversaryDate = new Date(userFirstDate);
      upcomingAnniversaryDate.setFullYear(upcomingAnniversaryDate.getFullYear() + upcomingTwoYearAnniversary);

      const extractedDate = extractDday(upcomingAnniversaryDate);
      Defaultdata.push({
        date: extractedDate,
        name: `${upcomingTwoYearAnniversary}th anniversary`,
      });
    }

    const userAnniversaries = extractedFirebaseData.filter(
      (event) => event.pairId === userID,
    );

    const sortedData = [...Defaultdata, ...userAnniversaries].sort((a, b) => {
      const ddayA = parseInt(a.date.substring(2), 10);
      const ddayB = parseInt(b.date.substring(2), 10);

      return ddayA - ddayB;
    });

    return sortedData;
  };

  const formatDate = () => {
    const month = today.getMonth();
    const day = today.getDate();
    const year = today.getFullYear();

    const formattedDate = `${months[month]} ${day}th, ${year}`;
    return formattedDate;
  };
  const formattedDate = formatDate();

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
      <TouchableOpacity onPress={() => navigation.navigate('TempHome')} style={styles.backButton}>
        <View style={styles.buttonContent}>
          <Image source={require('../../../assets/icons/back-arrow.png')} style={styles.Icon} />
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
            {currUser.user_data.days_together}
            {' '}
            days
          </Animated.Text>
          <Animated.Text
            style={styles.bgtextdate}
          >
            {'\n'}
            {formattedDate}
          </Animated.Text>
        </Animated.Text>
        <FloatingButton />
        <FabandModal fetchData={printEventTitlesAndDates} />
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
            <View style={styles.contents}>
              <FlatList
                data={renderAnniversaries()}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContainer}
                style={styles.ddayTitle}
              />
            </View>
          </View>
        </View>

        <View />
      </Animated.ScrollView>

    </SafeAreaView>
  );
}
export default HomeCalendar;

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
  DdayList: {
    flex: 1,
    flexDirection: 'column',
  },
  annivtitle: {
    fontFamily: 'SF-Pro-Display-Semibold',
    fontSize: 20,
    paddingLeft: 24,
    marginBottom: 18,
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
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    marginTop: 10,
    marginBottom: 10,
  },
  coloredItem: {
    // color: 'rgb(230, 43, 133)',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    marginTop: 10,
    marginBottom: 10,
  },
  coloredItemText: {
    color: 'rgb(230, 43, 133)',
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'space-between',
  },
  ddaydate: {
    fontFamily: 'SF-Pro-Display-Regular',
    fontSize: 16,
  },
  ddayTitle: {
    fontFamily: 'SF-Pro-Display-Regular',
    fontSize: 16,
    paddingLeft: 16,
    paddingRight: 16,
  },
  userBackground: {
    width: '100%',
    height: '100%',
  },
});
