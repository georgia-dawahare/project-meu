// eslint-disable-next-line import/no-unresolved
import { Timestamp } from 'firebase-admin/firestore';
import admin from 'firebase-admin';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
// import serviceAccount from '/etc/secrets/credentials.json';
import serviceAccount from '../../credentials.json'

// directly connect the local development server
// eslint-disable-next-line no-unused-vars
const useEmulator = false;

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const firestore = admin.firestore();

// === User Functions ===

// // get user's location data
// const getLocData = async (uid) => {
//   const doc = await firestore.collection('Users').doc(uid).get();
//   let city;
//   let country_code;
//   if (!doc.exists) {
//     console.log('User does not exist');
//   } else {
//     const data = doc.data();
//     city = data.city;
//     country_code = data.country_code;
//     console.log('country code is')
//   }
//   return [city, country_code];
// };

// // get user's background img url
// const getBackground = async (uid) => {
//   const doc = await firestore.collection('Users').doc(uid).get();
//   let background;
//   if (!doc.exists) {
//     console.log('User does not exist');
//   } else {
//     const data = doc.data();
//     background = data.background_photo;
//   }
//   return background;
// };

// const createUser = async (userData) => {
//   const { userId } = userData;
//   const user = {
//     pair_id: userData.pairId,
//     first_name: userData.firstName,
//     last_name: userData.lastName,
//     email: userData.email,
//     penguin_color: userData.penguinColor,
//     background_photo: userData.backgroundPhoto,
//     birthday: userData.birthday,
//     user_last_emotion: userData.user_last_emotion,
//     partner_last_emotion: userData.partner_last_emotion,
//     code: userData.code,
//     city: userData.city,
//   };
//   await firestore.collection('Users').doc(userId).set(user);
//   return userId;
// };

// const getName = async (uid) => {
//   const doc = await firestore.collection('Users').doc(uid).get();
//   let name;
//   if (!doc.exists) {
//     console.log('User does not exist');
//   } else {
//     const data = doc.data();
//     name = [data.first_name, data.last_name];
//   }
//   return name;
// };

// const getUserEmotion = async (uid) => {
//   const doc = await firestore.collection('Users').doc(uid).get();
//   let emotion;
//   if (!doc.exists) {
//     console.log('User does not exist');
//   } else {
//     const data = doc.data();
//     emotion = data.user_last_emotion;
//   }
//   return emotion;
// };

// const getUser = async (uid) => {
//   const doc = await firestore.collection('Users').doc(uid).get();
//   let user;
//   if (!doc.exists) {
//     console.log('User does not exist');
//   } else {
//     user = doc.data();
//   }
//   return user;
// };

// const updateUser = async (uid, updatedData) => {
//   try {
//     const user = firestore.collection('Users').doc(uid);
//     await user.update(updatedData);
//   } catch (e) {
//     console.log("Failed user update: ", e);
//   }
//   return uid;
// };

// // get the user's partner's last sent emotion
// const getPartnerEmotion = async (uid) => {
//   const doc = await firestore.collection('Users').doc(uid).get();
//   let emotion;
//   if (!doc.exists) {
//     console.log('User does not exist');
//   } else {
//     const data = doc.data();
//     emotion = data.partner_last_emotion;
//   }
//   return emotion;
// };

// === End of User Functions ===

// === Pair Functions ===
// const createPair = async (pairData) => {
//   const pair = {
//     user1_id: pairData.user1Id,
//     user2_id: pairData.user2Id,
//     relationship_start: pairData.relationshipStart,
//     pair_creator_id: pairData.pairCreatorId,
//   };
//   const res = await firestore.collection('Pairs').add(pair);
//   return res.id;
// };

// const deletePair = async (pairId) => {
//   firestore.collection('Pairs').doc(pairId.pid).delete().then(() => {
//     console.log('Pair successfully deleted');
//     return true;
//   })
//     .catch((error) => {
//       console.error('Error removing document: ', error);
//       return false;
//     });
// };

// const getPair = async (pairId) => {
//   let pair;
//   const doc = await firestore.collection('Pairs').doc(pairId.pid).get();
//   if (!doc.exists) {
//     console.log('Pair does not exist');
//   } else {
//     pair = doc.data();
//   }
//   return pair;
// };

// const getPairCreatorId = async (pairId) => {
//   const doc = await firestore.collection('Pairs').doc(pairId).get();
//   let pairCreatorId;
//   if (!doc.exists) {
//     console.log('Pair does not exist');
//   } else {
//     const data = doc.data();
//     pairCreatorId = data.pair_creator_id;
//   }
//   return pairCreatorId;
// };

