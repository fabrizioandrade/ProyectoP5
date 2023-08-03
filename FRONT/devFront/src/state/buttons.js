import { createAction, createReducer } from "@reduxjs/toolkit";

export const setButtons = createAction("SET_BUTTONS");

export const buttonsInitialState = null

export const buttonsReducer = createReducer(
    buttonsInitialState,{
    [setButtons]:(state,action)=>action.payload
  }
);