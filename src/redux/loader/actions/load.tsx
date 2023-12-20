import { createAsyncThunk } from "@reduxjs/toolkit";
import { loaderSlice, moduleName } from "../reducer";
import { toast } from "react-toastify";
import { Link, Navigate, redirect, useNavigate } from "react-router-dom";

export const load = createAsyncThunk(
  moduleName + "/load",
  async (payload: { content: string; progress: string }, { dispatch }) => {
    dispatch({
      type: moduleName + "/setIsLoadingTrue"
    });
  }
);
