import { configureStore, combineReducers } from "@reduxjs/toolkit";
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
import storage from "redux-persist/lib/storage";
import currencyReducer from "../stateSlice/currency-slice";

// Import your reducers
import productReducer from "../stateSlice/product-slice";
import clickActionReducer from "../stateSlice/clickActionSlice";

// Persist config
const persistConfig = {
  key: "casaqeela",
  version: 1.1,
  storage,
  blacklist: ["product"], // don't persist product slice
};

// Combine reducers
const rootReducer = combineReducers({
  product: productReducer, currency: currencyReducer,
  clickAction: clickActionReducer,
});

// Persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Create persistor
export const persistor = persistStore(store);

// Export the store as default for easier importing
export default store;