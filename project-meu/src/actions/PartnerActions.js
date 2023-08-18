import axios from 'axios';
import { apiUrl } from '../constants/constants';

// keys for actiontypes
export const ActionTypes = {
  FETCH_PARTNER: 'FETCH_PARTNER',
};

// Fetch user by ID
export function fetchPartnerById(uid) {
  return (dispatch) => {
    axios.get(`${apiUrl}/partner/${uid}`)
      .then((response) => {
        dispatch({ type: ActionTypes.FETCH_PARTNER, payload: response.data });
      }).catch((error) => {
        console.log('error fetching partner: ', error);
      });
  };
}
