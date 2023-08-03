import { configureStore } from "@reduxjs/toolkit";

import { userReducer } from "./user";
import { propertiesReducer } from "./properties";
import { adminDataReducer } from "./adminData";
import { selectedOptionReducer } from "./selectedOption";
import { appointmentsReducer } from "./appointments";
import { favoritesReducer } from "./favorites";
import { buttonsReducer } from "./buttons";

const store = configureStore({
  reducer: { user: userReducer,properties:propertiesReducer,adminData:adminDataReducer,option:selectedOptionReducer,
  appointments:appointmentsReducer,favorites:favoritesReducer,buttons:buttonsReducer},
});

export default store;
