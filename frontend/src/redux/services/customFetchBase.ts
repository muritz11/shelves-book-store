import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query";

const baseUrl = "https://shelves-book-store.onrender.com/api/v1";
// const { toast } = createStandaloneToast();

const base = fetchBaseQuery({
  baseUrl,
  prepareHeaders: (headers, { getState }) => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await base(args, api, extraOptions);
  if (
    result.error &&
    // @ts-ignore
    result?.error?.status === 401
  ) {
    // toast({
    //   position: "top-right",
    //   description: "Session expired",
    //   status: "error",
    //   duration: 3000,
    //   isClosable: true,
    // });
    // await signOut(auth)
    // api.dispatch(logOutUser());
  }
  return result;
};

export default baseQuery;
