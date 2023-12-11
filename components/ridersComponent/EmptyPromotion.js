import React from "react";
import { HiOutlineSpeakerphone } from "react-icons/hi";

function EmptyPromotion() {
  return (
    <div className="rounded-lg border justify-center items-center flex p-7 py-40">
      <div className="flex-col flex justify-center items-center space-y-5">
        <div className="h-10 w-10 rounded-full flex justify-center items-center bg-[#ddddff]">
          <HiOutlineSpeakerphone className="text-scudGreen" />
        </div>
        <p className="text-center text-lg font-semibold">
          No promotions available
        </p>
        <p>Hi, james, you have not earned any promotions at the moment,</p>
      </div>
    </div>
  );
}

export default EmptyPromotion;
