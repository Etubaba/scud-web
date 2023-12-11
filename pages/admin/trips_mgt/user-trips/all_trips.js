import { useRouter } from "next/router";
import React from "react";
import { AiOutlineGift } from "react-icons/ai";
import { BsPerson, BsPersonCheck, BsPersonDash, BsPersonX } from "react-icons/bs";
import { TbRefresh } from "react-icons/tb";
import { FiSend } from "react-icons/fi";
import Layout from "../../../../components/Admin/Layout";
import Select2 from "../../../../components/admincomponents/Select2";
import { useState } from "react";
import DateInput from "../../../../components/admincomponents/DateInput";
import SearchInput from "../../../../components/admincomponents/SearchInput";
import Pagination from "../../../../components/common/Pagination";
import PickupDesCompo from "../../../../components/admincomponents/PickupDesCompo";
import { userTrips } from "../../../../dummy";
import BreadCrumbs from "../../../../components/common/BreadCrumbs";
import { BASE_URL } from "../../../../api/base";
import { validateToken } from "../../../../components/services/validateToken";

const AllTrips = ({ data }) => {
  const [selectedStatus, setSelectedStatus] = useState("Status");
  const [dateValue, setDateValue] = useState("");

  const router = useRouter();

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
      {" "}
      <BreadCrumbs
        indexPath={"/admin/trips_mgt/trips"}
        index={"Manage trips"}
        secondItem={data.first_name + " " + data.last_name}
      />
      <div className="py-3 px-3 mb-8 bg-white rounded-lg border  flex-col md:flex-row w-full flex md:items-center md:justify-between ">
        <div className="flex flex-col md:flex-row md:space-y-0 justify-center mb-10 md:mb-0 items-center md:space-x-4">
          <img
            src={data.picture == null ? "/user.png" : data.picture}
            className="w-20 mb-4 md:mb-0 h-20 rounded-full"
            alt=""
          />
          <div className="flex justify-center md:justify-start md:items-start items-center flex-col space-y-3">
            <p className="text-textColor font-semibold">{data.first_name + " " + data.last_name}</p>
            <div className="flex space-x-2">
              {/* <div
                className={` ${
                  level === 3 ? "bg-green-600/20" : level === 2 ? "bg-blue-600/20" : "bg-red-600/20"
                } py-[1.3px] px-4 rounded-md`}
              >
                <span
                  className={` ${
                    level === 3 ? "text-green-600" : level === 2 ? "text-blue-600" : "text-red-600"
                  }  flex space-x-1`}
                >
                  <AiOutlineGift className={`text-xs mt-0.5`} />
                  <p className="text-xs">Tier {level}</p>
                </span>
              </div> */}
              <div
                className={` ${
                  data.is_active ? "bg-green-600" : "bg-red-600"
                } py-[1.3px]  px-1 rounded-md `}
              >
                <p className="text-center  text-white tracking-wider text-xs">
                  {data.is_active ? "active" : "inactive"}
                </p>
              </div>
            </div>
            <p className="text-textColor/50 text-sm">
              {
                data.trips.filter((item) => {
                  return item.status == "completed";
                }).length
              }{" "}
              completed trips
            </p>
          </div>
        </div>
        <div className="flex justify-center items-center space-x-2">
          <button className="flex rounded-lg justify-center items-center text-sm text-scudGreen px-2 py-2 border border-scudGreen">
            <FiSend className="mt-1 mr-1" />
            <p>Send Message</p>
          </button>
          <button
            onClick={() => {
              router.push({
                pathname: "/admin/driver_mgt/driver_profile",
                query: data?.id
              });
            }}
            className="flex rounded-lg justify-center items-center text-sm text-white px-2 py-2 border bg-scudGreen"
          >
            <BsPerson className="text-lg mr-1" />
            <p>View Profile</p>
          </button>
        </div>
      </div>
      <p className="text-textColor mb-6 font-semibold">All Trips</p>
      <div className="flex flex-col-reverse md:flex-row mb-6 md:justify-between">
        <div className="flex mt-5 md:mt-0 space-x-3">
          <Select2
            data={statusOption}
            iconDropdown={true}
            Icon={TbRefresh}
            setValue={setSelectedStatus}
            value={selectedStatus}
          />

          <DateInput setValue={setDateValue} value={dateValue} />
        </div>
        <SearchInput />
      </div>
      <div className="bg-white rounded-md mb-6 w-full p-4 h-auto ">
        {data.trips.map((trip) => (
          <PickupDesCompo details="trips" trip={trip} />
        ))}
      </div>
      {/* <Pagination /> */}
    </div>
  );
};

AllTrips.getLayout = Layout;
export default AllTrips;

export async function getServerSideProps(context) {
  const token = context.req.cookies.adminAccessToken || "";
  const id = Object.keys(context.query)[0];
  const res = await fetch(`${BASE_URL}users/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  });

  const data = await res.json();

  if (data?.statusCode !== undefined && data?.statusCode === 401) {
    try {
      await validateToken(context, true);
    } catch (err) {
      return { redirect: { destination: `/admin/auth`, permanent: false } };
    }
  }

  return {
    props: {
      data
    }
  };
}
