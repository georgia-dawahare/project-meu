import axios from 'axios';

import { apiUrl } from '../constants/constants';

// keys for actiontypes
export const ActionTypes = {
  FETCH_RESPONSE_GROUPS: 'FETCH_RESPONSE_GROUPS',
  FETCH_RESPONSE_GROUP: 'FETCH_RESPONSE_GROUP',
};

// Create response group
// export function createResponseGroup(questionId) {
//   // axios post
//   return () => {
//     axios.post(`${apiUrl}/response_groups/`, questionId)
//       .then(() => {
//         console.log('Successfully created response group');
//       }).catch((error) => {
//         // Need to add error actions
//         console.log('error creating response group: ', error);
//       });
//   };
// }

// Try
// from here
export function createResponseGroup2(pairId, questionId) {
  // axios post

  return () => {
    const body = {
      pair: pairId,
      quesId: questionId,
    };
    axios.post(`${apiUrl}/response_groups/addgroups`, body)
      .then(() => {
        console.log('Successfully created response group');
      }).catch((error) => {
        // Need to add error actions
        console.log('error creating response group: ', error);
      });
  };
}

// try by Soo
// export function createResponseGroup2(questionId, pairId, responseData) {
//   // by GPT
//   // axios post
//   console.log('wehere?1');
//   return axios.post(`${apiUrl}/response_groups/${pairId}/${questionId}`, responseData)
//     .then(() => {
//       console.log('wehere?2');
//       console.log('Successfully created group response');
//       console.log('wehere?3');
//     }).catch((error) => {
//       console.log('error creating response group: ', error);
//       throw error;
//     });
// }

// Update response group
export function updateResponseGroup(responseGroupId, updatedFields) {
  // axios patch
  return () => {
    axios.patch(`${apiUrl}/response_groups/${responseGroupId}`, updatedFields)
      .then(() => {
        console.log('Successfully updated response group');
      }).catch((error) => {
        // Need to add error actions
        console.log('error updating response group: ', error);
      });
  };
}

// Fetch response group
// export function fetchResponseGroup(responseGroupId) {
//   return (dispatch) => {
//     axios.get(`${apiUrl}/response_groups/${responseGroupId}`)
//       .then((response) => {
//         dispatch({ type: ActionTypes.FETCH_RESPONSE_GROUP, payload: response.data });
//       }).catch((error) => {
//         console.log('error fetching user: ', error);
//       });
//   };
// }

// fetch response group bySoo
export function fetchResponseGroup(pairId) {
  return (dispatch) => {
    axios.get(`${apiUrl}/response_groups/${pairId}`)
      .then((response) => {
        dispatch({ type: ActionTypes.FETCH_RESPONSE_GROUP, payload: response.data });
      }).catch((error) => {
        console.log('error fetching user: ', error);
      });
  };
}

// Fetch all response groups for a user
// To do
