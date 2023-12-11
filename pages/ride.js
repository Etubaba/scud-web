import React from "react";
import { AiFillCar } from "react-icons/ai";
import Button from "../components/common/Button";
import ReasonsCompo from "../components/homeComponents/ReasonsCompo";
import LastSection from "../components/homeComponents/sections/LastSection";
import MobileLastsection from "../components/homeComponents/sections/MobileLastsection";
import SignInCompo from "../components/homeComponents/SignInCompo";
import Slide from "../components/slider/Slide";
import AlwaysSection from "../components/rideComponents/AlwaysSection";
import Benefits from "../components/rideComponents/Benefits";
import SafetySection from "../components/rideComponents/SafetySection";
import CustomSlide from "../components/slider/CustomSlide";

const Ride = () => {
  const carPreview = ["/car1.jpg", "/car2.jpg", "/car3.jpg"];

  function check_value(value) {
    return value % 2 == 0 ? true : false;
  }

  return (
    <div className="bg-white  ">
      <div className="px-3  md:pl-16 w-full   bg-[#F7FAFE] flex-row  md:flex justify-between ">
        <div className="md:w-1/2 md:mt-20">
          <div className="w-full  ">
            <p className="font-semibold text-scudGreen">RIDE</p>
            <h1 className="text-3xl text-black  font-bold my-3">Always the ride you want</h1>
            <p className="text-[#000000]"> The best way to get wherever you're going.</p>
            <p className="text-xs text-textColor mt-2">Start driving with Scud</p>
          </div>
          <div className="block  md:hidden">
            <img src="/car-png-16828 1.png" loading="lazy" className="mt-10 " alt="hero" />
          </div>
          <div className="flex justify-between  max-w-[400px] mt-7">
            <Button
              style={"lg:px-5  font-semibold"}
              text={[<AiFillCar className="text-white mt-1 mr-1" />, "Request a Ride"]}
            />
          </div>
        </div>
        <div className="hidden mt-12  w-1/2 md:flex justify-end">
          <img src="/blueeclis.png" className="h-80 w-72 lg:-mr-2 " loading="lazy" />

          <img src="/corola.png" alt="hero" className="z-10  lg:mr-28 absolute h-80 w-[28rem]" />
        </div>
      </div>

      {/* #################################################################################################################### */}
      <AlwaysSection />
      {/* #################################################################################################################### */}
      <div className="px-2 md:p-10 w-full   bg-[#ffffff]  md:flex justify-between ">
        <div className="w-full md:pl-10 flex justify-center flex-col items-center md:items-start">
          <div className="w-full md:text-left text-center ">
            <h1 className="md:text-3xl text-2xl text-[#1E202B]  font-bold my-3">
              There’s a ride for every price{" "}
            </h1>
            <p className="text-[#1E202B]">And any occasion </p>
          </div>
          <div className="hidden">
            <img src="/car-png-16828 1.png" className="mt-10" alt="hero" />
          </div>
          <div className="flex justify-between  max-w-[400px] mt-7">
            <Button
              style={"lg:px-5  font-semibold"}
              text={[<AiFillCar className="text-scudGreen mt-1 mr-1" />, "Request for a ride"]}
            />
          </div>
        </div>
        <div className=" w-full md:flex my-10 md:mt-0 justify-start">
          <CustomSlide
            ride={true}
            text={["ACCESSIBILITY", "ECONOMY", "PREMUIUM"]}
            isImage={true}
            preview={carPreview}
            items={[
              carPreview?.map((data, index) => [
                <div
                  key={index}
                  className={
                    check_value(index)
                      ? ` max-w-[60%]  transition-all text-[12px] lg:w-[500px]  pb-2  rounded-md   `
                      : " max-w-[60%]  transition-all  text-[12px] lg:w-[500px]  pb-2 rounded-md   "
                  }
                >
                  <img src={data} alt="" loading="lazy" className="w-full rounded-md h-45" />
                </div>
              ])
            ]}
          />{" "}
        </div>
      </div>

      <SafetySection />
      <Benefits />
      {/* <div className="flex justify-center items-center"> */}
      <LastSection />
      <MobileLastsection />
      {/* </div> */}
    </div>
  );
};

export default Ride;
