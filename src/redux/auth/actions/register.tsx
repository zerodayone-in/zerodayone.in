import { createAsyncThunk } from "@reduxjs/toolkit";
import { moduleName } from "../reducer";
import {
  createOauthUser,
  createUser,
  createUsername,
  editUsername,
  refreshToken,
  updateUserDob,
  verifyToken,
} from "../../../graphql/accounts/mutations";
import { AccountsClient } from "../../../graphql/accounts/client";
import { prepMutation } from "../../utils";
import { toast } from "react-toastify";
import { login } from "./login";
import {
  emailVerifyInitiate,
  emailVerifyComplete,
  resendOtp,
} from "../../../graphql/otp/mutations";
import { AuthorizedOtpClient } from "../../../graphql/otp/client";
import { ApolloError } from "apollo-client";

export const register = createAsyncThunk(
  moduleName + "/register",
  async (
    payload: { email: string; password: string; dob: Date , referral :String,isPoliciesAccepted:Boolean},
    { dispatch }
  ) => {
    // Create a promise which will resolve a graphql query to the endpoint http://localhost:8000/accounts/graphql
    // the promise stands for creating the new user
    // and will dispatch the post_login reducer if the response is successful

    const REGISTER_MUTATION = prepMutation(createUser, null);

    var mutation = AccountsClient.mutate({
      mutation: REGISTER_MUTATION,
      variables: {
        email: payload.email,
        password: payload.password,
        dob: payload.dob,
        
        isPoliciesAccepted:payload.isPoliciesAccepted
      },
    });

    mutation
      .then((response) => {
        // if the request is successful the accesstoken is saved in localstorage
        localStorage.setItem(
          "ACCESS_TOKEN",
          response.data.createUser.accessToken
        );
      })
      .catch((errors: ApolloError) => {
        console.log(errors)
        const networkError = errors.networkError;
        if (networkError && "statusCode" in networkError) {
          if (networkError.statusCode == 400) {
           
           // toast.error("You cannot register at the moment");
          }
        }
      });

    return mutation;
  }
);

export const oAuthRegister = createAsyncThunk(
  moduleName + "/o_auth_register",
  async (
    payload: { oauthToken: String; provider: String; referral?: String },
    { dispatch }
  ) => {
    // Create a promise which will resolve a graphql query to the endpoint http://localhost:8000/accounts/graphql
    // the promise stands for creating the new user
    // and will dispatch the post_login reducer if the response is successful

    const OAUTH_REGISTER_MUTATION = prepMutation(createOauthUser, null);

    var mutation = AccountsClient.mutate({
      mutation: OAUTH_REGISTER_MUTATION,
      fetchPolicy: 'no-cache',
      variables: {
        oauthToken: payload.oauthToken,
        provider: payload.provider,
        referral: payload.referral,
      },
    });

    mutation
      .then((response) => {
        // if the request is successful the accesstoken is saved in localstorage

        localStorage.setItem(
          "ACCESS_TOKEN",
          response.data.createOauthUser.accessToken
        );
        localStorage.setItem(
          "REFRESH_TOKEN",
          response.data.createOauthUser.refreshToken
        );
      })
      .catch((errors) => {
        const networkError = errors.networkError;
        if (networkError && "statusCode" in networkError) {
          if (networkError.statusCode == 400) {
            toast("The user already exists");
          }
        }
      });

    return mutation;
  }
);

export const oAuthDob = createAsyncThunk(
  moduleName + "/o_auth_dob",
  async (payload: { dob?: String }, { dispatch }) => {
    // Create a promise which will resolve a graphql query to the endpoint http://localhost:8000/accounts/graphql
    // the promise stands for creating the new user
    // and will dispatch the post_login reducer if the response is successful
    const ACCESS_TOKEN = "JWT " + localStorage.getItem("ACCESS_TOKEN");

    const DOB_MUTATION = prepMutation(updateUserDob, null);

    // console.log(payload.dob)

    var mutation = AccountsClient.mutate({
      mutation: DOB_MUTATION,
      variables: {
        dob: payload.dob,
      },
      context: {
        headers: {
          Authorization: ACCESS_TOKEN,
        },
      },
    });

    mutation
      .then((response) => {
        // if the request is successful the accesstoken is saved in localstorage

        toast("Date of birth added");
      })
      .catch((errors) => {
        console.log(errors);
        const networkError = errors.networkError;
        if (networkError && "statusCode" in networkError) {
          if (networkError.statusCode == 400) {
            toast("network error ");
          }
        }
      });

    return mutation;
  }
);

