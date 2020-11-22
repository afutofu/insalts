import { combineReducers } from "redux";

import authReducer from "./auth";
import saltReducer from "./salt";
import postReducer from "./post";
import modalReducer from "./modal";

const allReducers = combineReducers({
  auth: authReducer,
  salt: saltReducer,
  post: postReducer,
  modal: modalReducer,
});

export default allReducers;
