import { combineReducers } from "redux";
import loanReducers from "./reducers/loan.reducers";
import snackbarReducer from "./reducers/snackbar.reducers";
import userReducers from "./reducers/user.reducers";

export default combineReducers({
    snackbar: snackbarReducer,
    users : userReducers,
    loans : loanReducers
})