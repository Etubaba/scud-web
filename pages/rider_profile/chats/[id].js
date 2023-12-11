import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { BsCheck2All, BsFileEarmark, BsThreeDots } from "react-icons/bs";
import { FaPhotoVideo } from "react-icons/fa";
import { FiPhoneCall } from "react-icons/fi";
import { IoIosArrowBack, IoMdImages } from "react-icons/io";
import { RiSendPlaneFill, RiSendPlaneLine } from "react-icons/ri";
import Layout from "../../../components/riderLayout/Layout";
import "animate.css";

function chat() {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [actionMenu, setActionMenu] = useState(false);
  const [messages, setMessages] = useState([
    {
      message: "Hello sir",
      time: "12:00",
      sender: "user",
    },
    {
      message:
        "Hello! I’m Shola from Scud and i’m your account officer, we realize you’ve not completed your vehicle registration on your portal",
      time: "12:05",
      sender: "admin",
    },
    {
      message: "Please are there any challenges",
      time: "12:08",
      sender: "admin",
    },
  ]);
  const messageRef = useRef();

  useEffect(() => {
    if (messageRef.current) {
      messageRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
    }
  }, [messages]);

  const handleMessage = (e) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = () => {
    if (message) {
      setMessages([
        ...messages,
        {
          message: message,
          time: new Date().toLocaleTimeString(),
          sender: "user",
        },
      ]);
      setMessage("");
    }
  };
  return (
    <div className="p-5">
      <div className="bg-white p-3 shadow-sm rounded-md fixed w-4/5 top-[4.5rem] ">
        <div
          onClick={() => router.push("/driver_profile/support")}
          className="  cursor-pointer flex w-20 space-x-2 rounded-md p-1  "
        >
          <div className="bg-[#CCD6FF]/50 hover:bg-[#CCD6FF]/30 rounded-md p-1 ">
            <IoIosArrowBack className="text-textColor" />
          </div>
          <p className=" text-textColor mt-0.5 hover:text-textColor/30 text-sm tracking-wide">
            Back
          </p>
        </div>
      </div>
      <div className="mt-20">
        <div className="mb-10 items-center">
          <div className="rounded-md shadow-sm flex justify-between   items-center p-4 my-4 border w-full">
            <div className="flex space-x-2">
              <div className="">
                {/* profile upload section ################################## */}
                <img
                  className="rounded-full h-16 w-16"
                  src="/user.png"
                  alt="profile_img"
                />
              </div>
              <div className="">
                <div className="my-1">
                  <p className="font-semibold">James Anderson</p>
                </div>
                <div className="my-1">
                  <p className="text-scudGreen text-sm">
                    last online 5 hours ago
                  </p>
                </div>
              </div>
            </div>
            <div className=" flex justify-evenly w-1/6">
              <div className="flex justify-center items-center rounded-full shadow-md hover:bg-[#CCD6FF] px-2  p-1.5 cursor-pointer ">
                <FiPhoneCall className="mt-1 text-scudGreen" />
              </div>
              <div className="flex justify-center items-center hover:bg-[#CCD6FF] shadow-md px-2 rounded-full p-1.5 cursor-pointer ">
                <BiDotsVerticalRounded className="mt-1 text-scudGreen" />
              </div>
            </div>
          </div>
        </div>

        {/* ############################################################################################################################################ */}

        <div className="mb-20">
          {/* chat section ################################################################## */}

          {messages.map((msg, index) =>
            msg.sender !== "admin" ? (
              <div key={index} className="flex flex-col w-full my-2">
                <div className="flex justify-end">
                  <div>
                    <div className="flex justify-center items-center space-x-3">
                      <BsThreeDots className="cursor-pointer hover:text-scudGreen" />
                      <div className=" p-2 rounded-t-md rounded-bl-md border max-w-[350px]">
                        <p>{msg.message}</p>
                      </div>{" "}
                      <BsCheck2All />
                    </div>
                    <div className="flex justify-end">
                      <p className="text-xs text-[#9E9FA3] mr-8">{msg.time}</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div key={index} className="flex flex-col w-full my-2">
                <div className="flex justify-start">
                  <div>
                    <div className="flex justify-center items-center space-x-3">
                      <BsThreeDots className="cursor-pointer hover:text-scudGreen" />
                      <div className="bg-gradient-to-r from-sky-500 to-indigo-500 p-2 rounded-t-md rounded-br-md border max-w-[350px]">
                        <p className="text-white">{msg.message}</p>
                      </div>{" "}
                      <BsCheck2All />
                    </div>
                    <div className="flex justify-start">
                      <p className="text-xs text-[#9E9FA3] ml-8">{msg.time}</p>
                    </div>
                  </div>
                </div>
              </div>
            )
          )}
          <span ref={messageRef}></span>
        </div>
      </div>
      {/* chat input section ####################################################### */}
      <div className="flex  justify-center items-center fixed left-0 bottom-0 px-3 md:px-0 md:left-auto w-full md:w-[95%] lg:w-4/5 rounded-md bg-white shadow-md">
        <div className="flex  items-center w-full md:w-4/5 mt-4">
          {actionMenu && (
            <div className="flex absolute bottom-20 left-[1rem] md:left-[6rem] lg:left-[6.5rem]   flex-col justify-center items-center  space-y-3">
              <div className="p-3 shadow-lg rounded-full animate__animated animate__bounceIn cursor-pointer bg-scudGreen">
                <FaPhotoVideo className="text-white" />
              </div>
              <div className="p-3 shadow-lg rounded-full animate__animated animate__bounceIn cursor-pointer bg-scudGreen">
                <IoMdImages className="text-white" />
              </div>
              <div className="p-3 shadow-lg rounded-full animate__animated animate__bounceIn cursor-pointer bg-scudGreen">
                <BsFileEarmark className="text-white" />
              </div>
            </div>
          )}
          <div
            onClick={() => {
              setActionMenu(!actionMenu);
            }}
            className="p-3 rounded-full cursor-pointer bg-scudGreen"
          >
            <AiOutlinePlus className="text-white" />
          </div>
          <div className="w-full mx-1 md:mx-5 ">
            <textarea
              rows={1}
              //   cols={1}
              onChange={handleMessage}
              value={message}
              className="w-full outline-none focus:border-0 resize-none p-2 bg-[#CCD6FF]  rounded-md"
              placeholder="Type a message here"
            ></textarea>
          </div>
          <div
            onClick={() => handleSendMessage()}
            className="p-3 cursor-pointer rounded-full bg-scudGreen"
          >
            <RiSendPlaneFill className="text-white " />
          </div>
        </div>
      </div>
    </div>
  );
}

chat.getLayout = Layout;
export default chat;
