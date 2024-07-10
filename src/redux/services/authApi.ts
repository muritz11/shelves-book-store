import { createApi } from "@reduxjs/toolkit/query/react";
import { LoginBody, ResetPasswordBody } from "../types";
import baseQuery from "./customFetchBase";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery,
  endpoints: (builder) => ({
    signUp: builder.mutation<any, LoginBody>({
      query: (data) => ({
        url: "/auth/register",
        method: "POST",
        body: data,
      }),
      // transformResponse: (result: { data: { message: any } }) => result.data.message
    }),
    login: builder.mutation<any, LoginBody>({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),
    }),
    resendToken: builder.mutation<any, { email: string }>({
      query: (data) => ({
        url: "/auth/resend-token",
        method: "POST",
        body: data,
      }),
    }),
    verifyAccount: builder.mutation<
      any,
      { email: string; code: number | string }
    >({
      query: (data) => ({
        url: "/auth/verify",
        method: "POST",
        body: data,
      }),
    }),
    resetPassword: builder.mutation<any, ResetPasswordBody>({
      query: (data) => ({
        url: "/auth/password-reset",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useSignUpMutation,
  useLoginMutation,
  useResendTokenMutation,
  useVerifyAccountMutation,
  useResetPasswordMutation,
} = authApi;
