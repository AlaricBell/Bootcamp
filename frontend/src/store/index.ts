import {configureStore} from '@reduxjs/toolkit'
import {reducer as userReducer} from './user/userSlice';

const reducers = {
    user: userReducer,
}

const store = configureStore({
    reducer: reducers,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
})

// required because of Dashboard.test
export const storeWithPreloadedState = (preloadedState: any) => {
    return configureStore({
      preloadedState: preloadedState || {},
      reducer: reducers,
      middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    });
  };
  
  export type RootState = ReturnType<typeof store.getState>; // Eventually this should be removed
  
  export type StoreState = ReturnType<typeof store.getState>;
  export type StoreDispatch = typeof store.dispatch;
  
  export default store;