import { combineReducers } from "redux";
import auth from "./auth";
import user from "./user";
import account from "./account";

const rootReducer = combineReducers({
  authReducer: auth,
  userReducer: user,
  accountReducer: account
});

export default rootReducer;
