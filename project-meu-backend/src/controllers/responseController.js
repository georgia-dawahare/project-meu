import firestoreService from '../services/firestore';

const addResponse = async (response, groupIdName, currentPartner) => {
  const groupId = await firestoreService.addResponse(response, groupIdName, currentPartner);
  return groupId;
};

const addResponseGroup = async (response, pairId) => {
  const groupId = await firestoreService.addResponseGroup(response, pairId);
  return groupId;
};

const responseController = {
  addResponse,
  addResponseGroup,
};

export default responseController;
