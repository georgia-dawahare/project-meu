import firestoreService from '../services/firestore';

const getBirthday = async (uid) => {
  const birthday = await firestoreService.getBirthday(uid);
  return birthday;
};

const updateBirthday = async (uid, newBirthday) => {
  try {
    await firestoreService.updateBirthday(uid, newBirthday);
    console.log(newBirthday);
    console.log('Successfully updated birthday');
    return true;
  } catch (error) {
    console.error('Error updating birthday:', error);
    return false;
  }
};

const settingsController = {
    getBirthday,
    updateBirthday,
};

export default settingsController;
