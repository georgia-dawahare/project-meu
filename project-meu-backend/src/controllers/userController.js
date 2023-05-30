import firestoreService from '../services/firestore';

const getName = async (uid) => {
  const name = await firestoreService.getName(uid);
  return name;
};

const createUser = async (userData) => {
  const uid = await firestoreService.createUser(userData);
  return uid;
};

const updateUser = async (id, updatedData) => {
  const uid = await firestoreService.updateUser(id, updatedData);
  return uid;
};

const userController = {
  getName,
  createUser,
  updateUser,
};

export default userController;