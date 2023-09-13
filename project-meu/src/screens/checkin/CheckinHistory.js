// // import React, { useState } from 'react';
// // import {
// //   View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Image,
// // } from 'react-native';

// /* eslint-disable global-require */
// import React, { useEffect, useState, useCallback } from 'react';
// import {
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   View,
//   RefreshControl,
//   ScrollView,
// } from 'react-native';
// import {
//   Card,
// } from 'react-native-elements';
// import * as Font from 'expo-font';
// import { useSelector, useDispatch } from 'react-redux';
// import TitleHeader from '../../components/TitleHeader';

// import { fetchUserById } from '../../actions/UserActions';
// import { fetchQuestions } from '../../actions/QuestionActions';
// import { fetchPair } from '../../actions/PairActions';
// import { fetchPartner } from '../../actions/PartnerActions';
// import { fetchResponseGroupByPairId } from '../../actions/ResponseGroupActions';
// import { fetchResponseByUserId } from '../../actions/ResponseActions';

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
//   const [fontLoaded, setFontLoaded] = useState(false);
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(1);
//   const [refreshing, setRefreshing] = useState(false);
//   // const [hasCreatedResponse, setHasCreatedResponse] = useState(false);

//   const dispatch = useDispatch();

//   console.log('***** Checkin History **************');
//   const [expandedList, setExpandedList] = useState([]);
//   // userData
//   const user = useSelector((state) => state.userState.userData);
//   const currUserId = user._id;
//   const currUserPairId = user.pairId;
//   // console.log('user :      ', user);

//   // partner Data
//   const partner = useSelector((state) => state.partnerState.partnerData);
//   const partnerId = partner._id;
//   // console.log('partnerId', partnerId);

//   // questions Data
//   const questions = useSelector((state) => state.questionsState.questionsData);

//   // get reponseGroups of the pair
//   const currUserResponseGroup = useSelector((state) => state.responseGroupState.allResponseGroups);
//   let currQuestionId = '';
//   let latestResonseGroup = '';
//   let latestResponseGroupId = '';
//   let currQuestionresponseId1 = '';
//   let currQuestionresponseId2 = '';

//   if (currUserResponseGroup) {
//     const sortedResponseGroup = Object.values(currUserResponseGroup).sort((a, b) => {
//       return parseInt(b.questionId, 10) - parseInt(a.questionId, 10);
//     });
//     if (sortedResponseGroup) {
//       latestResonseGroup = sortedResponseGroup[0];
//     }

//     if (latestResonseGroup) {
//       currQuestionId = latestResonseGroup.questionId; // 11
//       latestResponseGroupId = latestResonseGroup._id;
//       currQuestionresponseId1 = latestResonseGroup.responseId1;
//       currQuestionresponseId2 = latestResonseGroup.responseId2;
//     }
//   // console.log('latestResonseGroup', latestResonseGroup);
//   }

//   const currQuestion = questions.length > 0 ? questions[currQuestionId] : null;
//   let currQuestionText = '';
//   if (currQuestion) {
//     currQuestionText = currQuestion.question;
//   }
//   const nextQuestionId = currQuestionId + 1;

//   // get User's Response
//   // const currUserResponse = useSelector((state) => state.responseState.allResponses);
//   // let latestUserResponse = '';
//   // // const currUserResponseText = '';
//   // let currUserResponseUserId = '';
//   // let currUserResponseCreatedAt = '';
//   // if (currUserResponse) {
//   //   const sortedUserResponse = Object.values(currUserResponse).sort((a, b) => {
//   //     return new Date(b.createdAt) - new Date(a.createdAt);
//   //   });
//   //   latestUserResponse = sortedUserResponse[0];
//   //   if (latestUserResponse) {
//   //     // currUserResponseText = latestUserResponse.response;
//   //     currUserResponseUserId = latestUserResponse.userId;
//   //     currUserResponseCreatedAt = latestUserResponse.createdAt;
//   //   }
//   //   console.log('latestUserResponse', latestUserResponse);
//   //   console.log('currUserResponseId', currUserResponseUserId);
//   // }

//   // get partnerResponse
//   const partnerResponse = useSelector((state) => state.responseState.partnerResponse);
//   let latestPartnerResponse = '';
//   let sortedPartnerResponse = '';
//   let partnerResponseCreatedAt = '';
//   // const partnerResponseText = '';
//   // const partnerResponseId = '';
//   if (partnerResponse.length > 0) {
//     sortedPartnerResponse = Object.values(partnerResponse).sort((a, b) => {
//       return new Date(b.createdAt) - new Date(a.createdAt);
//     });
//     latestPartnerResponse = sortedPartnerResponse[0];
//     // console.log('latestPartnerResponse', latestPartnerResponse);

//     if (latestPartnerResponse) {
//     // partnerResponseText = latestPartnerResponse.response;
//     // partnerResponseId = latestPartnerResponse._id;
//       partnerResponseCreatedAt = latestPartnerResponse.createdAt;
//     }

//   // console.log('partnerResponseId', partnerResponseId);
//   }

//   // fetch responseId1 Response
//   const Id1Response = useSelector((state) => state.responseState.currResponse);
//   let Id1UserId = '';
//   let Id1CreatedAt = '';
//   if (Id1Response && isResponseWithin24Hours(Id1Response.createdAt)) {
//     Id1UserId = Id1Response.userId;
//     Id1CreatedAt = Id1Response.createdAt;
//   // console.log('Id1Response', Id1Response);
//   }

