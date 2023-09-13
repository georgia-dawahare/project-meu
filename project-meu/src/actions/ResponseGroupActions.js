import axios from 'axios';

import { apiUrl } from '../constants/constants';

// keys for actiontypes
export const ActionTypes = {
  FETCH_RESPONSE_GROUPS: 'FETCH_RESPONSE_GROUPS',
  FETCH_RESPONSE_GROUP: 'FETCH_RESPONSE_GROUP',
};

// Create response group
export function createDailyResponseGroup(pairId) {
  // axios post
  return (dispatch) => {
    axios.post(`${apiUrl}/response_groups/${pairId}`)
      .then((response) => {
        dispatch({ type: ActionTypes.FETCH_RESPONSE_GROUP, payload: response.data });
      }).catch((error) => {
      // Need to add error actions
        console.log('error creating response group: ', error);
      });
  };
}

// Update response group
export function updateResponseGroup(responseGroupId, updatedFields) {
  // axios patch
  return () => {
    console.log('responseGroupIdActions', responseGroupId);
    console.log('updatedFieldsActions', updatedFields);
    axios.patch(`${apiUrl}/response_groups/${responseGroupId}`, updatedFields)
      .then(() => {
        console.log('Successfully updated response group');
      }).catch((error) => {
        // Need to add error actions
        console.log('error updating response group: ', error);
      });
  };
}

// Fetch response group by responseGroupId
export function fetchResponseGroup(responseGroupId) {
  return (dispatch) => {
    axios.get(`${apiUrl}/response_groups/${responseGroupId}`)
      .then((response) => {
        dispatch({ type: ActionTypes.FETCH_RESPONSE_GROUP, payload: response.data });
      }).catch((error) => {
        console.log('error fetching user: ', error);
      });
  };
}

// fetch all response groups by pairId
export function fetchResponseGroupByPairId(pairId) {
  return (dispatch) => {
    axios.get(`${apiUrl}/response_groups/pair/${pairId}`)
      .then((response) => {
        dispatch({ type: ActionTypes.FETCH_RESPONSE_GROUPS, payload: response.data });
      }).catch((error) => {
        console.log('error fetching user by Pair Id: ', error);
      });
  };
}
