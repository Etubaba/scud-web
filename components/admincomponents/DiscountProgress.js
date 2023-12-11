import { useRouter } from "next/router";
import React from "react";

const DiscountProgress = ({ item }) => {
  const router = useRouter();

  const {
    user_id,
    user: { picture, first_name, last_name },
    first_offer_trips,
    discount_id,
    last_offer_trips,
    created_at,
    discount
  } = item;

  return (
    <div
      onClick={() => {
        router.push({
          pathname: "/admin/rider_promo_setting/progress_details",
          query: { user_id, discount_id }
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
                <AiOutlineCar className="text-[#00AB4C]" />
              </div>

              <p className="md:text-sm text-xs text-textColor font-thin">
                {first_offer_trips} / {discount.first_stage_no_of_trips}
              </p>
            </div>

            <div className="flex space-x-2 items-center">
              <div className="rounded-full p-1 flex justify-center items-center bg-[#FFEAEA]">
                <AiOutlineCar className="text-[#00AB4C]" />
              </div>

              <p className="md:text-sm text-xs text-textColor font-thin">
                {last_offer_trips}/{discount.last_stage_no_of_trips}
              </p>
            </div>
          </div>
          <div className="flex space-x-4 justify-between md:justify-start items-center">
            <div className="flex space-x-0.5 text-textColor/50 ">
              <MdAccessTime />
              <p className="text-xs">{getTimeAgo(created_at)}</p>
            </div>
            {last_offer_trips == discount.last_stage_no_of_trips ? (
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

export default DiscountProgress;
