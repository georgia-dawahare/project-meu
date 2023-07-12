// // import React, { useState } from 'react';
// // // import axios from 'axios';
// // import {
// //   View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Image, ScrollView,
// // } from 'react-native';
// // // import { apiUrl } from '../../constants/constants';

// // const questionsData = [
// //   {
// //     question: 'What is your favorite memory of us together?',
// //     type: 'text',
// //     partner1: 'In the Green',
// //     partner2: 'In the libraray',
// //   },
// //   {
// //     question: 'What is your favorite thing about me?',
// //     type: 'text',
// //     partner1: 'Everything',
// //     partner2: 'Your shoulder',
// //   },
// //   {
// //     question: 'What is one thing you\'ve always wanted to tell me, but haven\'t?',
// //     type: 'text',
// //     partner1: 'I love you',
// //     partner2: 'we do not have anything!',
// //   },
// //   {
// //     question: 'What is your favorite place to go on a date?',
// //     type: 'text',
// //     partner1: 'TukTuk',
// //     partner2: 'Boston',
// //   },
// //   {
// //     question: 'What was your first impression of me?',
// //     type: 'text',
// //     partner1: 'Sassy',
// //     partner2: 'Handsome',
// //   },
// //   {
// //     question: 'What is one thing that makes you smile every time you think about it?',
// //     type: 'text',
// //     partner1: 'Your Selfie(My wallpaper!)',
// //     partner2: 'Your silly jokes',
// //   },
// //   {
// //     question: 'What is your favorite thing to do with me?',
// //     type: 'text',
// //     partner1: 'Personality',
// //     partner2: 'Your passion',
// //   },
// // ];

// // function CheckinHistory({ navigation }) {
// //   const [expandedList, setExpandedList] = useState([]);

// //   const toggleAccordion = (index) => {
// //     const expandedIndex = expandedList.indexOf(index);
// //     if (expandedIndex !== -1) {
// //       setExpandedList((prevList) => [...prevList.slice(0, expandedIndex), ...prevList.slice(expandedIndex + 1)]);
// //     } else {
// //       setExpandedList((prevList) => [...prevList, index]);
// //     }
// //   };

// //   return (
// //     <SafeAreaView style={styles.all}>

// //       <View style={styles.header}>
// //         <TouchableOpacity onPress={() => navigation.navigate('Checkin')}>
// //           <Image
// //             source={require('../../../assets/icons/back-arrow.png')}
// //             style={styles.Icon}
// //           />
// //         </TouchableOpacity>
// //         <Text style={styles.topTitle}>Check-in History</Text>
// //       </View>
// //       <ScrollView>
// //         <View style={styles.Accordcontainer}>
// //           {questionsData.map((item, index) => (
// //             <View key={index} style={styles.listItem}>
// //               <TouchableOpacity style={styles.Accordheader} onPress={() => toggleAccordion(index)}>
// //                 <Text style={styles.headerText}>
// //                   {item.question}
// //                 </Text>
// //               </TouchableOpacity>
// //               <View style={styles.space} />
// //               {expandedList.includes(index) && (
// //                 <View style={styles.content}>

// //                   <View style={styles.partner1}>
// //                     <Image
// //                       source={require('../../../assets/images/penguin-checkin.png')}
// //                     />
// //                     <Text style={styles.contentText}>
// //                       {item.partner1}
// //                     </Text>
// //                   </View>
// //                   <View style={styles.partner2}>
// //                     <Image
// //                       source={require('../../../assets/images/penguin-checkin.png')}
// //                     />
// //                     <Text style={styles.contentText}>
// //                       {item.partner2}
// //                     </Text>
// //                   </View>

// //                 </View>
// //               )}
// //             </View>
// //           ))}
// //         </View>
// //       </ScrollView>

// //     </SafeAreaView>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   all: {
// //     backgroundColor: '#ffffff',
// //   },
// //   containerwhole: {
// //     flex: 1,
// //   },
// //   Accordcontainer: {
// //     margin: 10,
// //     marginTop: 20,
// //   },
// //   header: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     paddingHorizontal: 24,
// //     height: 60,
// //   },
// //   Icon: {
// //     height: 24,
// //     marginRight: 8,
// //   },

