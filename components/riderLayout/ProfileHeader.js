import React, { useEffect, useRef, useState } from "react";
import { BsChatText, BsBell, BsPersonCircle, BsThreeDots, BsCheck2All } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { FiMenu } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import { handleResizeDiv } from "../../features/scudSlice";
import { useSelector, useDispatch } from "react-redux";
import Modal from "../common/Modal";
import { reasons } from "../../dummy";
import Button from "../common/Button";
import { IoSendOutline } from "react-icons/io5";
import SideNav from "./SideNav";
import { useRouter } from "next/router";

const ProfileHeader = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const show = useSelector((state) => state.scud.resizeDiv);
  const userDetails = useSelector((state) => state.auth.userDetails);
  const [profilepic, setProfilePic] = useState(userDetails.picture);

  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    function greet() {
      const today = new Date();
      var hour = today.getHours();

      if (hour < 12) {
        setGreeting("Good Morning");
      } else if (hour < 16) {
        setGreeting("Good Afternoon");
      } else {
        setGreeting("Good Evening");
      }
    }
    greet();
  }, []);
  return (
    <>
      <div className=" px-8 borer-b border-[1px] py-3  font-sans flex shadow-sm bg-white sticky top-0  justify-between items-center">
        <div className="flex justify-center items-center space-x-4">
          <div
            onClick={() => {
              dispatch(handleResizeDiv(!show));
            }}
            className="flex cursor-pointer justify-center items-center border rounded-md bg-[#DEE4FF] p-1"
          >
            {show ? <IoMdClose className="text-xl" /> : <FiMenu className="text-xl" />}
          </div>
          <img
            onClick={() => router.push("/")}
            src="/scudLogo.png"
            className="w-10 cursor-pointer h-10 mt-0.5"
            alt="Scud Logo"
          />
        </div>

        <div className="flex space-x-6 justify-between items-center">
          <div className="flex space-x-6">
            <BsChatText
              onClick={() => setChatDriver(true)}
              className="cursor-pointer text-[#9E9FA3] text-xl"
            />
            <BsBell className="text-[#9E9FA3] cursor-pointer text-xl" />
          </div>
          <div className="flex justify-center items-center">
            <img
              onClick={() => router.push("/rider_profile/profile")}
              className=" rounded-full object-cover cursor-pointer h-6 w-6  mr-2"
              src={profilepic === null || profilepic === undefined ? "/user.png" : profilepic}
            />
            <div className="text-textColor hidden md:block ">
              <p className="text-sm font-semibold">{greeting}</p>
              <p className="text-xs">{userDetails?.first_name}</p>
            </div>
          </div>
        </div>
      </div>
      <div className=" w-full h-full flex">
        {show && (
          <div className=" animate__animated animate__fadeInLeft z-40 block  lg:hidden shadow-md  fixed  border-r h-full w-5/6 pb-24 bg-white">
            <SideNav />
          </div>
        )}
        {show && (
          <span
            onClick={() => dispatch(handleResizeDiv(!show))}
            className="animate__animated animate__fadeIn z-20 block  lg:hidden shadow-md  fixed right-0  border-r h-full w-full pb-24 bg-black/30"
          ></span>
        )}
      </div>
    </>
  );
};

export default ProfileHeader;
