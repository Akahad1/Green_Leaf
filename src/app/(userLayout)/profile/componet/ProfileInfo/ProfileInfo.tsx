import React from "react";

const ProfileInfo = () => {
  return (
    <div>
      <div className="p-6 pt-12 text-center lg:text-left mt-5">
        <div className="lg:flex lg:justify-between lg:items-center">
          <div>
            <h1 className="text-3xl font-bold">John Doe</h1>
            <p className="text-gray-500">Gardener | Blogger</p>
            <div className="flex flex-col lg:flex-row lg:space-x-4 space-y-2 lg:space-y-0 mt-2">
              <div>
                <span className="font-bold">Followers:</span> 1200
              </div>
              <div>
                <span className="font-bold">Address:</span> 123 Green Lane, NY
              </div>
              <div>
                <span className="font-bold">Contact:</span> johndoe@example.com
              </div>
            </div>
          </div>
        </div>

        {/* Bio */}
        <div className="mt-4">
          <h2 className="text-xl font-bold">Bio</h2>
          <p className="text-gray-700">
            Passionate gardener and plant enthusiast. I share tips and tricks on
            gardening, plant care, and how to create the perfect green oasis at
            home.
          </p>
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
          <button className="btn btn-primary">Follow</button>
          <button className="btn btn-outline ml-2">Message</button>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