// //   topTitle: {
// //     fontFamily: 'SF-Pro-Display-Medium',
// //     fontSize: 20,
// //     left: 70,
// //   },
// //   listItem: {
// //     marginBottom: 10,
// //   },

// //   headerText: {
// //     fontFamily: 'SF-Pro-Display-Medium',
// //     fontSize: 16,
// //     textAlign: 'left',
// //     marginLeft: 24,
// //   },
// //   content: {
// //     width: 370,
// //     fontFamily: 'SF-Pro-Display-Regular',
// //     padding: 10,
// //     borderRadius: 12,
// //     alignSelf: 'center',
// //     backgroundColor: '#FFF9ED',
// //   },
// //   contentText: {
// //     marginLeft: 24,
// //   },
// //   Accordheader: {
// //     marginTop: 10,
// //     marginBottom: 10,
// //   },
// //   partner1: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     marginBottom: 12,
// //     padding: 10,
// //     borderRadius: 8,
// //   },
// //   partner2: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     padding: 10,
// //     borderRadius: 8,
// //   },
// //   space: {
// //     padding: 10,
// //   },
// // });

// // export default CheckinHistory;

// import axios, { all } from 'axios';
// import React, { useEffect, useRef, useState } from 'react';
// import {
//   SafeAreaView,
//   StyleSheet,
//   Text,
//   Image,
//   View,
//   Animated,
//   FlatList,
//   TouchableOpacity,
// } from 'react-native';
// import * as Font from 'expo-font';
// // import { useSelector } from 'react-redux';
// import { apiUrl } from '../../constants/constants';
// import auth from '../../services/datastore';

// function CheckinHistory({ navigation }) {
//   const [fontLoaded, setFontLoaded] = useState(false);
//   const [userID, setuserID] = useState('');
//   const [userId, setUserId] = useState('');
//   const [responseData, setResponseData] = useState([]);

//   const [expandedItems, setExpandedItems] = useState([]);

//   const [p1Answer, setP1Answer] = useState('');

//   const scrollY = useRef(new Animated.Value(0)).current;

//   useEffect(() => {
//     const loadFont = async () => {
//       await Font.loadAsync({
//         'SF-Pro-Display-Medium': require('../../../assets/fonts/SF-Pro-Display-Medium.otf'),
//         'SF-Pro-Display-Regular': require('../../../assets/fonts/SF-Pro-Display-Regular.otf'),
//       });

//       setFontLoaded(true);
//     };

//     loadFont();
//   }, []);

//   useEffect(() => {
//     setUserId(auth?.currentUser?.uid);
//   }, [userID]);

//   useEffect(() => {
//     const getUser = async () => {
//       const user = await axios.get(`${apiUrl}/users/${userId}`);
//       const userInfo = user.data;

//       if (userInfo) {
//         setuserID(userInfo.pair_id);
//       }
//     };
//     if (userId) {
//       getUser();
//     }
//   }, [userId]);

//   const getResponse = async () => {
//     try {
//       const allResponses = await axios.get(`${apiUrl}/responses/group/all`);
//       const alldata = allResponses.data;

//       const filteredData = alldata.filter((obj) => obj.id.startsWith(userID)
//         && obj.p1_response_id !== ''
//         && obj.p2_response_id !== '');

//       setResponseData(filteredData);

