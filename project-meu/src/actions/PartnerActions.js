import axios from 'axios';
import { apiUrl } from '../constants/constants';

// keys for actiontypes
export const ActionTypes = {
  UPDATE_PARTNER: 'UPDATE_PARTNER',
};

// logged in user ID userID -> fetchPartnerId(userID) ->
// Populate partner object in redux -> fetchPartnerById(partner._id) ->
// Populate entire object

// Get partner object using current user ID
export function fetchPartner(uid) {
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

// Fetch partner object by partner ID
export function fetchPartnerById(uid) {
  return (dispatch) => {
    axios.get(`${apiUrl}/users/${uid}`)
      .then((response) => {
        dispatch({ type: ActionTypes.UPDATE_PARTNER, payload: response.data });
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
