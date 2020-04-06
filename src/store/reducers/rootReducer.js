import { combineReducers } from "redux";
import auth from "./auth";
import user from "./user";

const rootReducer = combineReducers({
  authReducer: auth,
  userReducer: user
});

export default rootReducer;
