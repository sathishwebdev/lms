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

const loanDetailReducer = (state = { detail: null }, action) => {
  switch (action.type) {
    case LoanActionTypes.DETAILS.REQUEST:
      return { loading: true };

    case LoanActionTypes.DETAILS.SUCCESS:
      return { loading: false, success : true, detail: action.payload };

    case LoanActionTypes.DETAILS.ERROR:
      return { loading: false, error: action.payload};

    case LoanActionTypes.DETAILS.RESET:
      return {detail : null};

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

const closeTheAccountReducer = (state = {response : null}, action) =>{
  switch (action.type) {
    case LoanActionTypes.CLOSE.REQUEST :
      return {loading : true}
    case LoanActionTypes.CLOSE.SUCCESS :
      return {success : true, loading:false , response : action.payload}
    case LoanActionTypes.CLOSE.ERROR:
      return { loading: false, error: action.payload}
    case LoanActionTypes.CLOSE.RESET:
      return {response : null};
    default:
      return state;
  }
}

const payInterestReducer = (state = {response : null}, action) =>{
  switch (action.type) {
    case LoanActionTypes.INTEREST.REQUEST :
      return {loading : true}
    case LoanActionTypes.INTEREST.SUCCESS :
      return {success : true, loading:false , response : action.payload}
    case LoanActionTypes.INTEREST.ERROR:
      return { loading: false, error: action.payload}
    case LoanActionTypes.INTEREST.RESET:
      return {response : null};
    default:
      return state;
  }
}
  
  const loanReducers = combineReducers({
      add : addLoanReducer,
      count : loanCountReducer,
      list : loanListReducer,
      activity : loanActivityReducer,
      detail : loanDetailReducer,
      close : closeTheAccountReducer,
      payInterest : payInterestReducer
  })

  export default loanReducers