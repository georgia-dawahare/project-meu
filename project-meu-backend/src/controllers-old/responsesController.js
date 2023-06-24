import firestoreService from '../services/firestore';

const addResponseGroup = async (response, responseId) => {
  const groupId = await firestoreService.addResponseGroup(response, responseId);
  return groupId;
};

const getResponseGroup = async (id) => {
  const responseGroup = await firestoreService.getResponseGroup(id);
  return responseGroup;
};

const updateResponseGroup = async (groupId, updatedFields) => {
  const resultBool = await firestoreService.updateResponseGroup(groupId, updatedFields);
  return resultBool;
};

const addResponse = async (response, pairId, groupId) => {
  const id = await firestoreService.addResponse(response, pairId, groupId);
  return id;
};

const getResponse = async (id) => {
  const responseData = await firestoreService.getResponse(id);
  return responseData;
};

const updateResponse = async (responseId, updatedResponse) => {
  const resultBool = await firestoreService.updateResponse(responseId, updatedResponse);
  return resultBool;
};

const deleteResponse = async (responseId) => {
  const resultBool = await firestoreService.deleteResponse(responseId);
  return resultBool;
};

const responseController = {
  getResponse,
  getResponseGroup,
  updateResponseGroup,
  addResponse,
  addResponseGroup,
  updateResponse,
  deleteResponse,
};

export default responseController;
