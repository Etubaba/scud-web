import React from "react";
import { BsShieldCheck } from "react-icons/bs";
import Button from "../../common/Button";
import { useRouter } from "next/router";

function HelpingSection() {
  const router = useRouter();
  return (
    <div className=" my-20  md:my-0 md:mb-40">
      <div className="md:bg-adminbg  md:h-60">
        <div className="w-full hidden md:flex justify-end items-start">
          <img src="/circle-bg.png" className=" w-48 h-40 " />
        </div>
        <div className="md:-mt-16 md:px-4">
          <div className="w-full    flex md:flex-row flex-col md:space-x-5 lg:space-x-10 justify-center space-x-0 space-y-6  md:space-y-0   md:justify-center items-center">
            <div className="bg-white flex flex-col justify-center items-center  border md:border-none   shadow-figma rounded-3xl lg:min-w-[500px] py-4 md:py-6 md:px-4 lg:py-10 px-6 lg:px-10">
              <img src="/bro.png" className="w-14 mb-4 h-14" />
              <p className="font-bold mb-5 text-title text-xl ">Helping Cities Thrive</p>
              <p className="text-sm text-center md:max-w-[370px] text-textColor mb-6">
                A city with Scud gives people more ways to make money, has fewer drunk drivers on
                the road, and provides transportation anywhere, anytime.
              </p>

              <Button
                onClick={() => router.push("/signup/driver-signup")}
                text={"Become a Driver"}
              />
            </div>
            <div className="bg-white border md:border-none  flex flex-col justify-center items-center   shadow-figma rounded-3xl  lg:min-w-[500px] py-4 md:px-6 md:py-6 lg:py-10 px-6 lg:px-10">
              {/* <img src="/carbon_security.png" className="w-16 mb-4 h-16" /> */}
              <BsShieldCheck className="text-scudGreen my-4 text-4xl" />
              <p className="font-bold  text-xl text-title mb-5">Safety Rides for Everyone</p>
              <p className="text-sm text-center text-textColor md:max-w-[370px] mb-6">
                Whether riding in the backseat or driving up front, every part of the Scud
                experience is designed around your safety and security.
              </p>
              <Button onClick={() => router.push("/signup/rider-signup")} text={"Request a Ride"} />
            </div>
          </div>
        </div>
      </div>
      <div className=" h-20" />
    </div>
  );
}

export default HelpingSection;
