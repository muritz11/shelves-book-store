import { createApi } from "@reduxjs/toolkit/query/react";
import { BookObj, SingleBookObj } from "../types";
import baseQuery from "./customFetchBase";

interface FetchResult {
  success: boolean;
  data: BookObj[];
  total: number;
  currentPage: number;
}

export const bookApi = createApi({
  reducerPath: "bookApi",
  baseQuery,
  tagTypes: ["books"],
  endpoints: (builder) => ({
    fetchBooks: builder.query<FetchResult, string | void>({
      query: (query) => `/books${query || ""}`,
      providesTags: ["books"],
    }),
    fetchSingleBooks: builder.query<SingleBookObj, string>({
      query: (bid) => `/books/${bid}`,
      transformResponse: (result: { data: SingleBookObj }) => result.data,
    }),
    addBook: builder.mutation<any, any>({
      query: (data) => ({
        url: "/books",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["books"],
    }),
    updateBook: builder.mutation<any, any>({
      query: (data: { aid: string; body: any }) => ({
        url: `/books/${data.aid}`,
        method: "PUT",
        body: data.body,
      }),
      invalidatesTags: ["books"],
    }),
    deleteBook: builder.mutation<any, any>({
      query: (aid) => ({
        url: `/books/${aid}`,
        method: "DELETE",
      }),
      invalidatesTags: ["books"],
    }),
  }),
});

export const {
  useFetchBooksQuery,
  useFetchSingleBooksQuery,
  useAddBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
} = bookApi;
