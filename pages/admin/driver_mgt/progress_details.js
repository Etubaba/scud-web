import React, { useState } from "react";
import Layout from "../../../components/Admin/Layout";
import BreadCrumbs from "../../../components/common/BreadCrumbs";
import { FiSend } from "react-icons/fi";
import { BsArrowUpRight, BsPerson } from "react-icons/bs";
import { TbCar, TbCarOff, TbCurrencyNaira } from "react-icons/tb";
import { AiOutlineCar } from "react-icons/ai";
import { RiTimerLine } from "react-icons/ri";
import { MdOutlineAccessTime } from "react-icons/md";
import Divider from "../../../components/common/Divider";
import Button from "../../../components/common/Button";
import ChatModal from "../../../components/admincomponents/ChatModal";
import { BASE_URL } from "../../../api/base";
import { useRouter } from "next/router";
import { getTimeAgo } from "../../../components/services/getTimeAgo";
import { validateToken } from "../../../components/services/validateToken";

const progress_details = ({ userPromoScore, promoTarget, user }) => {
  const [status] = ["completed"];
  const [openChat, setOpenChat] = useState(false);
  const router = useRouter();

  const { first_name, last_name, picture, created_at: joined, id: user_id } = user;

  //the driver promo scores
  const { time_online, trips_completed, cancelation_rate, completed, completed_at, joined_at } =
    userPromoScore;
  //the promo target to reach
  const { id, name, trips, online_hours, expires_at, cancellation_rate, vehicle_types } =
    promoTarget;

  const driver_name =
    first_name?.charAt(0).toUpperCase() +
    first_name?.slice(1) +
    " " +
    last_name?.charAt(0).toUpperCase() +
    last_name?.slice(1);

  return (
    <div>
      <BreadCrumbs
        indexPath={"/admin/driver_mgt/promo_progress"}
        index={"Driver Promotions"}
        secondItem={driver_name}
      />

      <div className="py-3 px-4 bg-white rounded-md border mb-4 flex-col md:flex-row  w-full flex items-center justify-between ">
        <div className="flex flex-col md:flex-row  justify-center items-center space-y-2 md:space-y-0 md:space-x-2">
          <img
            src={picture === null ? "/user.png" : picture}
            className="w-[3rem] rounded-full h-[3rem] object-cover"
            alt=""
          />
          <div className="flex flex-col md:block md:justify-start md:items-center justify-center items-center ">
            <p className="text-textColor mb-2 font-semibold">{driver_name}</p>
            <div className="flex space-x-4 justify-center items-center mb-4 md:mb-0">
              <p className="text-xs text-textColor/50"> Joined {new Date(joined).toDateString()}</p>
              <div className="flex space-x-1">
                <span className="w-2 h-2 mt-1 rounded-full bg-green-600"></span>
                <p className="text-xs text-green-600">Online</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex space-x-4">
          <button
            onClick={() => setOpenChat(true)}
            className="flex rounded-md text-sm text-scudGreen px-2 py-1.5 border border-scudGreen"
          >
            <FiSend className="mt-1 mr-1" />
            <p className="text-sm">Send Message</p>
          </button>
          <button
            onClick={() => {
              router.push({
                pathname: "/admin/driver_mgt/driver_profile",
                query: user_id
              });
            }}
            className="flex rounded-md text-sm text-white bg-scudGreen px-3 py-1.5 border "
          >
            <BsPerson className="mt-1 mr-1" />
            <p className="text-sm">View Profile</p>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-md border   py-4 px-4 md:px-6">
        <div className=" flex justify-between mb-4">
          {/*this can either be cash offer or car offer*/}
          <p className="text-sm  font-[600] text-title">{name}</p>

          <div className="">
            <CountDown date={expires_at} />
          </div>
        </div>

        <div className="md:max-w-[20rem]  mb-4 md:mb-6">
          <div className="flex justify-between items-center mb-3">
            <div className="flex space-x-2 items-center">
              <div className="rounded-full p-1 flex justify-center items-center bg-[#E5F7ED]">
                <TbCar className="text-[#00AB4C]" />
              </div>
              <p className="text-sm text-textColor ">Vehicle Type</p>
            </div>
            <p className="text-sm text-title font-semibold mr-2.5">
              {vehicle_types.length > 1
                ? vehicle_types[0] + "&" + vehicle_types[1]
                : vehicle_types[0]}
            </p>
          </div>
          <div className="flex justify-between items-center mb-3">
            <div className="flex space-x-2 items-center">
              <div className="rounded-full p-1 flex justify-center items-center bg-[#fff8ec]">
                <TbCurrencyNaira className="text-[#FFBD3D]" />
              </div>
              <p className="text-sm text-textColor">Amount</p>
            </div>
            <p className="text-sm text-title font-semibold mr-3">₦10,000</p>
          </div>
          <div className="flex justify-between items-center mb-3">
            <div className="flex space-x-2 items-center">
              <div className="rounded-full p-1 flex justify-center items-center bg-[#F2F5FF]">
                <AiOutlineCar className="text-scudGreen" />
              </div>
              <p className="text-sm text-textColor">Number of trips</p>
            </div>
            <div className="flex space-x-1">
              <p className="text-sm text-title font-semibold">
                {" "}
                {trips_completed} / {trips}
              </p>
              <div className="p-1 bg-[#f2f5ff] rounded-md">
                <BsArrowUpRight className="text-textColor text-xs" />
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center mb-3">
            <div className="flex space-x-2 items-center">
              <div className="rounded-full p-1 flex justify-center items-center bg-[#fff4f4]">
                <TbCarOff className="text-red-600" />
              </div>
              <p className="text-sm text-textColor">Number of canceled trips</p>
            </div>
            <div className="flex space-x-1">
              <p className="text-sm text-title font-semibold">
                {" "}
                {cancelation_rate}/{cancellation_rate}
              </p>
              <div className="p-1 bg-[#f2f5ff] rounded-md">
                <BsArrowUpRight className="text-textColor text-xs" />
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center mb-3">
            <div className="flex space-x-2 items-center">
              <div className="rounded-full p-1 flex justify-center items-center bg-[#E5F7ED]">
                <RiTimerLine className="text-[#00AB4C]" />
              </div>
              <p className="text-sm text-textColor">Number of hours online</p>
            </div>
            <div className="flex space-x-1">
              <p className="text-sm text-title font-semibold">
                {" "}
                {time_online}/{online_hours}
              </p>
              <div className="p-1 bg-[#f2f5ff] rounded-md">
                <BsArrowUpRight className="text-textColor text-xs" />
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center mb-3">
            <div className="flex space-x-2 items-center">
              <MdOutlineAccessTime className="text-textColor text-sm ml-1" />

              <p className="text-sm text-textColor">{getTimeAgo(joined_at)}</p>
            </div>
          </div>
        </div>

        <Divider />

        <div className="flex justify-between my-2">
          <div className="bg-[#f2f5ff] px-3 flex justify-center items-center rounded-md">
            <p className=" text-xs">
              Offer type: <b>{name}</b>
            </p>{" "}
          </div>

          <div className="flex space-x-3 items-center">
            {completed ? (
              <div className=" max-w-[120px] flex justify-center p-1 rounded-lg bg-[#f2fbf6]">
                <p className="text-green-600 text-xs">Completed</p>
              </div>
            ) : (
              <div className=" max-w-[120px] p-1 rounded-lg bg-[#F2F5FF]">
                <p className="text-scudGreen text-xs">Ongoing</p>
              </div>
            )}

            <div className="md:block hidden">
              {" "}
              <Button text={"Mark Winner"} />
            </div>
          </div>
        </div>

        <div className="md:hidden flex mt-4 item justify-end">
          {" "}
          <Button text={"Mark Winner"} />
        </div>
      </div>
      <ChatModal open={openChat} onClose={() => setOpenChat(false)} />
    </div>
  );
};
progress_details.getLayout = Layout;
export default progress_details;

export async function getServerSideProps(context) {
  const token = context.req.cookies.adminAccessToken || "";
  const { user_id, promo_id } = context.query;

  const [promoDetailsRes, promoProgressRes, userRes] = await Promise.all([
    fetch(`${BASE_URL}driver-promos/user-progress/${promo_id}/${user_id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    }),
    fetch(`${BASE_URL}driver-promos/${promo_id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    }),
    fetch(`${BASE_URL}users/${user_id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    })
  ]);

  const [userPromoScore, promoTarget, user] = await Promise.all([
    promoDetailsRes.json(),
    promoProgressRes.json(),
    userRes.json()
  ]);

  if (
    (userPromoScore?.statusCode !== undefined && userPromoScore?.statusCode === 401) ||
    (promoTarget.statusCode !== undefined && promoTarget.statusCode === 401)
  ) {
    try {
      await validateToken(context, true);
    } catch (err) {
      return { redirect: { destination: `/admin/auth`, permanent: false } };
    }
  }

  delete promoTarget?.participants;
  return {
    props: {
      userPromoScore,
      promoTarget,
      user
    }
  };
}
