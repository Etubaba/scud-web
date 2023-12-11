import React from "react";
import { FaUserShield } from "react-icons/fa";
import { AiOutlineCar } from "react-icons/ai";
import Button from "../common/Button";

const CommitmentSec = () => {
  return (
    <div className="bg-[#F7FAFE] items-center pt-8 flex  justify-center  h-80 w-full">
      <div className="-mt-16">
        <p className="text-scudGreen text-center mb-4 font-semibold">Trip Safety</p>
        <h1 className="font-bold text-title text-xl text-center md:text-2xl tracking-wider mb-4">
          Our commitment to riders
        </h1>

        <p className="md:max-w-[600px] tracking-wider px-3 md:px-0 text-textColor text-xs md:text-sm mb-10 text-center">
          Scud is dedicated to keeping people safe on the road. Our technology enables us to focus
          on rider safety before, during, and after every trip. Here's how.
        </p>

        <div className="flex justify-center items-center">
          <Button social={true} SocialIcon={AiOutlineCar} text={"Request for a ride"} />
        </div>
      </div>
    </div>
  );
};

export default CommitmentSec;
