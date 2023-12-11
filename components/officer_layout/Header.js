import React, { useState } from "react";
import { BsChatText, BsBell, BsPersonCircle, BsSearch } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import Modal from "../common/Modal";
import { notifications } from "../../dummy";
import NotificationCompo from "../common/NotificationCompo";
import { FiMenu } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import SideNav from "./SideNav";
import "animate.css";
import { useDispatch, useSelector } from "react-redux";
import { handleOfficerSideBar } from "../../features/scudSlice";

const ProfileHeader = () => {
  const officerSideBar = useSelector((state) => state.scud.officerSideBar);
  const user = useSelector((state) => state.auth.adminDetails);
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);

  const handleSideBar = () => {
    dispatch(handleOfficerSideBar(!officerSideBar));
  };
  const today = new Date();
  const hour = today.getHours();
  const profilepic = user.picture;

  const greeting =
    hour < 12 ? "Good morning" : hour >= 12 && hour < 16 ? "Good afternoon" : "Good evening";

  return (
    <>
      <div className=" px-8  border-b  py-3 z-40  font-sans flex shadow-sm bg-white  top-0 justify-between items-center">
        <div className="space-x-4 flex">
          {/* <div
            onClick={() => {
              setShow(!show);
            }}
            className="flex lg:hidden cursor-pointer justify-center items-center border rounded-md bg-[#DEE4FF]  px-2.5"
          >
            {show ? (
              <IoMdClose className="text-xl" />
            ) : (
              <FiMenu className="text-xl" />
            )}
          </div> */}
          <div
            onClick={handleSideBar}
            className="flex  cursor-pointer -ml-4 justify-center items-center border rounded-md bg-[#DEE4FF]  p-1.5"
          >
            {!officerSideBar ? <IoMdClose className="text-2xl" /> : <FiMenu className="text-2xl" />}
          </div>

          <div className=" md:flex hidden px-2 py-1 w-[27rem] border rounded-lg bg-adminbg">
            <input
              placeholder="Search here..."
              className=" outline-none placeholder:text-xs  w-full bg-white"
              type={"text"}
            />
            <div className="bg-scudGreen p-[7px] rounded-full flex justify-center items-center">
              <BsSearch className="text-white text-sm" />
            </div>
          </div>
        </div>

        <div className="flex space-x-6 justify-between items-center mr-14">
          <div className="flex space-x-6">
            <BsChatText className="text-textColor text-xl" />
            <BsBell onClick={() => setOpen(true)} className="text-textColor  text-xl" />
          </div>
          <div className="flex justify-center items-center">
            <img
              className=" rounded-full object-cover cursor-pointer h-6 w-6  mr-2"
              src={profilepic === null || profilepic === undefined ? "/user.png" : profilepic}
            />{" "}
            <div className="text-textColor hidden md:block ">
              <p className="text-sm font-semibold">{greeting},</p>
              <p className="text-xs text-textColor">{user?.first_name + " " + user?.last_name}</p>
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
      <div className=" w-full h-full flex">
        {!officerSideBar && (
          <div className=" animate__animated animate__fadeInLeft z-40 block  lg:hidden shadow-md  fixed   h-full w-5/6 pb-24 bg-white">
            <SideNav />
          </div>
        )}
        {!officerSideBar && (
          <span className="animate__animated animate__fadeIn z-20 block  lg:hidden shadow-md  fixed right-0  border-r h-full w-full pb-24 bg-black/30"></span>
        )}
      </div>
    </>
  );
};

export default ProfileHeader;
