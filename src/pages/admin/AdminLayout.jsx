/* eslint-disable react/prop-types */
import { MdOutlineDashboard } from "react-icons/md";
import { Outlet } from "react-router-dom";
import Sidebar from "../../common/Sidebar";

import { FaCarSide, FaHome, FaUsers } from "react-icons/fa";
import { MdDeviceHub } from "react-icons/md";

const menuItems = [
  {
    label: "Analytics",
    items: [
      {
        name: "Dashboard",
        href: "/admin/dashboard",
        icon: MdOutlineDashboard,
      },
      {
        name: "Users",
        href: "/admin/users",
        icon: FaUsers,
      },
      {
        name: "Devices",
        href: "/admin/devices",
        icon: MdDeviceHub,
      },
      {
        name: "Vehicles",
        href: "/admin/vehicles",
        icon: FaCarSide,
      },
    ],
  },
  {
    label: "Content",
    items: [
      {
        name: "Guides",
        href: "/admin/guides",
        icon: FaHome,
      },
    ],
  },
];

const AdminLayout = () => {
  return (
    <div className='w-full py-14 md:max-w-[1480px] m-auto max-w-[600px] px-4 md:px-0'>
      <div>
        <div className='flex h-screen'>
          <div className='w-2/12'>
            <Sidebar menuItems={menuItems} />
          </div>
          <div className='w-10/12 p-4 mt-10'>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
