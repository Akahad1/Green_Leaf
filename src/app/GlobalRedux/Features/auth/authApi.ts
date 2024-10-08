import { baseApi } from "../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    logIn: builder.mutation({
      query: (userInfo) => {
        console.log("userIfo", userInfo);
        return {
          url: "/auth/login",
          method: "POST",
          body: userInfo,
        };
      },
    }),
    SingUp: builder.mutation({
      query: (userInfo) => {
        console.log("userIfo", userInfo);
        return {
          url: "/auth/signup",
          method: "POST",
          body: userInfo,
        };
      },
    }),
  }),
});

export const { useLogInMutation, useSingUpMutation } = authApi;
