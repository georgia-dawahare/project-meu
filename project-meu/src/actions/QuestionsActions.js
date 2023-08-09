import axios from 'axios';

import { apiUrl } from '../constants/constants';

// keys for actiontypes
export const ActionTypes = {
  FETCH_QUESTIONS: 'FETCH_QUESTIONS',
};

// Fetch response group
// need to be fixed
export function fetchQuestios(responseGroupId) {
  return (dispatch) => {
    axios.get(`${apiUrl}/response_groups/${responseGroupId}`)
      .then((response) => {
        dispatch({ type: ActionTypes.FETCH_RESPONSE_GROUP, payload: response.data });
      }).catch((error) => {
        console.log('error fetching user: ', error);
      });
  };
}
