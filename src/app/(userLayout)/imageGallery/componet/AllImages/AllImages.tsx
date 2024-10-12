"use client";
import CardLoder from "@/app/(userLayout)/userProfile/componet/CardLoder/CardLoder";
import { useCurrentId } from "@/app/GlobalRedux/Features/auth/userSlice";
import { useGetPostQuery } from "@/app/GlobalRedux/Features/userApi/userApi";
import { useAppSelector } from "@/app/GlobalRedux/hook";
import { TPost } from "@/types/gobal.type";
import React from "react";
import ImageCard from "../ImageCard/ImageCard";

const AllImageGallery = () => {
  const id = useAppSelector(useCurrentId);
  const { data: AllPost, isLoading } = useGetPostQuery({ id });
  if (isLoading) {
    return <CardLoder></CardLoder>;
  }
  console.log("allpost", AllPost);
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4 ml-4 min-h-screen">
        {AllPost?.data.map((item: TPost) => (
          <ImageCard key={item._id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default AllImageGallery;
