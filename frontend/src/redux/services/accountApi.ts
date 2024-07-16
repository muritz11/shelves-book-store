import { createApi } from "@reduxjs/toolkit/query/react";
import { UserDetailObj } from "../types";
import baseQuery from "./customFetchBase";

export const accountApi = createApi({
  reducerPath: "accountApi",
  baseQuery,
  tagTypes: ["user"],
  endpoints: (builder) => ({
    fetchMe: builder.query<UserDetailObj, void>({
      query: () => "/user/me",
      providesTags: ["user"],
      transformResponse: (results: { data: UserDetailObj }) => results.data,
    }),
    updateProfile: builder.mutation<any, any>({
      query: (data) => ({
        url: `/user/update-profile`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["user"],
    }),
  }),
});

export const { useFetchMeQuery, useUpdateProfileMutation } = accountApi;
