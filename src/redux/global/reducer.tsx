import { createSlice } from "@reduxjs/toolkit";
import globalState from "./state";

function initialState(): globalState {
  return {
    developmentUrl: "",
    productionUrl: "",
    activeRoute: ""
  }
}

export const moduleName = "global";

export const globalSlice = createSlice({
  name: moduleName,
  initialState: initialState(),
  reducers: {
    setActiveRoute: (state, action) => {
      state.activeRoute = action.payload;
    }
  },
});

export const { setActiveRoute } = globalSlice.actions;
export default globalSlice.reducer;
