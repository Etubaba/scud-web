import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";
import { AiOutlineComment, AiOutlineGift, AiOutlinePhone } from "react-icons/ai";
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
import { BsPeople, BsPerson, BsPersonCheck, BsPersonDash, BsPersonX } from "react-icons/bs";
import PickupDesCompo from "../../../components/admincomponents/PickupDesCompo";
import Pagination from "../../../components/common/Pagination";
import { BASE_URL } from "../../../api/base";
import EmptyTable from "../../../components/common/EmptyTable";
import { BiHash, BiRefresh, BiTrip } from "react-icons/bi";
import ChatModal from "../../../components/admincomponents/ChatModal";
import { validateToken } from "../../../components/services/validateToken";

const Rider_details = ({ user }) => {
  const router = useRouter();
  const [allReviews, setAllReviews] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("Status");
  const [dateValue, setDateValue] = useState("");
  const [openChat, setOpenChat] = useState(false);

  const {
    first_name,
    last_name,
    created_at,
    phone,
    state,
    email,
    gender,
    picture,
    reviews_recieved,
    trips,
    referrals,
    is_active
  } = user;

  const rider_name =
    first_name?.charAt(0).toUpperCase() +
    first_name?.slice(1) +
    " " +
    last_name?.charAt(0).toUpperCase() +
    last_name?.slice(1);

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

  //get trips count completed or canceled

  const tripStatusCount = (status) => {
    if (trips.length === 0) return 0;
    if (status === "completed") {
      const completedTrips = trips.filter((item) => item.status !== "completed");
      return completedTrips.length;
    } else {
      const canceledTrips = trips.filter((item) => item.status !== "canceled");
      return canceledTrips.length;
    }
  };

  const rows = referrals.map((element) => (
    <tr
      // onClick={() => {
      //   router.push("/admin/rider_mgt/rider_profile");
      // }}
      className=" text-center   hover:shadow-md hover:border text-sm  text-textColor border-b"
      key={element.id}
    >
      <td className="md:text-base text-xs p-3">{element.id}</td>
      <td className="flex justify-center py-2 items-center space-x-2">
        <img
          src={
            element.picture === null || element.picture === undefined
              ? "/user.png"
              : element.picture
          }
          className="rounded-full h-7 w-7 md:h-8 md:w-8"
          alt=""
        />
        <p className=" text-xs ">{element.first_name + " " + element.last_name}</p>
      </td>

      <td className="md:text-xs text-xs p-3">{element.roles[0]}</td>
      <td className="md:text-xs text-xs p-3">{element.gender}</td>
      <td className="md:text-xs text-xs p-3">{element.phone}</td>
      <td className="text-center">
        {element.is_active ? (
          <div className="  p-1 rounded-lg bg-[#f2fbf6]">
            <p className="text-green-600 px-1">active</p>
          </div>
        ) : (
          <div className="  p-1 rounded-lg bg-[#fff4f4]">
            <p className="text-red-600 px-1">inactive</p>
          </div>
        )}
      </td>
    </tr>
  ));

  return (
    <div>
      {" "}
      <div className="flex  justify-between mb-6 items-center">
        <span className="text-lg flex space-x-2  cursor-pointer font-semibold">
          <p
            className="text-gray-500/60 tracking-wide hover:underline"
            onClick={() => router.push("/admin/rider_mgt/rider_mgt")}
          >
            Manage Rider
          </p>{" "}
          &nbsp; &gt; <p className="tracking-wide font-semibold">{rider_name}</p>
        </span>
      </div>
      <div className="mb-10">
        <div className="py-5 px-5 bg-white rounded-t-lg border  w-full flex items-center justify-between ">
          <div className="flex justify-center items-center space-x-4">
            <img
              src={picture === null ? "/user.png" : picture}
              className="w-[5rem] rounded-full h-[5rem] object-cover"
              alt=""
            />
            <div className="flex flex-col space-y-3">
              <p className="text-textColor font-semibold">{rider_name}</p>
              <div className="flex space-x-4 justify-center items-center">
                <p className="text-xs text-textColor/50">
                  {" "}
                  Joined {new Date(created_at).toDateString()}
                </p>
                <div className="flex space-x-1">
                  <span className="w-2 h-2 mt-1 rounded-full bg-green-600"></span>
                  <p className="text-xs text-green-600">Online</p>
                </div>
              </div>
              <div
                className={`max-w-[70px]  ${
                  is_active ? "bg-green-600/10" : "text-red-700/10"
                }  py-[1.3px] px-4 rounded-md`}
              >
                <p
                  className={`text-xs text-center ${
                    is_active ? "text-green-600" : "text-red-700"
                  } `}
                >
                  {is_active ? "Active" : "Inactive"}
                </p>
              </div>
            </div>
          </div>
          <div className="flex space-x-4">
            <button
              onClick={() => setOpenChat(true)}
              className="flex rounded-lg text-sm text-scudGreen px-2 py-2 border border-scudGreen"
            >
              <FiSend className="mt-1 mr-1" />
              <p>Send Message</p>
            </button>
          </div>
        </div>
        <div className="bg-white py-4 md:py-8 px-4 md:px-6 rounded-b-lg w-full h-auto border-b border-x">
          <div className="w-full flex-col space-y-2 mb-4 md:space-y-0 md:mb-10 flex md:flex-row md:space-x-20 lg:space-x-24">
            <span className=" flex flex-row md:space-y-3 md:flex-col">
              <p className="text-sm text-textColor/50">First Name</p>
              <p className="text-sm text-textColor">{first_name}</p>
            </span>
            <span className=" flex flex-row md:space-y-3 md:flex-col">
              <p className="text-sm text-textColor/50">Last Name</p>
              <p className="text-sm text-textColor">{last_name}</p>
            </span>
            <span className=" flex flex-row md:space-y-3 md:flex-col">
              <p className="text-sm text-textColor/50">Gender</p>
              <p className="text-sm text-textColor">{gender}</p>
            </span>
            <span className=" flex flex-row md:space-y-3 md:flex-col">
              <p className="text-sm text-textColor/50">Phone Number</p>
              <p className="text-sm text-textColor">{phone}</p>
            </span>
            <span className=" flex flex-row md:space-y-3 md:flex-col">
              <p className="text-sm text-textColor/50">Email </p>
              <p className="text-sm text-textColor">{email}</p>
            </span>
          </div>
          <div className="w-full flex-col  md:space-x-24 space-y-2 md:space-y-0 flex md:flex-row ">
            <span className=" flex flex-row mr-4  md:space-y-3 md:flex-col">
              <p className="text-sm text-textColor/50">Country</p>
              <p className="text-sm text-textColor">Nigeria</p>
            </span>
            <span className=" flex mr-12 flex-row md:space-y-3 md:flex-col">
              <p className="text-sm text-textColor/50">State</p>
              <p className="text-sm text-textColor">{state?.name} </p>
            </span>
            {/* <div className="flex space-x-16 justify-between"> */}
            <span className=" flex flex-row md:space-y-3 md:flex-col">
              <p className="text-sm text-textColor/50">City</p>
              <p className="text-sm text-textColor">Port Harcourt</p>
            </span>

            <span className=" flex - flex-row md:space-y-3 md:flex-col">
              <p className="text-sm text-textColor/50">Address </p>
              <p className="text-sm text-textColor">Plot 101, Redeemed Road, Egale Island</p>
            </span>
            {/* </div> */}
          </div>
        </div>
      </div>
      <p className="font-semibold mb-4 text-sm">Ride Summary</p>
      <div className="grid mb-8 w-full grid-cols-1 md:grid-cols-4  gap-4 ">
        <DashboardCompo
          title={"Total Rides"}
          value={trips.length}
          filled={true}
          Icon={GiSteeringWheel}
          color="indigo"
        />
        <DashboardCompo
          title={"Canceled rides"}
          value={tripStatusCount("canceled")}
          filled={true}
          Icon={GiSteeringWheel}
          color="red"
        />
        <DashboardCompo
          title={"Completed Rides"}
          value={tripStatusCount("completed")}
          filled={true}
          Icon={GiSteeringWheel}
          color="green"
        />
        <DashboardCompo
          title={"Number Of Referrals"}
          value={referrals.length}
          filled={true}
          Icon={GiSteeringWheel}
          color="yellow"
        />
      </div>
      <div className="flex mb-6 justify-between items-center">
        {" "}
        <p className="font-semibold  text-sm">
          Total Reviews <b className="text-textColor/50">({reviews_recieved.length})</b>
        </p>
        <p
          onClick={() => setAllReviews(!allReviews)}
          className="text-sm text-scudGreen hover:text-scudGreen/50"
        >
          Viell all review
        </p>
      </div>
      {reviews_recieved.length !== 0 ? (
        <div className="grid grid-col-1 md:grid-cols-3 gap-4">
          {user?.reviews_recieved.map((item) => (
            <Review item={item} key={item.id} />
          ))}
        </div>
      ) : (
        <EmptyTable Icon={AiOutlineComment} title={"No Rider Review"} name={"review"} />
      )}
      <p className="text-textColor my-6 font-semibold">All Rides</p>
      <div className="flex mb-6 justify-between">
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
        <SearchInput />
      </div>
      {trips.length > 0 ? (
        <div className="bg-white rounded-md mb-6 w-full p-4 h-auto ">
          {trips.map((trip) => (
            <PickupDesCompo details="rider" trip={trip} />
          ))}
        </div>
      ) : (
        <EmptyTable Icon={BiTrip} name={"trip"} title={"No Trip Details"} />
      )}
      {/* {trips.length > 15 && <Pagination />} */}
      <div className="flex mb-6 justify-between items-center">
        {" "}
        <p className="font-semibold  text-sm">
          Referees <b className="text-textColor/50">({referrals.length})</b>
        </p>
      </div>
      {referrals.length > 0 ? (
        <div className="bg-white rounded-md mb-6 w-full p-4 h-auto ">
          {trips.map((trip) => (
            <div className="my-6 bg-white w-full overflow-x-auto border shadow pb-4  rounded-xl">
              <table className="w-full min-w-[700px] ">
                <thead className="border-b  bg-[#fbfbff] w-full rounded-t-lg">
                  <tr className="border-b ">
                    <td className="">
                      <div className="flex md:text-base text-xs justify-center">
                        <BiHash className="text-scudGreen mr-1 md:mr-2 text-sm md:mt-1" />
                        <p className="md:text-base  text-xs">id</p>
                      </div>
                    </td>

                    <td className="md:py-4 py-2 ">
                      <div className="flex  md:text-base text-xs justify-center">
                        <BsPerson className="text-scudGreen mr-1 md:mr-2 text-sm md:mt-1" />
                        <p className="md:text-base text-xs ">Referrees</p>
                      </div>
                    </td>
                    <td className="">
                      <div className="flex  justify-center">
                        <BsPeople className="text-scudGreen mr-1 md:mr-2 md:text-base md:mt-1" />
                        <p className="md:text-base text-xs ">User Type</p>
                      </div>
                    </td>
                    <td className="">
                      <div className="flex  justify-center">
                        <BsPerson className="text-scudGreen mr-1 md:mr-2 md:text-base md:mt-1" />
                        <p className="md:text-base text-xs ">Sex</p>
                      </div>
                    </td>

                    <td className=" text-center">
                      <div className="flex   justify-center">
                        <AiOutlinePhone className="text-scudGreen mr-1 md:mr-2 md:text-base md:mt-1" />
                        <p className="md:text-base text-xs ">Phone</p>
                      </div>
                    </td>

                    <td className=" ">
                      <div className="flex justify-start">
                        <div className="border h-4 w-4 mt-1 mr-1 border-scudGreen rounded-full">
                          <BiRefresh className="text-scudGreen text-sm " />
                        </div>
                        <p>Trip Status</p>
                      </div>
                    </td>
                  </tr>
                </thead>

                <tbody className="mx-4">{rows}</tbody>
              </table>
            </div>
          ))}
        </div>
      ) : (
        <EmptyTable Icon={BsPeople} name={"referrees"} title={"No Referrals Details"} />
      )}
      <ChatModal open={openChat} onClose={() => setOpenChat(false)} />
    </div>
  );
};

Rider_details.getLayout = Layout;
export default Rider_details;

export async function getServerSideProps(context) {
  const token = context.req.cookies.adminAccessToken || "";
  const id = Object.keys(context.query)[0];

  const res = await fetch(`${BASE_URL}users/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  });

  const user = await res.json();

  if (user?.statusCode !== undefined && user?.statusCode === 401) {
    try {
      await validateToken(context, true);
    } catch (err) {
      return { redirect: { destination: `/admin/auth`, permanent: false } };
    }
  }

  return {
    props: {
      user
    }
  };
}
