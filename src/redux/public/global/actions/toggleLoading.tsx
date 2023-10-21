import { createAsyncThunk } from "@reduxjs/toolkit";
import { moduleName } from "../reducer";

export const toggleLoading = createAsyncThunk(
  moduleName + "/toggleLoading",
  async (payload: { loading: boolean }, { state, dispatch }) => {
    dispatch({ type: moduleName + "/setLoading", payload: payload});
    return;
  }
);
