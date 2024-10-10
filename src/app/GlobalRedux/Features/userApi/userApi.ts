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
    getPost: builder.query({
      query: (args) => {
        return {
          url: `/post/${args.id}`,
          method: "GET",
        };
      },
      providesTags: ["post"],
    }),
    createPost: builder.mutation({
      query: (formData) => {
        return {
          url: `/post/createPost`,
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: ["post"],
    }),
    deletePost: builder.mutation({
      query: (postid) => {
        console.log("postid", postid);
        return {
          url: `/post/${postid}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["post"],
    }),
    updatePost: builder.mutation({
      query: (data) => {
        console.log("postid", data.postid);
        return {
          url: `/post/${data.postid}`,
          method: "PUT",
          body: data.data,
        };
      },
      invalidatesTags: ["post"],
    }),
    postVote: builder.mutation({
      query: (data) => {
        console.log("postid", data.id);
        return {
          url: `/post/${data.id}`,
          method: "PUT",
          body: data,
        };
      },
      invalidatesTags: ["post"],
    }),
    getCommet: builder.query({
      query: (args) => {
        console.log("interid", args.postid);
        return {
          url: `/comment/${args.postid}`,
          method: "GET",
        };
      },
      providesTags: ["comment"],
    }),
  }),
});

export const {
  useGetUserQuery,
  useGetPostQuery,
  useGetCommetQuery,
  useCreatePostMutation,
  useDeletePostMutation,
  useUpdatePostMutation,
  usePostVoteMutation,
} = userApi;
