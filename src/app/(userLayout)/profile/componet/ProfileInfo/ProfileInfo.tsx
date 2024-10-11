import { useCurrentId } from "@/app/GlobalRedux/Features/auth/userSlice";
import {
  useGetUserQuery,
  useUpdateUserMutation,
} from "@/app/GlobalRedux/Features/userApi/userApi";
import { useAppSelector } from "@/app/GlobalRedux/hook";
import React, { useState } from "react";
import { toast } from "sonner";

const ProfileInfo = () => {
  const id = useAppSelector(useCurrentId);
  const { data: userData, isLoading } = useGetUserQuery({ id });
  const [UpdateData] = useUpdateUserMutation();

  const [isModalOpen, setIsModalOpen] = useState(false); // Manage modal visibility
  // Manage form values

  if (isLoading) {
    return <span>Loading..</span>;
  }
  const { data } = userData;

  // Function to open modal and pre-fill form with existing values
  const openModal = async () => {
    setIsModalOpen(true);
  };

  // Function to handle modal close
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const name = form.Fullname.value;
    const address = form.address.value;
    const details = form.bio.value;
    console.log(name, address, details);

    const tostID = toast.loading("Update Data..");
    try {
      const info = {
        user: id,
        data: {
          name,
          address,
          details,
        },
      };

      const res = await UpdateData(info);
      console.log(res);
      if (res.error) {
        toast.error("SomeThing is Rong", { id: tostID });
      } else {
        toast.success("Upadate succesfuly ", { id: tostID });
        closeModal();
      }
    } catch (error) {
      console.log("error", error);
    }
    // Call API to update the user details, then close the modal
  };

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
            <span className="font-bold">Posts:</span> 56
          </div>
          <div>
            <span className="font-bold">Following:</span> 300
          </div>
        </div>
        <div>
          <button className="btn btn-primary" onClick={openModal}>
            Update Bio
          </button>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
            <h2 className="text-2xl font-bold mb-4">Update Information</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block font-bold mb-1">Name</label>
                <input
                  type="text"
                  name="Fullname"
                  className="input input-bordered w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block font-bold mb-1">Address</label>
                <input
                  type="text"
                  name="address"
                  className="input input-bordered w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block font-bold mb-1">Bio</label>
                <textarea
                  name="bio"
                  className="textarea textarea-bordered w-full"
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  className="btn btn-secondary mr-2"
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileInfo;
