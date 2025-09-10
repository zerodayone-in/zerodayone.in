import { createAsyncThunk } from "@reduxjs/toolkit";
import { authSlice, moduleName } from "../reducer";
import { AccountsClient } from "../../../graphql/accounts/client";
import { toast } from "react-toastify";
import { obtainSocialToken, obtainToken } from "../../../graphql/accounts/mutations";
import { prepMutation } from "../../utils";
import { ApolloError } from "apollo-client";
import { Link, Navigate, redirect, useNavigate } from "react-router-dom";
import { profile_logout } from "../../profile/actions/logout";



export const login = createAsyncThunk(
  moduleName + "/login",
  async (payload: { identifier: string; password: string }, { dispatch }) => {
    // Create a promise which will resolve a graphql query to the endpoint http://localhost:8000/accounts/graphql
    // and will dispatch the post_login reducer if the response is successful

    const LOGIN_MUTATION = prepMutation(
      obtainToken,
      ` 
        user {
          id
          email
          username{
            username
            tag
          }
          email
          isEmailVerified
          isPoliciesAccepted
          isSelectedGames
          isAppliedUsername
          isSelectedAvatar
        }
        accessToken
        refreshToken
      `
    );

    const mutation = AccountsClient.mutate({
      fetchPolicy: 'no-cache',
      mutation: LOGIN_MUTATION,
      variables: {
        identifier: payload.identifier,
        password: payload.password,
      },
    });

    mutation
      .then((response) => {
        // If the response is successful, dispatch the post_login reducer
        // console.log("hi",result.data.networkStatus)

        // const id = response.data.obtainToken.user.id;
        // const identifier = response.data.obtainToken.user.email;
        localStorage.setItem(
          "ACCESS_TOKEN",
          response.data.obtainToken.accessToken
        );
        localStorage.setItem(
          "REFRESH_TOKEN",
          response.data.obtainToken.refreshToken
        );
        localStorage.setItem("AUTH_TOKEN","true")
        
       
        dispatch({
          type: moduleName + "/post_login",
          payload: {
            user_data:response.data.obtainToken,
            token: "test",
            // access_token = response.data.obtainToken.accessToken
          },
        });
      }).then(()=>{
      })
      .catch((errors: ApolloError) => {
        const networkError = errors.networkError;
        if (networkError && "statusCode" in networkError) {
          if(networkError.statusCode == 400 ){
            toast.error("Invalid Credantials");
            
          }
        }
      });

    return mutation;
  }
);

export const socialLogin = createAsyncThunk(
  moduleName + "/social_login",
  async (payload: { provider: string; oauthToken: string }, { dispatch }) => {
    // Create a promise which will resolve a graphql query to the endpoint http://localhost:8000/accounts/graphql
    // and will dispatch the post_login reducer if the response is successful
   
    
    const LOGIN_MUTATION = prepMutation(
      obtainSocialToken,
      ` 
      user {
        id
        username{
          username
          tag
        }
        email
        isEmailVerified
        isPoliciesAccepted
        isSelectedGames
        isAppliedUsername
        isSelectedAvatar
      }
      accessToken
      refreshToken
      `
    );

    const mutation = AccountsClient.mutate({
      mutation: LOGIN_MUTATION,
      fetchPolicy: 'no-cache',
      variables: {
        provider: payload.provider,
        oauthToken: payload.oauthToken,
      },
    });

    mutation
      .then((response) => {
        // If the response is successful, dispatch the post_login reducer
        // console.log("hi",result.data.networkStatus)
        
        const id = response.data.obtainSocialToken.user.id;
        const identifier = response.data.obtainSocialToken.user.email;
        localStorage.setItem(
          "ACCESS_TOKEN",
          response.data.obtainSocialToken.accessToken
        );
        localStorage.setItem(
          "REFRESH_TOKEN",
          response.data.obtainSocialToken.refreshToken
        );
        localStorage.setItem("AUTH_TOKEN","true")


      
        dispatch({
          type: moduleName + "/post_login",
          payload: {
            
              user_data:response.data.obtainSocialToken,
              // username: "test",
              // createdAt: "test",
          
            token: "test",
          },
        });
      })
      .catch((errors: ApolloError) => {
        const networkError = errors.networkError;
        if (networkError && "statusCode" in networkError) {
          if(networkError.statusCode == 400 ){
            toast.error("Invalid Credantials");
            
          }
        }
      });

    return mutation;
  }
);

// export const resetStore = createAction('RESET');

export const logout = createAsyncThunk(
  moduleName + "/logout",
  async (_, { dispatch }) => {
    // Create a promise which will resolve a graphql query to the endpoint http://localhost:8000/accounts/graphql
    // and will dispatch the post_login reducer if the response is successful
    localStorage.removeItem("ACCESS_TOKEN");
    localStorage.removeItem("REFRESH_TOKEN");
    localStorage.setItem("AUTH_TOKEN","false")

    
    // dispatch(resetStore());
    dispatch({ type: moduleName + "/post_logout" });
    dispatch(profile_logout())

    // window.location.reload()
    
    return ;
  }
);


