import Image from "next/image";
import { FC } from "react";
import ProfileInfo from "./componet/ProfileInfo/ProfileInfo";

import PostEditor from "./componet/PostCreator/PostCreator";

const page: FC = () => {
  return (
    <div>
      <div className="bg-gray-100  p-4">
        <div className="container mx-auto bg-white rounded-lg shadow-md">
          {/* Cover Image */}
          <div className="relative">
            <Image
              src="https://www.shutterstock.com/image-photo/under-constriction-brick-road-rural-600nw-2249870461.jpg"
              alt="Cover Image"
              width={1200}
              height={300}
              className="w-full h-60 object-cover rounded-t-lg"
            />
            {/* Profile Image */}
            <div className="absolute -bottom-16 left-6 rounded-full border-4 border-white">
              <Image
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStqtktl3g6wWkAzvUAi32yzYgb-jZ0-Pn0sQ&s"
                alt="Profile Image"
                width={128}
                height={128}
                className="rounded-full"
              />
            </div>
          </div>

          {/* Profile Info */}
          <ProfileInfo></ProfileInfo>
        </div>
      </div>
      <div className="container mx-auto lg:grid-cols-8 m-10  relative w-full  bg-white ">
        <div className="lg:col-span-4 lg:sticky top-44 left-10 w-64 p-6 bg-red-200 z-50">
          <p>Photo Section</p>
        </div>
        <div className="lg:flex lg:justify-end lg:col-span-4 ">
          <div className="lg:mr-10">
            <PostEditor></PostEditor>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