// // getting the partner's id by just inputing user id
// const getPartnerId = async (uid) => {
//   // first finding the pair ID
//   const doc = await firestore.collection('Users').doc(uid).get();
//   let pairID;
//   if (!doc.exists) {
//     console.log('Pair step 1 does not exist');
//   } else {
//     const data = doc.data();
//     pairID = data.pair_id;
//     console.log('pair id: ' + pairID);
//   }

//   // then finding the partner's id by process of elimination
//   const doc2 = await firestore.collection('Pairs').doc(pairID).get();
//   let partnerID;
//   if (!doc2.exists) {
//     console.log('Pair step 2 does not exist');
//   } else {
//     const data2 = doc2.data();
//     if (data2.user1_id === uid) {
//       partnerID = data2.user2_id;
//     } else {
//       partnerID = data2.user1_id;
//     }
//   }

//   console.log('firestore ' + partnerID);
//   return partnerID;
// };

// // get user's background img url
// const getPairDate = async (uid) => {
//   // first finding the pair ID
//   const doc = await firestore.collection('Users').doc(uid).get();
//   let pairID;
//   if (!doc.exists) {
//     console.log('Pair step 1 does not exist');
//   } else {
//     const data = doc.data();
//     pairID = data.pair_id;
//     console.log('pair id: ' + pairID);
//   }

//   // then finding the partner's id by process of elimination
//   const doc2 = await firestore.collection('Pairs').doc(pairID).get();
//   let pairDate;
//   if (!doc2.exists) {
//     console.log('Pair step 2 does not exist');
//   } else {
//     const data2 = doc2.data();
//     pairDate = data2.relationship_start;
//   }

//   return pairDate;
// };


// const connectPairs = async (userId, userData) => {
//   const userCode = userData.userCode;
//   const relationshipStart = userData.relationshipStart;

//   let partnerId;
//   let matchList = [];
//   firestore.collection("Users").where("code", "==", userCode)
//     .get()
//     .then((querySnapshot) => {
//       querySnapshot.forEach((doc) => {
//         matchList.push(doc.id);
//       });
//       return matchList;
//     })
//     .then((matches) => {
//       if (matches.length === 1) {
//         // If user is entering their partner's code, then their partner must have created the pair
//         partnerId = matches[0]
//         const pairData = {
//           user1Id: partnerId,
//           user2Id: userId,
//           relationshipStart: relationshipStart,
//           pairCreatorId: partnerId,
//         }
//         return createPair(pairData);
//       }
//     })
//     .then((pairId) => {
//       if (pairId) {
//         const userUpdate = {
//           code: userCode,
//           pair_id: pairId
//         }
//         const partnerUpdate = {
//           pair_id: pairId
//         }
//         updateUser(partnerId, partnerUpdate);
//         updateUser(userId, userUpdate);
//       }
//     })
//     .catch((error) => {
//       console.log("Error getting documents: ", error);
//     });
// }

// const updateEmotion = async (updatedEmotion, uid) => {
//   try {
//     const currUser = await getUser(uid);
//     const pid = currUser.pair_id;
//     let partnerId;

//     try {
//       const pair = await getPair({ pid: pid });
//       if (uid === pair.user1_id) {
//         partnerId = pair.user2_id;
//       } else if (uid === pair.user2_id) {
//         partnerId = pair.user1_id;
//       } else {
//         console.log('Unable to find partner');
//       }
//     } catch (e) {
//       console.log('Error retrieving pair: ', e);
//     }

//     try {
//       // update partner's emotion
//       if (partnerId) {
//         const updatedPartnerFields = { partner_last_emotion: updatedEmotion }
//         const partnerRef = firestore.collection('Users').doc(partnerId);
//         partnerRef.update(updatedPartnerFields)
//           .then(() => {
//             console.log("Successfully updated partner's emotion");
//           })
//           .catch((error) => {
//             console.error("Error updating partner's emotion: ", error);
//           });
//       }
//     }
//     catch (e) {
//       console.log('Error updating partner emotion: ', e);
//     }

//     try {
//       // update self emotion
//       const updatedUserFields = {
//         user_last_emotion: updatedEmotion,
//       }
//       const userRef = firestore.collection('Users').doc(uid);
//       userRef.update(updatedUserFields)
//         .then(() => {
//           console.log("Successfully updated partner's emotion");
//           return true;
//         })
//         .catch((error) => {
//           console.error("Error updating partner's emotion: ", error);
//           return false;
//         });
//     } catch (e) {
//       console.log('Error updating user emotion: ', e);
//     }
//   } catch (e) {
//     console.log('Error retrieving user: ', e);
//   }
// };
// === End of Pair Functions ===

// === Events Functions ===
// const createEvent = async (eventData) => {
//   const event = {
//     pair_id: eventData.pairId,
//     date: eventData.date,
//     title: eventData.title,
//     repeat: eventData.repeat,
//   };

//   if (!event.pair_id || !event.date || !event.title || !event.repeat) {
//     console.error('Missing fields');
//     return null;
//   }

