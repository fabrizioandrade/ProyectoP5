import { createAction, createReducer } from "@reduxjs/toolkit";


export const setUser = createAction("SET_USER");


export const UserinitialState = {
    name: null,
    email: null,
    password: null,
    phone: null,
    role: null,
  };

export const userReducer=createReducer(UserinitialState,{
    [setUser]:(state,action)=>action.payload
})
