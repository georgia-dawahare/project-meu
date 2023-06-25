import axios from 'axios';

import { apiUrl } from '../constants/constants';

// keys for actiontypes
export const ActionTypes = {
  FETCH_RESPONSES: 'FETCH_RESPONSES',
  FETCH_RESPONSE: 'FETCH_RESPONSE',
};

// Fetch all responses for a user
// TODO

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
export function updateResponse(responseId, updatedFields) {
  // axios patch
  return () => {
    axios.patch(`${apiUrl}/responses/${responseId}`, updatedFields)
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
