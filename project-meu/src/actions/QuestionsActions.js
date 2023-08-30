import axios from 'axios';

import { apiUrl } from '../constants/constants';

// keys for actiontypes
export const ActionTypes = {
  FETCH_QUESTIONS: 'FETCH_QUESTIONS',
};

// Fetch response group
// need to be fixed
// export function fetchQuestios(responseGroupId) {
export function fetchQuestions() {
  return (dispatch) => {
    axios.get(`${apiUrl}/questions`)
      .then((response) => {
        dispatch({ type: ActionTypes.FETCH_QUESTIONS, payload: response.data });
      }).catch((error) => {
        console.log('error fetching questions: ', error);
      });
  };
}
