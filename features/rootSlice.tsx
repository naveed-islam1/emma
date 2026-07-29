import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import { userApi } from "../services/userApi";
import { profileApi } from "@/services/profileApi";
import { blogApi } from "@/services/blogApi";
import { paymentApi } from "@/services/payment";
import { dashboardApi } from "@/services/dashboardApis";

const rootReducer = combineReducers({
  auth: authReducer,
  [userApi.reducerPath]: userApi.reducer,
  [profileApi.reducerPath]: profileApi.reducer,
  [blogApi.reducerPath]: blogApi.reducer,
  [paymentApi.reducerPath]: paymentApi.reducer,
  [dashboardApi.reducerPath]: dashboardApi.reducer,
});

export default rootReducer;
