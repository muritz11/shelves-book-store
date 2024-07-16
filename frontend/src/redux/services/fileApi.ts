import { createApi } from "@reduxjs/toolkit/query/react";
import { AuthorObj, BookObj } from "../types";
import baseQuery from "./customFetchBase";

interface SearchResult {
  success: boolean;
  data: {
    books: BookObj[];
    authors: AuthorObj[];
  };
}

export const fileApi = createApi({
  reducerPath: "fileApi",
  baseQuery,
  endpoints: (builder) => ({
    uploadFile: builder.mutation<any, any>({
      query: (data) => ({
        url: "/file/upload",
        method: "POST",
        body: data,
      }),
    }),
    search: builder.query<SearchResult, string>({
      query: (query) => `/search?query=${query}`,
      keepUnusedDataFor: 0,
    }),
  }),
});

export const { useUploadFileMutation, useSearchQuery } = fileApi;
