import { ActionTypes } from '../actions/PasswordActions';

const initialState = {
  password: '',
};

const PasswordReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case ActionTypes.UPDATE_PASSWORD:
      return { ...state, password: action.payload };
    default:
      return state;
  }
};

export default PasswordReducer;
