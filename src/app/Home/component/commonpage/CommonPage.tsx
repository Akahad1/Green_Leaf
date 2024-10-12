"use client";
import React, { useState } from "react";
import SearchFilter from "../Filtering/Filterring";
import { useSearchInfoQuery } from "@/app/GlobalRedux/Features/userApi/userApi";
import HomePostCard from "../HomePostCartd/HomePostCartd";
import CardLoder from "@/app/(userLayout)/userProfile/componet/CardLoder/CardLoder";
interface FilterParams {
  name?: string;
  value?: string;
  // Add any other filter parameters here
}
const CommonPage = () => {
  const [param, setParm] = useState<FilterParams>({});
  const { data: AllPost, isLoading } = useSearchInfoQuery([param]);
  if (isLoading) {
    return (
      <div className="flex justify-center ">
        <CardLoder></CardLoder>
      </div>
    );
  }

  return (
    <div className="flex justify-center mt-10 mb-10 lg:mx-0 mx-4">
      <div>
        <SearchFilter setParm={setParm}></SearchFilter>
        <HomePostCard data={AllPost}></HomePostCard>
      </div>
    </div>
  );
};

export default CommonPage;
