import { createApi } from "@reduxjs/toolkit/query/react";
import { AuthorObj } from "../types";
import baseQuery from "./customFetchBase";

interface AuthorResult {
  success: boolean;
  data: AuthorObj[];
  total: number;
  currentPage: number;
}

export const authorApi = createApi({
  reducerPath: "authorApi",
  baseQuery,
  tagTypes: ["authors"],
  endpoints: (builder) => ({
    fetchAuthors: builder.query<AuthorResult, string>({
      query: (query?: string) => `/authors${query || ""}`,
      providesTags: ["authors"],
      // transformResponse: (results: AuthorObj) =>
      //   results,
    }),
    addAuthors: builder.mutation<any, any>({
      query: (data) => ({
        url: "/authors",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["authors"],
    }),
    updateAuthors: builder.mutation<any, any>({
      query: (data: { aid: string; body: any }) => ({
        url: `/authors/${data.aid}`,
        method: "PUT",
        body: data.body,
      }),
      invalidatesTags: ["authors"],
    }),
    deleteAuthors: builder.mutation<any, any>({
      query: (aid) => ({
        url: `/authors/${aid}`,
        method: "DELETE",
      }),
      invalidatesTags: ["authors"],
    }),
  }),
});

export const {
  useFetchAuthorsQuery,
  useAddAuthorsMutation,
  useUpdateAuthorsMutation,
  useDeleteAuthorsMutation,
} = authorApi;
