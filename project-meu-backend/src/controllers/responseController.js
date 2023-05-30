import firestoreService from '../services/firestore';

const getResponseGroup = async (id) => {
  const responseGroupData = await firestoreService.getResponseGroup(id);
  return responseGroupData;
};

const updateResponseGroup = async (groupId, updatedFields) => {
  const resultBool = await firestoreService.updateResponseGroup(groupId, updatedFields);
  return resultBool;
};

const addResponseGroup = async (response, pairId) => {
  const groupId = await firestoreService.addResponseGroup(response, pairId);
  return groupId;
};

const getResponse = async (id) => {
  const responseData = await firestoreService.getResponse(id);
  return responseData;
};

const addResponse = async (response, groupIdName, currentPartner) => {
  const groupId = await firestoreService.addResponse(response, groupIdName, currentPartner);
  return groupId;
};

const updateResopnse = async (responseId, updatedResponse) => {
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
  updateResopnse,
  deleteResponse,
};

export default responseController;
