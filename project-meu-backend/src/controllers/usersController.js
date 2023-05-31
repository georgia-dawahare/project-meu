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

const getCity = async (id) => {
  const city = await firestoreService.getCity(id);
  return city;
}

const getBackground = async (id) => {
  const background = await firestoreService.getBackground(id);
  return background;
}

const userController = {
  getName,
  createUser,
  updateUser,
  getUser,
  getCity, 
  getBackground,
};

export default userController;
