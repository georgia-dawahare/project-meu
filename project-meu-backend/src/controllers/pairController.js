import firestoreService from '../services/firestore';

const createPair = async (pairData) => {
  const uid = await firestoreService.createPair(pairData);
  return uid;
};

const pairController = {
  createPair,
};

export default pairController;