//       return filteredData;
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   useEffect(() => {
//     getResponse();
//   }, []);

//   // useEffect(() => {
//   //   getAnswer();
//   // }, [getResponse]);

//   // const getAnswer = async (id) => {
//   //   try {
//   //     const p1Answers = await axios.get(`${apiUrl}/responses/${id}`);
//   //     // const p2Answer = await axios.get(`${apiUrl}/responses/${id}`);

//   //     console.log('answer is', p1Answers.data.response);
//   //     setP1Answer(p1Answers.data.response);

//   //     return p1Answers.data;
//   //   } catch (error) {
//   //     console.error(error);
//   //   }
//   // };

//   console.log('RESPONSEDATA :   ', responseData);

//   const toggleItem = (itemId) => {
//     if (expandedItems.includes(itemId)) {
//       setExpandedItems(expandedItems.filter((id) => id !== itemId));
//     } else {
//       setExpandedItems([...expandedItems, itemId]);
//     }
//   };

//   const renderItem = ({ item }) => {
//     const itemStyle = styles.item;
//     // const p1 = item.p1_response_id;
//     // const p2 = item.p2_response_id;
//     const questions = item.question_id;

//     // added
//     const isExpanded = expandedItems.includes(questions);

//     useEffect(() => {
//       const fetchAnswer = async () => {
//         await getAnswer(item.p1_response_id);
//       };

//       fetchAnswer();
//     }, [item.p1_response_id]);

//     const getAnswer = async (id) => {
//       try {
//         const p1Answers = await axios.get(`${apiUrl}/responses/${id}`);
//         // const p2Answer = await axios.get(`${apiUrl}/responses/${id}`);

//         console.log('answer is', p1Answers.data.response);
//         setP1Answer(p1Answers.data.response);

//         return p1Answers.data;
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     return (
//       <View>
//         <TouchableOpacity style={itemStyle} onPress={() => toggleItem(questions)}>
//           <View style={styles.rowContainer}>
//             <Text style={styles.itemText}>
//               {questions}
//             </Text>
//             <Text style={styles.itemText}>
//               {isExpanded ? '-' : '+'}
//             </Text>
//           </View>
//         </TouchableOpacity>
//         {isExpanded && (
//         <View style={styles.expandedContent}>
//           {/* <Text style={styles.itemText}>{item.p1_response_id}</Text> */}
//           <Text style={styles.itemText}>{p1Answer}</Text>
//           <Text style={styles.itemText}>{item.p2_response_id}</Text>
//         </View>
//         )}
//       </View>
//     );
//   };

//   if (!fontLoaded) {
//     return <Text>Loading...</Text>;
//   }

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => navigation.navigate('Checkin')}>
//           <Image
//             source={require('../../../assets/icons/back-arrow.png')}
//             style={styles.Icon}
//           />
//         </TouchableOpacity>

//         <Text style={styles.topTitle}>Check-in History</Text>
//       </View>

//       <Animated.ScrollView
//         scrollEventThrottle={16}
//         onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: false })}
//         style={{
//           flex: 1,
//         }}
//         contentContainerStyle={styles.scrollContent}
//       >
//         <Animated.View
//           style={{
//             width: 390,
//             borderWidth: 3,
//             borderColor: 'white',
//             backgroundColor: 'white',
//             overflow: 'hidden',
//           }}
//         />
//         <View>
//           <View>
//             <View style={styles.contents}>
//               <FlatList
//                 data={responseData}
//                 renderItem={renderItem}
//                 keyExtractor={(item) => item.questions}
//                 contentContainerStyle={styles.listContainer}
//                 style={styles.questions}
//               />
//             </View>
//           </View>

//         </View>

//         <View />
//       </Animated.ScrollView>

//     </SafeAreaView>

//   );
// }
// export default CheckinHistory;

// const styles = StyleSheet.create({
//   backButton: {
//     position: 'absolute',
//     top: 32,
//     left: 16,
//     zIndex: 200,
//   },
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     justifyContent: 'center',
//   },

//   scrollContent: {
//     paddingTop: 32,
//   },
//   ddayItem: {
//     flex: 1,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     paddingRight: 24,
//     marginBottom: 24,
//     paddingLeft: 24,
//   },
//   DdayList: {
//     flex: 1,
//     flexDirection: 'column',
//   },
//   bgtextday: {
//     fontFamily: 'SF-Pro-Display-Semibold',
//     fontSize: 52,
//   },
//   bgtextdate: {
//     fontFamily: 'SF-Pro-Display-Semibold',
//     fontSize: 18,
//     lineHeight: 36,
//   },
//   item: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: 14,
//     marginTop: 10,
//     marginBottom: 10,
//   },

//   coloredItemText: {
//     color: 'rgb(230, 43, 133)',
//   },
//   questions: {
//     fontFamily: 'SF-Pro-Display-Regular',
//     fontSize: 16,
//     paddingLeft: 16,
//     paddingRight: 16,
//   },

//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: 24,
//     paddingTop: 32,
//   },
//   Icon: {
//     height: 24,
//     marginRight: 8,
//   },
//   topTitle: {
//     fontFamily: 'SF-Pro-Display-Medium',
//     fontSize: 20,
//     left: 65,
//   },
//   rowContainer: {
//     flexDirection: 'row',
//   },

// });

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
//     margin: 10,
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

function CheckinHistory({ navigation }) {
  const [fontLoaded, setFontLoaded] = useState(false);
  // const [extractedFirebaseData, setExtractedFirebaseData] = useState([]);
  // const [clickedItem, setClickedItem] = useState(null);
  // const [clickedItemId, setClickedItemId] = useState(null);
  const [userID, setuserID] = useState('');
  const [userId, setUserId] = useState('');
  // const [userFirstDate, setUserFirstDate] = useState('');
  const [responseData, setResponseData] = useState([]);
  // added
  const [expandedItems, setExpandedItems] = useState([]);

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

  const getResponse = async () => {
    try {
      const allResponses = await axios.get(`${apiUrl}/responses/group/all`);

      if (allResponses) {
        console.log('until here works :     ', allResponses.data);
      } else {
        console.log('problematic here');
      }
      const alldata = allResponses.data;
      // console.log('all data :   ', allResponses);

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

  const toggleItem = (itemId) => {
    if (expandedItems.includes(itemId)) {
      setExpandedItems(expandedItems.filter((id) => id !== itemId));
    } else {
      setExpandedItems([...expandedItems, itemId]);
    }
  };

  const renderItem = ({ item }) => {
    const itemStyle = styles.item;
    // const p1 = item.p1_response_id;
    // const p2 = item.p2_response_id;
    const questions = item.question_id;

    // added
    const isExpanded = expandedItems.includes(questions);

    return (
      <View>
        <TouchableOpacity style={itemStyle} onPress={() => toggleItem(questions)}>
          <View style={styles.rowContainer}>
            <Text style={styles.itemText}>
              {questions}
              {/* {item.questions} */}
            </Text>
            <Text style={styles.itemText}>
              {isExpanded ? '-' : '+'}
            </Text>
          </View>
        </TouchableOpacity>
        {isExpanded && (
        <View style={styles.expandedContent}>
          <Text>{item.p1_response_id}</Text>
          <Text>{item.p2_response_id}</Text>
        </View>
        )}
      </View>
    );
  };

  if (!fontLoaded) {
    return <Text>Loading...</Text>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Checkin')}>
          <Image
            source={require('../../../assets/icons/back-arrow.png')}
            style={styles.Icon}
          />
        </TouchableOpacity>

        <Text style={styles.topTitle}>Check-in History</Text>
      </View>

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
            <View style={styles.contents}>
              <FlatList
                data={responseData}
                renderItem={renderItem}
                keyExtractor={(item) => item.questions}
                contentContainerStyle={styles.listContainer}
                style={styles.questions}
              />
            </View>
          </View>

        </View>

        <View />
      </Animated.ScrollView>

    </SafeAreaView>

  );
}
export default CheckinHistory;

const styles = StyleSheet.create({
  backButton: {
    position: 'absolute',
    top: 32,
    left: 16,
    zIndex: 200,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },

  scrollContent: {
    paddingTop: 32,
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

  coloredItemText: {
    color: 'rgb(230, 43, 133)',
  },
  questions: {
    fontFamily: 'SF-Pro-Display-Regular',
    fontSize: 16,
    paddingLeft: 16,
    paddingRight: 16,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 32,
  },
  Icon: {
    height: 24,
    marginRight: 8,
  },
  topTitle: {
    fontFamily: 'SF-Pro-Display-Medium',
    fontSize: 20,
    left: 65,
  },
  rowContainer: {
    flexDirection: 'row',
  },
});
