import { createAction, createReducer } from "@reduxjs/toolkit";

export const setAppointments = createAction("SET_APPOINTMENTS");

export const appointmentsInitialState = [];

export const appointmentsReducer = createReducer(
    appointmentsInitialState,{
    [setAppointments]:(state,action)=>action.payload
  }
);
