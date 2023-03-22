import { combineReducers } from "redux";
import { appReducer } from "./action";

export const combinedReducer = combineReducers({
  app: appReducer
});


