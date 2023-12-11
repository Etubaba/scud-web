import React, { useState } from "react";
import {
  BsChatText,
  BsBell,
  BsPersonCircle,
  BsSearch,
  BsClockHistory,
  BsArrowRightShort
} from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import Modal from "../common/Modal";
import { notifications } from "../../dummy";
import NotificationCompo from "../common/NotificationCompo";
import { FiMenu } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import SideNav from "./SideNav";
import "animate.css";
import { useDispatch, useSelector } from "react-redux";
import { handleAdminSideBar } from "../../features/scudSlice";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { sideNavList } from "./list";

const ProfileHeader = () => {
  const adminDetails = useSelector((state) => state.auth.adminDetails);
  const adminSidebar = useSelector((state) => state.scud.isAdminSideBar);
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [inputOutline, setInputOutline] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchvalue, setSearchValue] = useState("");
  const [profilepic, setProfilePic] = useState(adminDetails?.picture);

  const handleSideBar = () => {
    dispatch(handleAdminSideBar(!adminSidebar));
  };
  const router = useRouter();

  const today = new Date();
  var hour = today.getHours();

  const greeting =
    hour < 12 ? "Good morning" : hour >= 12 && hour < 16 ? "Good afternoon" : "Good evening";

  return (
    <>
      <div className=" px-8  border-b  py-3 z-40  font-sans flex shadow-sm bg-white  top-0 justify-between items-center">
        <div className="space-x-4 flex">
          <div
            onClick={handleSideBar}
            className="flex  cursor-pointer -ml-4 justify-center items-center border rounded-md bg-[#DEE4FF]  p-1.5"
          >
            {!adminSidebar ? <IoMdClose className="text-2xl" /> : <FiMenu className="text-2xl" />}
          </div>

          <div
            className={`${
              inputOutline ? "border-scudGreen" : ""
            } md:flex relative hidden px-2 py-1 w-[27rem] border rounded-lg bg-adminbg`}
          >
            <input
              onChange={(e) => {
                setSearchValue(e.target.value.toLowerCase());
                setShowSearch(true);
              }}
              onFocus={() => {
                setInputOutline(true), setShowSearch(true);
              }}
              onBlur={() => setInputOutline(false)}
              placeholder="Search here..."
              className=" outline-none placeholder:text-xs  w-full bg-white"
              type={"text"}
            />
            <div className="bg-scudGreen  p-[7px] rounded-full flex justify-center items-center">
              <BsSearch className="text-white text-sm" />
            </div>
            {showSearch && (
              <div
                onMouseLeave={() => setShowSearch(false)}
                onClick={(e) => e.stopPropagation()}
                className="absolute bg-white animate__animated overflow-auto animate__fadeIn mt-10 right-0.5 z-50 shadow-lg rounded-lg w-[27rem] max-h-60 h-60"
              >
                {sideNavList.map((element, index) =>
                  element.child
                    .filter((params) => {
                      return params.text.toLowerCase().includes(searchvalue);
                    })
                    .map((items, index) => (
                      <Link  key={index} href={"/admin" + items.href}>
                        <a>
                          <div className="flex italic space-x-4 items-center px-5 hover:bg-slate-100 cursor-pointer py-2">
                            <div>
                              <BsClockHistory />
                            </div>
                            <div className="w-full">
                              <p className="text-sm hover:underline hover:text-scudGreen">
                                {items.text}
                              </p>
                            </div>
                            <div className="flex justify-end items-end w-full">
                              <BsArrowRightShort className="text-xl" />
                            </div>
                          </div>
                        </a>
                      </Link>
                    ))
                )}
              </div>
            )}
          </div>
        </div>

        <div className="flex space-x-6 justify-between items-center mr-14">
          <div className="flex space-x-6">
            <div>
              {" "}
              <BsChatText className="text-textColor cursor-pointer text-xl" />
            </div>

            <BsBell
              onClick={() => setOpen(true)}
              className="text-textColor cursor-pointer  text-xl"
            />
          </div>
          <div className="flex justify-center items-center">
            <img
              onClick={() => router.push("/admin/profile")}
              className=" rounded-full object-cover cursor-pointer h-6 w-6  mr-2"
              src={profilepic === null || profilepic === undefined ? "/user.png" : profilepic}
            />{" "}
            <div className="text-textColor hidden md:block ">
              <p className="text-sm font-semibold">{greeting}</p>
              <p className="text-xs">{adminDetails?.first_name + " " + adminDetails?.last_name}</p>
            </div>
          </div>
        </div>

        <Modal notification={true} open={open} onClose={() => setOpen(false)}>
          <div className="animate__fadeInRight animate__animated">
            {notifications.map((note) => (
              <NotificationCompo key={note.id} item={note} />
            ))}
          </div>
        </Modal>
      </div>
      {!adminSidebar && (
        <div className=" w-full h-full flex">
          <span className=" animate__animated animate__fadeInLeft z-40 block  lg:hidden shadow-md  fixed   h-full w-5/6 pb-24 bg-white">
            <SideNav />
          </span>
          <span
            onClick={() => dispatch(handleAdminSideBar(!adminSidebar))}
            className="animate__animated animate__fadeIn z-20 block  lg:hidden shadow-md  fixed right-0  border-r h-full w-full pb-24 bg-black/30"
          ></span>
        </div>
      )}
    </>
  );
};

export default ProfileHeader;
