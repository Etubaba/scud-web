import React from "react";
import { AiFillStar } from "react-icons/ai";

const Rating = ({ readOnly, rating, size, setRating }) => {
  if (readOnly) {
    return (
      <div className="flex space-x-0.5">
        {[0, 1, 2, 3, 4].map((_, index) => (
          <AiFillStar
            className={
              rating > index
                ? `text-yellow-400  ${
                    size === "xs"
                      ? "text-sm"
                      : size === "lg"
                      ? "text-base"
                      : size === "xl"
                      ? "text-2xl"
                      : "text-lg"
                  }`
                : "text-slate-500/50 " +
                  `${
                    size === "xs"
                      ? "text-sm"
                      : size === "lg"
                      ? "text-base"
                      : size === "xl"
                      ? "text-2xl"
                      : "text-lg"
                  }`
            }
            // key={index}
          />
        ))}
      </div>
    );
  } else {
    return (
      <div className="flex">
        {[0, 1, 2, 3, 4].map((_, index) => (
          <AiFillStar
            className={
              rating > index
                ? `text-yellow-400 mt-1 mr-1  ${
                    size === "xs"
                      ? "text-sm"
                      : size === "lg"
                      ? "text-base"
                      : size === "xl"
                      ? "text-2xl"
                      : "text-lg"
                  }`
                : `text-slate-500/50 mr-1 mt-1 ${
                    size === "xs"
                      ? "text-sm"
                      : size === "lg"
                      ? "text-base"
                      : size === "xl"
                      ? "text-2xl"
                      : "text-lg"
                  }`
            }
            onClick={() => setRating(index + 1)}
            key={index}
          />
        ))}
      </div>
    );
  }
};

export default Rating;
