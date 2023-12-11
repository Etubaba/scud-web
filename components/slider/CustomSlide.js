import React, { useEffect, useState } from "react";
import "animate.css";
import Button from "../common/Button";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";

function CustomSlide({ items, isImage, preview, ride, text }) {
  const newItem = items[0];
  const [count, setCount] = useState(0);

  const handleImageChnge = (e) => {
    setCount(e);
  };

  const handleImageNext = () => {
    if (count >= newItem.length - 1) {
      setCount(0);
    } else {
      setCount(count + 1);
    }
  };
  const handleImageNext2 = () => {
    if (count <= 0) {
      setCount(newItem.length - 1);
    } else {
      setCount(count - 1);
    }
  };

  // setTimeout(() => {
  //   if (count >= newItem.length - 1) {
  //     setCount(0);
  //   } else {
  //     setCount(count + 1);
  //   }
  // }, 30000);

  if (isImage) {
    return (
      <div className="flex  transition-all  flex-col justify-center items-center">
        <div className=" transition-all  flex space-x-3  justify-center  items-center text-3xl font-bold">
          <button
            onClick={handleImageNext2}
            className=" bg-white hover:bg-white absolute md:static z-10 left-10 rounded-full shadow-md p-1 font-semibold"
          >
            <BsArrowLeft className="text-scudGreen text-xl mt-1 mr-1" />{" "}
          </button>

          {newItem[count]}
          <button
            onClick={handleImageNext}
            className=" bg-scudGreen absolute md:static z-10 right-10  hover:bg-scudGreenHover p-1 rounded-full shadow-sm font-semibold"
          >
            <BsArrowRight className="text-white text-xl mt-1 mr-1" />
          </button>
        </div>
        {ride ? (
          <div className="flex space-x-2 md:space-x-6">
            {text?.map((item, index) => (
              <div
                onClick={() => handleImageChnge(index)}
                key={index}
                className={
                  index === count
                    ? " rounded-md p-1 md:p-2 bg-[#DEE4FF]  transition-all  text-scudGreen "
                    : "rounded-md p-1 md:p-2  text-black"
                }
              >
                <p>{item}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex space-x-6">
            {preview?.map((item, index) => (
              <img
                onClick={() => handleImageChnge(index)}
                key={index}
                src={item}
                className={
                  index === count
                    ? "h-10 rounded-md border-2 border-scudGreen w-10"
                    : "h-10 rounded-md w-10"
                }
                alt="previews"
                loading="lazy"
              />
            ))}
          </div>
        )}
      </div>
    );
  } else {
    return (
      <div
        style={{ transform: `translateX(-${count * 100}%)` }}
        className="flex justify-center items-center"
      >
        <div
          style={{ transform: `translateX(-${count * 100}%)` }}
          className=" flex  transition-all flex-col justify-center items-center text-3xl font-bold"
        >
          {newItem[count]}
        </div>
      </div>
    );
  }
}
export default CustomSlide;
