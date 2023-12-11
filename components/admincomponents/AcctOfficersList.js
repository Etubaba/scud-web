import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { AiOutlineCheck } from "react-icons/ai";
import { MdOutlineLocationOn } from "react-icons/md";
import { useSelector } from "react-redux";

const AcctOfficersList = ({
  acct_check,
  setAcct_Check,
  withChechbox,
  setOfficer,
  item: { id, first_name, last_name, state, drivers, picture }
}) => {
  const [checked, setChecked] = useState(false);
  const all_checked = useSelector((state) => state.scud.acct_officer_ischecked);

  useEffect(() => {
    if (all_checked) {
      setChecked(true);
    } else {
      setChecked(false);
    }
  }, [all_checked]);

  const handleChecked = () => {
    if (!checked) setAcct_Check((prev) => [...prev, id]);
    else {
      const newArr = acct_check?.filter((item) => item !== id);
      setAcct_Check(newArr);
    }
    setChecked(!checked);
  };

  return (
    <div
      onClick={() => setOfficer({ id, first_name, last_name, picture })}
      className={`p-1 ${withChechbox ? " rounded-md" : " rounded-lg"}`}
    >
      <div
        className={` items-center justify-between flex   rounded-md ${
          withChechbox
            ? " border w-full shadow-sm px-2 py-2 md:py-3 md:px-4"
            : "hover:bg-[#F7F5FF] px-1 md:px-2 py-1"
        } `}
      >
        <div className="flex space-x-2 items-center">
          {withChechbox && (
            <div
              onClick={handleChecked}
              className={`border w-3.5 h-3.5  flex items-center justify-center rounded ${
                checked ? "border-scudGreen " : "p-1.5"
              } `}
            >
              {checked && <AiOutlineCheck className="text-scudGreen text-lg" />}
            </div>
          )}
          <img
            src={picture === null || picture === undefined ? "/user.png" : picture}
            className=" w-5 h-5 md:w-7 md:h-7 rounded-full"
          />
          <p className="md:text-sm text-[8px] text-textColor">
            {first_name.charAt(0).toUpperCase() +
              first_name.slice(1) +
              " " +
              last_name.charAt(0).toUpperCase() +
              last_name.slice(1)}
          </p>
        </div>

        <div className=" flex items-center space-x-3 md:space-x-8">
          <div className="flex items-center space-x-1">
            <div className="flex">
              {" "}
              <div className="rounded-full  border-2 border-white z-20">
                {" "}
                <img src="/user.png" className="w-3 h-3 " />
              </div>
              <div className="rounded-full  border-2 -ml-1.5 border-white z-10">
                {" "}
                <img src="/user.png" className="w-3 h-3 " />
              </div>
              <div className="rounded-full  border-2 -ml-1.5 border-white z-0">
                {" "}
                <img src="/user.png" className="w-3 h-3 " />
              </div>
            </div>

            <p className="md:text-xs  text-[7px] text-textColor/50">
              Managing {drivers?.length} Officers
            </p>
          </div>

          <span className="flex space-x-0.5 md:space-x-1">
            <MdOutlineLocationOn className="text-scudGreen md:text-base mt-0.5 md:mt-0 text-xs" />
            <p className="text-textColor text-[7px]  md:mt-0 mt-1  md:text-xs">
              {state?.name} State
            </p>
          </span>
        </div>
      </div>
    </div>
  );
};

export default AcctOfficersList;
