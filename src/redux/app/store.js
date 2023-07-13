import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import counterSlice from '../feature/counterSlice/counterSlice'
const persistConfig = {
  key: "root",
  storage,
};
// Remove the non-serializable value from the persisted reducer
const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    counter: counterSlice,
  })
);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializable check for all actions
    }),
});
export const persistor = persistStore(store);