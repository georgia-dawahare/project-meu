import { ActionTypes } from '../actions/EventActions';

const initialState = {
  events: {},
};

const EventReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case ActionTypes.FETCH_EVENTS:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default EventReducer;
