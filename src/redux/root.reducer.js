import { combineReducers } from "redux";

import snackbarReducer from "./reducers/snackbar.reducers";
import userReducers from "./reducers/user.reducers";

export default combineReducers({
    snackbar: snackbarReducer,
    users : userReducers,
})