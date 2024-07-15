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
  }),
});

export const { useFetchMeQuery } = accountApi;
