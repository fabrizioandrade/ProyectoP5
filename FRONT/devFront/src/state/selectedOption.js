import { createAction, createReducer } from "@reduxjs/toolkit";

export const setSelectedOption = createAction("SET_SELECTED_OPTION");

export const selectedOption= 'Propiedades';


export const selectedOptionReducer=createReducer(selectedOption,{
    [setSelectedOption]:(state,action)=>action.payload
})
