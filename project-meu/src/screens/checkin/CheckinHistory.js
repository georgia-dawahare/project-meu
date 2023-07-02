// import React, { useState } from 'react';
// // import axios from 'axios';
// import {
//   View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Image, ScrollView,
// } from 'react-native';
// // import { apiUrl } from '../../constants/constants';

// const questionsData = [
//   {
//     question: 'What is your favorite memory of us together?',
//     type: 'text',
//     partner1: 'In the Green',
//     partner2: 'In the libraray',
//   },
//   {
//     question: 'What is your favorite thing about me?',
//     type: 'text',
//     partner1: 'Everything',
//     partner2: 'Your shoulder',
//   },
//   {
//     question: 'What is one thing you\'ve always wanted to tell me, but haven\'t?',
//     type: 'text',
//     partner1: 'I love you',
//     partner2: 'we do not have anything!',
//   },
//   {
//     question: 'What is your favorite place to go on a date?',
//     type: 'text',
//     partner1: 'TukTuk',
//     partner2: 'Boston',
//   },
//   {
//     question: 'What was your first impression of me?',
//     type: 'text',
//     partner1: 'Sassy',
//     partner2: 'Handsome',
//   },
//   {
//     question: 'What is one thing that makes you smile every time you think about it?',
//     type: 'text',
//     partner1: 'Your Selfie(My wallpaper!)',
//     partner2: 'Your silly jokes',
//   },
//   {
//     question: 'What is your favorite thing to do with me?',
//     type: 'text',
//     partner1: 'Personality',
//     partner2: 'Your passion',
//   },
// ];

// function CheckinHistory({ navigation }) {
//   const [expandedList, setExpandedList] = useState([]);

//   const toggleAccordion = (index) => {
//     const expandedIndex = expandedList.indexOf(index);
//     if (expandedIndex !== -1) {
//       setExpandedList((prevList) => [...prevList.slice(0, expandedIndex), ...prevList.slice(expandedIndex + 1)]);
//     } else {
//       setExpandedList((prevList) => [...prevList, index]);
//     }
//   };

//   return (
//     <SafeAreaView style={styles.all}>

//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => navigation.navigate('Checkin')}>
//           <Image
//             source={require('../../../assets/icons/back-arrow.png')}
//             style={styles.Icon}
//           />
//         </TouchableOpacity>
//         <Text style={styles.topTitle}>Check-in History</Text>
//       </View>
//       <ScrollView>
//         <View style={styles.Accordcontainer}>
//           {questionsData.map((item, index) => (
//             <View key={index} style={styles.listItem}>
//               <TouchableOpacity style={styles.Accordheader} onPress={() => toggleAccordion(index)}>
//                 <Text style={styles.headerText}>
//                   {item.question}
//                 </Text>
//               </TouchableOpacity>
//               <View style={styles.space} />
//               {expandedList.includes(index) && (
//                 <View style={styles.content}>

//                   <View style={styles.partner1}>
//                     <Image
//                       source={require('../../../assets/images/penguin-checkin.png')}
//                     />
//                     <Text style={styles.contentText}>
//                       {item.partner1}
//                     </Text>
//                   </View>
//                   <View style={styles.partner2}>
//                     <Image
//                       source={require('../../../assets/images/penguin-checkin.png')}
//                     />
//                     <Text style={styles.contentText}>
//                       {item.partner2}
//                     </Text>
//                   </View>

//                 </View>
//               )}
//             </View>
//           ))}
//         </View>
//       </ScrollView>

//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   all: {
//     backgroundColor: '#ffffff',
//   },
//   containerwhole: {
//     flex: 1,
//   },
//   Accordcontainer: {
//     marginBottom: 10,
//     marginTop: 20,
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: 24,
//     height: 60,
//   },
//   Icon: {
//     height: 24,
//     marginRight: 8,
//   },

//   topTitle: {
//     fontFamily: 'SF-Pro-Display-Medium',
//     fontSize: 20,
//     left: 70,
//   },
//   listItem: {
//     marginBottom: 10,
//   },

