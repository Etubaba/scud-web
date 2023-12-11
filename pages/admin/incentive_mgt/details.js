import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";
import { AiOutlineGift } from "react-icons/ai";
import { FiSend } from "react-icons/fi";
import { GiSteeringWheel } from "react-icons/gi";
import { TbEdit, TbRefresh } from "react-icons/tb";
import Layout from "../../../components/Admin/Layout";
import Review from "../../../components/admincomponents/Review";
import Button from "../../../components/common/Button";
import DashboardCompo from "../../../components/common/DashboardCompo";
import Select2 from "../../../components/admincomponents/Select2";
import { riderReviews, userTrips } from "../../../dummy";
import DateInput from "../../../components/admincomponents/DateInput";
import SearchInput from "../../../components/admincomponents/SearchInput";
import { BsPerson, BsPersonCheck, BsPersonDash, BsPersonX } from "react-icons/bs";
import PickupDesCompo from "../../../components/admincomponents/PickupDesCompo";
import Pagination from "../../../components/common/Pagination";
import DashboardWhite from "../../../components/admincomponents/DashboardWhite";
import BreadCrumbs from "../../../components/common/BreadCrumbs";

const details = () => {
  const router = useRouter();
  const [allReviews, setAllReviews] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("Status");
  const [dateValue, setDateValue] = useState("");
  const [avatar, name] = ["/photo.png", "Cynthia Ehunu"];
  const reviews = allReviews ? riderReviews : riderReviews.slice(0, 3);
  const statusOption = [
    {
      option: "Active",

      OptionIcon: <BsPersonCheck className="text-green-600 mt-0.5 text-xs" />
    },
    {
      option: "Inactive",

      OptionIcon: <BsPersonDash className="text-yellow-300 mt-0.5  text-xs" />
    },
    {
      option: "Suspended",

      OptionIcon: <BsPersonX className=" text-red-600 mt-0.5  text-xs" />
    }
  ];
  return (
    <div>
      <BreadCrumbs
        indexPath={"/admin/incentive_mgt/driver_incentive"}
        index={"Drivers Incentives"}
        secondItem={"Etunwa James"}
      />{" "}
      <div className="mb-10">
        <div className="py-5 px-3 mb-8 bg-white rounded-lg border  flex-col md:flex-row w-full flex md:items-center md:justify-between ">
          <div className="flex flex-col md:flex-row md:space-y-0 justify-center mb-10 md:mb-0 items-center md:space-x-4">
            <img src={avatar} className="w-20 mb-4 md:mb-0 h-20" alt="" />
            <div className="flex flex-col space-y-3">
              <p className="text-textColor font-semibold">{name}</p>
              <div className="flex space-x-4 justify-center items-center">
                <span className="text-xs flex space-x-3 rounded-md px-2 bg-red-100 text-red-500">
                  <AiOutlineGift className=" text-red-500 mt-0.5" />
                  <p>Tier 1</p>
                </span>

                <div className="flex space-x-1">
                  <p className="text-xs rounded-md px-2 bg-green-600 text-white">Active</p>
                </div>
              </div>
              <div className={` py-[1.3px] rounded-md`}>
                <p className="text-textColor/50 text-left text-sm">103 completed trips</p>
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center space-x-2">
            <button className="flex rounded-lg text-sm text-scudGreen px-2 py-2 border border-scudGreen">
              <FiSend className="mt-1 mr-1" />
              <p>Send Message</p>
            </button>
            <button className="flex rounded-lg text-sm text-white px-4 py-2 border bg-scudGreen">
              <BsPerson className="text-lg mr-1" />
              <p>View Profile</p>
            </button>
            {/* <Button outline={true} text={[<FiSend />, "View Profile"]} /> */}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 mb-10 mt-6 gap-4 ">
          <DashboardWhite style={"text-xl"} title={"Current Level"} value={"Tier 1"} />
          <DashboardWhite style={"text-xl"} title={"Trips Completed"} value={"50/55 trips"} />
          <DashboardWhite style={"text-xl"} title={"Days"} value={"5/7 days"} />
          <DashboardWhite style={"text-xl"} title={"Pending Amount"} value={"₦5,000.00"} />
        </div>
      </div>
      <p className="text-textColor my-6 font-semibold">All Completed Trips</p>
      <div className="flex mb-6 md:flex-row flex-col-reverse md:justify-between">
        <div className="flex space-x-3">
          <Select2
            data={statusOption}
            iconDropdown={true}
            Icon={TbRefresh}
            setValue={setSelectedStatus}
            value={selectedStatus}
          />

          <DateInput setValue={setDateValue} value={dateValue} />
        </div>
        <SearchInput style={"md:mb-0 mb-4"} />
      </div>
      <div className="bg-white rounded-md mb-6 w-full p-4 h-auto ">
        {userTrips.map((trip) => (
          <PickupDesCompo details="rider" trip={trip} />
        ))}
      </div>
      {/* <Pagination /> */}
    </div>
  );
};

details.getLayout = Layout;
export default details;
