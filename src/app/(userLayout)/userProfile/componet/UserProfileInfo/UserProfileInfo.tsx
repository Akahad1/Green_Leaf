"use client";
import { useGetUserQuery } from "@/app/GlobalRedux/Features/userApi/userApi";

import React from "react";

interface UserProfileUserIds {
  UserId: string;
}
const UserProfileInfo: React.FC<UserProfileUserIds> = ({ UserId }) => {
  const id = UserId;
  const { data: userData, isLoading } = useGetUserQuery({ id });

  if (isLoading) {
    return <span>Loading..</span>;
  }
  const { data } = userData;

  return (
    <div>
      <div className="p-6 pt-12 text-center lg:text-left mt-5">
        <div className="lg:flex lg:justify-between lg:items-center">
          <div>
            <h1 className="text-3xl font-bold">{data.name}</h1>
            <p className="text-gray-500">Gardener | Blogger</p>
            <div className="flex flex-col lg:flex-row lg:space-x-4 space-y-2 lg:space-y-0 mt-2">
              <div>
                <span className="font-bold">Followers:</span> 1200
              </div>
              <div>
                <span className="font-bold">Address: </span>
                {data.address}
              </div>
              <div>
                <span className="font-bold">Contact:</span> {data.email}
              </div>
            </div>
          </div>
        </div>

        {/* Bio */}
        <div className="mt-4">
          <h2 className="text-xl font-bold">Bio</h2>
          <p className="text-gray-700">{data.details}</p>
        </div>
      </div>

      {/* Stats and Action Buttons */}
      <div className="p-6 border-t border-gray-200 flex justify-between items-center">
        <div className="flex space-x-4">
          <div>
            <span className="font-bold">Following:</span> 300
          </div>
        </div>
        <div>
          <button className="btn btn-primary">Follow</button>
        </div>
      </div>
    </div>
  );
};

export default UserProfileInfo;
