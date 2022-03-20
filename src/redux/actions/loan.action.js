import { LoanActionTypes } from "../types/loan.types";
import { getConfig } from "../config";
import axios from "axios";



const BASE_URL = process.env.REACT_APP_BASE_URL + "/api/loans"


export const addLoan = (values, userId) => async (dispatch, getState) =>{
    try{
        dispatch({
            type : LoanActionTypes.ADD.REQUEST
        })
        let {data} = await axios.post(`${BASE_URL}/add/${userId}`, values, getConfig(getState()) )

        dispatch({
            type : LoanActionTypes.ADD.SUCCESS,
            payload : data
        })
    }catch(error){
        dispatch({
            type : LoanActionTypes.ADD.ERROR,
            payload : 
                error.response && error.response.data.detail
                    ? error.response.data.detail
                    : error.message
        })
    }
}

export const getLoanList = (userId) => async (dispatch, getState) =>{
    try{
        dispatch({
            type : LoanActionTypes.LIST.REQUEST
        })

        let {data} = await axios.get(`${BASE_URL}/${userId}`, getConfig(getState()))

        dispatch({
            type : LoanActionTypes.LIST.SUCCESS,
            payload : data
        })
    }catch(error){
        dispatch({
            type : LoanActionTypes.ADD.ERROR,
            payload : 
                error.response && error.response.data.detail
                    ? error.response.data.detail
                    : error.message
        })
    }
}

export const addLoanActivity = (values, loanId) => async (dispatch, getState) => {
    try{
        dispatch({
            type : LoanActionTypes.ACTIVITY.REQUEST
        })

        let {data} = await axios.post(`${BASE_URL}/add/detail/${loanId}`, values, getConfig(getState()))

        dispatch({
            type : LoanActionTypes.ACTIVITY.SUCCESS,
            payload : data
        })
    }catch(error){
        dispatch({
            type : LoanActionTypes.ADD.ERROR,
            payload : 
                error.response && error.response.data.detail
                    ? error.response.data.detail
                    : error.message
        })
    }
}

export const getLoanDetail = (loanId) => async (dispatch, getState) =>{
    try{
        dispatch({
            type : LoanActionTypes.DETAILS.REQUEST
        })

        let {data} = await axios.get(`${BASE_URL}/detail/${loanId}`, getConfig(getState()))

        dispatch({
            type : LoanActionTypes.DETAILS.SUCCESS,
            payload : data
        })
    }catch(error){
        dispatch({
            type : LoanActionTypes.DETAILS.ERROR,
            payload : 
                error.response && error.response.data.detail
                    ? error.response.data.detail
                    : error.message
        })
    }
}

export const closeTheAccount = (loanId) => async (dispatch, getState) =>{
    try{
        dispatch({
            type : LoanActionTypes.CLOSE.REQUEST
        })

        let {data} = await axios.put(`${BASE_URL}/close/${loanId}`,{loanId}, getConfig(getState()))

        dispatch({
            type : LoanActionTypes.CLOSE.SUCCESS,
            payload : data
        })
    }catch(error){
        dispatch({
            type : LoanActionTypes.CLOSE.ERROR,
            payload : 
                error.response && error.response.data.detail
                    ? error.response.data.detail
                    : error.message
        })
    }
}