import axios from 'axios';

import { apiUrl } from '../constants/constants';

export const ActionTypes = {
  FETCH_PAIR: 'FETCH_PAIR',
  UPDATE_PAIR: 'UPDATE_PAIR',
};

// Connect pair
export function connectPair(uid, pairCode) {
  // axios post
  return (dispatch) => {
    axios.post(`${apiUrl}/pairs/${uid}`, pairCode)
      .then((response) => {
        if (response.data === 'No partner found') {
          console.log(response.data);
        } else {
          dispatch({ type: ActionTypes.UPDATE_PAIR, payload: response.data });
          console.log('Successfully connected pair');
        }
      }).catch((error) => {
        // Need to add error actions
        console.log('error connecting pair: ', error);
      });
  };
}

// Update pair
export function updatePair(pairId, updatedFields) {
  // axios post
  return (dispatch) => {
    axios.patch(`${apiUrl}/pairs/${pairId}`, updatedFields)
      .then((response) => {
        dispatch({ type: ActionTypes.UPDATE_PAIR, payload: response.data });
        console.log('Successfully connected pair');
      }).catch((error) => {
        // Need to add error actions
        console.log('error connecting pair: ', error);
      });
  };
}

// Delete pair
export function deletePair(pairId) {
  // axios delete
  return () => {
    axios.delete(`${apiUrl}/pairs/${pairId}`)
      .then(() => {
        console.log('Successfully deleted pair');
      }).catch((error) => {
        // Need to add error actions
        console.log('error deleting pair: ', error);
      });
  };
}

// Get pair by user ID
export function fetchPair(uid) {
  // axios get
  return (dispatch) => {
    axios.get(`${apiUrl}/pairs/${uid}`)
      .then((response) => {
        if (response) {
          dispatch({ type: ActionTypes.UPDATE_PAIR, payload: response.data });
        } else {
          // Need to add error catching
          console.log(response.data);
        }
      }).catch((error) => {
        console.log('error fetching pair: ', error);
      });
  };
}

// Send emotion
export function sendEmotion(uid, emotion) {
  // axios get
  return () => {
    axios.patch(`${apiUrl}/pairs/emotion/${uid}`, emotion)
      .then(() => {
        console.log('Successfully sent emotion');
      }).catch((error) => {
        console.log('error fetching pair: ', error);
      });
  };
}
