import admin from 'firebase-admin';
import serviceAccount from '../../credentials.json';

const useEmulator = false;

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const firestore = admin.firestore();

const createUser = async (id, firstName, lastName, email) => {
    const user = firestore.collection('users').doc(id);
    const data = {
        firstName,
        lastName,
        email
    };
    await user.set(data);
    return id;
};

const getName = async (uid) => {
    const doc = await firestore.collection('users').doc(uid).get();
    const data = doc.data();
    const name = [data.firstName, data.lastName];
    return name;
};

const firestoreService = {
    createUser,
    getName
};

export default firestoreService;
