import React from "react";
import { HiOutlineArrowRight } from "react-icons/hi";

const Button = ({ text, style, fill, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={` ${style !== undefined ? style : ""}   ${
        fill
          ? " bg-white text-black hover:bg-black hover:border hover:text-white"
          : " bg-black hover:bg-white hover:text-black hover:border-0 text-white border border-white"
      }     transform hover:scale-110 transition duration-500 ease-in-out rounded-md py-2 px-2 lg:px-6 lg:py-3`}
    >
      <p className="lg:text-base text-xs md:text-sm">{text} </p>
      {/* {icon && <HiOutlineArrowRight className="mt-1" />} */}
    </button>
  );
};

export default Button;
