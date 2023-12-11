import React from "react";
import { useState } from "react";
import { BsSearch } from "react-icons/bs";

const SearchInput = ({ style, value, setValue }) => {
  const [searchState, setSearchState] = useState(false);
  return (
    <div className={` ${style !== undefined ? style : ""} mt-2`}>
      {searchState ? (
        <div className="shadow-figma justify-between animate__fadeInRight animate__animated flex px-3 py-1 md:-mt-3 rounded-lg bg-white">
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Search..."
            className=" placeholder:text-xs text-textColor  outline-none bg-white"
            type={"text"}
          />
          <div className="bg-scudGreen p-1 rounded-full flex justify-center items-center">
            <BsSearch className="text-white text-sm" />
          </div>
        </div>
      ) : (
        <div
          onClick={() => setSearchState(true)}
          className="bg-white -mt-4 space-x-4 justify-between items-center rounded-lg shadow-figma px-3 p-[6px] flex"
        >
          <div className="bg-scudGreen p-1 rounded-full flex justify-center items-center">
            <BsSearch className="text-white text-sm" />
          </div>
          <p className="md:text-sm text-textColor">Search</p>
        </div>
      )}
    </div>
  );
};

export default SearchInput;
