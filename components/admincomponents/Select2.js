import Rating from "../common/Rating";
import React from "react";
import { useState } from "react";
import { AiOutlineCheck, AiOutlineDown } from "react-icons/ai";
import { BsSearch } from "react-icons/bs";
import Button from "../common/Button";

const Select2 = ({
  data,
  value,
  setValue,
  rating,
  iconDropdown,
  position,
  search,
  style,
  Icon,
  filter,
  filterOptions,
  showSearch,
  multiple
}) => {
  const [outline, setOutline] = useState(false);
  const [open, setOpen] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [canceled, setCanceled] = useState(false);
  const [driverCheck, setDriverCheck] = useState(false);
  const [riderCheck, setRiderCheck] = useState(false);
  const [datas, setDatas] = useState(data);

  const handleSearch = (e) => {
    const searchstate = e.target.value;
    if (searchstate == "") {
      setDatas(data);
    } else {
      let filter_data = data.filter((items) => {
        return items.toLowerCase().includes(searchstate.toLowerCase());
      });

      setDatas(filter_data);
    }
  };
  return (
    <div
      className={`relative ${
        style !== undefined
          ? style
          : "px-2  py-1 max-w-[150px] relative block min-w-[90px]  md:min-w-[130px]"
      } cursor-pointer rounded-md bg-[#F2F5FF] border flex ${
        open ? "border-scudGreen" : ""
      }  items-center justify-between`}
      onClick={() => setOpen(!open)}
    >
      <div className="flex space-x-2">
        {" "}
        <Icon className={` mt-0.5  ${open ? "text-scudGreen" : "text-textColor"} text-xs`} />
        <p className={`   ${open ? "text-scudGreen" : "text-textColor"} text-xs`}>{value}</p>
      </div>

      <AiOutlineDown className={`   ${open ? "text-scudGreen" : "text-textColor"} text-xs`} />

      {open && rating && (
        <div
          className={` ${
            ""
            // dropDownWidth !== undefined ? dropDownWidth : "w-28"
          }   ${position} absolute p-2 -ml-2 mt-[10.5rem] bg-white max-w-[200px] min-w-[120px] rounded border transition duration-300 ease-in z-40 shadow-lg`}
        >
          {datas.reverse().map((rate, i) => (
            <span
              key={i}
              onClick={(e) => setValue(rate)}
              className="flex py-1 hover:bg-adminbg  justify-between"
            >
              <Rating size="xs" rating={rate} readOnly={true} />{" "}
              <p className="text-xs text-title">{i + 1}</p>
            </span>
          ))}
        </div>
      )}

      {open && iconDropdown && (
        <div
          className={`${position} absolute p-2 -ml-2 mt-[7.5rem] bg-white max-w-[200px] min-w-[120px] rounded border transition duration-300 ease-in z-40 shadow-lg`}
        >
          {datas.map((item, idx) => (
            <div
              key={idx}
              onClick={(e) => {
                setValue(item.option), setOpen(false);
              }}
              className="flex py-1 hover:bg-adminbg  justify-between"
            >
              <span className="flex space-x-2">
                {item.OptionIcon} <p className="text-xs text-textColor">{item.option}</p>
              </span>

              {item.total && <p className="text-xs text-textColor">{item.total}</p>}
            </div>
          ))}
        </div>
      )}

      {open && filter && filterOptions !== undefined && (
        <div
          className={` ${
            ""
            // dropDownWidth !== undefined ? dropDownWidth : "w-28"
          }   ${
            position === undefined ? "" : position.includes("mt-") ? position : "mt-[20rem]"
          } absolute p-2 -ml-2 h-auto overflow-y-auto bg-white max-w-[200px] min-w-[150px] rounded border transition duration-300 ease-in z-40 shadow-xl`}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <div className="flex flex-col space-y-1.5">
            <p className="text-sm text-textColor/50">{filterOptions.option1.title}</p>

            <div className="flex space-x-1 items-center">
              <div
                onClick={() => {
                  setCompleted(true), setCanceled(false);
                }}
                className={`border w-3.5 h-3.5  flex items-center justify-center rounded ${
                  completed ? "border-scudGreen " : "p-1.5"
                } `}
              >
                {completed && <AiOutlineCheck className="text-scudGreen text-lg" />}
              </div>
              {/* <input type={'checkbox'} /> */}
              <label className="text-xs tracking-wider text-[#3D4151] my-1">
                {filterOptions?.option1?.value1}
              </label>
            </div>
            <div className="flex space-x-1 items-center">
              <div
                onClick={() => {
                  setCompleted(false), setCanceled(true);
                }}
                className={`border w-3.5 h-3.5  flex items-center justify-center rounded ${
                  canceled ? "border-scudGreen " : "p-1.5"
                } `}
              >
                {canceled && <AiOutlineCheck className="text-scudGreen text-lg" />}
              </div>
              {/* <input type={'checkbox'} /> */}
              <label className="text-xs tracking-wider text-[#3D4151] my-1">
                {filterOptions?.option1?.value2}
              </label>
            </div>
          </div>
          {filterOptions.option2 !== undefined && (
            <div className="flex flex-col mt-4 space-y-1.5">
              <p className="text-xs text-textColor/50">{filterOptions.option2?.title}</p>

              <div className="flex space-x-1 items-center">
                <div
                  onClick={() => {
                    setDriverCheck(true), setRiderCheck(false);
                  }}
                  className={`border w-3.5 h-3.5  flex items-center justify-center rounded ${
                    driverCheck ? "border-scudGreen " : "p-1.5"
                  } `}
                >
                  {driverCheck && <AiOutlineCheck className="text-scudGreen text-lg" />}
                </div>
                {/* <input type={'checkbox'} /> */}
                <label className="text-xs tracking-wider text-[#3D4151] my-1">
                  {filterOptions.option2.value1}
                </label>
              </div>

              <div className="flex space-x-1 items-center">
                <div
                  onClick={() => {
                    setRiderCheck(true), setDriverCheck(false);
                  }}
                  className={`border w-3.5 h-3.5  flex items-center justify-center rounded ${
                    riderCheck ? "border-scudGreen " : "p-1.5"
                  } `}
                >
                  {riderCheck && <AiOutlineCheck className="text-scudGreen text-lg" />}
                </div>
                {/* <input type={'checkbox'} /> */}
                <label className="text-xs tracking-wider text-[#3D4151] my-1">
                  {filterOptions.option2.value2}
                </label>
              </div>
            </div>
          )}

          {filterOptions.func && (
            <div className="flex justify-end items-end">
              <button
                onClick={() => {
                  setOpen(false);
                  if (multiple)
                    return filterOptions.func(completed, canceled, driverCheck, riderCheck);
                  filterOptions.func(completed ? "completed" : "canceled");
                }}
                className={
                  "px-1 text-white hover:bg-scudGreenHover rounded-sm bg-scudGreen text-[10px] mt-4 py-0.5"
                }
              >
                Apply
              </button>
            </div>
          )}
        </div>
      )}

      {open && !iconDropdown && !rating && !filter && (
        <div
          onClick={(e) => e.stopPropagation()}
          className={` ${
            ""
            // dropDownWidth !== undefined ? dropDownWidth : "w-28"
          }   ${
            position === undefined ? "" : position.includes("mt-") ? position : "mt-[20rem]"
          } absolute p-2 -ml-2 max-h-80  overflow-y-auto overflow-x-hidden bg-white max-w-[200px] min-w-[130px] rounded border transition duration-300 ease-in z-40 shadow-xl`}
        >
          {(showSearch === undefined || showSearch === true) && (
            <div className="border rounded-md p-1 w-28 px-2 flex">
              <input
                placeholder="Search..."
                type="text"
                className="outline-none text-xs placeholder:text-xs w-20 bg-white"
                onChange={handleSearch}
              />
              <div className="bg-scudGreen p-1 rounded-full flex justify-center items-center">
                <BsSearch className="text-white text-xs" />
              </div>
            </div>
          )}
          {datas.map((item, idx) => (
            <p
              onClick={(e) => {
                setValue(item), setOpen(false);
              }}
              className="py-1 text-xs text-textColor hover:bg-adminbg "
            >
              {" "}
              {item}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default Select2;
