import React from "react";
import Button from "../common/Button";
import { AiFillCar } from "react-icons/ai";
import { GiPoliceOfficerHead } from "react-icons/gi";

export const FirstSection = () => {
  return (
    // <div className=" ">
    <div className="px-4   pt-7 md:pt-10 md:px-20  w-full  h-[22rem] bg-[#F7FAFE] justify-between md:flex ">
      <div className="">
        <div className="w-full  lg:mt-10 ">
          <p className="font-semibold text-scudGreen">ABOUT US</p>
          <h1 className="text-3xl text-title  font-bold my-3">
            We're on a mission to build cities
            <br className="hidden md:block" /> for people, not cars.
          </h1>
          <p className="text-textColor text-sm">
            we deliver the most reliable and fastest transportation means anywhere and anytime in
            the world.
          </p>
        </div>
        {/* <div className="block  md:hidden">
          <img src="/aboutusperson.png" className="w-40 h-44" alt="hero" />
        </div> */}
        <div className="flex space-x-1 md:space-x-2 lg:space-x-4  max-w-[400px] mt-7">
          <Button
            social={true}
            SocialIcon={GiPoliceOfficerHead}
            style={" "}
            text={"Become a driver"}
          />

          <Button
            outline={true}
            style={"  px-2 md:px-2"}
            text={[<AiFillCar className="text-scudGreen mt-0.5 mr-2" />, "Request a ride"]}
          />
        </div>
      </div>
      <div className="hidden  w-[80%] mt- md:flex justify-end items-end">
        <img src="/aboutusperson.png" alt="hero" className="md:w-[26rem] md:h-[20rem]" />
      </div>
    </div>
    // </div>
  );
};
