import React, { useState } from "react";
import { CgSmileMouthOpen } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import { handleCountryCode, handlePhoneNo } from "../../features/authSlice";
import { countryList } from "./CountryList";

const NumberSelect = ({ disabled, readOnly, admin,placeholder }) => {
  const [outline, setOutline] = useState(false);
  const [countryCode, setCountryCode] = useState("ng");
  // const [countryNum, setCountryNum] = useState("+234");
  // const [text, setText] = useState("");
  const [open, setOpen] = useState(false);

  const phone = useSelector((state) => state.auth?.phone);
  const countryNum = useSelector((state) => state.auth.countryCode);
  const user = useSelector((state) => state.auth.userDetails);
  const adminUser = useSelector((state) => state.auth.adminDetails);

  const dispatch = useDispatch();
  if (typeof window !== "undefined") {
    window.onclick = (e) => {
      e.target.className === "con";
      setOpen(false);
    };
  }

  return (
    <div
      className={` flex relative items-center justify-center w-full p-2 border rounded-md ${
        outline ? " border-scudGreen" : "border-[#E5E5E4]"
      }`}
    >
      <div
        className="flex min-w-[80px]  space-x-2"
        onClick={(e) => {
          disabled !== undefined ? null : e.stopPropagation();
          setOpen(!open);
        }}
      >
        <img
          className="h-4 w-6 mt-[2px] "
          //src={`https://flagcdn.com/w20/ai.png`}
          alt="flag"
          src={`https://raw.githubusercontent.com/TuleSimon/xMaterialccp/master/xmaterialccp/src/main/res/drawable/${countryCode.toLowerCase()}.png`}
        />
        <p className="text-sm text-textColor pr-6">{countryNum}</p>
        {open && (
          <div className="border  mt-8 z-40  absolute rounded-b bg-white w-32 h-60 overflow-y-scroll p-2 border-[#E5E5E4]">
            {countryList.map((item, index) => (
              <div
                key={index}
                onClick={() => {
                  setOpen(!open);
                  setCountryCode(item.code);
                  dispatch(handleCountryCode("+" + item.phone));
                }}
                className="flex space-x-2 cursor-pointer p-1 hover:bg-gray-200"
              >
                <img
                  className="h-4 w-6 mt-[2px] "
                  //src={`https://flagcdn.com/w20/ai.png`}
                  alt=""
                  src={`https://raw.githubusercontent.com/TuleSimon/xMaterialccp/master/xmaterialccp/src/main/res/drawable/${item.code.toLowerCase()}.png`}
                />
                <p className="text-xs ">+{item.phone}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {disabled || disabled !== undefined ? (
        <input
          placeholder={placeholder}
          disabled={true}
          defaultValue={
            admin === undefined
              ? user === null
                ? phone
                : user?.phone.slice(4)
              : adminUser.phone.slice(4)
          }
          className=" text-textColor w-full -ml-4 outline-none   text-sm"
          type="text"
        />
      ) : (
        <input
          placeholder={placeholder}
          disabled={disabled !== undefined ? true : false}
          onBlur={() => setOutline(false)}
          onFocus={() => setOutline(true)}
          onChange={(e) => dispatch(handlePhoneNo(e.target.value))}
          className=" w-full -ml-4 outline-none   text-sm"
          type="text"
        />
      )}
    </div>
  );
};

export default NumberSelect;
