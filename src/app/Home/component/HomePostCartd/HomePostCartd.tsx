"use client";
import Image from "next/image";
import { FaArrowUp, FaArrowDown, FaShareAlt } from "react-icons/fa";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import { useAppSelector } from "@/app/GlobalRedux/hook";
import { useCurrentId } from "@/app/GlobalRedux/Features/auth/userSlice";
import {
  useCreteCommentMutation,
  useDeleteCommentMutation,
  useGetCommetQuery,
  usePostVoteMutation,
} from "@/app/GlobalRedux/Features/userApi/userApi";
import { Tcommet, TPost, TPostData } from "@/types/gobal.type";

import { toast } from "sonner";
import DropdownToggle from "@/app/(userLayout)/profile/componet/handleDropdownToggle/handleDropdownToggle";
import CommentModal from "@/app/(userLayout)/profile/componet/comentModal/CommentModal";
import Link from "next/link";
import CardLoder from "@/app/(userLayout)/userProfile/componet/CardLoder/CardLoder";

interface data {
  data: TPostData;
}
const HomePostCard: React.FC<data> = ({ data }) => {
  const [postid, setPostId] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [addComment] = useCreteCommentMutation();
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const [upvoted, setUpvoted] = useState(false); // Track if the user has upvoted
  const [downvoted, setDownvoted] = useState(false);
  console.log(page);
  const id = useAppSelector(useCurrentId);

  const [postvote] = usePostVoteMutation();
  const [deletePost] = useDeleteCommentMutation();
  console.log("id", postid);
  const { data: comments, isLoading } = useGetCommetQuery({
    postid,
  });

  if (isLoading) {
    return <span>Loading..</span>;
  }
  const handleOpenModal = (id: string) => {
    setPostId(id);
    setShowModal(true);
  };
  console.log("post", comments);

  const handleUpvote = async (postId: string) => {
    // Log the postId to ensure it is defined
    console.log("Post ID before API call:", postId);

    if (!postId) {
      console.error("Post ID is missing before calling postvote");
      return;
    }

    try {
      const payload = {
        id: postId,
        user: id,
        vote: "upvote",
      };
      console.log("Payload to be sent to postvote:", payload);

      // Call the API
      const res = await postvote(payload);
      console.log("API response:", res);

      setUpvoted(!upvoted); // Toggle upvote state
      if (downvoted) setDownvoted(false); // If downvoted before, reset downvote
    } catch (error) {
      console.error("Error updating vote:", error);
    }
  };

  // Handle downvote
  const handleDownvote = async (postId: string) => {
    console.log(postId);

    const res = await postvote({
      id: postId,
      user: id,
      vote: "downvote",
    });
    console.log(res);
    setDownvoted(!downvoted);
    if (upvoted) setUpvoted(false);
  };
  const handleAddComment = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget); // Get form data
    const text = formData.get("text") as string;
    const commentInfo = {
      user: id,
      post: postid,
      text,
    };
    const tostid = toast.loading(" comment createing...");
    try {
      const res = await addComment(commentInfo); // Pass FormData to Redux action
      console.log("res", res);

      if (res.error) {
        toast.error("Something went wrong", { id: tostid });
      } else {
        toast.success("comment created successfully", { id: tostid });
      }
    } catch (error) {
      console.log("Error:", error);
    }
    // Prevent page reload on form submission
  };
  if (data?.data?.length === 0) {
    setHasMore(false); // If no more posts, stop fetching
  }
  const loadMore = () => {
    if (hasMore) {
      setPage((prevPage) => prevPage + 1); // Increment page to load more posts
    }
  };
  return (
    <InfiniteScroll
      dataLength={data?.data.length} // This is important field to render the next data
      next={loadMore} // Function to call when reaching the end
      hasMore={hasMore} // Whether more data is available
      loader={
        <h4>
          <CardLoder></CardLoder>
        </h4>
      } // Loading indicator
      endMessage={
        <p style={{ textAlign: "center" }}>
          <b>No more posts to show</b>
        </p>
      }
    >
      <div>
        {data?.data?.map((item: TPost) => (
          <div
            key={item._id}
            className="max-w-xl mt-5 bg-white shadow-md rounded-lg overflow-hidden mb-6"
          >
            {/* Post Header */}
            <div className="flex justify-between items-center px-4 py-3">
              <Link href={`/userProfile/${item?.user._id}`}>
                <div className="flex items-center">
                  <Image
                    src={item.user.image}
                    alt="User profile"
                    className="w-10 h-10 rounded-full"
                    width={40}
                    height={40}
                  />
                  <div className="ml-3">
                    <h2 className="text-sm font-semibold">
                      {item?.user.name}{" "}
                      {item?.user.verified === true ? (
                        <span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-6 text-blue-800 w-10 inline"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
                            />
                          </svg>
                        </span>
                      ) : (
                        <></>
                      )}
                    </h2>
                    <p className="text-xs text-gray-500">
                      {item.createdAt.split("T")[0]}
                    </p>
                  </div>
                </div>
              </Link>

              {/* 3 Dot Dropdown */}
              <div>
                {/* Dropdown logic for Edit/Delete goes here */}

                <DropdownToggle
                  postid={item._id}
                  userPostId={item.user._id}
                  userId={id}
                  currentCategory={item.catagory}
                  currentImage={item.image}
                  currentText={item.text}
                ></DropdownToggle>
              </div>
            </div>

            {/* Post Content */}
            <div className="px-4">
              <p className="text-sm text-gray-700">{item.text}</p>
            </div>

            {/* Post Image */}
            <div className="mt-2">
              {item.image ? (
                <Image
                  src={item.image}
                  alt="Post image"
                  className="w-full h-auto"
                  width={500}
                  height={300}
                />
              ) : (
                <p></p>
              )}
            </div>

            {/* Post Footer */}
            <div className="flex justify-between items-center px-4 py-3">
              <div className="flex items-center space-x-2">
                {/* Upvote Button */}
                <button
                  onClick={() => handleUpvote(item._id)}
                  className={`flex items-center space-x-1 ${
                    upvoted
                      ? "text-blue-500"
                      : "text-gray-600 hover:text-blue-500"
                  }`}
                >
                  <FaArrowUp />
                  <span>{item.upvote}</span>
                </button>

                {/* Downvote Button */}
                <button
                  onClick={() => handleDownvote(item._id)}
                  className={`flex items-center space-x-1 ${
                    downvoted
                      ? "text-red-500"
                      : "text-gray-600 hover:text-red-500"
                  }`}
                >
                  <FaArrowDown />
                  <span>{item.downvote}</span>
                </button>
              </div>
              {/* Comments Section */}
              <div className="px-4">
                <button
                  onClick={() => handleOpenModal(item._id)}
                  className="text-sm text-gray-500 hover:underline"
                >
                  View Comments
                </button>
              </div>
              <div>
                <button className="flex items-center text-gray-600 hover:text-blue-500 space-x-1">
                  <FaShareAlt />
                  <span>Share</span>
                </button>
              </div>
            </div>

            {/* Comments Modal */}
            {showModal && (
              <CommentModal onClose={() => setShowModal(false)}>
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-4">Comments</h3>

                  {/* List of comments */}
                  {comments?.data.map((comment: Tcommet) => (
                    <div key={comment._id} className="mb-4">
                      <div className="flex justify-between items-center">
                        <Image
                          className="rounded-full mr-3"
                          src={comment?.user.image}
                          height={40}
                          width={40}
                          alt="img"
                        ></Image>
                        <p className="text-gray-700 text-sm">{comment.text}</p>
                        <div className="flex space-x-2">
                          <button className="text-sm text-blue-500 hover:underline">
                            Edit
                          </button>
                          <button
                            onClick={() => deletePost(comment._id)}
                            className="text-sm text-red-500 hover:underline"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                      <div className="divider"></div>
                    </div>
                  ))}

                  {/* Add new comment */}
                  <div className="mt-4">
                    <form onSubmit={handleAddComment}>
                      <input
                        type="text"
                        name="text"
                        id=""
                        placeholder="Write a comment..."
                        className="block p-3 rounded-xl"
                      />
                      <button
                        type="submit"
                        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                      >
                        Post Comment
                      </button>
                    </form>
                  </div>
                </div>
              </CommentModal>
            )}
          </div>
        ))}
      </div>
    </InfiniteScroll>
  );
};

export default HomePostCard;
