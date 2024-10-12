"use client";
import { FC } from "react";
import ProfileInfo from "./componet/ProfileInfo/ProfileInfo";

import PostEditor from "./componet/PostCreator/PostCreator";
import PostCard from "./componet/PostCard/PostCard";
import ProfileImage from "./componet/profileImage/ProfileImage";
import Follwer from "./componet/Follower/Follwer";

const page: FC = () => {
  return (
    <div>
      <div className="bg-gray-100  p-4">
        <div className="container mx-auto bg-white rounded-lg shadow-md">
          {/* Cover Image */}
          <ProfileImage></ProfileImage>

          {/* Profile Info */}
          <ProfileInfo></ProfileInfo>
        </div>
      </div>

      <div className="container mx-auto lg:grid lg:grid-cols-12 lg:m-10 mt-10  relative w-full  bg-gray-100 ">
        <div className="lg:col-span-5 hidden w-full lg:static lg:flex h-32 top-64 mt-10 left-10 p-6   ml-16">
          <Follwer></Follwer>
        </div>
        <div className=" lg:col-span-7 ">
          <div className="lg:mr-10 lg:ml-10 m-5 lg:m-0">
            <PostEditor></PostEditor>
            <PostCard></PostCard>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
