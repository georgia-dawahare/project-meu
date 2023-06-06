// the starting point for your redux store
// this defines what your store state will look like
import { combineReducers } from '@reduxjs/toolkit';

import UserReducer from './userReducer';

const rootReducer = combineReducers({
  user: UserReducer,
});

export default rootReducer;
