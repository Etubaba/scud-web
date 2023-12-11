import React, { useState, useRef, useEffect } from "react";
import { BsCalendarDate } from "react-icons/bs";

function DatePicker({ style, value, onChange, type, disable, min, max }) {
  return (
    <div
      className={`${
        style !== undefined ? style : ""
      }   rounded-md  cursor-pointer border flex items-center  justify-between  px-2`}
    >
      <small className="text-textColor mr-2">{value}</small>
      {type == "date" || type == undefined ? (
        <input
          disabled={disable}
          onChange={onChange}
          min={min}
          max={max}
          className="w-5 text-sm text-text_color cursor-pointer outline-none focus:outline-none"
          name="date"
          id="date"
          type="date"
        />
      ) : (
        <input
          onChange={onChange}
          className="w-8 cursor-pointer outline-none focus:outline-none"
          name="date"
          id="date"
          type="time"
        />
      )}
    </div>
  );
}

export default DatePicker;
