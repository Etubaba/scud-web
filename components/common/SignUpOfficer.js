import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { MdLocationPin } from "react-icons/md";
import NumberSelect from "./NumberSelect";
import { AiOutlineSend } from "react-icons/ai";

function SignUpOfficer({ signin, avatar, status, name, location }) {
  const router = useRouter();
  return (
    // <div>
    <div className="bg-white shadow-md rounded-md w-full md:w-[470px]  m p-5 ">
      <div className="">
        <p className="text-center text-[#1e202a] font-semibold">
          {signin ? "Sign in as driver" : "Sign up as driver"}
        </p>
        <p className="text-center text-[#7c7f8a] text-sm mb-5">Your Account Officer</p>
        <div>
          <div className=" hover:border hover:shadow-md flex justify-between rounded-md border px-2 md:px-3">
            <div className={" flex rounded-md p-2 space-x-3 cursor-pointer "}>
              <div className="relative block">
                <img src={avatar} alt="" loading="lazy" className="rounded-full h-12 w-12" />
                <div
                  className={
                    status === "online"
                      ? "md:h-2 h-1.5 w-1.5 md:w-2 absolute border border-white ml-[25px] -mt-4 rounded-full bg-green-500"
                      : "h-2 w-2 absolute top-8 right-[2%]  rounded-full bg-slate-300"
                  }
                ></div>
              </div>
              <div className="w-full">
                <div className="flex justify-between">
                  <p className="md:text-sm text-xs font-semibold">{name}</p>
                </div>
                <div className="flex items-center space-x-0.5 md:space-x-1 w-full">
                  <MdLocationPin className="text-scudGreen" />
                  <p className="text-xs text-textColor/50 mt-1">{location}</p>
                </div>
              </div>
            </div>
            <button
              onClick={() => {
                if (!signin) {
                  router.push("/complete-signup");
                } else {
                  router.push("/otpverification");
                }
              }}
              className="md:p-2 p-1 just my-4 border flex justify-center items-center  border-scudGreen  rounded-md text-scudGreen bg-slate-100 px-2 text-[12px] md:px-4 font-semibold  hover:bg-slate-100 "
            >
              <AiOutlineSend className="text-sm mt-0.5 mr-0.5 md:mr-2 " />
              Message
            </button>
          </div>
        </div>
        <div className="flex justify-between space-x-5">
          <button
            onClick={() => {
              if (!signin) {
                router.push("/complete-signup");
              } else {
                router.push("/otpverification");
              }
            }}
            className="p-3 my-4 rounded-md text-gray-400 bg-slate-200 text-[12px] px-8 font-semibold  hover:bg-slate-100 w-full "
          >
            Skip
          </button>
          <button
            onClick={() => {
              if (!signin) {
                router.push("/complete-signup");
              } else {
                router.push("/otpverification");
              }
            }}
            className="p-3 my-4 rounded-md text-scudGray text-[12px] px-8 font-semibold bg-scudGreen hover:bg-[#4747e1] w-full "
          >
            Continue
          </button>
        </div>
      </div>
    </div>
    // </div>
  );
}

export default SignUpOfficer;
