import firestoreService from '../services/firestore';

const createPair = async (pairData) => {
  const pairId = await firestoreService.createPair(pairData);
  return pairId;
};

const deletePair = async (pairId) => {
  const resBool = await firestoreService.deletePair(pairId);
  return resBool;
};

const pairController = {
  createPair,
  deletePair,
};

export default pairController;
