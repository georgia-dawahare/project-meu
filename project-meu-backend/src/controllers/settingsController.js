import firestoreService from '../services/firestore';

const getBirthday = async (uid) => {
  const birthday = await firestoreService.getBirthday(uid);
  return birthday;
};

const updateBirthday = async (uid, newBirthday) => {
  const birthday = await firestoreService.updateBirthday(uid, newBirthday);
  return birthday;
};


const settingsController = {
    getBirthday,
    updateBirthday,
};

export default settingsController;
