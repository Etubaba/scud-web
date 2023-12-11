import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";
import { AiOutlineCalendar, AiOutlineCar, AiOutlineGift } from "react-icons/ai";
import { BiHash } from "react-icons/bi";
import { BsBarChartLine, BsWallet2 } from "react-icons/bs";
import { GiSteeringWheel } from "react-icons/gi";
import Layout from "../../../components/Admin/Layout";
import SearchInput from "../../../components/admincomponents/SearchInput";
import Select2 from "../../../components/admincomponents/Select2";
import Pagination from "../../../components/common/Pagination";
import { driverRef } from "../../../dummy";

const Driver_incentive = () => {
  const [location, setLocation] = useState("Locations");
  const [level, setLevel] = useState("tier");

  const router = useRouter();

  const tier = [
    {
      option: "Tier 1",
      //  total: 123,
      OptionIcon: <AiOutlineGift className="text-textColor mt-0.5 text-xs" />
    },
    {
      option: "Tier 2",
      //  total: 123,
      OptionIcon: <AiOutlineGift className="text-textColor mt-0.5  text-xs" />
    },
    {
      option: "Tier 3",
      //  total: 123,
      OptionIcon: <AiOutlineGift className="text-textColor mt-0.5  text-xs" />
    }
  ];

  const rows = driverRef.map((element) => (
    <tr
      onClick={() => {
        router.push(`/admin/incentive_mgt/details`);
      }}
      className=" text-center hover:translate-x-0.5  transition-all cursor-pointer  hover:shadow-md  text-sm  text-textColor border-b"
      key={element.id}
    >
      <td className="md:text-base text-xs p-3">{element.id}</td>
      <td className="flex justify-center py-2 items-center space-x-2">
        <img src={element.driver.avatar} className="rounded-full h-7 w-7 md:h-8 md:w-8" alt="" />
        <p className=" text-xs ">{element.driver.name}</p>
      </td>
      <td className="md:text-xs text-xs p-3 w-28 ">
        <span className="  rounded-md p-1 text-yellow-300  bg-slate-200 space-x-5 flex justify-center items-center">
          <AiOutlineGift className=" text-sm" />
          <p>Tier 1</p>
        </span>
      </td>
      <td className="md:text-xs text-xs p-3">100 out of 120 trips</td>
      <td className="md:text-xs text-xs p-3">10 / 13 days</td>
      <td className="md:text-xs text-xs p-3">{element.pending_amount}</td>
    </tr>
  ));

  return (
    <div>
      {" "}
      <p className="md:text-base text-sm tracking-wide font-semibold">Driver incentives</p>
      <div className="flex flex-row   justify-between mt-8 items-center">
        <Select2
          data={tier}
          iconDropdown={true}
          Icon={BsBarChartLine}
          setValue={setLevel}
          value={level}
        />

        <SearchInput />
      </div>
      {/* table start here  */}
      <div className=" my-6 bg-white w-full overflow-x-auto md:overflow-x-hidden border shadow pb-4  rounded-xl">
        <table className="w-full min-w-[700px] ">
          <thead className="border-b  bg-[#fbfbff] w-full rounded-t-lg">
            <tr className="border-b ">
              <td className="">
                <div className="flex md:text-base text-xs justify-center">
                  <BiHash className="text-scudGreen mr-1 md:mr-2 text-sm md:mt-1" />
                  <p className="md:text-base  text-xs">id</p>
                </div>
              </td>
              <td className="">
                <div className="flex md:text-base text-xs justify-center">
                  <GiSteeringWheel className="text-scudGreen mr-1 md:mr-2 text-sm md:mt-1" />
                  <p className="md:text-base  text-xs">Drivers</p>
                </div>
              </td>

              <td className="md:py-4 py-2 ">
                <div className="flex  md:text-base text-xs justify-center">
                  <AiOutlineGift className="text-scudGreen mr-1 md:mr-2 text-sm md:mt-1" />
                  <p className="md:text-base text-xs ">Tier Levels</p>
                </div>
              </td>
              <td className="">
                <div className="flex  justify-center">
                  <AiOutlineCar className="text-scudGreen mr-1 md:mr-2 md:text-base md:mt-1" />
                  <p className="md:text-base text-xs ">Trips Completed</p>
                </div>
              </td>
              <td className="">
                <div className="flex  justify-center">
                  <AiOutlineCalendar className="text-scudGreen mr-1 md:mr-2 md:text-base md:mt-1" />
                  <p className="md:text-base text-xs ">Days</p>
                </div>
              </td>

              <td className="">
                <div className="flex md:text-base text-xs justify-center">
                  <BsWallet2 className="text-scudGreen mr-1 md:mr-2 text-sm md:mt-1" />
                  <p className="md:text-base  text-xs">Pending Amount</p>
                </div>
              </td>
            </tr>
          </thead>

          <tbody className="mx-4">{rows}</tbody>
        </table>
      </div>
      {/* table end here  */}
      {/* <Pagination /> */}
    </div>
  );
};

Driver_incentive.getLayout = Layout;

export default Driver_incentive;
