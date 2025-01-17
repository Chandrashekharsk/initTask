import authReducer from './slices/authSlice.js'; // Import the reducer, not the entire slice
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore } from "redux-persist"; // Correct import for persistStore

// Configuration for redux-persist
const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

// Combine reducers
const rootReducer = combineReducers({
  auth: authReducer, // Use the reducer from the slice
});

// Apply persistence to the root reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the store with middleware for handling redux-persist actions
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Create the persistor
export const persistor = persistStore(store);

// Export the store
export default store;
