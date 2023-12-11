import { useRouter } from "next/router";
import React from "react";
import { FaUserShield } from "react-icons/fa";
import FirstScud from "./FirstScud";

const SafetySection = () => {
  const router = useRouter();
  return (
    <>
      <div className="bg-[#F7FAFE] items-center flex-col flex mb-16 justify-center  h-80 w-full">
        <div>
          <div className="md:-mt-28 mt-16">
            <h1 className="font-bold text-title text-xl text-center md:text-2xl tracking-wider mb-4">
              Safety
            </h1>
            <p className="font-semibold text-[#1E202B] text-center mb-4 tracking-wider">
              From start to finish, a ride you can trust
            </p>
            <p className="md:max-w-[600px]  text-[#55575F] text-xs md:text-sm text-center">
              Your safety is important to us before, during, and after every trip. That’s why we
              continue to develop technology that helps make millions of rides safer every day.
            </p>

            <span
              onClick={() => router.push("/safety")}
              className="flex justify-center cursor-pointer hover:text-scudGreenHover text-xs items-center mb-8 mt-4 md:mb-0 text-scudGreen"
            >
              <FaUserShield className="mr-3" />
              <p>See how we keep you safe</p>
            </span>
          </div>

          <div className="justify-center w-[100%] items-center flex ">
            <FirstScud text="Get A Safe Ride With Scud" />
          </div>
        </div>
        <div className="" />
      </div>
      <img className="w-full h-8 -mt-[69px] mb-20" src="malvin2.png" />
    </>
  );
};

export default SafetySection;
