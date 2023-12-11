import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";
import { AiOutlineGift, AiOutlinePhone, AiOutlineRight } from "react-icons/ai";
import { BiHash, BiRefresh } from "react-icons/bi";
import { BsPeople, BsPerson } from "react-icons/bs";
import { FiSend } from "react-icons/fi";
import { MdOutlineLocationOn } from "react-icons/md";
import Layout from "../../../components/Admin/Layout";
import DashboardWhite from "../../../components/admincomponents/DashboardWhite";
import SearchInput from "../../../components/admincomponents/SearchInput";
import Select2 from "../../../components/admincomponents/Select2";
import BreadCrumbs from "../../../components/common/BreadCrumbs";
import Pagination from "../../../components/common/Pagination";
import { referrees } from "../../../dummy";
import { BASE_URL, STATE_URL } from "../../../api/base";
import { validateToken } from "../../../components/services/validateToken";
import EmptyTable from "../../../components/common/EmptyTable";
import ChatModal from "../../../components/admincomponents/ChatModal";

const Ref_details = ({ user, states }) => {
  const [location, setLocation] = useState("Locations");
  const [openChat, setOpenChat] = useState(false);
  const [userValue, setUserValue] = useState("All User");
  const router = useRouter();

  const stateList = states.map((el) => el.name);

  const {
    id,
    first_name,
    last_name,
    created_at,
    account_balance,
    picture,
    trips,
    referrals,
    is_active
  } = user;

  const user_name =
    first_name?.charAt(0).toUpperCase() +
    first_name?.slice(1) +
    " " +
    last_name?.charAt(0).toUpperCase() +
    last_name?.slice(1);

  const isUserDriver = () => {
    return user.roles.includes("driver");
  };

  const rows = referrals.map((element) => (
    <tr
      // onClick={() => {
      //   router.push("/admin/rider_mgt/rider_profile");
      // }}
      className=" text-center   hover:shadow-md hover:border text-sm  text-textColor border-b"
      key={element.id}
    >
      {console.log(element)}
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

      {/* <td className="md:text-xs text-xs p-3">{element.roles[0]}</td> */}
      <td className="md:text-xs text-xs p-3">{element.gender}</td>
      <td className="md:text-xs text-xs p-3">{element.phone}</td>
      <td className="text-center">
        {element.is_active ? (
          <div className=" max-w-[100px] p-1 rounded-lg bg-[#f2fbf6]">
            <p className="text-green-600">Active</p>
          </div>
        ) : (
          <div className=" max-w-[100px] p-1 rounded-lg bg-[#fff4f4]">
            <p className="text-red-600">Inactive</p>
          </div>
        )}
      </td>
    </tr>
  ));

  const page = isUserDriver() ? " Driver's Referrals" : "Rider's Referral";
  const indexPath = isUserDriver()
    ? "/admin/referral_mgt/driver_ref"
    : "/admin/referral_mgt/rider_ref";

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
  return (
    <div>
      {" "}
      <BreadCrumbs
        secondItem={user_name}
        thirditem="Referrees"
        indexPath={indexPath}
        index={page}
      />
      <div
        // onClick={() => router.push("/admin/driver_mgt/review_details")}
        className="py-3 px-3  mb-7 bg-white rounded-lg border  w-full flex flex-col md:flex-row md:justify-between "
      >
        <div className="flex flex-col md:flex-row md:space-y-0 justify-center mb-10 md:mb-0 items-center md:space-x-4">
          <img
            src={picture === null ? "/user.png" : picture}
            className="w-20 mb-4 md:mb-0 h-20 rounded-full"
            alt=""
          />
          <div className="flex justify-center md:justify-start md:items-start items-center flex-col space-y-3">
            <p className="text-textColor font-semibold">{user_name}</p>

            {isUserDriver() ? (
              <div className="flex space-x-2">
                {/* <div
                  className={` ${
                    level === 3
                      ? "bg-green-600/20"
                      : level === 2
                      ? "bg-blue-600/20"
                      : "bg-red-600/20"
                  } py-[1.3px] px-4 rounded-md`}
                >
                  <span
                    className={` ${
                      level === 3
                        ? "text-green-600"
                        : level === 2
                        ? "text-blue-600"
                        : "text-red-600"
                    }  flex space-x-1`}
                  >
                    <AiOutlineGift className={`text-xs mt-0.5`} />
                    <p className="text-xs">Tier {level}</p>
                  </span>
                </div> */}
                <div
                  className={` ${
                    is_active ? "bg-green-600" : "bg-red-600"
                  } py-[1.3px]  min-w-[80px] rounded-md `}
                >
                  <p className="text-center  text-white tracking-wider text-xs">
                    {is_active ? "Active" : "Inactive"}
                  </p>
                </div>
              </div>
            ) : (
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
            )}
            {isUserDriver() ? (
              <p className="text-textColor/50 text-sm">
                {tripStatusCount("completed")} completed trips
              </p>
            ) : (
              <div
                className={`max-w-[70px]  jus ${
                  is_active ? "bg-green-600/10" : "bg-red-600"
                } py-[1.3px] px-4 rounded-md`}
              >
                <p
                  className={`text-xs text-center ${is_active ? "text-green-600" : "text-red-600"}`}
                >
                  {" "}
                  {is_active ? "Active" : "Inactive"}
                </p>
              </div>
            )}
          </div>
        </div>
        <div className="flex justify-center items-center space-x-2">
          <button
            onClick={() => setOpenChat(true)}
            className="flex rounded-lg text-sm text-scudGreen px-2 py-2 border border-scudGreen"
          >
            <FiSend className="mt-1 mr-1" />
            <p>Send Message</p>
          </button>
          <button
            onClick={() => {
              if (isUserDriver()) {
                router.push({
                  pathname: "/admin/driver_mgt/driver_profile",
                  query: id
                });
              } else {
                router.push({
                  pathname: "/admin/rider_mgt/rider_profile",
                  query: id
                });
              }
            }}
            className="flex rounded-lg text-sm text-white px-4 py-2 border bg-scudGreen"
          >
            <BsPerson className="text-lg mr-1" />
            <p>View Profile</p>
          </button>
          {/* <Button outline={true} text={[<FiSend />, "View Profile"]} /> */}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 mb-10 mt-6 gap-4 ">
        <DashboardWhite title={"Total referrals"} value={referrals.length} />
        <DashboardWhite title={"Total referrals Earning"} value={"N/A"} />
        <DashboardWhite title={"Total Balance"} value={account_balance} />
      </div>
      <p className="text-base text-textColor mb-5 font-semibold">List of Referrals</p>
      <div className="flex flex-col-reverse md:flex-row md:justify-between md:items-center">
        {" "}
        <div className="flex md:mt-0 mt-5 space-x-3">
          {/* <DateInput setValue={setDateValue} value={dateValue} /> */}
          <Select2
            data={stateList}
            Icon={MdOutlineLocationOn}
            setValue={setLocation}
            value={location}
            position={"mt-[22rem]"}
          />

          <Select2
            data={["All user", "Active", "Inactive"]}
            position={"mt-[9.3rem]"}
            Icon={BsPerson}
            setValue={setUserValue}
            value={userValue}
          />
        </div>
        <SearchInput />
      </div>
      {/* table start here  */}
      {referrals.length > 0 ? (
        <div className="mt-10 mb-6 bg-white w-full overflow-x-auto border shadow pb-4  rounded-xl">
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
      ) : (
        <EmptyTable Icon={BsPeople} name={"referrers"} title={"No Users With Referrees"} />
      )}
      {/* table end here  */}
      {/* <Pagination /> */}
      <ChatModal open={openChat} onClose={() => setOpenChat(false)} />
    </div>
  );
};

Ref_details.getLayout = Layout;
export default Ref_details;

export async function getServerSideProps(context) {
  const token = context.req.cookies.adminAccessToken || "";
  const id = Object.keys(context.query)[0];

  const res = await fetch(`${BASE_URL}users/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  });
  const stateRes = await fetch(`${STATE_URL}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  });

  const user = await res.json();
  const states = await stateRes.json();

  if (
    (user?.statusCode !== undefined && user?.statusCode === 401) ||
    (states.statusCode !== undefined && states.statusCode === 401)
  ) {
    try {
      await validateToken(context, true);
    } catch (err) {
      return { redirect: { destination: `/admin/auth`, permanent: false } };
    }
  }

  return {
    props: {
      user,
      states
    }
  };
}
