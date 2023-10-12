import { createSlice } from "@reduxjs/toolkit";
import globalState from "./state";

function initialState(): globalState {
  return {
    error: null,
    loading: false,
    developmentUrl:"",
    productionUrl:""
  }
}

export const moduleName = "global";

export const globalSlice = createSlice({
  name: moduleName,
  initialState: initialState(),
  reducers: {
    setIsLoadingTrue:(state: { loading: boolean; })=>{
      state.loading = true
      
    },
    setIsLoadingFalse:(state: { loading: boolean; })=>{
      state.loading = false
    }
  },
});
