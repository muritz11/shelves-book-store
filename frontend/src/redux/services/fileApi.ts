import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "./customFetchBase";

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
  }),
});

export const { useUploadFileMutation } = fileApi;
