// /* eslint-disable global-require */
// import React, { useEffect, useState, useCallback } from 'react';
// import {
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   Image,
//   View,
//   RefreshControl,
//   ScrollView,
// } from 'react-native';
// import {
//   Card,
// } from 'react-native-elements';
// import * as Font from 'expo-font';
// // import axios from 'axios';
// import { useSelector, useDispatch } from 'react-redux';
// // import { apiUrl } from '../../constants/constants';
// import TitleHeader from '../../components/TitleHeader';

// import { fetchUserById } from '../../actions/UserActions';
// import { fetchQuestions } from '../../actions/QuestionsActions';
// import { fetchPair } from '../../actions/PairActions';
// import { fetchResponseGroup } from '../../actions/ResponseGroupActions';
// // import { fetchResponseByUserId, fetchResponse } from '../../actions/ResponseActions';

// function CheckinPartnerResponded({ navigation }) {
//   const [fontLoaded, setFontLoaded] = useState(false);
//   const [refreshing, setRefreshing] = useState(false);

//   const dispatch = useDispatch();

//   // userData
//   const user = useSelector((state) => state.userState.userData);
//   const currUserId = user._id;
//   const currUserPairId = user.pairId;
//   console.log('user :      ', user);

//   // partner Data
//   const partner = useSelector((state) => state.partnerState.partnerData);
//   const partnerFirstName = partner.firstName;
//   const partnerId = partner._id;
//   console.log('partnerId  : ', partnerId);

//   // questions Data
//   const questions = useSelector((state) => state.questionsState.questionsData);
//   // console.log('questiosTEST:           ', questionsTest);
//   // for testing
//   const firstQuestion = questions.length > 0 ? questions[0].question : null;
//   // console.log('first Q :       ', firstQuestion);

//   // get reponseGroups of the pair
//   const currUserResponseGroup = useSelector((state) => state.responseGroupState.allResponseGroups);
//   let currQuestionId = '';
//   let latestResponseGroupId = '';
//   let currQuestionresponseId1 = '';
//   let currQuestionresponseId2 = '';
//   if (currUserResponseGroup.length > 0) {
//     const sortedResponseGroup = Object.values(currUserResponseGroup).sort((a, b) => {
//       return parseInt(b.questionId, 10) - parseInt(a.questionId, 10);
//     });

//     const latestResonseGroup = sortedResponseGroup[0];
//     currQuestionId = latestResonseGroup.questionId;
//     latestResponseGroupId = latestResonseGroup._id;
//     currQuestionresponseId1 = latestResonseGroup.responseId1;
//     currQuestionresponseId2 = latestResonseGroup.responseId2;

//     console.log('currQuestionresponseId2', currQuestionresponseId2);
//   }

//   const currQuestion = questions.length > 0 ? questions[currQuestionId].question : null;

//   // response Data
//   const responses = useSelector((state) => state.responseState.allResponses);
//   const LatestCurrUserResponseText = '';
//   const LatestResponseId = '';
//   const LatestResponseTimeStamp = '';
//   const LatestResponseUserId = '';

//   if (responses) {
//     const sortedResponses = Object.values(responses).sort((a, b) => {
//       return new Date(b.createdAt) - new Date(a.createdAt);
//     });

//     const latestResponse = sortedResponses[0];
//     if (latestResponse) {
//       // LatestCurrUserResponseText = latestResponse.response;
//       // LatestResponseId = latestResponse._id;
//       // LatestResponseTimeStamp = latestResponse.createdAt;
//       // LatestResponseUserId = latestResponse.userId;
//       console.log('latestResponseCheckinPartnerREsponded:', latestResponse);
//     }
//   }

//   // fetch responseId1 Response
//   const Id1Response = useSelector((state) => state.responseState.currResponse);
//   let Id1UserId;
//   if (Id1Response) {
//     Id1UserId = Id1Response.userId;
//     // console.log('Id1UserId', Id1UserId);
//   }
//   // console.log('Id1Response', Id1Response);

//   // fetch responseId2 Response //partnerResponse
//   const Id2Response = useSelector((state) => state.responseState.anotherResponse);
//   console.log('Id2Response', Id2Response);
//   let Id2UserId = '';
//   let Id2ResponseText = '';
//   let Id2CreatedAt = '';
//   if (Id2Response) {
//     Id2UserId = Id2Response.userId;
//     Id2ResponseText = Id2Response.response;
//     Id2CreatedAt = Id2Response.createdAt;
//     console.log('Id2UserId', Id2UserId);
//   }
//   console.log('Id2Response', Id2Response);

