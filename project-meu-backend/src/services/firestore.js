import admin from 'firebase-admin';
import serviceAccount from '../../credentials.json';

// directly connect the local development server
// eslint-disable-next-line no-unused-vars
const useEmulator = false;

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const firestore = admin.firestore();

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

const firestoreService = {
  createUser,
  getName,
  updateUser,
};

export default firestoreService;
