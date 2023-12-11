import React from "react";
import { MdArrowForwardIos } from "react-icons/md";
import Divider from "../common/Divider";
import "animate.css";

const ScudOptions = () => {
  return (
    <div className="bg-scudGray animate__animated animate__fadeInTopRight font-sans z-30 w-[26rem] shadow-lg hidden lg:inline-block h-[29rem] p-6">
      <div className="flex space-x-5 p-3">
        <img src="/hand-mobile.png" className="rounded-full w-16 h-16" />
        <div>
          <p className="text-2xl tracking-wider  mb-3">Ride With Scud</p>
          <span className="flex transform hover:translate-x-5 duration-300 text-scudGreen cursor-pointer  hover:text-scudGreenHover  hover:space-x-8 space-x-5">
            <p className="text-lg">Sign up</p>
            <MdArrowForwardIos className="mt-2" />
          </span>
        </div>
      </div>
      <Divider text="OR" />
      <div className="flex space-x-5 p-3">
        <img src="/home-drive.png" className="rounded-full w-16 h-16" />
        <div>
          <p className="text-2xl tracking-wider  mb-3">Sign up to drive</p>
          <span className="flex text-scudGreen transform hover:translate-x-5 duration-300 cursor-pointer  hover:text-scudGreenHover   space-x-5">
            <p className="text-lg">Sign up</p>
            <MdArrowForwardIos className="mt-2" />
          </span>
        </div>
      </div>
      <Divider text="OR" />
      <div className="flex space-x-5 p-3">
        <img src="/cont4.png" className="rounded-full w-16 h-16" />
        <div>
          <p className="text-2xl tracking-wider mb-3">Sign up to company</p>
          <span className="flex transform hover:translate-x-5 duration-300 text-scudGreen cursor-pointer   hover:text-scudGreenHover  space-x-5">
            <p className="text-lg ">Sign up</p>
            <MdArrowForwardIos className="mt-2" />
          </span>
        </div>
      </div>
    </div>
  );
};

export default ScudOptions;
