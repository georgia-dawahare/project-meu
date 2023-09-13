import axios from 'axios';

import { apiUrl } from '../constants/constants';

// keys for action types
export const ActionTypes = {
  FETCH_DAILY_QUESTION: 'FETCH_DAILY_QUESTION',
};

export function fetchDailyQuestion(questionId) {
  return (dispatch) => {
    axios.get(`${apiUrl}/questions/${questionId}`)
      .then((response) => {
        dispatch({ type: ActionTypes.FETCH_DAILY_QUESTION, payload: response.data });
      }).catch((error) => {
        console.log('error fetching question: ', error);
      });
  };
}
