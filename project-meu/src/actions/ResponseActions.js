import axios from 'axios';

import { apiUrl } from '../constants/constants';

// keys for actiontypes
export const ActionTypes = {
  FETCH_RESPONSES: 'FETCH_RESPONSES',
  FETCH_RESPONSE: 'FETCH_RESPONSE',
  FETCH_RESPONSE_PARTNER: 'FETCH_RESPONSE_PARTNER',
  FETCH_ANOTHER_RESPONSE: 'FETCH_ANOTHER_RESPONSE',
};

// Create responses
export function createResponse(uid, responseData) {
  // axios post
  return () => {
    axios.post(`${apiUrl}/responses/${uid}`, responseData)
      .then(() => {
        console.log('Successfully created response');
      }).catch((error) => {
        // Need to add error actions
        console.log('error creating response: ', error);
      });
  };
}

// Update response
export function updateResponse(responseGroupId, updatedFields) {
  // axios patch
  return () => {
    console.log('updateResponse Actions ResponseGroupId', responseGroupId);
    console.log('updateResponse Action updateFields : ', updatedFields);
    axios.patch(`${apiUrl}/responses/${responseGroupId}`, updatedFields)
      .then(() => {
        console.log('Successfully updated response');
      }).catch((error) => {
        // Need to add error actions
        console.log('error updating response: ', error);
      });
  };
}

// Delete response
export function deleteResponse(responseId) {
  // axios delete
  return () => {
    axios.delete(`${apiUrl}/responses/${responseId}`)
      .then(() => {
        console.log('Successfully deleted response');
      }).catch((error) => {
        // Need to add error actions
        console.log('error deleting response: ', error);
      });
  };
}

// Fetch response
export function fetchResponse(responseId) {
  return (dispatch) => {
    axios.get(`${apiUrl}/responses/${responseId}`)
      .then((response) => {
        dispatch({ type: ActionTypes.FETCH_RESPONSE, payload: response.data });
      }).catch((error) => {
        console.log('error fetching user: ', error);
      });
  };
}

// Fetch response2
export function fetchResponse2(responseId) {
  return (dispatch) => {
    console.log('fetchREsponse2 ResponseAction: ', responseId);
    axios.get(`${apiUrl}/responses/anotherResponse/${responseId}`)
      .then((response) => {
        dispatch({ type: ActionTypes.FETCH_ANOTHER_RESPONSE, payload: response.data });
      }).catch((error) => {
        console.log('error fetching user FetchResponse2: ', error);
      });
  };
}

// fetch responses by userId
export function fetchResponseByUserId(userId) {
  return (dispatch) => {
    axios.get(`${apiUrl}/responses/userId/${userId}`)
      .then((response) => {
        dispatch({ type: ActionTypes.FETCH_RESPONSES, payload: response.data });
      }).catch((error) => {
        console.log('error fetching user: ', error);
      });
  };
}

// fetch response by PartnerId
export function fetchResponseByPartnerId(partnerId) {
  return (dispatch) => {
    axios.get(`${apiUrl}/responses/partnerId/${partnerId}`)
      .then((response) => {
        dispatch({ type: ActionTypes.FETCH_RESPONSE_PARTNER, payload: response.data });
      }).catch((error) => {
        console.log('error fetching partner by partner Id: ', error);
      });
  };
}
