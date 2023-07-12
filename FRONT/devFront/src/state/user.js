import { createAction, createReducer } from "@reduxjs/toolkit";

export const setUser = createAction("SET_USER");


export const initialState = {
    name: null,
    email: null,
    password: null,
    phone: null,
    role: null,
  };

export const userReducer=createReducer(initialState,{
    [setUser]:(state,action)=>action.payload
})
