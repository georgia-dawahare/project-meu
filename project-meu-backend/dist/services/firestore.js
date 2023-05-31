"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _firebaseAdmin = _interopRequireDefault(require("firebase-admin"));
var _credentials = _interopRequireDefault(require("../../credentials.json"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// directly connect the local development server
// eslint-disable-next-line no-unused-vars
const useEmulator = false;
_firebaseAdmin.default.initializeApp({
  credential: _firebaseAdmin.default.credential.cert(_credentials.default)
});
const firestore = _firebaseAdmin.default.firestore();
const createUser = async userData => {
  const res = await firestore.collection('Users').add(userData);
  return res.id;
};
const getName = async uid => {
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
  updateUser
};
var _default = firestoreService;
exports.default = _default;