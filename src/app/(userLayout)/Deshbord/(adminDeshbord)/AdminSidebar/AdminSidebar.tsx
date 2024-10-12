"use client";

import { useState } from "react";
import Link from "next/link";
import { FiMenu, FiX } from "react-icons/fi";
const AdminSidebar = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex container mx-auto mt-6">
      {/* Sidebar for desktop */}
      <div className="hidden md:flex flex-col w-64 h-screen bg-blue-600 text-white p-4">
        <nav className="space-y-4"></nav>
      </div>

      {/* Mobile Sidebar */}
      <div className="md:hidden  lg:hidden ">
        <button className=" p-2 inline h-24" onClick={toggleSidebar}>
          {isOpen ? <FiX size={14} /> : <FiMenu size={14} />}
        </button>

        {/* Sliding Sidebar */}
        <div
          className={`fixed inset-y-0 left-0 z-50 w-64 bg-blue-600 text-white transform ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 ease-in-out`}
        >
          <div className="p-4">
            <nav className="space-y-4">
              <Link href="/adminDeshbord/allUser">
                <li className="block text-white hover:bg-blue-700 px-3 py-2 rounded-md">
                  All User
                </li>
              </Link>
              <Link href="/adminDeshbord/Activiy">
                <li className="block text-white hover:bg-blue-700 px-3 py-2 rounded-md">
                  Activiy
                </li>
              </Link>
            </nav>
          </div>
        </div>
      </div>

      {/* Main content */}
      <main className=" w-full mt-10 lg:mr-0 mr-5 min-h-screen">
        <div>{children}</div>

        <p></p>
      </main>
    </div>
  );
};

export default AdminSidebar;
