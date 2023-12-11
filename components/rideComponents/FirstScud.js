import React from "react";
import Button from "../common/Button";
import { AiOutlineCar } from "react-icons/ai";

const FirstScud = ({ text }) => {
  return (
    <div className="shadow-figma rounded-3xl bg-white z-30 md:-mb-80  relative flex flex-col h-40 w-full justify-center items-center">
      <div>
        <h1 className="md:text-2xl text-title font-semibold text-xl tracking-wider mb-5 text-center">
          {text}
        </h1>
        <div className="flex justify-center items-center">
          <Button social={true} SocialIcon={AiOutlineCar} text="Request A Ride" />
        </div>
      </div>
    </div>
  );
};

export default FirstScud;
