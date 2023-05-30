import firestoreService from '../services/firestore';

const createUser = async (userData) => {
  const uid = await firestoreService.createUser(userData);
  return uid;
};

const getName = async (uid) => {
  const name = await firestoreService.getName(uid);
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

const userController = {
  getName,
  createUser,
  updateUser,
  getUser,
};

export default userController;
