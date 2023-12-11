import Button from "../common/Button";
import React from "react";

function ThirdSection() {
  return (
    <>
      <img
        src="/Ellipse23.png"
        className="absolute -z-20 w-16 md:w-40 md:top-[135vh]"
        loading="lazy"
        alt="elipses"
      />
      <div className="bg-[url('/image7.png')] bg-top bg-cover  bg-no-repeat  w-full h-56 md:h-[350px]   mt-10  ">
        <div className="bg-gradient-to-r from-[#0217EB]/90 to-black/60 md:from-black/10 pb-5 md:to-gradientblue/100 w-full h-56 md:h-[350px] ">
          <div className=" md:flex pt-2 px-3 justify-end">
            <div className="max-w-[400px]  md:m-10 ">
              <div className="mb-4">
                <h1 className="text-white mb-2 text-base md:text-2xl font-bold ">
                  Getting to your destination
                </h1>
                <p className="text-white font-semibold ">Share your ETA</p>
                <p className="text-white   text-xs md:text-base my-2 md:my-2">
                  Once your driver has picked you up, share your ETA with your friends and family so
                  they can follow your route and know when to expect you.
                </p>
              </div>
              <div>
                <p className="text-white font-semibold ">Always on the map</p>
                <p className="text-white   text-xs md:text-base my-2 md:mt-2">
                  Follow your trip in real-time so you always know where you are. And if you use
                  ScudPOOL, you’ll know exactly who’s riding with you.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ThirdSection;
