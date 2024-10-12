"use client";
import { useEffect, useState } from "react";
import nexiosInstance from "@/app/config/nexios.config";
import { useCurrentId } from "@/app/GlobalRedux/Features/auth/userSlice";
import { useGetUserQuery } from "@/app/GlobalRedux/Features/userApi/userApi";
import { useAppSelector } from "@/app/GlobalRedux/hook";
import ShowFollowData from "./ShowFollowData";

type User = {
  data: {
    // Ensure this matches the structure you expect from the API
    id: string;
    name: string;
    email: string;
    phone: string;
    role: "admin" | "user";
    address: string;
    details: string;
    image: string;
    coverImage: string;
    passwordChange: boolean;
    favourite: string[];
    followers: string[];
    followed: string[];
    verified: boolean;
  };
  messages: string;
  success: boolean;
};

const FollowersList = () => {
  const id = useAppSelector(useCurrentId);
  const { data: userData, isLoading } = useGetUserQuery({ id });
  const userids = userData?.data?.followers;

  const [fetchedUserData, setFetchedUserData] = useState<User[]>([]);

  const fetchUserData = async (userIds: string[]): Promise<User[]> => {
    const userDataArray: User[] = [];

    for (const userId of userIds) {
      try {
        const response = await nexiosInstance.get(`/user/${userId}`);
        userDataArray.push(response.data as User);
      } catch (error) {
        console.error(`Error fetching data for user ID ${userId}:`, error);
      }
    }

    return userDataArray;
  };

  useEffect(() => {
    if (userids) {
      const getUserData = async () => {
        const data: User[] = await fetchUserData(userids);
        setFetchedUserData(data);
        console.log("Fetched data:", data);
      };

      getUserData();
    }
  }, [userids]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <div className="text-2xl mt-3 mb-4">My Follower</div>
      <div className="grid grid-cols-2 gap-4">
        {fetchedUserData.map((item) => (
          <ShowFollowData key={item.data.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default FollowersList;
