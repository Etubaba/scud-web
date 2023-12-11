import React from "react";

import { BsClock } from "react-icons/bs";
import { MdOutlineLocationOn } from "react-icons/md";

const ThirdSection = () => {
  return (
    <div className=" md:mx-[45px] py-10">
      <div className=" flex md:flex-row flex-wrap flex-col space-y-2 justify-center items-center md:space-y-0 md:space-x-3">
        <div className="rounded-3xl space-y-4  items-center py-10 justify-center flex flex-col border border-[#E6EBFF] md:max-w-[350px] bg-adminbg  px-[45px]">
          <MdOutlineLocationOn className="text-4xl text-scudGreen" />
          {/* <img src="/location.png" alt="icon" className="w-8" /> */}
          <h1 className="font-bold text-xl my-2">Easiest way around</h1>
          <p className="text-[#576275] text-center  text-sm">
            One tap and a car comes directly to you. Hop in-your driver knows exactly where to go.
            And when you get there, just step out. Payment is completely seamless.
          </p>
        </div>
        <div className="rounded-3xl items-center space-y-4 py-10 justify-center flex flex-col border border-[#E6EBFF] md:max-w-[350px] bg-adminbg  px-[45px] ">
          {/* <MdOutlineLocationOn className="text-4xl text-scudGreen" /> */}
          <img src="/moneybag.png" alt="icon" className="w-8" />
          <h1 className="font-bold text-xl my-2">Low-Cost to luxury</h1>
          <p className="text-[#576275] text-center text-sm">
            Economy cars at everyday prices are always available. For special occasions, no occasion
            at all, or when you just a need a bit more room, call a black car or SUV.
          </p>
        </div>
        <div className="rounded-3xl mt-4 items-center space-y-4 py-10 justify-center flex flex-col border border-[#E6EBFF] md:max-w-[350px] bg-adminbg  px-[45px] ">
          <BsClock className="text-4xl text-scudGreen" />
          {/* <img src="/location.png" alt="icon" className="w-8" /> */}
          <h1 className="font-bold text-xl my-2">Anywhere, anytime</h1>
          <p className="text-[#576275] text-center text-sm">
            Daily commute. Errand across town. Early morning flight. Late night drinks. Wherever
            you're headed, count on for a ride-no reservations required. Just ride and happiness
          </p>
        </div>
      </div>
    </div>
  );
};

export default ThirdSection;
