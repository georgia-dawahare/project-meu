import axios from 'axios';

import { apiUrl } from '../constants/constants';

export const ActionTypes = {
  FETCH_EVENTS: 'FETCH_EVENTS',
};

// Create new event
export function createEvent(eventData) {
  // axios post
  return (dispatch) => {
    axios.post(`${apiUrl}/events`, eventData)
      .then((response) => {
        dispatch({ type: ActionTypes.UPDATE_EVENT, payload: response.data });
        console.log('Successfully created event');
      }).catch((error) => {
        // Need to add error actions
        console.log('error creating event: ', error);
      });
  };
}

// Get all events
export function fetchEvents() {
// axios get
  return (dispatch) => {
    axios.get(`${apiUrl}/events/`)
      .then((response) => {
        dispatch({ type: ActionTypes.FETCH_EVENTS, payload: response.data });
      }).catch((error) => {
        console.log('error fetching events: ', error);
      });
  };
}

// Delete event
export function deleteEvent(eventId) {
  // axios delete
  return () => {
    axios.delete(`${apiUrl}/events/${eventId}`)
      .then(() => {
        console.log('Successfully deleted event');
      }).catch((error) => {
        // Need to add error actions
        console.log('error deleting event: ', error);
      });
  };
}
