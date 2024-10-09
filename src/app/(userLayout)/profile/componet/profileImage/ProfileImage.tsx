"use client ";

import { useCurrentId } from "@/app/GlobalRedux/Features/auth/userSlice";
import { useGetUserQuery } from "@/app/GlobalRedux/Features/userApi/userApi";
import { useAppSelector } from "@/app/GlobalRedux/hook";
import Image from "next/image";
import React from "react";

const ProfileImage = () => {
  const id = useAppSelector(useCurrentId);
  const { data: userData, isLoading } = useGetUserQuery({ id });
  console.log(userData);
  console.log(id);
  if (isLoading) {
    return <span>Loading..</span>;
  }
  return (
    <div>
      <div className="relative">
        {userData ? (
          <Image
            src={userData?.data.coverImage}
            alt="Cover Image"
            width={1200}
            height={300}
            className="w-full h-60 object-cover rounded-t-lg"
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
          {userData ? (
            <Image
              src={userData?.data.image}
              alt="Profile Image"
              width={128}
              height={128}
              className="rounded-full"
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

export default ProfileImage;
