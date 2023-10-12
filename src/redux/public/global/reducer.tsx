import { createSlice } from "@reduxjs/toolkit";
import globalState from "./state";

function initialState(): globalState {
  return {
    error: null,
    loading: false,
    developmentUrl: "",
    productionUrl: ""
  }
}

export const moduleName = "global";

export const globalSlice = createSlice({
  name: moduleName,
  initialState: initialState(),
  reducers: {
    setIsLoadingTrue:(state)=>{
      state.loading = true
      
    },
    setIsLoadingFalse:(state)=>{
      state.loading = false
    }
  },
});
