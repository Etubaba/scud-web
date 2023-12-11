import React, { useEffect, useState } from "react";
import { BsChatText, BsBell, BsPersonCircle } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import Modal from "../common/Modal";
import { notifications } from "../../dummy";
import NotificationCompo from "../common/NotificationCompo";
import { FiMenu } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import SideNav from "./SideNav";
import "animate.css";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

const ProfileHeader = () => {
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);
  const [greeting, setGreeting] = useState("");
  const userDetails = useSelector((state) => state.auth.userDetails);
  const [profilepic, setProfilePic] = useState(userDetails.picture);

  const router = useRouter();

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

  const user = useSelector((state) => state.auth.userDetails);

  return (
    <>
      <div className=" px-8 borer-b border-[1px] py-3 z-40  font-sans flex shadow-sm bg-white sticky top-0 justify-between items-center">
        <div className="space-x-4 flex">
          <div
            onClick={() => {
              setShow(!show);
            }}
            className="flex lg:hidden cursor-pointer justify-center items-center border rounded-md bg-[#DEE4FF]  px-2.5"
          >
            {show ? <IoMdClose className="text-xl" /> : <FiMenu className="text-xl" />}
          </div>
          <div onClick={() => router.push("/")} className="flex justify-center items-center">
            <img src="/scudLogo.png" className="w-10 h-10 md:mt-0.5" alt="Scud Logo" />
          </div>
        </div>

        <div className="flex space-x-6 justify-between items-center">
          <div className="flex space-x-6">
            <BsChatText className="text-[#9E9FA3] text-xl" />
            <BsBell onClick={() => setOpen(true)} className="text-[#9E9FA3]  text-xl" />
          </div>
          <div className="flex justify-center items-center">
            <img
              onClick={() => router.push("/rider_profile/profile")}
              className=" rounded-full object-cover cursor-pointer h-6 w-6  mr-2"
              src={profilepic === null || profilepic === undefined ? "/user.png" : profilepic}
            />
            <div className="text-textColor hidden md:block ">
              <p className="text-sm font-semibold">{greeting}</p>
              <p className="text-xs">{user?.first_name + " " + user?.last_name}</p>
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
      {show && (
        <div className=" w-full h-full flex">
          <div className=" animate__animated animate__fadeInLeft z-40 block  lg:hidden shadow-md  fixed  border-r h-full w-5/6 pb-24 bg-white">
            <SideNav show={show} setShow={setShow} />
          </div>

          <span
            onClick={() => setShow(!show)}
            className="animate__animated animate__fadeIn z-20 block  lg:hidden shadow-md  fixed right-0  border-r h-full w-full pb-24 bg-black/30"
          ></span>
        </div>
      )}
    </>
  );
};

export default ProfileHeader;
