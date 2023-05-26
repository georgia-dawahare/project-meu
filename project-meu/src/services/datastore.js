/* eslint-disable import/no-extraneous-dependencies */
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const config = {
  apiKey: 'AIzaSyCfm6Jyi-tbKDlq_ugvKL749rb5DwMXlnk',
  authDomain: 'project-meu-b7f6c.firebaseapp.com',
  projectId: 'project-meu-b7f6c',
  storageBucket: 'project-meu-b7f6c.appspot.com',
  messagingSenderId: '329302375805',
  appId: '1:329302375805:web:f2f98d9d87f3257b9a2014',
  measurementId: 'G-GGPP83TZWD',
};

firebase.initializeApp(config);

const firestore = firebase.firestore();

export function getResponseGroup(id) {
  const docRef = firestore.collection('ResponseGroup').doc(id);
  return docRef.get()
    .then((doc) => {
      if (doc.exists) {
        console.log('doc data:', doc.data());
        return doc.data();
      } else {
        console.log('no doc found');
        return null;
      }
    })
    .catch((error) => {
      console.log('error getting doc', error);
      return null;
    });
}
export function updateResponseGroup(groupId, updatedFields) {
  const docRef = firestore.collection('ResponseGroup').doc(groupId);
  return docRef.update(updatedFields)
    .then(() => {
      console.log('Response group updated successfully');
      return true;
    })
    .catch((error) => {
      console.error('Error updating response group:', error);
      return false;
    });
}

export function addResponseGroup(response, id) {
  firestore.collection('ResponseGroup').doc(id).set(response)
    .then((docRef) => {
      console.log('doc written with id:', docRef.id);
    })
    .catch((error) => {
      console.error('error adding doc', error);
    });
}

export function getResponse(id) {
  const docRef = firestore.collection('Responses').doc(id);
  return docRef.get()
    .then((doc) => {
      if (doc.exists) {
        console.log('doc data:', doc.data());
        return doc.data();
      } else {
        console.log('no doc found');
        return null;
      }
    })
    .catch((error) => {
      console.log('error getting doc', error);
      return null;
    });
}

export function addResponse(response) {
  const responseWithTimestamp = { ...response, timestamp: firebase.firestore.Timestamp.now() };
  return firestore.collection('Responses').add(responseWithTimestamp)
    .then((docRef) => {
      console.log('doc written with id:', docRef.id);
      return docRef.id;
    })
    .catch((error) => {
      console.error('error adding doc', error);
      return null;
    });
}

export function updateResponse(responseId, updatedResponse) {
  const docRef = firestore.collection('Responses').doc(responseId);
  return docRef.update(updatedResponse)
    .then(() => {
      console.log('Response updated successfully');
      return true;
    })
    .catch((error) => {
      console.error('Error updating response:', error);
      return false;
    });
}
export function deleteResponse(responseId) {
  const docRef = firestore.collection('Responses').doc(responseId);
  return docRef.delete()
    .then(() => {
      console.log('Response deleted successfully');
      return true;
    })
    .catch((error) => {
      console.error('Error deleting response:', error);
      return false;
    });
}

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

// export function addPair(pair) {
//   database.ref('Pairs').push(pair);
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
