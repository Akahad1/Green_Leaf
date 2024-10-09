"use client";
import Image from "next/image";
import {
  FaArrowUp,
  FaArrowDown,
  FaShareAlt,
  FaEllipsisH,
} from "react-icons/fa";
import { useState } from "react";
import dynamic from "next/dynamic";
import { EditorState } from "draft-js";
import CommentModal from "../comentModal/CommentModal";

// Dynamically import Draft.js editor
const Editor = dynamic(() => import("draft-js").then((mod) => mod.Editor), {
  ssr: false,
});

const PostCard: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [comments, setComments] = useState<string[]>([]); // Simplified comment state

  // Handle opening the modal
  const handleOpenModal = () => {
    setShowModal(true);
  };

  // Handle adding a new comment (you can implement backend logic)
  const handleAddComment = () => {
    const newComment = editorState.getCurrentContent().getPlainText(); // Get comment text
    setComments([...comments, newComment]);
    setEditorState(EditorState.createEmpty()); // Reset editor after posting
  };

  return (
    <div className="max-w-xl mt-5 bg-white shadow-md rounded-lg overflow-hidden mb-6">
      {/* Post Header */}
      <div className="flex justify-between items-center px-4 py-3">
        <div className="flex items-center">
          <Image
            src="https://via.placeholder.com/40"
            alt="User profile"
            className="w-10 h-10 rounded-full"
            width={40}
            height={40}
          />
          <div className="ml-3">
            <h2 className="text-sm font-semibold">John Doe</h2>
            <p className="text-xs text-gray-500">2 hours ago</p>
          </div>
        </div>

        {/* 3 Dot Dropdown */}
        <div className="relative">
          <button className="text-gray-600 hover:text-gray-800">
            <FaEllipsisH />
          </button>
          {/* Dropdown logic for Edit/Delete goes here */}
        </div>
      </div>

      {/* Post Content */}
      <div className="px-4">
        <p className="text-sm text-gray-700">
          Here’s a beautiful image from my recent trip!
        </p>
      </div>

      {/* Post Image */}
      <div className="mt-2">
        <Image
          src="https://via.placeholder.com/500x300"
          alt="Post image"
          className="w-full h-auto"
          width={500}
          height={300}
        />
      </div>

      {/* Post Footer */}
      <div className="flex justify-between items-center px-4 py-3">
        <div className="flex items-center space-x-2">
          <button className="text-gray-600 hover:text-blue-500 flex items-center space-x-1">
            <FaArrowUp />
            <span>10</span>
          </button>
          <button className="text-gray-600 hover:text-red-500 flex items-center space-x-1">
            <FaArrowDown />
            <span>2</span>
          </button>
        </div>
        <div>
          <button className="flex items-center text-gray-600 hover:text-blue-500 space-x-1">
            <FaShareAlt />
            <span>Share</span>
          </button>
        </div>
      </div>

      {/* Comments Section */}
      <div className="px-4">
        <button
          onClick={handleOpenModal}
          className="text-sm text-gray-500 hover:underline"
        >
          View Comments
        </button>
      </div>

      {/* Comments Modal */}
      {showModal && (
        <CommentModal onClose={() => setShowModal(false)}>
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-4">Comments</h3>

            {/* List of comments */}
            {comments.map((comment, index) => (
              <div key={index} className="mb-4">
                <div className="flex justify-between items-center">
                  <p className="text-gray-700">{comment}</p>
                  <div className="flex space-x-2">
                    <button className="text-sm text-blue-500 hover:underline">
                      Edit
                    </button>
                    <button className="text-sm text-red-500 hover:underline">
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {/* Add new comment */}
            <div className="mt-4">
              <Editor
                editorState={editorState}
                onChange={setEditorState}
                placeholder="Write a comment..."
              />
              <button
                onClick={handleAddComment}
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Post Comment
              </button>
            </div>
          </div>
        </CommentModal>
      )}
    </div>
  );
};

export default PostCard;
