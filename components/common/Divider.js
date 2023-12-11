import React from "react";

function Divider({ text }) {
  if (text) {
    return (
      <div className="relative flex py-3 items-center">
        <div className="flex-grow border-t border-gray-400/40"></div>
        <span className="flex-shrink mx-4 text-gray-400/40">{text}</span>
        <div className="flex-grow border-t border-gray-400/40"></div>
      </div>
    );
  } else {
    return (
      <div className="relative flex py-3 items-center">
        <div className="flex-grow w-full border-t-[0.5px] border-[#dde4fc]"></div>
      </div>
    );
  }
}

export default Divider;
