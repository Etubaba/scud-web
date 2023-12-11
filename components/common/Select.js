import React, { useState } from "react";
import { BsCalendar2Date } from "react-icons/bs";
import { IoIosArrowDown } from "react-icons/io";
import { MdOutlineCircle } from "react-icons/md";
import { useDispatch } from "react-redux";
import { handleSelectedItemIndex, handleSelectedUserIndex } from "../../features/scudSlice";
import { AiOutlineCheck } from "react-icons/ai";
import CheckList from "./CheckList";

function Select({
  value,
  setValue,
  setItemId,
  data,
  color,
  position,
  dateSelect,
  style,
  dropDownWidth,
  search,
  colorSelect,
  other,
  checkbox,
  itemid
}) {
  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState(false);
  const [from, setFrom] = useState(null);
  const [to, setTo] = useState(null);
  const [searchValue, setSearchValue] = useState([]);
  const [outline, setOutline] = useState(false);
  const dispatch = useDispatch();

  const setTime = () => {
    if (from && to) {
      setValue(`${from} - ${to}`);

      setOpen(false);
    }
  };

  const handleSearch = (e) => {
    let newValue = data.filter((res) => {
      return res.toLowerCase().includes(e.target.value.toLowerCase());
    });

    setSearchValue(newValue);
  };

  //   const handleChecked = (id) => {
  //     if (!checked) setValue((prev) => [...prev, id]);
  //     else {
  //       const arrFilter = data?.filter((item) => item.id !== id);
  //       const newArr = arrFilter.map((el) => el.id);
  //       setValue(newArr);
  //     }
  //     setChecked(!checked);
  //   };

  if (checkbox) {
    return (
      <div className="relative">
        <div
          onClick={() => setOpen(!open)}
          className={` ${
            style !== undefined ? style : "h-6 p-2 min-w-[110px]"
          } cursor-pointer rounded-md  border ${color} flex ${
            open ? "border-scudGreen" : ""
          }  items-center justify-between`}
        >
          {value.map((item, idx) => (
            <div key={idx} className="">
              <p className={`text-xs text-textColor`}>{item.name}</p>
            </div>
          ))}
          {value.length === 0 && <div className="text-xs text-textColor">Select</div>}

          <IoIosArrowDown
            onClick={(e) => {
              e.stopPropagation();
              setOpen(!open);
            }}
            className={`${open ? "text-scudGreen" : "text-textColor"}   text-sm mt-[2px]`}
          />
        </div>

        {open && (
          <div
            className={`max-h-[100px] pb-5
             
            w-full mt-1  ${position} absolute cursor-pointer bg-white rounded border overflow-y-auto  transition duration-300 ease-in z-40 shadow-lg`}
          >
            {data.map((item, idx) => (
              <CheckList
                key={idx}
                data={data}
                item={item}
                setItemId={setItemId}
                value={value}
                setValue={setValue}
                itemid={itemid}
              />
            ))}
          </div>
        )}
      </div>
    );
  }

  if (dateSelect) {
    return (
      <div className="relative w-full md:min-w-[150px]">
        <div
          onClick={() => setOpen(!open)}
          className={`py-4 px-2   ${
            open ? "border-scudGreen" : ""
          } items-center cursor-pointer flex justify-between rounded-md h-6 border`}
        >
          <div className="flex justify-center items-center">
            <BsCalendar2Date className="text-scudGreen" />
            <span className="text-sm ml-2">{value}</span>
          </div>
          <IoIosArrowDown
            className={open ? "text-scudGreen text-sm mt-[2px]" : "text-sm mt-[2px]"}
          />
        </div>

        {open && (
          <div
            className={` w-auto cursor-pointer  ${position}  absolute bg-white rounded border transition duration-300 ease-in z-40 shadow-lg`}
          >
            <div className="flex z-40 space-x-2 md:space-x-3 mb-4 justify-between px-2">
              <div>
                <label htmlFor="from">From</label>
                <br />
                <input
                  id="from"
                  type="date"
                  name="from"
                  className="w-[6.8rem]  focus:outline-scudGreen text-xs rounded-md border px-0.5 py-2 "
                  // value={from}
                  onChange={(e) => setFrom(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="to">To</label>
                <br />
                <input
                  name="to"
                  id="to"
                  type={"date"}
                  className=" focus:outline-scudGreen text-xs w-[6.8rem] rounded-md border p-2 "
                  // value={to}
                  onChange={(e) => setTo(e.target.value)}
                />
              </div>
            </div>

            <div className="border-t p-4 flex justify-between">
              <p onClick={() => setOpen(!open)} className="text-red-600 text-sm">
                Cancel
              </p>
              <p onClick={setTime} className="text-sm font-semibold text-scudGreen">
                Set Time
              </p>
            </div>
          </div>
        )}
      </div>
    );
  } else {
    return (
      <div className="relative">
        <div
          onClick={() => {
            if (search && open) {
              setOpen(true);
            } else {
              setOpen(!open);
            }
          }}
          // aria-haspopup="listbox"
          // aria-expanded={open}
          className={` ${
            style !== undefined ? style : "h-6 p-2 min-w-[110px]"
          } cursor-pointer rounded-md  border ${color}  ${
            color.includes("white") ? "border-white" : ""
          } flex ${open ? "border-scudGreen" : ""}  items-center justify-between`}
        >
          {open && search ? (
            <input
              type={"text"}
              onChange={handleSearch}
              placeholder="Search..."
              className="outline-none text-xs placeholder:text-xs h-3 w-full border-0 bg-adminbg"
            />
          ) : (
            <p className={`text-xs ${color.includes("white") ? "" : "text-textColor"} mr-1`}>
              {value}
            </p>
          )}

          <IoIosArrowDown
            onClick={(e) => {
              e.stopPropagation();
              setOpen(!open);
            }}
            className={`${open ? "text-scudGreen" : "text-textColor"}   text-sm mt-[2px]`}
          />
        </div>
        {open && (
          <div
            // role={"listbox"}
            className={`max-h-[100px] pb-5 ${data?.length == 0 && "p-2"}
                  mt-1 w-full  ${position} absolute cursor-pointer bg-white rounded border overflow-y-auto  transition  duration-300 ease-in z-40 shadow-lg`}
          >
            {data.length == 0 ? (
              <p className="text-xs text-textColor text-center">No item</p>
            ) : !data[0]?.image ? (
              <div className={`px-2 py-2 w-full`}>
                {colorSelect ? (
                  <div>
                    {searchValue.length === 0
                      ? data.map((item, index) => (
                          <div key={index} className="flex">
                            <div
                              className={`rounded-full mr-1  mt-1.5 ${item.color}  h-3 w-3`}
                              // ${
                              //   // item.color
                              //   // item.color !== null
                              //   //   ? "bg-[r]".replace("r", item.color)
                              //   //   : ""
                              // }
                            ></div>

                            <p
                              onClick={() => {
                                dispatch(handleSelectedItemIndex(index));
                                setValue(item.name);
                                setOpen(false);
                              }}
                              key={index}
                              className="flex hover:bg-adminbg items-center text-xs px-2 rounded-md py-1"
                            >
                              {item.name}
                            </p>
                          </div>
                        ))
                      : searchValue.map((item, index) => (
                          <div key={index} className="flex">
                            <div
                              className={`rounded-full mr-1  mt-1.5 ${item.color}  h-3 w-3`}
                              // ${
                              //   // item.color
                              //   // item.color !== null
                              //   //   ? "bg-[r]".replace("r", item.color)
                              //   //   : ""
                              // }
                            ></div>

                            <p
                              onClick={() => {
                                dispatch(handleSelectedItemIndex(index));
                                setValue(item.name);
                                setOpen(false);
                                setSearchValue([]);
                              }}
                              key={index}
                              className="flex hover:bg-adminbg items-center text-xs px-2 rounded-md py-1"
                            >
                              {item.name}
                            </p>
                          </div>
                        ))}
                    {other && (
                      <div
                        className={`border rounded-md py-1 px-2 flex  ${
                          outline ? "border-scudGreen" : ""
                        }`}
                      >
                        <MdOutlineCircle
                          className={
                            outline
                              ? "text-scudGreen text-base mt-1.5"
                              : "text-base mt-1.5 text-textColor"
                          }
                        />
                        <input
                          onBlur={() => setOutline(false)}
                          onFocus={() => setOutline(true)}
                          type="text"
                          placeholder="Other"
                          className=" outline-none w-full -mt-0.5 rounded-md px-2 py-0.5"
                        />
                        <div className="bg-[#F2F5FF] hover:bg-blue-100 rounded-md px-2 py-1">
                          <p className="text-scudGreen text-sm">OK</p>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <>
                    {searchValue.length === 0 ? (
                      data.length == 0 ? (
                        <p className="text-xs text-textColor text-center">No item</p>
                      ) : (
                        data.map((item, index) =>
                          typeof item == "string" ? (
                            <p
                              onClick={() => {
                                dispatch(handleSelectedItemIndex(index));
                                setValue(item);
                                setOpen(false);
                              }}
                              key={index}
                              className="flex hover:bg-adminbg items-center text-xs px-2 rounded-md py-1"
                            >
                              {item}
                            </p>
                          ) : (
                            <p
                              onClick={() => {
                                dispatch(handleSelectedItemIndex(index));
                                setValue(item.name);
                                setItemId(item.id);
                                setOpen(false);
                              }}
                              key={index}
                              className="flex hover:bg-adminbg items-center text-xs px-2 rounded-md py-1"
                            >
                              {item.name}
                            </p>
                          )
                        )
                      )
                    ) : (
                      searchValue.map((item, index) => (
                        <p
                          onClick={() => {
                            dispatch(handleSelectedItemIndex(index));
                            setValue(item);
                            setOpen(false);
                            setSearchValue([]);
                          }}
                          key={index}
                          className="flex hover:bg-adminbg items-center text-xs px-2 rounded-md py-1"
                        >
                          {item}
                        </p>
                      ))
                    )}
                  </>
                )}
              </div>
            ) : (
              <div className=" p-2 overflow-auto space-y-1">
                {/* <input
                  placeholder="Search Bank"
                  type="text"
                  className="border placeholder:text-xs w-full  focus:border-scudGreen focus:outline-none outline-none focus:ring-1 focus:ring-scudGreen rounded-md px-2 py-1"
                /> */}

                {searchValue.length === 0
                  ? data.map((item, index) => (
                      <div
                        key={index}
                        onClick={() => {
                          setValue(item.name), setOpen(false);
                        }}
                        className="flex hover:bg-adminbg p-1 space-x-2 items-center"
                      >
                        <img src={item.image} alt="" className="w-6 h-6" />
                        <p
                          onClick={() => {
                            setValue(item.name);
                            dispatch(handleSelectedItemIndex(index));
                          }}
                          key={index}
                          className="flex items-center text-textColor text-xs  px-2 rounded-md py-1"
                        >
                          {item.name}
                        </p>
                      </div>
                    ))
                  : searchValue.map((item, index) => (
                      <div
                        key={index}
                        onClick={() => {
                          dispatch(handleSelectedItemIndex(index));
                          setValue(item.name);
                          setOpen(false);
                        }}
                        className="flex hover:bg-adminbg p-1 space-x-2 items-center"
                      >
                        <img src={item.image} alt="" className="w-6 h-6" />
                        <p
                          onClick={() => {
                            setValue(item.name);
                            setSearchValue([]);
                          }}
                          key={index}
                          className="flex items-center text-textColor text-xs  px-2 rounded-md py-1"
                        >
                          {item.name}
                        </p>
                      </div>
                    ))}

                {other && (
                  <div
                    className={`border rounded-md py-1 px-2 flex  ${
                      outline ? "border-scudGreen" : ""
                    }`}
                  >
                    <MdOutlineCircle
                      className={
                        outline
                          ? "text-scudGreen text-base mt-1.5"
                          : "text-base mt-1.5 text-textColor"
                      }
                    />
                    <input
                      onBlur={() => setOutline(false)}
                      onFocus={() => setOutline(true)}
                      type="text"
                      placeholder="Other"
                      className=" outline-none w-full -mt-0.5 rounded-md px-2 py-0.5"
                    />
                    <div className="bg-[#F2F5FF] hover:bg-blue-100 rounded-md px-2 py-1">
                      <p className="text-scudGreen text-sm">OK</p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* {open && checkbox && (
          <div
            className={`max-h-[100px] pb-5
              dropDownWidth !== undefined ? dropDownWidth : "w-28"
            }   ${position} absolute cursor-pointer bg-white rounded border overflow-y-auto  transition duration-300 ease-in z-40 shadow-lg`}
          >
            {data.map((item, idx) => (
              <CheckList key={idx} data={data} item={item} setValue={setValue} />
              //   <div key={item.id} className="flex hover:bg-adminbg p-1 space-x-1 items-center">
              //     <div
              //       onClick={() => handleChecked(item.id, idx)}
              //       className={`border w-3.5 h-3.5  flex items-center justify-center rounded ${
              //         checked ? "border-scudGreen " : "p-1.5"
              //       } `}
              //     >
              //       {checked && <AiOutlineCheck className="text-scudGreen text-lg" />}
              //     </div>
              //     <p className="flex items-center text-textColor text-xs  px-2 rounded-md py-1">
              //       {item.name}
              //     </p>
              //   </div>
            ))}
          </div>
        )} */}
      </div>
    );
  }
}

export default Select;
