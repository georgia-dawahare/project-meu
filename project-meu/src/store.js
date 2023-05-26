import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers';

// this creates the store with the reducers
const store = configureStore({
  reducer: rootReducer,
});

export default store;
