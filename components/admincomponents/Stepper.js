import React from "react";
import { MdCheck } from "react-icons/md";

const Stepper = ({ level = 1 }) => {
  return (
    <div className="bg-white px-2 md:px-16 pt-3 md:pt-7  h-[68px]  md:h-20 w-full rounded-lg border">
      <div className="relative  flex px-6 mb-2 justify-center items-center">
        {/* circle */}
        <div
          className={`${
            level > 1 ? "p-1" : "p-2"
          } text-xs border rounded-full border-scudGreen`}
        >
          {" "}
          {level > 1 && <MdCheck className="text-[8px] text-scudGreen" />}
        </div>
        <div
          className={`flex-grow  border-t ${
            level >= 2 ? "border-scudGreen" : "border-gray-400"
          } `}
        ></div>
        {/* circle */}
        <div
          className={`${
            level > 2 ? "p-1" : "p-2"
          } text-xs border rounded-full  ${
            level >= 2 ? "border-scudGreen" : "border-gray-400"
          } `}
        >
          {level > 2 && <MdCheck className="text-[8px] text-scudGreen" />}
        </div>
        <div
          className={`flex-grow  border-t ${
            level >= 3 ? "border-scudGreen" : "border-gray-400"
          } `}
        ></div>
        {/* circle */}
        <div
          className={`${
            level > 3 ? "p-1" : "p-2"
          } text-xs border rounded-full  ${
            level >= 3 ? "border-scudGreen" : "border-gray-400"
          } `}
        >
          {level > 3 && <MdCheck className="text-[8px] text-scudGreen" />}
        </div>
        <div
          className={`flex-grow  border-t ${
            level >= 4 ? "border-scudGreen" : "border-gray-400"
          } `}
        ></div>
        {/* circle */}
        <div
          className={`${
            level > 4 ? "p-1" : "p-2"
          } text-xs border rounded-full  ${
            level >= 4 ? "border-scudGreen" : "border-gray-400"
          } `}
        >
          {level > 4 && <MdCheck className="text-[8px] text-scudGreen" />}
        </div>
      </div>

      <div className="flex justify-between ">
        <p className="md:text-xs text-[7px] text-textColor">
          Profile & Location Details
        </p>
        <p className="md:text-xs text-[7px] md:-ml-14 text-textColor">
          Upload Documents{" "}
        </p>
        <p className="md:text-xs text-[7px] md:-ml-10 text-textColor">
          Vehicle Details
        </p>
        <p className="md:text-xs  text-[7px] text-textColor">Bank Details</p>
      </div>
    </div>
  );
};

export default Stepper;
