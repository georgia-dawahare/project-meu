import firestoreService from '../services/firestore';

const createUser = async (userData) => {
  const uid = await firestoreService.createUser(userData);
  return uid;
};

const getName = async (uid) => {
  const name = await firestoreService.getName(uid);
  return name;
};

const getUserEmotion = async (uid) => {
  const emotion = await firestoreService.getUserEmotion(uid);
  return emotion;
};

const getPartnerEmotion = async (uid) => {
  const partnerEmotion = await firestoreService.getPartnerEmotion(uid);
  return partnerEmotion;
};

const getUserPenguinColor = async (uid) => {
  const name = await firestoreService.getUserPenguinColor(uid);
  return name;
};

const getUser = async (uid) => {
  const user = await firestoreService.getUser(uid);
  return user;
};

const updateUser = async (id, updatedData) => {
  const uid = await firestoreService.updateUser(id, updatedData);
  return uid;
};

const getLocData = async (id) => {
  const data = await firestoreService.getLocData(id);
  return data;
}

const getBackground = async (id) => {
  const background = await firestoreService.getBackground(id);
  return background;
}

const getPartnerId = async (uid) => {
  const partnerID = await firestoreService.getPartnerId(uid);
  console.log('controller', partnerID)
  return partnerID;
}

const getPairDate = async (uid) => {
  const pairDate = await firestoreService.getPairDate(uid);
  console.log('controller', pairDate)
  return pairDate;
}

const connectPairs = async (uid, userData) => {
  const pairId = await firestoreService.connectPairs(uid, userData);
  return pairId;
}

const userController = {
  getName,
  createUser,
  updateUser,
  getUser,
  getPartnerEmotion,
  getUserPenguinColor,
  getLocData,
  getBackground,
  getPartnerId,
  getUserEmotion,
  getPairDate,
  connectPairs
};

export default userController;
