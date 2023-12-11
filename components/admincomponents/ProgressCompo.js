import React from "react";
import { AiOutlineCar } from "react-icons/ai";
import { getTimeAgo } from "../services/getTimeAgo";
import { MdAccessTime } from "react-icons/md";
import { TbCarOff } from "react-icons/tb";
import { useRouter } from "next/router";
import { IoMdStopwatch } from "react-icons/io";

const ProgressCompo = ({ item, promoTarget }) => {
  const router = useRouter();
  const {
    user_object: { id: user_id, first_name, last_name, picture },
    id: promo_id,
    time_online,
    trips_completed,
    cancelation_rate,
    completed,
    joined_at
  } = item;
  const { trips, online_hours, cancellation_rate } = promoTarget;

  return (
    <div
      onClick={() => {
        router.push({
          pathname: "/admin/driver_mgt/progress_details",
          query: { promo_id, user_id }
        });
      }}
      className="bg-white border rounded-md mb-3"
    >
      <div className={`flex md:flex-row flex-col py-3 px-4 md:justify-between`}>
        <div className="flex flex-col md:flex-row items-center md:space-x-2 ">
          <img
            alt=""
            className="w-16 h-16 md:mb-0 mb-2 md:w-10 md:h-10 rounded-full"
            src={picture === null || picture === undefined ? "/user.png" : picture}
          />
          <div className="md:justify-start mb-6 md:mb-0 md:items-start justify-center items-center flex flex-col">
            <p className="font-semibold mb-1 text-sm text-textColor">
              {first_name + " " + last_name}
            </p>
            <div className="flex  items-center justify-center space-x-1 ">
              <div className="bg-[#00AB4C] w-3 h-3 rounded-full"></div>
              <p className="text-xs text-[#00AB4C]">Online</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:space-x-8 md:items-center md:justify-between">
          <div className="flex items-center justify-center mb-4 md:mb-0 space-x-8">
            <div className="flex space-x-2 items-center">
              <div className="rounded-full p-1 flex justify-center items-center bg-[#E6EBFF]">
                <AiOutlineCar className="text-scudGreen" />
              </div>

              <p className="md:text-sm text-xs text-textColor font-thin">
                {trips_completed} / {trips}
              </p>
            </div>

            <div className="flex space-x-2 items-center">
              <div className="rounded-full p-1 flex justify-center items-center bg-[#FFEAEA]">
                <TbCarOff className="text-[#FF2D2D]" />
              </div>

              <p className="md:text-sm text-xs text-textColor font-thin">
                {cancelation_rate}/{cancellation_rate}
              </p>
            </div>
            <div className="flex space-x-2 items-center">
              <div className="rounded-full p-1 flex justify-center items-center bg-[#E5F7ED]">
                <IoMdStopwatch className="text-[#00AB4C]" />
              </div>

              <p className="md:text-sm text-xs text-textColor font-thin">
                {time_online}/{online_hours}
              </p>
            </div>
          </div>
          <div className="flex space-x-4 justify-between md:justify-start items-center">
            <div className="flex space-x-0.5 text-textColor/50 ">
              <MdAccessTime />
              <p className="text-xs">{getTimeAgo(joined_at)}</p>
            </div>
            {completed ? (
              <div className=" max-w-[120px]  p-1 rounded-lg bg-[#f2fbf6]">
                <p className="text-green-600 text-xs">Completed</p>
              </div>
            ) : (
              <div className=" max-w-[120px] p-1 rounded-lg bg-[#F2F5FF]">
                <p className="text-scudGreen text-xs">Ongoing</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressCompo;
