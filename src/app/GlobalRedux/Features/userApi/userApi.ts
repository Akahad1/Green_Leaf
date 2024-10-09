// import { TQureyParam } from "@/types/gobal.type";
import { baseApi } from "../api/baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query({
      query: (args) => {
        // const params = new URLSearchParams();
        // if (args) {
        //   args.forEach((item: TQureyParam) => {
        //     params.append(item.name, item.value as string);
        //   });
        // }

        return {
          url: `/user/${args.id}`,
          method: "GET",

          // params: params,
        };
      },
      providesTags: ["user"],
    }),
  }),
});

export const { useGetUserQuery } = userApi;