//   // fetch Data
//   useEffect(() => {
//     async function fetchData() {
//       if (currUserId) {
//         await dispatch(fetchUserById(currUserId));
//         await dispatch(fetchQuestions());
//         await dispatch(fetchPair(currUserId));
//         await dispatch(fetchResponseByUserId(currUserId));
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
//     async function fetchPartnerData() {
//       if (partnerId) {
//         await dispatch(fetchPartnerDataById(partnerId));
//       }
//     }
//     fetchPartnerData();
//   }, [partnerId]);

//   useEffect(() => {
//     async function fetchGroupResponses() {
//       if (currUserPairId) {
//         await dispatch(fetchResponseGroup(currUserPairId));
//       }
//     }
//     fetchGroupResponses();
//     console.log('GroupResponses');
//   }, [currUserPairId]);

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

//   // const getDailyResponses = async (responseGroupData) => {
//   //   let currUserResponse, partnerResponse, p1Date, p2Date;

//   //   // Populate partner responses if they exist

//   //   if (responseGroupData.currUserId) {
//   //     currUserResponse = await getResponse(responseGroupData.currUserId);
//   //   }
//   //   if (responseGroupData.partnerId) {
//   //     partnerResponse = await getResponse(responseGroupData.partnerId);
//   //   }

//   //   if (currUserResponse) {
//   //     const p1Timestamp = currUserResponse.timestamp._seconds * 1000 + Math.floor(currUserResponse.timestamp._nanoseconds / 1000000);
//   //     p1Date = new Date(p1Timestamp);
//   //   }
//   //   if (partnerResponse) {
//   //     const p2Timestamp = partnerResponse.timestamp._seconds * 1000 + Math.floor(partnerResponse.timestamp._nanoseconds / 1000000);
//   //     p2Date = new Date(p2Timestamp);
//   //   }

//   //   // Current user is pair creator
//   //   if (currUserId === currUserResponse?.user_id || partnerId === partnerResponse?.user_id) {
//   //     //  Add user response
//   //     if (currUserResponse) {
//   //       setUserResponse(currUserResponse.response);
//   //       // createResponse(currUserUid, currUserResponse);
//   //       setUserResponseTime(`${p1Date.getHours().toString()}:${p1Date.getMinutes().toString()}`);
//   //     }
//   //     // Add partner response
//   //     if (partnerResponse) {
//   //       const minutes = ((p2Date.getMinutes() < 10 ? '0' : '') + p2Date.getMinutes()).toString();
//   //       setPartnerResponseTime(`${p2Date.getHours().toString()}:${minutes}`);
//   //       setPartnerResponse(partnerResponse.response);
//   //     }
//   //     // Current user is p2
//   //   } else if (currUserId === partnerResponse?.user_id || partnerId === currUserResponse?.user_id) {
//   //     // Add user response
//   //     if (partnerResponse) {
//   //       setUserResponse(partnerResponse.response);
//   //       setUserResponseTime(`${p2Date.getHours().toString()}:${p2Date.getMinutes().toString()}`);
//   //     }
//   //     // Add partner response
//   //     if (currUserResponse) {
//   //       setPartnerResponseTime(`${p1Date.getHours().toString()}:${p1Date.getMinutes().toString()}`);
//   //       setPartnerResponse(currUserResponse.response);
//   //     }
//   //   }
//   // };

//   // const refreshData = async () => {
//   //   if (userDoc && partnerDoc) {
//   //     let responseGroup, responseGroupData, groupId;
//   //     try {
//   //       // Fetch user ID & user doc
//   //       const pairId = userDoc.pair_id;
//   //       groupId = pairId + moment().format('MMDDYY');
//   //       responseGroup = await getResponseGroup(groupId);
//   //     } catch (error) {
//   //       console.error('Error occurred during data refresh:', error);
//   //     }
//   //     try {
//   //       if (groupId) {
//   //       // if there is no response group, create a new one!
//   //         if (responseGroup.status === 202) {
//   //           responseGroup = await createResponseGroup(groupId);
//   //         }

//   //         if (responseGroup) {
//   //           responseGroupData = responseGroup.data;
//   //         } else {
//   //           return;
//   //         }
//   //       }
//   //     } catch (error) {
//   //       console.error('Error occurred during data refresh:', error);
//   //     }

