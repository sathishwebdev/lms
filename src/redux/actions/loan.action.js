import { LoanActionTypes } from "../types/loan.types";
import { getConfig } from "../config";
import axios from "axios";
import { useSelector } from "react-redux";
import { SatelliteAlt } from "@mui/icons-material";


const BASE_URL = process.env.REACT_APP_BASE_URL + "/api/loans"
// const {user_login : user} = useSelector(state => state.users.login)

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