//   headerText: {
//     fontFamily: 'SF-Pro-Display-Medium',
//     fontSize: 16,
//     textAlign: 'left',
//     marginLeft: 24,
//   },
//   content: {
//     width: 370,
//     fontFamily: 'SF-Pro-Display-Regular',
//     padding: 10,
//     borderRadius: 12,
//     alignSelf: 'center',
//     backgroundColor: '#FFF9ED',
//   },
//   contentText: {
//     marginLeft: 24,
//   },
//   Accordheader: {
//     marginTop: 10,
//     marginBottom: 10,
//   },
//   partner1: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 12,
//     padding: 10,
//     borderRadius: 8,
//   },
//   partner2: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 10,
//     borderRadius: 8,
//   },
//   space: {
//     padding: 10,
//   },
// });

// export default CheckinHistory;

import axios, { all } from 'axios';
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
} from 'react-native';
import * as Font from 'expo-font';
// import { useSelector } from 'react-redux';
import { apiUrl } from '../../constants/constants';
import auth from '../../services/datastore';
import anniversariesData from '../../../assets/data/anniversaries.json';

function HomeCalendar({ navigation }) {
  const [fontLoaded, setFontLoaded] = useState(false);
  const [extractedFirebaseData, setExtractedFirebaseData] = useState([]);
  const [clickedItem, setClickedItem] = useState(null);
  const [clickedItemId, setClickedItemId] = useState(null);
  const [userID, setuserID] = useState('');
  const [userId, setUserId] = useState('');
  const [userFirstDate, setUserFirstDate] = useState('');
  const [responseData, setResponseData] = useState([]);

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

  // userID is pairID

  const getResponse = async () => {
    try {
      const allResponses = await axios.get(`${apiUrl}/responses/group/all`);
      const alldata = allResponses.data;
      // console.log('all data :   ', alldata);

      const filteredData = alldata.filter((obj) => obj.id.startsWith(userID)
        && obj.p1_response_id !== ''
        && obj.p2_response_id !== '');

      setResponseData(filteredData);

      
      return filteredData;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getResponse();
  }, []);

  console.log('RESPONSEDATA :   ', responseData);

  const renderItem = ({ item }) => {
    const itemStyle = styles.item;
    const p1 = item.p1_response_id;
    const p2 = item.p2_response_id;
    const questions = item.question_id;
    // let dateText = item.date;

    // if (item.date.startsWith('D+') && item.date !== 'D+0') {
    //   return null;
    // } else {
    //   const days = parseInt(item.date.substring(2), 10);
    //   const currentDate = new Date();
    //   const futureDate = new Date(currentDate.getTime() + (days * 24 * 60 * 60 * 1000));
    //   futureDate.setDate(futureDate.getDate() + 1);
    //   const formattedDate = `${futureDate.getMonth() + 1}/${futureDate.getDate()}/${futureDate.getFullYear()}`;
    //   dateText = formattedDate;
    // }

    // const icon = clickedItemId === item.id ? (
    //   <Image source={require('../../../assets/icons/trash.png')} style={styles.icon} />
    // ) : (
    //   <Image source={require('../../../assets/icons/heart.png')} style={styles.icon} />
    // );

    return (
      <TouchableOpacity style={itemStyle}>
        <View style={styles.rowContainer}>
          <Text style={styles.itemText}>
            {questions}
          </Text>
          <Text style={styles.itemText}>
            {p1}
          </Text>
          <Text style={styles.itemText}>
            {p2}
          </Text>
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

  if (!fontLoaded) {
    return <Text>Loading...</Text>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('TempHome')} style={styles.backButton}>
        <View style={styles.buttonContent}>
          <Image source={require('../../../assets/icons/back-arrow.png')} style={styles.Icon} />
        </View>
      </TouchableOpacity>

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
                // data={renderAnniversaries()}
                data={responseData}
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
