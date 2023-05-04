import { configureStore } from '@reduxjs/toolkit';
import { jobsReducer } from './reducers/jobs';
import alertReducer  from './reducers/alert';

export const store = configureStore({
  reducer: {
    jobs: jobsReducer,
    alert: alertReducer,
  },
});
