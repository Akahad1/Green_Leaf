import type { Metadata } from "next";
import Nabver from "./Nabar/Nabver";

export const metadata: Metadata = {
  title: "Apollo Gears",
  description: "Next Level Riding Sharing Service",
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-gray-100">
      <Nabver></Nabver>
      {children}
    </div>
  );
}
