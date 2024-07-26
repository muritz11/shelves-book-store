import { createApi } from "@reduxjs/toolkit/query/react";
import { BookObj, RateObjII, SingleBookObj } from "../types";
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
  tagTypes: ["books", "genres"],
  endpoints: (builder) => ({
    fetchBooks: builder.query<FetchResult, string | void>({
      query: (query) => `/books${query || ""}`,
      providesTags: ["books"],
    }),
    fetchGenres: builder.query<string[], string | void>({
      query: () => `/books/genres`,
      providesTags: ["genres"],
      transformResponse: (result: { data: string[] }) => result.data,
    }),
    fetchSingleBooks: builder.query<SingleBookObj, string>({
      query: (bid) => `/books/${bid}`,
      transformResponse: (result: { data: SingleBookObj }) => result.data,
    }),
    fetchBookRatings: builder.query<RateObjII[], string>({
      query: (bid) => `/rating/${bid}`,
      transformResponse: (result: { data: RateObjII[] }) => result.data,
    }),
    rateBook: builder.mutation<any, any>({
      query: (data) => ({
        url: `/rating/${data.bid}`,
        method: "POST",
        body: data.body,
      }),
    }),
    deleteReview: builder.mutation<any, string>({
      query: (rid) => ({
        url: `/rating/${rid}`,
        method: "Delete",
      }),
    }),
    toggleLike: builder.mutation<any, any>({
      query: (data) => ({
        url: "/books/toggle-like",
        method: "POST",
        body: data,
      }),
    }),
    addBook: builder.mutation<any, any>({
      query: (data) => ({
        url: "/books",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["books", "genres"],
    }),
    updateBook: builder.mutation<any, any>({
      query: (data: { bid: string; body: any }) => ({
        url: `/books/${data.bid}`,
        method: "PUT",
        body: data.body,
      }),
      invalidatesTags: ["books", "genres"],
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
  useFetchGenresQuery,
  useFetchSingleBooksQuery,
  useAddBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
  useToggleLikeMutation,
  useFetchBookRatingsQuery,
  useRateBookMutation,
  useDeleteReviewMutation,
} = bookApi;
