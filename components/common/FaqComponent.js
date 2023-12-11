import React from "react";
import { useState } from "react";
import { BsDash } from "react-icons/bs";
import { MdAdd } from "react-icons/md";
import "animate.css";

const FaqComponent = ({ item: { id, question, answer } }) => {
  const [isActive, setIsActive] = useState(false);
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        setIsActive(true);
      }}
      className={`animate__animated animate__fadeIn border ${
        isActive && "border-scudGreen"
      } p-3 md:p-4 rounded-lg`}
    >
      <div className="flex justify-between items-center">
        <p className="text-textColor text-base">{question}</p>
        {isActive ? (
          <BsDash
            onClick={(e) => {
              e.stopPropagation();
              setIsActive(!isActive);
            }}
            className="text-scudGreen"
          />
        ) : (
          <MdAdd className="text-lg text-textColor" />
        )}
      </div>

      {isActive && (
        <div className=" animate__animated animate__pulse mt-2 p-1">
          <p className="text-textColor/70 text-sm">{answer}</p>
        </div>
      )}
    </div>
  );
};

export default FaqComponent;
