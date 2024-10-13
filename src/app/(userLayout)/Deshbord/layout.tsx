/* eslint-disable react/no-children-prop */

import React from "react";
import Sidebar from "./(userDeshbord)/componet/sidebar/SideBar";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Sidebar>{children}</Sidebar>
    </div>
  );
};

export default layout;