export const emailVerify = createAsyncThunk(
  moduleName + "/emailVerify",
  async (payload: { otp: String }, { dispatch, getState }) => {
    // Create a promise which will resolve a graphql query to the endpoint http://localhost:8000/accounts/graphql
    //promise stands for verifing the users email
    // and will dispatch the post_login reducer if the response is successful
    const ACCESS_TOKEN = "JWT " + localStorage.getItem("ACCESS_TOKEN");

    const EMAIL_VERIFY_MUTATION = prepMutation(
      emailVerifyInitiate,

      `
      message
      ghostCode
      otp
      `
    );

    var mutation = AuthorizedOtpClient.mutate({
      mutation: EMAIL_VERIFY_MUTATION,
      variables: {
        validate: true,
        otp: payload.otp,
      },
      context: {
        headers: {
          Authorization: ACCESS_TOKEN,
        },
      },
    });

    mutation
      .then((response) => {
        // If the response is successful another mutation is committed to complete the verification process

        const EMAIL_VERIFY_MUTATION_COMPLETE = prepMutation(
          emailVerifyComplete,

          `
          message
          ghostCode
          otp
          `
        );

        var mutation = AuthorizedOtpClient.mutate({
          mutation: EMAIL_VERIFY_MUTATION_COMPLETE,
          variables: {
            complete: true,
            otp: response.data.validateEmail.otp,
            ghostCode: response.data.validateEmail.ghostCode,
          },
          context: {
            headers: {
              Authorization: ACCESS_TOKEN,
            },
          },
        });

        mutation
          .then((response) => {
            if (!response.errors) {
              dispatch({
                type: moduleName + "/validate",
                payload: {
                  validated: true,
                  user_data: response.data.verifyToken.user,
                },
              });
            }
          })
          .catch((errors:ApolloError) => {
            const networkError = errors.networkError;
            if (networkError && "statusCode" in networkError) {
              if (networkError.statusCode == 400) {
                toast.error("please try again ");
              }
            }
           
          });
      })
      .catch((errors: ApolloError) => {
        const networkError = errors.networkError;
        if (networkError && "statusCode" in networkError) {
          if (networkError.statusCode == 400) {
           
          }
        }
      });

    return mutation;
  }
);

export const resendOTP = createAsyncThunk(
  moduleName + "/email_otp",
  async (_, { dispatch, getState }) => {
    // Create a promise which will resolve a graphql query to the endpoint http://localhost:8000/accounts/graphql
    //promise stands for verifing the users email
    // and will dispatch the post_login reducer if the response is successful
    const ACCESS_TOKEN = "JWT " + localStorage.getItem("ACCESS_TOKEN");

    const RESEND_OTP_MUTATION = prepMutation(
      resendOtp,

      `
      message
      
      
      `
    );

    var mutation = AuthorizedOtpClient.mutate({
      mutation: RESEND_OTP_MUTATION,
      variables: {
        initiate: true,
      },
      context: {
        headers: {
          Authorization: ACCESS_TOKEN,
        },
      },
    });

    mutation
      .then((response) => {
        // If the response is successful otp will send to your email
      })
      .catch((errors: ApolloError) => {
        const networkError = errors.networkError;
        if (networkError && "statusCode" in networkError) {
          if (networkError.statusCode == 400) {
            toast.error("Cannot Verify at the moment");
          }
        }
      });

    return mutation;
  }
);