//   // fetch responseId2 Response
//   const Id2Response = useSelector((state) => state.responseState.anotherResponse);
//   let Id2UserId = '';
//   let Id2CreatedAt = '';
//   if (Id2Response && isResponseWithin24Hours(Id2Response.createAt)) {
//     Id2UserId = Id2Response.userId;
//     Id2CreatedAt = Id2Response.createdAt;
//   }
//   // console.log('Id2Response', Id2Response);

//   // fetch Data
//   useEffect(() => {
//     async function fetchData() {
//       if (currUserId) {
//         dispatch(fetchUserById(currUserId));
//         dispatch(fetchQuestions());
//         dispatch(fetchPartner(currUserId));
//         dispatch(fetchResponseByUserId(currUserId));
//       }
//     }
//     fetchData();
//   }, [currUserId]);

//   useEffect(() => {
//     async function pairData() {
//       if (currUserId) {
//         await dispatch(fetchPair(currUserId));
//       }
//     }
//     pairData();
//   }, [currUserId]);

//   useEffect(() => {
//     async function fetchGroupResponses() {
//       if (currUserPairId) {
//         await dispatch(fetchResponseGroupByPairId(currUserPairId));
//       }
//     }
//     fetchGroupResponses();
//   }, [currUserPairId]);

//   useEffect(() => {
//     async function fetchPartnerResponse() {
//       if (partnerId) {
//         await dispatch(fetchResponseByPartnerId(partnerId));
//       }
//     }
//     fetchPartnerResponse();
//   }, [partnerId]);

//   useEffect(() => {
//     async function fetchId1Response() {
//       if (currQuestionresponseId1) {
//         await dispatch(fetchResponse(currQuestionresponseId1));
//       }
//     }
//     fetchId1Response();
//   }, [currQuestionresponseId1]);

//   useEffect(() => {
//     async function fetchId2Response() {
//       if (currQuestionresponseId2) {
//         await dispatch(fetchResponse2(currQuestionresponseId2));
//       }
//     }
//     fetchId2Response();
//   }, [currQuestionresponseId2]);

//   // Refresh questions everyday
//   useEffect(() => {
//     const updateQuestionOnTime = () => {
//       const currentDate = new Date();
//       if (currentDate.getHours() === 18 && currentDate.getMinutes() === 3) {
//         setCurrentQuestionIndex((prevIndex) => (prevIndex + 1) % questions.length);

//         // by C
//         // dispatch(createResponseGroup(
//         //   currUserPairId,
//         //   nextQuestionId,
//         // ));
//       }

//       const nextDay = new Date(currentDate);
//       nextDay.setDate(currentDate.getDate() + 1);
//       nextDay.setHours(0);
//       nextDay.setMinutes(4);
//       const timeUntilNextUpdate = nextDay - currentDate;
//       setTimeout(updateQuestionOnTime, timeUntilNextUpdate);
//     };

//     updateQuestionOnTime();
//   }, [questions]);

//   // fetch Font
//   useEffect(() => {
//     async function loadFont() {
//       await Font.loadAsync({
//         'SF-Pro-Display-Bold': require('../../../assets/fonts/SF-Pro-Display-Bold.otf'),
//         'SF-Pro-Display-Semibold': require('../../../assets/fonts/SF-Pro-Display-Semibold.otf'),
//         'SF-Pro-Display-Medium': require('../../../assets/fonts/SF-Pro-Display-Medium.otf'),
//       });
//       setFontLoaded(true);
//     }
//     loadFont();
//   }, []);

//   // scrollable page refresh 0.5s
//   const onRefresh = useCallback(() => {
//     setRefreshing(true);
//     setTimeout(() => {
//       setRefreshing(false);
//     }, 500);
//   }, []);

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
//       <View style={styles.Accordcontainer}>
//         {questionsData.map((item, index) => (
//           <View key={index} style={styles.listItem}>
//             <TouchableOpacity style={styles.Accordheader} onPress={() => toggleAccordion(index)}>
//               <Text style={styles.headerText}>
//                 {item.question}
//               </Text>
//             </TouchableOpacity>
//             <View style={styles.space} />
//             {expandedList.includes(index) && (
//               <View style={styles.content}>

//                 <View style={styles.partner1}>
//                   <Image
//                     source={require('../../../assets/images/penguin-checkin.png')}
//                   />
//                   <Text style={styles.contentText}>
//                     {item.partner1}
//                   </Text>
//                 </View>
//                 <View style={styles.partner2}>
//                   <Image
//                     source={require('../../../assets/images/penguin-checkin.png')}
//                   />
//                   <Text style={styles.contentText}>
//                     {item.partner2}
//                   </Text>
//                 </View>

//               </View>
//             )}
//           </View>
//         ))}
//       </View>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   all: {
//     backgroundColor: '#F4F4F4',
//   },
//   containerwhole: {
//     flex: 1,
//   },
//   Accordcontainer: {
//     backgroundColor: '#F4F4F4',
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
//     backgroundColor: '#ff',
//     padding: 10,
//     borderRadius: 15,
//     alignSelf: 'center',
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
//     backgroundColor: '#ffffff',
//     marginBottom: 12,
//     padding: 10,
//     borderRadius: 8,
//   },
//   partner2: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#ffffff',
//     padding: 10,
//     borderRadius: 8,
//   },
//   space: {
//     padding: 10,
//   },
// });

// export default CheckinHistory;

import React from 'react';

function CheckinHistory() {
  return (
    <div>CheckinHistory</div>
  );
}

export default CheckinHistory;
