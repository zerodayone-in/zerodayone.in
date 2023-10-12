import { createSlice } from "@reduxjs/toolkit";
import authState from "./state";


function initialState(): authState {
  return {
    validated:false,
    authenticated: false,
    user: {
      id: undefined,
      username: null,
      usertag:null,
      identifier: null,
      createdAt: null,
      isAppliedUsername:null,
      isEmailVerified:null,
      isPoliciesAccepted:null,
      isSelectedAvatar:null,
      isSelectedGames:null,
    },
    token: null,
    otp:{
      ghostcode:"",
      id:""
    },
    accessToken:null
  };
}

export const moduleName = "auth";

export const authSlice = createSlice({
  name: moduleName,
  initialState: initialState(),
  reducers: {
    post_login: (state, action) => {
    
      // state.authenticated = true;
      state.user.id = action.payload.user_data.id;
      state.user.isAppliedUsername = action.payload.user_data.user.isAppliedUsername
      state.user.isEmailVerified = action.payload.user_data.user.isEmailVerified
      state.user.isPoliciesAccepted = action.payload.user_data.user.isPoliciesAccepted
      state.user.isSelectedAvatar = action.payload.user_data.user.isSelectedAvatar
      state.user.isSelectedGames = action.payload.user_data.user.isSelectedGames
      state.accessToken = action.payload.user_data.accessToken
      state.user.username = action.payload.user_data.user.username.username+"#"+action.payload.user_data.user.username.tag
      // state.token = action.payload.token;

    },
    post_logout: (state) => {
      state.authenticated = false;
      state.user = {
        id: undefined,
        username: null,
        usertag:null,
        identifier: null,
        createdAt: null,
        isAppliedUsername:null,
        isEmailVerified:null,
        isPoliciesAccepted:null,
        isSelectedAvatar:null,
        isSelectedGames:null,
      };
      
      state.token = null;
    },
    otp_verify:(state, action)=>{
      state.otp =action.payload.otp
      
    },
    register:(state,action)=>{
      state.accessToken=action.payload.accestoken
    },
    validate:(state,action)=>{
      state.validated=action.payload.validated
      state.user.id = action.payload.user_data.id;
      state.user.isAppliedUsername = action.payload.user_data.isAppliedUsername
      state.user.isEmailVerified = action.payload.user_data.isEmailVerified
      state.user.isPoliciesAccepted = action.payload.user_data.isPoliciesAccepted
      state.user.isSelectedAvatar = action.payload.user_data.isSelectedAvatar
      state.user.isSelectedGames = action.payload.user_data.isSelectedGames
    },
    edit_username:(state,action)=>{
      
      
    },
    createusername:(state,action)=>{
      state.user.username=action.payload.username,
      state.user.usertag=action.payload.usertag
    },
    resetState: (state) => {
      
      Object.assign(state, initialState());
    },
  },
});

