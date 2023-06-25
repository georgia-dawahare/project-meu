import axios from 'axios';

import { apiUrl } from '../constants/constants';

// keys for actiontypes
export const ActionTypes = {
  UPDATE_USER: 'UPDATE_USER',
  FETCH_USER: 'FETCH_USER',
};

// Create new user
export function createUser(userData) {
  // axios post
  return (dispatch) => {
    axios.post(`${apiUrl}/users/`, userData)
      .then((response) => {
        dispatch({ type: ActionTypes.UPDATE_USER, payload: response.data });
        console.log('Successfully created user');
      }).catch((error) => {
        // Need to add error actions
        console.log('error creating user: ', error);
      });
  };
}

// Fetch logged in user
export function fetchCurrentUser(uid) {
  return (dispatch) => {
    axios.get(`${apiUrl}/users/${uid}`)
      .then((response) => {
        dispatch({ type: ActionTypes.FETCH_USER, payload: response.data });
      }).catch((error) => {
        console.log('error fetching user: ', error);
      });
  };
}

// Get partner ID
export function fetchPartnerId(uid) {
  // axios get
  return (dispatch) => {
    axios.get(`${apiUrl}/pairs/partner/${uid}`)
      .then((response) => {
        dispatch({ type: ActionTypes.UPDATE_USER, payload: response.data });
      }).catch((error) => {
        console.log('error fetching partner ID: ', error);
      });
  };
}

// Update user
export function updateUser(uid, updatedFields) {
  // axios patch
  return (dispatch) => {
    axios.patch(`${apiUrl}/users/${uid}`, updatedFields)
      .then((response) => {
        dispatch({ type: ActionTypes.UPDATE_USER, payload: response.data });
        console.log('Successfully updated user');
      }).catch((error) => {
        // Need to add error actions
        console.log('error updating user: ', error);
      });
  };
}

// Delete user
export function deleteUser(uid) {
  // axios delete
  return () => {
    axios.delete(`${apiUrl}/users/${uid}`)
      .then(() => {
        console.log('Successfully deleted user');
      }).catch((error) => {
        // Need to add error actions
        console.log('error deleting user: ', error);
      });
  };
}
