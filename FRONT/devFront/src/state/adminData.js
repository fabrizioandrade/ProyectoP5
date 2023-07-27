import { createAction, createReducer } from "@reduxjs/toolkit";

export const setAdminData = createAction("SET_ADMIN_DATA");

export const AdminDataInitialState = [];


export const adminDataReducer=createReducer(AdminDataInitialState,{
    [setAdminData]:(state,action)=>action.payload
})