//   const res = await firestore.collection('Events').add(event);
//   return res.id;
// };

// const getEvents = async () => {
//   return firestore.collection('Events').get()
//     .then((querySnapshot) => {
//       const events = [];
//       querySnapshot.forEach((doc) => {
//         const eventData = doc.data();
//         events.push({
//           id: doc.id,
//           date: eventData.date,
//           title: eventData.title,
//           repeat: eventData.repeat,
//           pairId: eventData.pair_id,
//         });
//       });
//       return events;
//     })
//     .catch((error) => {
//       console.error('error getting Events', error);
//       return [];
//     });
// };

// const deleteEvent = async (eventId) => {
//   firestore.collection('Events').doc(eventId.id).delete().then(() => {
//     console.log('Event successfully deleted');
//     return true;
//   })
//     .catch((error) => {
//       console.error('Error removing document: ', error);
//       return false;
//     });
// };
// === End of Event Functions ===

// === Daily Response Functions ===
// const addResponseGroup = async (groupData, id) => {
//   const group = {
//     p1_response_id: groupData.p1_response_id,
//     p2_response_id: groupData.p2_response_id,
//     question_id: groupData.question_id,
//   };
//   await firestore.collection('ResponseGroups').doc(id).set(group);
//   return id;
// };

const getResponseGroup = async (id) => {
  const docRef = firestore.collection('ResponseGroups').doc(id);
  return docRef.get()
    .then((doc) => {
      if (doc.exists) {
        console.log('Successfully fetched response group');
        return doc.data();
      } else {
        console.log('Response group does not exist');
        return null;
      }
    })
    .catch((error) => {
      console.log('error getting doc', error);
      return null;
    });
};

const updateResponseGroup = async (groupId, updatedFields) => {
  const docRef = firestore.collection('ResponseGroups').doc(groupId);
  return docRef.update(updatedFields)
    .then(() => {
      console.log('Successfully updated response group');
      return true;
    })
    .catch((error) => {
      console.error('Error updating response group:', error);
      return false;
    });
};


// const addResponse = async (responseData, pairId, groupId) => {
//   const responseObj = {
//     response: responseData.response,
//     timestamp: Timestamp.now(),
//     user_id: responseData.user_id,
//   };

//   let responseId;

//   // Add response to Responses collection
//   return firestore.collection('Responses').add(responseObj)
//     // Find pair creator (P1)
//     .then((docRef) => {
//       responseId = docRef.id;
//       return getPairCreatorId(pairId);
//     })
//     //  Add response ID to Response Group
//     .then((pairCreator) => {
//       if (responseData.user_id === pairCreator) {
//         updateResponseGroup(groupId, { p1_response_id: responseId });
//       } else {
//         updateResponseGroup(groupId, { p2_response_id: responseId });
//       }
//       return responseId;
//     })
//     .catch((error) => {
//       console.error('Error adding response: ', error);
//       return null;
//     });
// };

// const getResponse = async (id) => {
//   const docRef = firestore.collection('Responses').doc(id);
//   return docRef.get()
//     .then((doc) => {
//       if (doc.exists) {
//         console.log('Successfully fetched response');
//         return doc.data();
//       } else {
//         console.log('Response does not exist');
//         return null;
//       }
//     })
//     .catch((error) => {
//       console.error('error finding doc', error);
//       return null;
//     });
// };

// const updateResponse = async (responseId, updatedResponse) => {
//   const docRef = firestore.collection('Responses').doc(responseId);
//   return docRef.update(updatedResponse)
//     .then(() => {
//       console.log('Successfully updated response');
//       return true;
//     })
//     .catch((error) => {
//       console.error('Error updating response:', error);
//       return false;
//     });
// };

// const deleteResponse = async (responseId) => {
//   const docRef = firestore.collection('Responses').doc(responseId);
//   return docRef.delete()
//     .then(() => {
//       console.log('Successfully deleted response');
//       return true;
//     })
//     .catch((error) => {
//       console.error('Error deleting response:', error);
//       return false;
//     });
// };
// === End of Daily Response Functions ===


// === Starting User Requests for Widgets === 


const firestoreService = {
  createUser,
  getName,
  getUser,
  getUserEmotion,
  getPartnerEmotion,
  getUserPenguinColor,
  updateUser,
  getResponseGroup,
  updateResponseGroup,
  addResponseGroup,
  getResponse,
  addResponse,
  updateResponse,
  deleteResponse,
  createEvent,
  getEvents,
  deleteEvent,
  updateEmotion,
  createPair,
  getPair,
  deletePair,
  getPairCreatorId,
  getPartnerId,
  getLocData,
  getBackground,
  getPairDate,
  connectPairs,
  getBirthday,
  updateBirthday,
};

export default firestoreService;
