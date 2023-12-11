import React from "react";
import { HiOutlineArrowRight } from "react-icons/hi";
import { Loader } from "./Loader";

const Button = ({
  text,
  style,
  outline,
  onClick,
  icon,
  social,
  SocialIcon,
  secondary,
  disabled,
  loading,
  custom
}) => {
  if (secondary) {
    return (
      <button
        disabled={disabled}
        onClick={onClick}
        className={`bg-secondarybutton ${
          icon ? "justify-between" : "justify-center items-center"
        }  ${style !== undefined ? style : ""}  ${
          style !== undefined ? (style.includes("px") ? "" : "px-4 md:px-7") : "px-4 md:px-7"
        }   transform  hover:scale-110 transition duration-700 ease-in-out flex space-x-3  rounded-md  py-2  md:py-2 text-white hover:bg-gray-200`}
      >
        <p className="md:text-sm text-scudGreen font-semibold font-sans text-sm">{text}</p>
        {icon && <HiOutlineArrowRight className="mt-1" />}
      </button>
    );
  } else if (social) {
    return (
      <button
        disabled={disabled}
        onClick={onClick}
        className={`  ${
          disabled
            ? "bg-scudGreen/25"
            : "bg-scudGreen hover:bg-scudGreenHover transform hover:scale-110 transition duration-700 ease-in-out"
        }  ${style !== undefined ? style : ""}  flex space-x-3 justify-center ${
          custom !== undefined ? custom : "px-3 py-1 md:px-3 md:py-1.5"
        }  items-center rounded-md  text-white `}
      >
        {loading ? (
          <div className="px-12 flex justify-center items-center">
            <Loader />
          </div>
        ) : (
          <span className="flex items-center  space-x-1">
            <SocialIcon className="md:text-md text-base " />
            <span className="md:text-sm  text-sm">
              {typeof text !== "array"
                ? text
                : text?.map((item, index) => <p key={index}>{item}</p>)}
            </span>
          </span>
        )}
        {/* 
        <HiOutlineArrowRight className="mt-1" /> */}
      </button>
    );
  } else if (outline) {
    return (
      <button
        disabled={disabled}
        onClick={onClick}
        className={`bg-[#F7FAFE] border text-scudGreen border-scudGreen ${
          style !== undefined ? style : ""
        } justify-center items-center  flex space-x-3  rounded-md px-[2px] py-2 `}
      >
        {loading ? (
          <Loader />
        ) : (
          <span className="flex  text-xs space-x-1 md:space-x-4 px-2">
            {SocialIcon && <SocialIcon className="md:text-lg text-scudGreen text-base " />}
            {typeof text !== "array" ? text : text?.map((item, index) => <p key={index}>{item}</p>)}
          </span>
        )}
      </button>
    );
  } else {
    return (
      <button
        disabled={disabled}
        onClick={onClick}
        className={`bg-scudGreen  ${
          disabled
            ? "bg-scudGreen/25"
            : "bg-scudGreen transform  hover:scale-95 transition duration-700 ease-in-out hover:bg-scudGreenHover"
        } ${icon ? "justify-between" : "justify-center items-center"}  ${
          style !== undefined ? style : ""
        }  flex space-x-3 ${
          custom !== undefined ? custom : "px-4 py-2 md:px-4 md:py-2"
        }  rounded-md  text-white `}
      >
        {loading ? (
          <Loader />
        ) : (
          <span>
            <span className="md:text-sm font-sans text-sm flex">
              {typeof text !== "array"
                ? text
                : text?.map((item, index) => <p key={index}>{item}</p>)}
            </span>
            {icon && <HiOutlineArrowRight className="mt-1" />}
          </span>
        )}
      </button>
    );
  }
};

export default Button;
