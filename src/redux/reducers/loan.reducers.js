import { LoanActionTypes } from "../types/loan.types";
import { combineReducers } from "redux";

const addLoanReducer = (state = {}, action) =>{
    switch(action.type){
        case LoanActionTypes.ADD.REQUEST:
            return {loading: true};
        case LoanActionTypes.ADD.SUCCESS:
            return { loading: false, success : true, response : action.payload};
        case LoanActionTypes.ADD.ERROR:
            return {loading: false, error: action.payload}
        case LoanActionTypes.ADD.RESET:
            return {}
        default:
            return state;
    }
}

const loanCountReducer = (state = { count: null }, action) => {
    switch (action.type) {
      case LoanActionTypes.COUNT.REQUEST:
        return { loading: true };
  
      case LoanActionTypes.COUNT.SUCCESS:
        return { loading: false, count: action.payload };
  
      case LoanActionTypes.COUNT.ERROR:
        return { loading: false, error: action.payload};
  
      case LoanActionTypes.COUNT.RESET:
        return {count : null};
  
      default:
        return state;
    }
  };

const loanListReducer = (state = { list: null }, action) => {
  switch (action.type) {
    case LoanActionTypes.LIST.REQUEST:
      return { loading: true };

    case LoanActionTypes.LIST.SUCCESS:
      return { loading: false, success : true, list: action.payload };

    case LoanActionTypes.LIST.ERROR:
      return { loading: false, error: action.payload};

    case LoanActionTypes.LIST.RESET:
      return {list : null};

    default:
      return state;
  }
};

const loanActivityReducer = (state = {response : null}, action) =>{
  switch (action.type) {
    case LoanActionTypes.ACTIVITY.REQUEST :
      return {loading : true}
    case LoanActionTypes.ACTIVITY.SUCCESS :
      return {success : true, loading:false , response : action.payload}
    case LoanActionTypes.ACTIVITY.ERROR:
      return { loading: false, error: action.payload}
    case LoanActionTypes.LIST.RESET:
      return {response : null};
    default:
      return state;
  }
}
  
  const loanReducers = combineReducers({
      add : addLoanReducer,
      count : loanCountReducer,
      list : loanListReducer,
      activity : loanActivityReducer
  })

  export default loanReducers