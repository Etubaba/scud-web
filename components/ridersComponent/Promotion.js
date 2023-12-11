import React from "react";
import { BsCalendarDate } from "react-icons/bs";
import { HiOutlineSpeakerphone } from "react-icons/hi";

function Promotion({ color, text, validity, subtitle, discount }) {
  return (
    <div
      className={`rounded-lg w-full mb-5 hover:bg-slate-100 cursor-pointer hover:shadow-md border-${color} border p-3`}
    >
      <div className="md:flex  justify-between my-5">
        <div className="flex-col md:flex-row  flex  justify-center items-center space-x-3">
          <div
            className={`p-2 rounded-full bg-${color} flex w-10 h-10 justify-center items-center `}
          >
            <HiOutlineSpeakerphone className="text-white " />
          </div>
          <div>
            <p className="font-semibold md:text-left text-center text-black text-2xl">{discount}</p>
            <p className="text-sm text-center">{subtitle}</p>
          </div>
        </div>
        <div>
          <div className="flex justify-center items-center space-x-2">
            <BsCalendarDate className="mt-1 text-scudGreen" />
            <p className="text-center">Promotion valid till</p>
          </div>
          <p className="text-center md:text-left">{validity}</p>
        </div>
      </div>
      <hr />
      <div className="my-5">
        <p>{text}</p>
      </div>
    </div>
  );
}

export default Promotion;
