import { createSlice } from "@reduxjs/toolkit";
import globalState from "./state";

function initialState(): globalState {
  return {
    developmentUrl: "",
    productionUrl: ""
  }
}

export const moduleName = "global";

export const globalSlice = createSlice({
  name: moduleName,
  initialState: initialState(),
  reducers: {},
});

export const {} = globalSlice.actions;
export default globalSlice.reducer;
