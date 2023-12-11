import React from "react";
import { useState } from "react";
import { MdOutlineDateRange } from "react-icons/md";

const DateInput = ({ value, setValue }) => {
  const [date, setDate] = useState("");
  return (
    <div className="flex w-[8rem] px-1 rounded-md border bg-[#F2F5FF] ">
      <input
        type={date ? "date" : "text"}
        placeholder="Select Date"
        onChange={(e) => setValue(e.target.value)}
        value={value}
        onFocus={() => setDate(true)}
        className=" bg-[#F2F5FF] w-full text-xs outline-none   px-0.5 py-1 "
        // value={from}
        // onChange={(e) => setFrom(e.target.value)}
      />
      {!date && (
        <MdOutlineDateRange
          onClick={() => setDate(true)}
          className="text-textColor text-[18px]  mt-1"
        />
      )}
    </div>
  );
};

export default DateInput;
