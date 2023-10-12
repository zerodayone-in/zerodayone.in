import { createAsyncThunk } from "@reduxjs/toolkit";
import { moduleName } from "../reducer";
import { OtpClient  } from "../../../graphql/otp/client";
import { recieveOtp,otpVerify, setNewPassword} from "../../../graphql/otp/mutations";
import { prepMutation } from "../../utils";
import { RootState } from "../../store";



export const forgot_password = createAsyncThunk(
  moduleName + "/FORGOT_PASSWORD",
  async (payload: { email: string}, { dispatch }) => {
    // Create a promise which will resolve a graphql  query to the endpoint http://localhost:8000/accounts/graphql
    // and will dispatch the post_login reducer if the response is successful
    //Expected payload format
    // {
    //   email:email
    // }
    var FORGOT_PASSWORD_MUTATION = prepMutation(
      recieveOtp, 
      ` 
        message
      `
    );

    var mutation = OtpClient.mutate({
      mutation: FORGOT_PASSWORD_MUTATION,
      variables: {
        email: payload.email,
        initiate:true
      },
      
    });

    mutation
      .then((response) => {
        
          
       if(response.data.forgot_password!=null){
        //dispacth request for ghost code 
        
       }
       else{
        // toast(response.errors[0].message) 
       }
        
      })
      .catch((error) => {
        // Show only the relevant error message
        // toast.error(" " + error.graphQLErrors[0].message);
      });

    return mutation;
  }
);


export const otp_verify = createAsyncThunk(
  moduleName + "/OTP_VERIFY",
  async(payload:{email:string , otp:string }, {dispatch})=>{
    // Create a promise which will resolve a graphql  query to the endpoint http://localhost:8000/accounts/graphql
    // exected payload 
    // {
    //   email:email,
    //   otp:otp
    // }
    var OTP_VERIFY_MUTATION = prepMutation(
      otpVerify,
      `
      message
      ghostCode
      otp
      `
    );
    var mutation = OtpClient.mutate({
      mutation: OTP_VERIFY_MUTATION,
      variables: {
        email: payload.email,
        otp:payload.otp,
        validate:true,
      },
    });
    mutation.then((response)=>{
      const ghostcode = response.data.forgotPassword.ghostCode
      const id = response.data.forgotPassword.otp
      
      dispatch({
        type: moduleName + "/otp_verify",
        payload: {
          otp: {
            ghostcode: ghostcode,
            id: id,
            
          },
          
        },
      });
    })
  }
);


export const set_new_password = createAsyncThunk(
  moduleName + "/SET_NEW_PASSWORD",
  async (payload: { email: string, new_password: string }, { dispatch , getState}) => {
    var state = getState() as RootState
    console.log(state.auth.otp.ghostcode)
    try {
      // Create a promise which will resolve a graphql  query to the endpoint http://localhost:8000/accounts/graphql
      const SET_NEW_PASSWORD_MUTATION = prepMutation(
        setNewPassword,
        `
          message
        `
      );
      const mutation = OtpClient.mutate({
        
        mutation: SET_NEW_PASSWORD_MUTATION,
        variables: {
          complete: true,
          otp:state.auth.otp.id,
          email: payload.email,
          ghostCode:state.auth.otp.ghostcode ,
          newPassword: payload.new_password
        },
      });
      mutation.then(() => {
        console.log("Mutation completed successfully");
      }).catch((error) => {
        console.error("Mutation failed with error:", error);
      });
    } catch (error) {
      console.error("Error in set_new_password function:", error);
    }
  }
);
