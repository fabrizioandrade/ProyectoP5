import { createAction, createReducer } from "@reduxjs/toolkit";

export const setProperties = createAction("SET_PROPERTIES");

export const propertiesInitialState = [];

export const propertiesReducer = createReducer(
  propertiesInitialState,{
    [setProperties]:(state,action)=>action.payload
  }
);
