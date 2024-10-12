// import { TQureyParam } from "@/types/gobal.type";
import { TQureyParam } from "@/types/gobal.type";
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
    getAllUser: builder.query({
      query: () => {
        return {
          url: `/user`,
          method: "GET",
        };
      },
      providesTags: ["user"],
    }),
    UpdateUser: builder.mutation({
      query: (args) => {
        console.log("userId", args.data);
        return {
          url: `/user/${args.user}`,
          method: "PUT",
          body: args.data,
        };
      },
      invalidatesTags: ["user"],
    }),
    UpdateUserImages: builder.mutation({
      query: (args) => {
        console.log("userId", args.data);
        return {
          url: `/user/image/${args.user}`,
          method: "PUT",
          body: args.data,
        };
      },
      invalidatesTags: ["user"],
    }),
    toggleFollow: builder.mutation({
      query: (args) => {
        console.log("userId", args.userId);
        return {
          url: `/user/${args.userId}`,
          method: "PUT",
          body: args,
        };
      },
      invalidatesTags: ["user"],
    }),
    UpdateCoverImage: builder.mutation({
      query: (args) => {
        console.log("userId", args.data);
        return {
          url: `/user/cover/${args.user}`,
          method: "PUT",
          body: args.data,
        };
      },
      invalidatesTags: ["user"],
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
    deleteComment: builder.mutation({
      query: (id) => {
        console.log("coment", id);
        return {
          url: `/comment/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["comment"],
    }),
    creteComment: builder.mutation({
      query: (data) => {
        return {
          url: `/comment/createComment`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["comment"],
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
    searchInfo: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: TQureyParam) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: `/post`,
          method: "GET",
          params: params,
        };
      },
      providesTags: ["post"],
    }),
  }),
});

export const {
  useGetUserQuery,
  useUpdateUserImagesMutation,
  useGetAllUserQuery,
  useGetPostQuery,
  useGetCommetQuery,
  useCreatePostMutation,
  useDeletePostMutation,
  useUpdatePostMutation,
  usePostVoteMutation,
  useCreteCommentMutation,
  useDeleteCommentMutation,
  useSearchInfoQuery,
  useUpdateUserMutation,
  useUpdateCoverImageMutation,
  useToggleFollowMutation,
} = userApi;
