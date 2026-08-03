import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import { userApi } from "../services/userApi";
import { profileApi } from "@/services/profileApi";
import { paymentApi } from "@/services/payment";
import { dashboardApi } from "@/services/dashboardApis";
import { emmaApi } from "@/services/emmaApi";

const rootReducer = combineReducers({
  auth: authReducer,
  [userApi.reducerPath]: userApi.reducer,
  [profileApi.reducerPath]: profileApi.reducer,
  [paymentApi.reducerPath]: paymentApi.reducer,
  [dashboardApi.reducerPath]: dashboardApi.reducer,
  [emmaApi.reducerPath]: emmaApi.reducer,
});

export default rootReducer;
