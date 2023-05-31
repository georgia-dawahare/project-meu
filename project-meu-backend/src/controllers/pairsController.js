import firestoreService from '../services/firestore';

const createPair = async (pairData) => {
  const pairId = await firestoreService.createPair(pairData);
  return pairId;
};

const deletePair = async (pairId) => {
  const resBool = await firestoreService.deletePair(pairId);
  return resBool;
};

const getPairCreatorId = async (pairId) => {
  const pairCreatorId = await firestoreService.getPairCreatorId(pairId);
  return pairCreatorId;
};

const getPair = async (pairId) => {
  const pair = await firestoreService.getPair(pairId);
  return pair;
};
const pairController = {
  createPair,
  deletePair,
  getPairCreatorId,
  getPair,
};

export default pairController;
