import { configureStore, combineReducers } from "@reduxjs/toolkit";
import createAsyncStorage from 'redux-persist-react-native-async-storage';
// import cartReducer from "./cartRedux";
import userReducer from "./userRedux";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
  import AsyncStorage from '@react-native-async-storage/async-storage';
  const persistConfig = {
    key: "root",
    storage:AsyncStorage,
  };

  const rootReducer = combineReducers({ user: userReducer});

  const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer, 
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(store);

