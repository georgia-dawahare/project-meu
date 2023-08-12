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

// Fetch user by ID
export function fetchUserById(uid) {
  return (dispatch) => {
    axios.get(`${apiUrl}/users/${uid}`)
      .then((response) => {
        dispatch({ type: ActionTypes.UPDATE_USER, payload: response.data });
      }).catch((error) => {
        console.log('error fetching user: ', error);
      });
  };
}

// Fetch logged in user
export function fetchCurrentUser() {
  return {
    type: ActionTypes.FETCH_USER,
    payload: null,
  };
}

// Fetch user by Firestore uid
export function fetchFirestoreUser(uid) {
  return (dispatch) => {
    axios.get(`${apiUrl}/users/firestore/${uid}`)
      .then((response) => {
        dispatch({ type: ActionTypes.UPDATE_USER, payload: response.data });
      }).catch((error) => {
        console.log('error fetching user: ', error);
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
