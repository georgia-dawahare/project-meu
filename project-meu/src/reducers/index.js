// the starting point for your redux store
// this defines what your store state will look like
import { combineReducers } from '@reduxjs/toolkit';

import UserReducer from './UserReducer';
import PairReducer from './PairReducer';
import ResponseReducer from './ResponseReducer';
import ResponseGroupReducer from './ResponseGroupReducer';
import EventReducer from './EventReducer';
import PasswordReducer from './PasswordReducer';
import PartnerReducer from './PartnerReducer';

const rootReducer = combineReducers({
  userState: UserReducer,
  pairState: PairReducer,
  responseState: ResponseReducer,
  responseGroupState: ResponseGroupReducer,
  eventState: EventReducer,
  passwordState: PasswordReducer,
  partnerState: PartnerReducer,
});

export default rootReducer;
