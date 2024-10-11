"use client";
import React, { useState } from "react";
import SearchFilter from "../Filtering/Filterring";
import { useSearchInfoQuery } from "@/app/GlobalRedux/Features/userApi/userApi";
import HomePostCard from "../HomePostCartd/HomePostCartd";
interface FilterParams {
  name?: string;
  value?: string;
  // Add any other filter parameters here
}
const CommonPage = () => {
  const [param, setParm] = useState<FilterParams>({});
  const { data: AllPost, isLoading } = useSearchInfoQuery([param]);
  if (isLoading) {
    return <p>Loding..</p>;
  }
  console.log(AllPost);
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
