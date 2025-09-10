import { createAsyncThunk } from "@reduxjs/toolkit";
import { moduleName } from "../reducer";
import { AccountsClient } from "../../../graphql/accounts/client";
import { toast } from "react-toastify";
import { prepMutation } from "../../utils";
import { resetPassword } from "../../../graphql/accounts/mutations";
import { refreshAccessToken } from "./register";


export const passwordReset = createAsyncThunk(
  moduleName + "/passwordReset",
  async (payload: { password: string , newPassword:string}, { dispatch }) => {
    // Create a promise which will resolve a graphql query to the endpoint http://localhost:8000/accounts/graphql
    // and will dispatch the post_login reducer if the response is successful
    const ACCESS_TOKEN = "JWT " + localStorage.getItem("ACCESS_TOKEN");
    const REFRESH_TOKEN =localStorage.getItem("REFRESH_TOKEN")!;

    const RESET_PASSWORD_MUTATION = prepMutation(
        resetPassword,
      ` 
      message
      user{
          id
          email
      }
      `
    );

    const mutation = AccountsClient.mutate({
      mutation: RESET_PASSWORD_MUTATION,
      variables: {
        password:payload.password,
        newPassword:payload.newPassword
      },
      context: {
        headers: {
          Authorization: ACCESS_TOKEN,
        },
      },
    });

    mutation
      .then((response) => {
        console.log(response)
      }).catch((response) => {
        dispatch(refreshAccessToken({ refreshToken:REFRESH_TOKEN, refresh:true })).then(()=>{
            dispatch(passwordReset({password:payload.password,newPassword:payload.newPassword}))   
        })
      });

    return mutation;
  }
);