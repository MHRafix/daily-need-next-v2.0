import Image from "next/image";
import React, { useState } from "react";
import { FiMessageSquare, FiSearch } from "react-icons/fi";
import { IoMdNotificationsOutline } from "react-icons/io";
import { MdOutlineDarkMode, MdOutlineLanguage } from "react-icons/md";
import { RiBarChartHorizontalLine } from "react-icons/ri";
import UserPic from "../../../../images/logo/12.jpg";

export default function AdminPannelTopNavigation() {
  const [notification, setNotification] = useState(0);
  const [messages, setMessages] = useState(1);

  return (
    <>
      <div className="admin_pannel_top_navigation_wrapper">
        <div className="left_side_search_area">
          <div className="w-1/12 text-medium">
            <span className="cursor-pointer">
              <RiBarChartHorizontalLine />
            </span>
          </div>
          <div className="w-10/12 relative">
            <input
              type="search"
              placeholder="Search for result..."
              id="admin_pannel_search_input"
            />
            <button className="absolute right-2 top-5 text-slate-400 text-normal">
              <FiSearch />
            </button>
          </div>
        </div>
        <div className="right_side_action_icon">
          <div className="admin_pannel_header_action_icon">
            <MdOutlineLanguage /> &nbsp;
            <span className="text-light text-wider">English</span>
          </div>
          <div className="admin_pannel_header_action_icon">
            <MdOutlineDarkMode />
            {/* <MdLightMode /> */}
          </div>
          <div className="admin_pannel_header_action_icon">
            <IoMdNotificationsOutline />
            <span
              className={
                notification
                  ? "notification_counter green"
                  : "notification_counter red"
              }
            >
              0
            </span>
          </div>
          <div className="admin_pannel_header_action_icon">
            <FiMessageSquare />
            <span
              className={
                messages
                  ? "notification_counter green !bottom-8"
                  : "notification_counter purple !bottom-8"
              }
            >
              0
            </span>
          </div>
          <div className="admin_pannel_header_action_icon">
            <Image
              className="rounded-full cursor-pointer"
              src={UserPic}
              alt="profile pic"
              width={34}
              height={34}
            />
          </div>
        </div>
      </div>
    </>
  );
}