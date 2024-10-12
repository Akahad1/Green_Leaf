"use client";

import { useGetUserQuery } from "@/app/GlobalRedux/Features/userApi/userApi";

import Image from "next/image";
import React from "react";

interface UserProfileUserId {
  UserId: string;
}
const UserProfileImage: React.FC<UserProfileUserId> = ({ UserId }) => {
  const id = UserId;
  const { data: userData, isLoading } = useGetUserQuery({ id });

  if (isLoading) {
    return (
      <span>
        <div className="relative">
          {/* Cover Image Loader */}
          <div className="w-full h-60 bg-gray-300 animate-pulse rounded-t-lg"></div>

          {/* Profile Image Loader */}
          <div className="absolute -bottom-16 left-6 rounded-full border-4 border-white">
            <div className="w-32 h-32 bg-gray-300 animate-pulse rounded-full"></div>
          </div>
        </div>
      </span>
    );
  }

  return (
    <div>
      <div className="relative">
        {/* Cover Image */}
        {userData?.data?.coverImage ? (
          <Image
            src={userData?.data.coverImage}
            alt="Cover Image"
            width={1200}
            height={300}
            className="w-full  h-60  object-cover rounded-t-lg"
          />
        ) : (
          <Image
            src="https://www.shutterstock.com/image-photo/under-constriction-brick-road-rural-600nw-2249870461.jpg"
            alt="Cover Image"
            width={1200}
            height={300}
            className="w-full h-60 object-cover rounded-t-lg"
          />
        )}

        {/* Profile Image */}
        <div className="absolute -bottom-16 left-6 rounded-full border-4 border-white">
          {userData?.data?.image ? (
            <Image
              src={userData?.data.image}
              alt="Profile Image"
              width={108}
              height={128}
              className="rounded-full w-full "
            />
          ) : (
            <Image
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStqtktl3g6wWkAzvUAi32yzYgb-jZ0-Pn0sQ&s"
              alt="Profile Image"
              width={128}
              height={128}
              className="rounded-full"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfileImage;
