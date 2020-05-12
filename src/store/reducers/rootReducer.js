import { combineReducers } from "redux";
import auth from "./auth";
import user from "./user";
import account from "./account";
import transactions from './transactions';
import stores from './stores';
import report from './report';
import voucherCategory from './voucherCategory';

const rootReducer = combineReducers({
  authReducer: auth,
  userReducer: user,
  accountReducer: account,
  transactionsReducer: transactions,
  storesReducer: stores,
  reportReducer: report,
  voucherCategoryReducer: voucherCategory
});

export default rootReducer;
