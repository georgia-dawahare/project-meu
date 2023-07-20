import axios from 'axios';
import { apiUrl } from '../constants/constants';

// keys for actiontypes
export const ActionTypes = {
  UPDATE_PARTNER: 'UPDATE_PARTNER',
  FETCH_PARTNER: 'FETCH_PARTNER',
};

// Get partner ID using current user ID
export function fetchPartnerId(uid) {
  // axios get
  return (dispatch) => {
    axios.get(`${apiUrl}/pairs/partner/${uid}`)
      .then((response) => {
        dispatch({ type: ActionTypes.UPDATE_PARTNER, payload: response.data });
      }).catch((error) => {
        console.log('error fetching partner ID: ', error);
      });
  };
}

// Fetch partner by partner ID
export function fetchPartnerById(uid) {
  return (dispatch) => {
    axios.get(`${apiUrl}/users/${uid}`)
      .then((response) => {
        dispatch({ type: ActionTypes.FETCH_PARTNER, payload: response.data });
      }).catch((error) => {
        console.log('error fetching partner: ', error);
      });
  };
}

// Update partner
export function updatePartner(partnerData) {
  return (dispatch) => {
    dispatch({ type: ActionTypes.UPDATE_PARTNER, payload: partnerData });
  };
}
