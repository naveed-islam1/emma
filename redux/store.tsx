// redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "../features/rootSlice"; // Import your root reducer
import { setupListeners } from "@reduxjs/toolkit/query";

import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { userApi } from "../services/userApi";
import { profileApi } from "../services/profileApi";
import { blogApi } from "@/services/blogApi";
import { paymentApi } from "@/services/payment";
import { dashboardApi } from "@/services/dashboardApis";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const makeStore = () =>
  configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware: any) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      })
        .concat(userApi.middleware)
        .concat(profileApi.middleware)
        .concat(blogApi.middleware)
        .concat(paymentApi.middleware)
        .concat(dashboardApi.middleware),
  });

const store = makeStore();
setupListeners(store.dispatch);
const persist = persistStore(store);
export { store, persist };
