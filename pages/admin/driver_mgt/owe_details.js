import React, { useEffect } from "react";
import Layout from "../../../components/Admin/Layout";
import DashboardWhite from "../../../components/admincomponents/DashboardWhite";

import { useRouter } from "next/router";

import { useState } from "react";
import { AiOutlineGift } from "react-icons/ai";
import { FiSend } from "react-icons/fi";
import SearchInput from "../../../components/admincomponents/SearchInput";
import { BsPerson } from "react-icons/bs";
import PickupDesCompo from "../../../components/admincomponents/PickupDesCompo";
import Pagination from "../../../components/common/Pagination";
import DatePicker from "../../../components/common/DatePicker";
import ChatModal from "../../../components/admincomponents/ChatModal";
import { validateToken } from "../../../components/services/validateToken";
import { BASE_URL } from "../../../api/base";
import BreadCrumbs from "../../../components/common/BreadCrumbs";
import EmptyTable from "../../../components/common/EmptyTable";
import { BiTrip } from "react-icons/bi";

const Owe_details = ({ users, trips }) => {
  const router = useRouter();
  const [dateValue, setDateValue] = useState("Select date");
  const [search, setSearch] = useState("");
  const [tripsList, setTripsList] = useState(trips);
  const [openChat, setOpenChat] = useState(false);

  const { user, paid, owe } = users;

  const userName =
    user?.first_name?.charAt(0).toUpperCase() +
    user?.first_name?.slice(1) +
    " " +
    user?.last_name?.charAt(0).toUpperCase() +
    user?.last_name.slice(1);

  const picture = user?.picture;

  useEffect(() => {
    if (dateValue === "Select date") return;
    const filteredTrips = trips.filter((trp) => {
      return new Date(trp.start_date).getDay() == new Date(dateValue).getDay();
    });
    setTripsList(filteredTrips);
  }, [dateValue]);

  return (
    <div>
      {" "}
      <div className="flex  justify-between mb-6 items-center">
        <BreadCrumbs
          indexPath={"/admin/driver_mgt/owing"}
          index={"Outstanding Payment"}
          secondItem={`${userName}`}
        />
      </div>
      <div className="mb-10">
        <div className="py-3 px-5 bg-white rounded-lg border  w-full flex md:flex-row flex-col md:items-center md:justify-between ">
          <div className="flex md:justify-center md:items-center space-x-4">
            <img
              src={picture === null || picture === undefined ? "/user.png" : picture}
              className="w-[4rem] h-[4rem] rounded-full"
              alt=""
            />
            <div className="flex flex-col space-y-1">
              <p className="text-textColor font-semibold">{userName}</p>
              <div className="flex space-x-4 justify-center items-center">
                <span className="text-xs flex space-x-3 rounded-sm px-2 bg-red-100 text-red-500">
                  <AiOutlineGift className=" text-red-500 mt-0.5" />
                  <p>Tier 1</p>
                </span>

                <div className="flex space-x-1">
                  <p className="text-xs rounded-sm px-2 bg-green-600 text-white">Active</p>
                </div>
              </div>
              <div className={` py-[1.3px] rounded-md`}>
                <p className="text-textColor/50 text-left text-sm">103 completed trips</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col mt-8 md:mt-0 md:space-y-0 space-y-3 md:flex-row md:justify-center md:items-center md:space-x-2">
            <button
              onClick={() => setOpenChat(true)}
              className="flex rounded-lg justify-center items-center text-sm text-scudGreen px-2 py-2 border border-scudGreen"
            >
              <FiSend className="md:mt-1 mr-1" />
              <p>Send Message</p>
            </button>
            <button
              onClick={() =>
                router.push({
                  pathname: "/admin/driver_mgt/driver_profile",
                  query: user.id
                })
              }
              className="flex rounded-lg justify-center items-center text-sm text-white px-4 py-2 border bg-scudGreen"
            >
              <BsPerson className="text-lg mr-1" />
              <p>View Profile</p>
            </button>
            {/* <Button outline={true} text={[<FiSend />, "View Profile"]} /> */}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 mb-10 mt-6 gap-4 ">
          <DashboardWhite style={"text-xl"} title={"Total Amount owed"} value={`₦${owe}`} />
          <DashboardWhite style={"text-xl"} title={"Total Amount paid"} value={`₦${paid}`} />
          <DashboardWhite
            style={"text-xl"}
            title={"Total Balance"}
            value={`₦${user.account_balance}`}
          />
        </div>
      </div>
      <p className="text-textColor my-6 font-semibold">All Owing Trips</p>
      {trips.length > 0 && (
        <div className="flex mb-6 flex-col-reverse items-center  md:flex-row md:justify-between">
          <DatePicker
            onChange={(e) => setDateValue(e.target.value)}
            value={dateValue}
            style={"mt-5"}
          />

          <SearchInput value={search} setValue={setSearch} />
        </div>
      )}
      {trips.length > 0 ? (
        <div className="bg-white rounded-md mb-6 w-full p-4 h-auto ">
          {tripsList
            .filter((trip) => {
              if (search === "" && dateValue === "Select date") return trip;
              else if (
                trip.pickup.toLowerCase().includes(search.toLowerCase()) ||
                trip.destination.toLowerCase().includes(search.toLowerCase())
              )
                return trip;
            })
            .map((trip, idx) => (
              <PickupDesCompo key={idx} details="rider" trip={trip} />
            ))}
        </div>
      ) : (
        <EmptyTable Icon={BiTrip} name={"trips"} title={"No Trips Details"} />
      )}
      {/* <Pagination /> */}
      <ChatModal open={openChat} onClose={() => setOpenChat(false)} />
    </div>
  );
};
Owe_details.getLayout = Layout;
export default Owe_details;

export async function getServerSideProps(context) {
  const token = context.req.cookies.adminAccessToken || "";
  const id = Object.keys(context.query)[0];

  const res = await fetch(`${BASE_URL}payments/owe/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  });

  const tripsRes = await fetch(`${BASE_URL}users/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  });

  const userTrips = await tripsRes.json();
  const users = await res.json();
  if (
    (users?.statusCode !== undefined && users?.statusCode === 401) ||
    (userTrips.statusCode !== undefined && users?.statusCode === 401)
  ) {
    try {
      await validateToken(context, true);
    } catch (err) {
      return { redirect: { destination: `/admin/auth`, permanent: false } };
    }
  }

  const trips = userTrips.trips;

  return {
    props: {
      users,
      trips
    }
  };
}
