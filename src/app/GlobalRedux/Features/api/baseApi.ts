import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import { toast } from "sonner";

// Define the baseQuery using fetchBaseQuery
const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5000/api/a6",
  credentials: "include",
  prepareHeaders: (headers) => {
    // Get the token from cookies
    const token = Cookies.get("accessToken"); // Replace 'token' with the actual name of your cookie

    console.log("Token from cookie:", token);

    if (token) {
      headers.set("authorization", `Bearer ${token}`); // Set Authorization header with token
    }

    return headers;
  },
});

// Define a new baseQuery function that wraps the original baseQuery and adds custom error handling
const baseQueryWithRefreshToken: BaseQueryFn<
  FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);

  console.log("API Result:", result);

  // Handle different error statuses
  if (result?.error?.status === 404) {
    // Handle 404 Not Found error
    console.error("User Not Found (404)");
    toast.error("User Not Found");
  }

  if (result?.error?.status === 403) {
    // Handle 403 Forbidden error (e.g., invalid token)
    console.error("Invalid Token or Access Denied (403)");
    // Optionally, show a toast message: toast.error("Invalid Token");
  }

  return result;
};

// Create the base API slice using the enhanced baseQueryWithRefreshToken
export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithRefreshToken,
  tagTypes: ["user", "post", "comment"], // Define your tag types for caching purposes
  endpoints: () => ({}), // Placeholder for endpoints
});