//   //     try {
//   //       if (responseGroupData) {
//   //       // Retrieve couple responses
//   //         await getDailyResponses(responseGroupData);
//   //       }
//   //     } catch (error) {
//   //       console.error('Error occurred during data refresh:', error);
//   //     }
//   //   }
//   // };

//   const displayPartnerResponse = () => {
//     return (
//       <View>
//         <Card containerStyle={styles.cardContainer}>
//           <Text style={styles.cardTitle}>Daily Question</Text>
//           <Text style={styles.cardTitle}>Daily Question ChekcinPartnerResponsededdddddddd</Text>
//           <Card.Title style={styles.question}>{firstQuestion}</Card.Title>
//           <View>
//             <View style={styles.responseHeader}>
//               <Image style={styles.profileImg}
//                 source={require('../../../assets/animations/neutral/neutral_black.gif')}
//               />
//               <View style={styles.partnerNameTxt}>
//                 {/* <Text>{partnerFirstName}</Text> */}
//                 {/* <Text>{partnerResponseTime}</Text> */}
//               </View>
//             </View>
//             {/* <Text style={styles.blurText}>{partnerResponse}</Text> */}
//           </View>
// <View style={styles.seeMoreButtonWrapper}>
//   <TouchableOpacity style={styles.seeMoreButton} onPress={() => navigation.navigate('CheckinBothResponded')}>
//     <Text style={styles.seeMoreButtonTxt}>
//       Answer to see
//     </Text>
//     <Image style={styles.chevronRight}
//       source={require('../../../assets/icons/chevron-right.png')}
//     />
//   </TouchableOpacity>
// </View>
//         </Card>
//       </View>
//     );
//   };

//   if (!fontLoaded) {
//     return <Text>Loading...</Text>;
//   }

//   return (
//     <View style={styles.container}>
//       <TitleHeader title="Check-In" />
//       <ScrollView contentContainerStyle={styles.contentContainer}
//         refreshControl={
//           <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
//           }
//       >
//         {displayPartnerResponse()}
//       </ScrollView>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'space-around',
//   },
//   cardContainer: {
//     borderRadius: 15,
//     padding: 20,
//     marginBottom: 100,
//   },
//   cardTitle: {
//     fontFamily: 'SF-Pro-Display-Medium',
//   },
//   question: {
//     textAlign: 'center',
//     fontSize: 28,
//     fontFamily: 'SF-Pro-Display-Bold',
//     lineHeight: 34,
//     margin: 30,
//   },
//   button: {
//     borderRadius: 15,
//     marginTop: 20,
//     backgroundColor: 'rgba(230, 43, 133, 1)',
//     height: 56,
//     width: 300,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   buttonTxt: {
//     fontFamily: 'SF-Pro-Display-Medium',
//     color: 'white',
//     fontSize: 20,
//     lineHeight: 30,
//   },
//   responseHeader: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   profileImg: {
//     width: 40,
//     height: 80,
//     alignSelf: 'flex-end',
//   },
//   partnerNameTxt: {
//     marginLeft: 10,
//   },
//   blurText: {
//     height: 3,
//     width: '90%',
//     shadowOpacity: 1,
//     shadowColor: '#000',
//     shadowOffset: { width: 10, height: 10 },
//     shadowRadius: 5,
//     elevation: 5,
//     borderWidth: 0.5,
//     borderColor: 'white',
//     backgroundColor: 'rgba(255, 255, 255, 1)',
//     marginBottom: 20,
//   },
//   seeMoreButtonWrapper: {
//     alignSelf: 'flex-end',
//   },
//   seeMoreButton: {
//     backgroundColor: 'rgba(230, 43, 133, 1)',
//     borderRadius: 30,
//     width: 138,
//     height: 36,
//     alignItems: 'center',
//     marginTop: 20,
//     flexDirection: 'row',
//     justifyContent: 'space-evenly',
//   },
//   seeMoreButtonTxt: {
//     fontFamily: 'SF-Pro-Display-Medium',
//     color: 'white',
//     fontSize: 14,
//     lineHeight: 21,
//   },
//   myResponseHeader: {
//     justifyContent: 'flex-end',
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   userNameTxt: {
//     marginRight: 10,
//   },
//   leftText: {
//     textAlign: 'right',
//   },
//   editButton: {
//     marginTop: 10,
//     alignSelf: 'flex-end',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   editImg: {
//     width: 45,
//     height: 45,
//   },
//   viewMoreButtonWrapper: {
//     alignItems: 'center',
//   },
//   responseWrapper: {
//     flex: 1,
//     justifyContent: 'center',
//   },
//   editButtonContainer: {
//     width: 45,
//     height: 45,
//   },
// });

// export default CheckinPartnerResponded;

/* eslint-disable global-require */
import React, { useEffect, useState, useCallback } from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  View,
  RefreshControl,
  ScrollView,
} from 'react-native';
import {
  Card,
} from 'react-native-elements';
import * as Font from 'expo-font';
import { useSelector, useDispatch } from 'react-redux';
import TitleHeader from '../../components/TitleHeader';

