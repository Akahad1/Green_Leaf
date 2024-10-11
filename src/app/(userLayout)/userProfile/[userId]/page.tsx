import React from "react";
import UserProfilePages from "../componet/userProfilePages/UserProfilePages";

interface Params {
  params: {
    userId: string;
  };
}

const pages: React.FC<Params> = ({ params }) => {
  return (
    <div>
      <UserProfilePages UserId={params.userId}></UserProfilePages>
    </div>
  );
};

export default pages;
