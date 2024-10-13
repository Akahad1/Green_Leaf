"use client";
import CardLoder from "@/app/(userLayout)/userProfile/componet/CardLoder/CardLoder";
import { useGetAllUserQuery } from "@/app/GlobalRedux/Features/userApi/userApi";
import { TUser } from "@/types/gobal.type";
import Image from "next/image";
import React from "react";

const GetAllUser = () => {
  const { data: AllUser, isLoading } = useGetAllUserQuery({});
  if (isLoading) {
    return <CardLoder></CardLoder>;
  }
  console.log("getall", AllUser);
  return (
    <div className="lg:flex lg:justify-center">
      <div>
        <div className="text-xl text-center mt-4 mb-5">All User</div>
        {AllUser?.data?.map((item: TUser) => (
          <div key={item._id} className="overflow-x-auto lg:ml-10 ">
            <table className="table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                <tr>
                  <td>
                    <div className="flex items-center gap-3 w-52">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <Image
                            src={item?.image}
                            height={20}
                            width={20}
                            alt="name"
                          ></Image>
                        </div>
                      </div>
                    </div>
                  </td>

                  <td>
                    <div className="font-bold w-52">{item?.name}</div>
                  </td>
                  <td>
                    <div className="font-bold w-52">{item?.email}</div>
                  </td>
                </tr>
                {/* row 2 */}

                {/* row 3 */}

                {/* row 4 */}
              </tbody>
              <div className="divider w-full"></div>
            </table>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GetAllUser;
