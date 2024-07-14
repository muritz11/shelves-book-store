import { createApi } from "@reduxjs/toolkit/query/react";
// import { LoginBody, ResetPasswordBody } from "../types";
import baseQuery from "./customFetchBase";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery,
  endpoints: (builder) => ({
    signUp: builder.mutation<any, any>({
      query: (data) => ({
        url: "/auth/register",
        method: "POST",
        body: data,
      }),
      // transformResponse: (result: { data: { message: any } }) => result.data.message
    }),
    login: builder.mutation<any, any>({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useSignUpMutation, useLoginMutation } = authApi;
