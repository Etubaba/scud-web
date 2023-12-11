import React from "react";

const Switch = ({ value, onChange, color, showlabel }) => {
  return (
    <label className="relative  flex justify-between items-center group p-1 text-xl">
      <input
        checked={value}
        text-xs
        text-textColor
        onChange={onChange}
        type="checkbox"
        className="absolute left-1/2 -translate-x-1/2 w-full h-full peer appearance-none rounded-md"
      />
      <span
        className={
          color !== undefined
            ? "w-12 h-6 flex items-center flex-shrink-0 ml-4 p-1 bg-gray-300 rounded-full duration-300 ease-in-out peer-checked:bg-green-600 after:w-4 after:h-4 after:bg-white after:rounded-full  after:shadow-md after:duration-300 peer-checked:after:translate-x-6 group-hover:after:translate-x-1"
            : "w-12 h-6 flex items-center flex-shrink-0 ml-4 p-1 bg-gray-300 rounded-full duration-300 ease-in-out peer-checked:bg-scudGreen after:w-4 after:h-4 after:bg-white after:rounded-full  after:shadow-md after:duration-300 peer-checked:after:translate-x-6 group-hover:after:translate-x-1"
        }
      ></span>
      {showlabel && <p className="text-xs text-textColor pl-2">{value ? "ON" : "OFF"}</p>}
    </label>
  );
};

export default Switch;
