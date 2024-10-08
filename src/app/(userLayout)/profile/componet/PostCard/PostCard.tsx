"use client";
import Image from "next/image";
import { FaArrowUp, FaArrowDown, FaShareAlt } from "react-icons/fa";

const PostCard = () => {
  return (
    <div className="max-w-xl mt-5 bg-white shadow-md rounded-lg overflow-hidden mb-6">
      {/* Post Header */}
      <div className="flex items-center px-4 py-3">
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

      {/* Post Content */}
      <div className="px-4">
        <p className="text-sm text-gray-700">
          Heres a beautiful image from my recent trip!
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
        {/* Upvote/Downvote */}
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

        {/* Share Button */}
        <div>
          <button className="flex items-center text-gray-600 hover:text-blue-500 space-x-1">
            <FaShareAlt />
            <span>Share</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
