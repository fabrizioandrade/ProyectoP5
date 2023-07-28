import { configureStore } from "@reduxjs/toolkit";

import { userReducer } from "./user";
import { propertiesReducer } from "./properties";
import { adminDataReducer } from "./adminData";
import { selectedOptionReducer } from "./selectedOption";
import { appointmentsReducer } from "./appointments";
import { favoritesReducer } from "./favorites";

const store = configureStore({
  reducer: { user: userReducer,properties:propertiesReducer,adminData:adminDataReducer,option:selectedOptionReducer,
  appointments:appointmentsReducer,favorites:favoritesReducer},
});

export default store;
