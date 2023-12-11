import React, { useEffect, useState } from "react";
import {
  BsArrowLeft,
  BsArrowRight,
  BschildrenowLeftShort,
  BschildrenowRightShort
} from "react-icons/bs";
import { IoIosArrowRoundBack, IoIosArrowRoundForward } from "react-icons/io";
import { useSwipeable } from "react-swipeable";

const Carousel = ({ children, device }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const splitSize = device == "sm" ? 1 : device == "md" ? 2 : 3;
  const result = children.reduce((acc, _, index) => {
    if (index % splitSize === 0) {
      acc.push(children.slice(index, index + splitSize));
    }
    return acc;
  }, []);

  const updateIndex = (newIndex) => {
    if (newIndex < 0) {
      newIndex = result.length - 1;
    } else if (newIndex >= result.length) {
      newIndex = 0;
    }

    setActiveIndex(newIndex);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (!paused) {
        updateIndex(activeIndex + 1);
      }
    }, 3000);

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  });

  const handlers = useSwipeable({
    onSwipedLeft: () => updateIndex(activeIndex + 1),
    onSwipedRight: () => updateIndex(activeIndex - 1)
  });

  return (
    <div
      {...handlers}
      className="overflow-hidden  md:w-full flex flex-col items-center justify-center"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        className="  transition-all  flex justify-center items-center  space-x-3 whitespace-nowrap w-full ml-5"
        style={{ transform: ` translateX(-${activeIndex + 2}%)` }}
      >
        {result[activeIndex].map((item) => item)}
      </div>
      <div className="absolute hidden md:flex justify-between  px-1 md:px-20  w-full">
        <div
          className=" rounded-full cursor-pointer hover:bg-scudGreen hover:text-white  h-10 flex items-center justify-center w-10 shadow-md "
          onClick={() => {
            updateIndex(activeIndex - 1);
          }}
        >
          <IoIosArrowRoundBack className="text-xl hover:text-white mt-1" />
        </div>
        <div
          className=" rounded-full  cursor-pointer hover:bg-scudGreen hover:text-white  h-10 flex items-center justify-center w-10 shadow-md "
          onClick={() => {
            updateIndex(activeIndex + 1);
          }}
        >
          <IoIosArrowRoundForward className="text-xl hover:text-white text-center  mt-1" />
        </div>
      </div>
      <div className="flex w-full justify-between">
        <div className="flex justify-center items-center w-full mt-3">
          {result.map((child, index) => {
            return (
              <button
                className={`${
                  index === activeIndex
                    ? "bg-scudGreen transition-all m-1 h-1 w-3 rounded-md"
                    : "bg-gray-200 m-1 transition-all h-1 w-2 rounded-md"
                }`}
                onClick={() => {
                  updateIndex(index);
                }}
              ></button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
