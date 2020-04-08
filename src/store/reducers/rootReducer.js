import { combineReducers } from "redux";
import auth from "./auth";
import user from "./user";
import account from "./account";
import transactions from './transactions';

const rootReducer = combineReducers({
  authReducer: auth,
  userReducer: user,
  accountReducer: account,
  transactionsReducer: transactions
});

export default rootReducer;
