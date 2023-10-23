import React, { useState } from "react";
import axios from "axios";
import { HiMenuAlt3 } from "react-icons/hi";
import { MdOutlineDashboard } from "react-icons/md";
import { AiOutlineUser } from "react-icons/ai";
import { FiLogOut, FiMessageSquare } from "react-icons/fi";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const handleLogout = async () => {
    alert("Are you sure you want to logout");
    const token = localStorage.getItem("token");
    await axios.delete(`http://localhost:8080/api/users/logout`, {
      headers: {
        Authorization: `${token}`,
      },
    });
  };
  const menus = [
    { name: "Dashboard", link: "/dashboard", icon: MdOutlineDashboard },
    { name: "Crimes", link: "/crimes", icon: AiOutlineUser },
    { name: "Accidents", link: "/accidents", icon: FiMessageSquare },
    { name: "Logout", link: "/", icon: FiLogOut, onClick: handleLogout },
  ];

  const [open, setOpen] = useState(true);
  const [selectedMenu, setSelectedMenu] = useState(null);

  const handleMenuClick = (index) => {
    setSelectedMenu(index);
  };

  return (
    <section className="flex gap-6">
      <div
        className={`bg-[#0e0e0e] min-h-screen ${
          open ? "w-60" : "w-16"
        } duration-500 text-gray-100 px-2`}
      >
        <div className="py-2 flex justify-end">
          <HiMenuAlt3
            size={24}
            className="cursor-pointer"
            onClick={() => setOpen(!open)}
          />
        </div>
        <div className="mt-2 flex flex-col gap-3 relative">
          {menus?.map((menu, i) => (
            <Link
              to={menu.link}
              onClick={() => handleMenuClick(i)}
              key={i}
              className={`${
                menu?.margin && "mt-3"
              } group flex items-center text-xl gap-2 font-medium p-2 hover:bg-gray-800 rounded-md ${
                selectedMenu === i ? "border border-white" : ""
              }`}
            >
              <div>{React.createElement(menu?.icon, { size: "20" })}</div>
              <h2
                style={{
                  transitionDelay: `${i + 3}00ms`,
                }}
                className={`whitespace-pre duration-500 ${
                  !open && "opacity-0 translate-x-20 overflow-hidden"
                }`}
              >
                {menu?.name}
              </h2>
              <h2
                className={`${
                  open && "hidden"
                } absolute left-36 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-1 group-hover:py-1 group-hover:left-10 group-hover:duration-300 group-hover:w-fit  `}
              >
                {menu?.name}
              </h2>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Sidebar;