import { fetchUserById } from '../../actions/UserActions';
import { fetchQuestions } from '../../actions/QuestionsActions';
import { fetchResponseByUserId, fetchResponse, fetchResponse2 } from '../../actions/ResponseActions';
import { fetchPair } from '../../actions/PairActions';
import { updateResponseGroup } from '../../actions/ResponseGroupActions';

function CheckinPartnerResponded({ navigation }) {
  const [fontLoaded, setFontLoaded] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const dispatch = useDispatch();

  // check if it's within 24hrs
  const isResponseWithin24Hours = (responseCreatedAt) => {
    const twentyFourHoursAgo = new Date();
    twentyFourHoursAgo.setDate(twentyFourHoursAgo.getDate() - 1);
    return new Date(responseCreatedAt) >= twentyFourHoursAgo;
  };

  // userData
  const user = useSelector((state) => state.userState.userData);
  const currUserId = user._id;
  const currUserFirstName = user.firstName;

  // partner Data
  const partner = useSelector((state) => state.partnerState.partnerData);
  const partnerFirstName = partner.firstName;
  const partnerId = partner._id;
  console.log('partnerId  : ', partnerId);

  // questions Data
  const questions = useSelector((state) => state.questionsState.questionsData);

  // get reponseGroups of the pair
  const currUserResponseGroup = useSelector((state) => state.responseGroupState.allResponseGroups);
  let currQuestionId = '';
  let latestResponseGroupId = '';
  let currQuestionresponseId1 = '';
  let currQuestionresponseId2 = '';
  if (currUserResponseGroup.length > 0) {
    const sortedResponseGroup = Object.values(currUserResponseGroup).sort((a, b) => {
      return parseInt(b.questionId, 10) - parseInt(a.questionId, 10);
    });

    const latestResonseGroup = sortedResponseGroup[0];
    currQuestionId = latestResonseGroup.questionId;
    latestResponseGroupId = latestResonseGroup._id;
    currQuestionresponseId1 = latestResonseGroup.responseId1;
    currQuestionresponseId2 = latestResonseGroup.responseId2;

    console.log('currQuestionresponseId2', currQuestionresponseId2);
  }

  const currQuestion = questions.length > 0 ? questions[currQuestionId].question : null;

  // response Data
  const responses = useSelector((state) => state.responseState.allResponses);
  let LatestCurrUserResponseText = '';
  let LatestResponseId = '';
  let LatestResponseTimeStamp = '';
  let LatestResponseUserId = '';

  if (responses) {
    const sortedResponses = Object.values(responses).sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    const latestResponse = sortedResponses[0];
    if (latestResponse) {
      LatestCurrUserResponseText = latestResponse.response;
      LatestResponseId = latestResponse._id;
      LatestResponseTimeStamp = latestResponse.createdAt;
      LatestResponseUserId = latestResponse.userId;
    }
  }

  // fetch responseId1 Response
  const Id1Response = useSelector((state) => state.responseState.currResponse);
  let Id1UserId,
    Id1CreatedAt;
  let Id1ResponseText = '';
  if (Id1Response) {
    Id1UserId = Id1Response.userId;
    Id1CreatedAt = Id1Response.createdAt;
    Id1ResponseText = Id1Response.Id1Response;
    // console.log('Id1UserId', Id1UserId);
  }
  // console.log('Id1Response', Id1Response);

  // fetch responseId2 Response //partnerResponse
  const Id2Response = useSelector((state) => state.responseState.anotherResponse);
  console.log('Id2Response', Id2Response);
  let Id2UserId = '';
  let Id2ResponseText = '';
  if (Id2Response && isResponseWithin24Hours(Id2Response.createdAt)) {
    Id2UserId = Id2Response.userId;
    Id2ResponseText = Id2Response.response;
    // const Id2CreatedAt = Id2Response.createdAt;
    console.log('Id2UserId', Id2UserId);
  }
  console.log('Id2Response', Id2Response);

  // 24hr check
  // const Id2ResponseCheck = isResponseWithin24Hours(Id2CreatedAt);
  // const Id1ResponseCheck = isResponseWithin24Hours(Id1CreatedAt);

  // fetch Data
  useEffect(() => {
    async function fetchData() {
      if (currUserId) {
        await dispatch(fetchUserById(currUserId));
        await dispatch(fetchQuestions());
        await dispatch(fetchPair(currUserId));
        await dispatch(fetchResponseByUserId(currUserId));
      }
    }
    fetchData();
  }, [currUserId]);

  useEffect(() => {
    async function updateResponseGroupData() {
      if (!currQuestionresponseId1 && !currQuestionresponseId2) {
        await dispatch(updateResponseGroup(latestResponseGroupId, {
          responseId1: LatestResponseId,
        }));
      } else if (currQuestionresponseId1 && !currQuestionresponseId2 && LatestResponseUserId === Id1Response) {
        await dispatch(updateResponseGroup(latestResponseGroupId, {
          responseId1: LatestResponseId,
        }));
      } else if (currQuestionresponseId1 && !currQuestionresponseId2 && LatestResponseUserId !== Id1Response) {
        await dispatch(updateResponseGroup(latestResponseGroupId, {
          responseId2: LatestResponseId,
        }));
      } else if (!currQuestionresponseId1 && currQuestionresponseId2 && LatestResponseUserId === Id2Response) {
        await dispatch(updateResponseGroup(latestResponseGroupId, {
          responseId2: LatestResponseId,
        }));
      } else if (!currQuestionresponseId1 && currQuestionresponseId2 && LatestResponseUserId !== Id2Response) {
        await dispatch(updateResponseGroup(latestResponseGroupId, {
          responseId1: LatestResponseId,
        }));
      } else if (currQuestionresponseId1 && currQuestionresponseId2 && LatestResponseUserId === Id1Response) {
        await dispatch(updateResponseGroup(latestResponseGroupId, {
          responseId1: LatestResponseId,
        }));
      } else if (currQuestionresponseId1 && currQuestionresponseId2 && LatestResponseUserId !== Id1Response) {
        if (LatestResponseUserId === Id2Response) {
          await dispatch(updateResponseGroup(latestResponseGroupId, {
            responseId2: LatestResponseId,
          }));
        }
      } else {
        console.log('failed to updating Response Group in CheckinUserResponded');
      }
    }
    updateResponseGroupData();
  }, [latestResponseGroupId, LatestResponseId, Id1UserId]);

  useEffect(() => {
    async function fetchId1Response() {
      if (currQuestionresponseId1) {
        await dispatch(fetchResponse(currQuestionresponseId1));
      }
    }
    fetchId1Response();
  }, [currQuestionresponseId1]);

  useEffect(() => {
    async function fetchId2Response() {
      if (currQuestionresponseId2) {
        await dispatch(fetchResponse2(currQuestionresponseId2));
      }
    }
    fetchId2Response();
  }, [currQuestionresponseId2]);

  // fetch Font
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

  // scrollable page refresh 0.5s
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 500);
  }, []);

  // reformatting Timestamp
  const TimeFormat = async (TimeStamp) => {
    const createdAtValue = new Date(TimeStamp);
    const userTimezoneOffset = -5 * 60; // EST TomeZone:  UTC-5
    const userCreatedAt = new Date(createdAtValue.getTime() + userTimezoneOffset * 60 * 1000);

    // Need to be fixed. Temporary EST Time zone
    const formattedUserCreatedAt = userCreatedAt.toLocaleString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
      timeZone: 'America/New_York',
    });
    // console.log('Formatted User Created At (EST):', formattedUserCreatedAt);

    return formattedUserCreatedAt;
  };

  // const PartnerFormattedTimeStamp = TimeFormat(Id2CreatedAt)._j;
  // console.log('CurrFormattedTimeStamp', CurrFormattedTimeStamp);

  // const refreshData = async () => {
  //   if (userDoc && partnerDoc) {
  //     let responseGroup, responseGroupData, groupId;
  //     try {
  //       // Fetch user ID & user doc
  //       const pairId = userDoc.pair_id;
  //       groupId = pairId + moment().format('MMDDYY');
  //       responseGroup = await getResponseGroup(groupId);
  //     } catch (error) {
  //       console.error('Error occurred during data refresh:', error);
  //     }
  //     try {
  //       if (groupId) {
  //       // if there is no response group, create a new one!
  //         if (responseGroup.status === 202) {
  //           responseGroup = await createResponseGroup(groupId);
  //         }

  //         if (responseGroup) {
  //           responseGroupData = responseGroup.data;
  //         } else {
  //           return;
  //         }
  //       }
  //     } catch (error) {
  //       console.error('Error occurred during data refresh:', error);
  //     }

  //     try {
  //       if (responseGroupData) {
  //       // Retrieve couple responses
  //         await getDailyResponses(responseGroupData);
  //       }
  //     } catch (error) {
  //       console.error('Error occurred during data refresh:', error);
  //     }
  //   }
  // };

  const displayPartnerResponse = () => {
    return (
      <View style={styles.responseWrapper}>
        <Card containerStyle={styles.cardContainer}>
          <Text style={styles.cardTitle}>Daily Question</Text>
          <Text style={styles.cardTitle}>Heloooooooo CheckinPartnerResponded</Text>
          <Card.Title style={styles.question}>{currQuestion}</Card.Title>
          <View>
            <View style={styles.responseHeader}>
              <Image style={styles.profileImg}
                source={require('../../../assets/animations/neutral/neutral_black.gif')}
              />
              <View style={styles.partnerNameTxt}>
                <Text>{partnerFirstName}</Text>
                {/* <Text>{PartnerFormattedTimeStamp}</Text> */}
              </View>

            </View>
            <Text>{Id1ResponseText}</Text>
          </View>
          <TouchableOpacity style={styles.editButton} onPress={() => navigation.navigate('CheckinSubmit')}>
            {/* <Image
              style={styles.editButtonContainer}
              source={require('../../../assets/images/editButton.png')}
            /> */}
            <Text style={styles.buttonTxt}>Answer To See</Text>
          </TouchableOpacity>
        </Card>
        <View style={styles.viewMoreButtonWrapper}>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('CheckinSubmit')}>
            <Text style={styles.buttonTxt}>Answer To see</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <TitleHeader title="Check-In" />
      <ScrollView contentContainerStyle={styles.contentContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
      >
        {displayPartnerResponse()}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
  },
  cardContainer: {
    borderRadius: 15,
    padding: 20,
    marginBottom: 100,
  },
  cardTitle: {
    fontFamily: 'SF-Pro-Display-Medium',
  },
  question: {
    textAlign: 'center',
    fontSize: 28,
    fontFamily: 'SF-Pro-Display-Bold',
    lineHeight: 34,
    margin: 30,
  },
  button: {
    borderRadius: 15,
    marginTop: -60,
    backgroundColor: 'rgba(230, 43, 133, 1)',
    height: 56,
    width: 300,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonTxt: {
    fontFamily: 'SF-Pro-Display-Medium',
    color: 'white',
    fontSize: 20,
    lineHeight: 30,
  },
  responseHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImg: {
    width: 40,
    height: 80,
    alignSelf: 'flex-end',
  },
  partnerNameTxt: {
    marginLeft: 10,
  },
  blurText: {
    height: 3,
    width: '90%',
    shadowOpacity: 1,
    shadowColor: '#000',
    shadowOffset: { width: 10, height: 10 },
    shadowRadius: 5,
    elevation: 5,
    borderWidth: 0.5,
    borderColor: 'white',
    backgroundColor: 'rgba(255, 255, 255, 1)',
    marginBottom: 20,
  },
  seeMoreButtonWrapper: {
    alignSelf: 'flex-end',
  },
  seeMoreButton: {
    backgroundColor: 'rgba(230, 43, 133, 1)',
    borderRadius: 30,
    width: 138,
    height: 36,
    alignItems: 'center',
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  seeMoreButtonTxt: {
    fontFamily: 'SF-Pro-Display-Medium',
    color: 'white',
    fontSize: 14,
    lineHeight: 21,
  },
  myResponseHeader: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
    alignItems: 'center',
  },
  userNameTxt: {
    marginRight: 10,
  },
  leftText: {
    textAlign: 'right',
  },
  editButton: {
    marginTop: 10,
    alignSelf: 'flex-end',
    alignItems: 'center',
    justifyContent: 'center',
  },
  editImg: {
    width: 45,
    height: 45,
  },
  viewMoreButtonWrapper: {
    alignItems: 'center',
  },
  responseWrapper: {
    flex: 1,
    justifyContent: 'center',
  },
  editButtonContainer: {
    width: 45,
    height: 45,
  },
});

export default CheckinPartnerResponded;
