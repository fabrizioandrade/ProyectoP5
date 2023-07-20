import { configureStore } from "@reduxjs/toolkit";

import { userReducer } from "./user";
import { propertiesReducer } from "./properties";

const store = configureStore({
  reducer: { user: userReducer,properties:propertiesReducer},
});

export default store;
