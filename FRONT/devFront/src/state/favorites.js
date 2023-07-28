import { createAction, createReducer } from "@reduxjs/toolkit";

export const setFavorites = createAction("SET_FAVORITES");

export const favoritesInitialState = [];

export const favoritesReducer = createReducer(
    favoritesInitialState,{
    [setFavorites]:(state,action)=>action.payload
  }
);
