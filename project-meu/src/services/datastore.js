/* eslint-disable import/no-extraneous-dependencies */
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBhEuKwM4tsvp3hQJ6nnh_01f6yGi7YABI',
  authDomain: 'project-meu-11610.firebaseapp.com',
  projectId: 'project-meu-11610',
  storageBucket: 'project-meu-11610.appspot.com',
  messagingSenderId: '245464727418',
  appId: '1:245464727418:web:d547f2962120dceec360c3',
  measurementId: 'G-7FTRQF090W',
};

firebase.initializeApp(firebaseConfig);

const firestore = firebase.firestore();
const auth = firebase.auth();
export { auth };

export function getResponseGroup(id) {
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
}
export function updateResponseGroup(groupId, updatedFields) {
  const docRef = firestore.collection('ResponseGroup').doc(groupId);
  return docRef.update(updatedFields)
    .then(() => {
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
        return doc.data();
      } else {
        return null;
      }
    })
    .catch((error) => {
      return null;
    });
}

export function addResponse(response, groupId, currentPartner) {
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
      return true;
    })
    .catch((error) => {
      console.error('Error deleting response:', error);
      return false;
    });
}
