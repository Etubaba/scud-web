import React from "react";
import { MdCheck } from "react-icons/md";

const Stepper = ({ level = 1, stages }) => {
  return (
    <div className=" h-[68px]   md:h-20 w-full ">
      <div className="relative  flex  px-8 justify-center items-center">
        {stages.map((item, idx) => (
          <React.Fragment key={idx}>
            <div
              className={`${level > idx ? "p-1" : "p-2"} text-xs ${
                level === item.level ? "bg-scudGreen" : ""
              } border rounded-full border-scudGreen`}
            >
              {level > idx && <MdCheck className="text-[8px] text-scudGreen" />}
            </div>
            {idx !== stages.length - 1 && (
              <div
                className={`flex-grow  border-t ${
                  level > idx ? "border-scudGreen" : "border-gray-400"
                } `}
              ></div>
            )}
          </React.Fragment>
        ))}
      </div>
      <div className="hidden md:flex justify-between ">
        {stages.map((stage, idx) => (
          <p key={idx} className="md:text-[10px] -ml-1 text-[px] text-textColor">
            {stage.name}
          </p>
        ))}
      </div>
    </div>
  );
};

export default Stepper;
