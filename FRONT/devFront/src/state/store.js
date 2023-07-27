import { configureStore } from "@reduxjs/toolkit";

import { userReducer } from "./user";
import { propertiesReducer } from "./properties";
import { adminDataReducer } from "./adminData";
import { selectedOptionReducer } from "./selectedOption";

const store = configureStore({
  reducer: { user: userReducer,properties:propertiesReducer,adminData:adminDataReducer,option:selectedOptionReducer},
});

export default store;
