import React from "react";
import { IoIosSend } from "react-icons/io";

const ReasonSection = () => {
  return (
    <div className="md:px-7 md:mt-[30rem] py-10 mt-10 lg:-mt-20">
      <p className="text-center md:text-title font-bold font-sans text-lg md:leading-[50px] md:text-3xl ">
        Enjoy premium service by following these <br /> 3 working steps
      </p>

      <div className="md:flex hidden space-x-10 mt-10 justify-center mb-8  items-center">
        <div className="flex items-center rounded-lg  bg-scudWhite shadow-2xl  justify-center p-6">
          <img src="/marker.svg" className="h-8 w-8" />
        </div>
        <div className="border  dashed w-24 bg-gray-600" />
        <div className="flex justify-center shadow-blue-600/50 rounded-lg p-6 shadow-xl items-center bg-scudGreen">
          <img src="/location.svg" className="h-8 w-8" />
        </div>
        <div className="border  dashed w-24 bg-gray-600" />
        <div className="flex items-center rounded-lg  bg-scudWhite shadow-2xl  justify-center p-6">
          <img src="/Vectorf.svg" className="h-8 w-8" />
        </div>
      </div>

      <div className="md:hidden space-y-10 my-10 flex flex-col justify-center items-center">
        <div className="flex flex-col justify-center items-center">
          <div className="flex items-center w-24 rounded-lg mb-5  bg-scudWhite shadow-2xl  justify-center p-7">
            <img src="/marker.svg" className="h-8 w-8" />
          </div>
          <div className=" text-center">
            <p className="font-semibold text-lg">Pick Your location</p>
            <p className="text-sm text-textColor">
              Choose your location and find
              <br /> your best car.
            </p>
          </div>
        </div>

        <div className="flex flex-col justify-center items-center">
          <div className="flex justify-center mb-5 shadow-blue-600/50 rounded-lg p-6 shadow-xl items-center bg-scudGreen">
            <img src="/location.svg" className="h-8 w-8" />
          </div>

          <div className=" text-center">
            {" "}
            <p className="font-semibold text-lg">Enter Your Destination</p>
            <p className="text-sm text-textColor">
              Select the location of the
              <br /> destination you’re going to.
            </p>
          </div>
        </div>

        <div className="flex flex-col justify-center items-center">
          <div className="flex items-center rounded-lg mb-4 bg-scudWhite shadow-2xl  justify-center p-7">
            <img src="/Vectorf.svg" className="h-8 w-8" />
          </div>
          <div className=" text-center">
            <p className="font-semibold text-lg">Book Your Desired Car</p>
            <p className="text-sm text-textColor">
              We will deliver it directly to
              <br /> you.
            </p>
          </div>
        </div>
      </div>

      <div className="md:flex hidden space-x-16 mb-7 justify-center items-center ">
        <div className=" text-center">
          <p className="font-semibold text-lg">Pick Your Location</p>
          <p className="text-sm text-textColor">
            Choose your location and find
            <br /> your best car.
          </p>
        </div>
        <div className=" text-center">
          {" "}
          <p className="font-semibold text-lg">Enter Your Destination</p>
          <p className="text-sm text-textColor">
            Select the location of the
            <br /> destination you’re going to.
          </p>
        </div>
        <div className=" text-center">
          <p className="font-semibold text-lg">Book Your Desired Car</p>
          <p className="text-sm text-textColor">
            We will deliver it directly to
            <br /> you.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReasonSection;
