import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import { env } from '@/config/env.mjs';

const store = configureStore({
  reducer: {
    user: userReducer,
  },
  devTools: env.NEXT_PUBLIC_NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;