export const validate = createAsyncThunk(
  moduleName + "/validateToken",
  async (_, { dispatch }) => {
    // Create a promise which will resolve a graphql query to the endpoint http://localhost:8000/accounts/graphql
    //promise stands for verifying the users access token and if not use the refresh token to refetch the access token
    const ACCESS_TOKEN = "JWT " + localStorage.getItem("ACCESS_TOKEN");

    const VALIDATE_TOKEN_MUTATION = prepMutation(
      verifyToken,

      `
      message
      user{
        id
        email
        isEmailVerified
        isPoliciesAccepted
        isSelectedGames
        isAppliedUsername
        isSelectedAvatar
        username{
          username
          tag
        }
    }
      `
    );

    var mutation = AccountsClient.mutate({
      mutation: VALIDATE_TOKEN_MUTATION,
      context: {
        headers: {
          Authorization: ACCESS_TOKEN,
        },
      },
    });

    mutation
      .then((response) => {
        // If the response is successful another mutation is committed to complete the verification process

        dispatch({
          type: moduleName + "/validate",
          payload: {
            validated: true,
            user_data: response.data.verifyToken.user,
          },
        });
        // const EMAIL_VERIFY_MUTATION_COMPLETE = prepMutation(
        //   emailVerifyComplete,

        //   `
        //   message
        //   ghostCode
        //   otp
        //   `
        // );

        // var mutation = AuthorizedOtpClient.mutate({
        //   mutation: EMAIL_VERIFY_MUTATION_COMPLETE,
        //   variables: {
        //     complete: true,
        //     otp: response.data.validateEmail.otp,
        //     ghostCode: response.data.validateEmail.ghostCode,
        //   },
        //   context: {
        //     headers: {
        //       Authorization: ACCESS_TOKEN,
        //     },
        //   },
        // });

        // mutation.then(() => {
        //   dispatch({
        //     type: moduleName + "/validate",
        //     payload: {
        //       validated: true,
        //     },
        //   });
        // });
      })
      .catch((error) => {
        // Show only the relevant error message
      });

    return mutation;
  }
);

export const refreshAccessToken = createAsyncThunk(
  moduleName + "/refreshToken",
  async (
    payload: {
      refreshToken: string;
      refresh: boolean;
    },
    { dispatch }
  ) => {
    // Create a promise which will resolve a graphql query to the endpoint http://localhost:8000/accounts/graphql
    //promise stands for verifing the users email
    // and will dispatch the post_login reducer if the response is successful
    //action is used to refresh the access token when a reuest is not succesful

    const REFRESH_TOKEN_MUTATION = prepMutation(
      refreshToken,

      `
      message
      accessToken
      refreshToken
      `
    );
    console.log("mutation query:", REFRESH_TOKEN_MUTATION);
    var mutation = AccountsClient.mutate({
      mutation: REFRESH_TOKEN_MUTATION,
      variables: {
        refreshToken: payload.refreshToken,
        refresh: payload.refresh,
      },
    });

    mutation
      .then((response) => {
        localStorage.setItem(
          "ACCESS_TOKEN",
          response.data.refreshToken.accessToken
        );
        localStorage.setItem(
          "REFRESH_TOKEN",
          response.data.refreshToken.refreshToken
        );
      })
      .catch((error) => {
        // Show only the relevant error message
      });

    return mutation;
  }
);

export const createUserName = createAsyncThunk(
  `${moduleName}/createUserName`,
  async (payload: { username: string }) => {
    const ACCESS_TOKEN = "JWT " + localStorage.getItem("ACCESS_TOKEN");
    try {
      const CREATE_USERNAME_MUTATION = prepMutation(
        createUsername,
        `    
        message
        user{
            id
        }
        username {
            id
            username
            tag
        }
        `
      );

      const response = await AccountsClient.mutate({
        mutation: CREATE_USERNAME_MUTATION,
        variables: {
          username: payload.username,
        },
        context: {
          headers: {
            Authorization: ACCESS_TOKEN,
          },
        },
      });

      return response.data;
    } catch (error) {
      // You can handle errors here
      throw error;
    }
  }
);
