import admin from 'firebase-admin';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import serviceAccount from '../../credentials.json';

// directly connect the local development server
// eslint-disable-next-line no-unused-vars
const useEmulator = false;

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const firestore = admin.firestore();

// === User Functions ===
const createUser = async (userData) => {
  const res = await firestore.collection('Users').add(userData);
  return res.id;
};

const getName = async (uid) => {
  const doc = await firestore.collection('Users').doc(uid).get();
  let name;
  if (!doc.exists) {
    console.log('User does not exist');
  } else {
    const data = doc.data();
    name = [data.first_name, data.last_name];
  }
  return name;
};

const updateUser = async (uid, updatedData) => {
  const user = firestore.collection('Users').doc(uid);
  await user.update(updatedData);
  return uid;
};
// === End of User Functions ===

// === Daily Response Functions ===
const getResponseGroup = async (id) => {
  const docRef = firestore.collection('ResponseGroup').doc(id);
  return docRef.get()
    .then((doc) => {
      if (doc.exists) {
        return doc.data();
      } else {
        return null;
      }
    })
    .catch((error) => {
      console.log('error getting doc', error);
      return null;
    });
};

const updateResponseGroup = async (groupId, updatedFields) => {
  const docRef = firestore.collection('ResponseGroup').doc(groupId);
  return docRef.update(updatedFields)
    .then(() => {
      return true;
    })
    .catch((error) => {
      console.error('Error updating response group:', error);
      return false;
    });
};

const addResponseGroup = async (response, id) => {
  firestore.collection('ResponseGroup').doc(id).set(response)
    .then((docRef) => {
      return id;
    })
    .catch((error) => {
      console.error('error adding doc', error);
    });
};

const getResponse = async (id) => {
  const docRef = firestore.collection('Responses').doc(id);
  return docRef.get()
    .then((doc) => {
      if (doc.exists) {
        return doc.data();
      } else {
        return null;
      }
    })
    .catch((error) => {
      return null;
    });
};

const addResponse = async (response, groupId, currentPartner) => {
  const responseWithTimestamp = { ...response, timestamp: firebase.firestore.Timestamp.now() };
  return firestore.collection('Responses').add(responseWithTimestamp)
    .then((docRef) => {
      if (currentPartner === 'p1') {
        updateResponseGroup(
          groupId,
          {
            p1_response_id: docRef.id,
          },
        );
      } else {
        updateResponseGroup(
          groupId,
          {
            p2_response_id: docRef.id,
          },
        );
      }
      return groupId;
    })
    .catch((error) => {
      console.error('error adding doc', error);
      return null;
    });
};

const updateResponse = async (responseId, updatedResponse) => {
  const docRef = firestore.collection('Responses').doc(responseId);
  return docRef.update(updatedResponse)
    .then(() => {
      return true;
    })
    .catch((error) => {
      console.error('Error updating response:', error);
      return false;
    });
};

const deleteResponse = async (responseId) => {
  const docRef = firestore.collection('Responses').doc(responseId);
  return docRef.delete()
    .then(() => {
      return true;
    })
    .catch((error) => {
      console.error('Error deleting response:', error);
      return false;
    });
};
// === End of Daily Response Functions ===

// export function updateDailyQuestionResponse(id, dailyQuestionResponse) {
//   database.ref(`DailyQuestionResponses/${id}`).set(dailyQuestionResponse);
// }

// export function deleteDailyQuestionResponse(id) {
//   database.ref('DailyQuestionResponses').child(id).remove();
// }

// export function addUser(user) {
//   database.ref('Users').push(user);
// }

// export function getUser(id) {
//   database.ref('Users').get(id);
// }

// export function addEvent(event) {
//   database.ref('Events').push(event);
// }

// export function deleteEvent(id) {
//   database.ref('Events').child(id).remove();
// }

// export function updateEvent(id, event) {
//   database.ref(`Events/${id}`).set(event);
// }

// export function addEmotion(emotion) {
//   database.ref('Emotions').push(emotion);
// }

const firestoreService = {
  createUser,
  getName,
  updateUser,
  getResponseGroup,
  updateResponseGroup,
  addResponseGroup,
  getResponse,
  addResponse,
  updateResponse,
  deleteResponse,
};

export default firestoreService;
