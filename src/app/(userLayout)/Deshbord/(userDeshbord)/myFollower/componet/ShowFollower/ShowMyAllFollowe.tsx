import Image from "next/image";
import React from "react";

type UserData = {
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

interface ShowFollowDataProps {
  item: {
    data: UserData; // Ensure the prop includes data
    messages: string;
    success: boolean;
  };
}

const ShowMYAllFollowe: React.FC<ShowFollowDataProps> = ({ item }) => {
  const { name, image } = item.data;

  return (
    <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-md transition-transform w-96 transform hover:scale-105">
      <Image
        src={image}
        alt={`${name}'s profile`}
        width={64}
        height={64}
        className="w-16 h-16 rounded-full mb-2 object-cover"
      />
      <h2 className="text-lg font-semibold">{name}</h2>
    </div>
  );
};

export default ShowMYAllFollowe;
