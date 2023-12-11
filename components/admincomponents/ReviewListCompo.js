import Rating from "../common/Rating";

import React from "react";
import { MdOutlineLocationOn } from "react-icons/md";
import ReactTimeAgo from "react-time-ago";

const ReviewListCompo = ({ item, link, type2 }) => {
  const { first_name, last_name, picture, is_active, reviews_recieved } = item;

  const calculateRating = (rating) => {
    if (rating === null || rating === undefined) return 0;
    const sumRating = rating.reduce((a, b) => {
      return b.rating + a;
    }, 0);
    return Math.ceil(sumRating / rating.length);
  };

  return (
    <div
      onClick={link}
      className="md:py-2 py-3 px-3 hover:bg-slate-100 mb-3 bg-white rounded-lg border shadow-figma w-full flex-col md:flex-row  flex md:justify-between "
    >
      <div className="flex justify-start md:justify-center md:items-center space-x-4">
        <img
          className="rounded-full h-16 w-16 object-cover"
          src={picture === null || picture === undefined ? "/user.png" : picture}
          alt="profile_img"
        />
        <div className="flex flex-col space-y-3">
          <p className="text-textColor font-semibold">{first_name + " " + last_name}</p>
          {type2 ? (
            <div>
              <div className="flex items-center space-x-1 mb-4">
                <div className="flex">
                  <div className="rounded-full  border-2 border-white z-20">
                    <img src="/photo.png" className="w-5 h-5 " />
                  </div>
                  <div className="rounded-full  border-2 -ml-2 border-white z-10">
                    <img src="/photo.png" className="w-5 h-5 " />
                  </div>
                  <div className="rounded-full  border-2 -ml-2 border-white z-0">
                    <img src="/photo.png" className="w-5 h-5 " />
                  </div>
                </div>
                <p className="text-xs text-textColor/50">Managing 10 Drivers</p>
              </div>
              <span className="flex space-x-1">
                <MdOutlineLocationOn className="text-scudGreen" />
                <p className="text-textColor mb-6 text-sm">Rivers State</p>
              </span>
            </div>
          ) : (
            <>
              <div className="flex space-x-2">
                <div
                  className={` ${
                    is_active === true ? "bg-green-600" : "bg-red-600"
                  } py-[1.3px] px-1 rounded-md `}
                >
                  <p className="text-center  text-white tracking-wider text-xs">
                    {is_active === true ? "Active" : "Inactive"}
                  </p>
                </div>
              </div>
              <p className="text-textColor/50  text-sm">
                {item?.trips?.length == 0
                  ? "NULL"
                  : item?.trips?.filter((itm) => {
                      return itm.status == "completed";
                    }).length}
                &nbsp; completed trips
              </p>
            </>
          )}
        </div>
      </div>
      <div className="min-w-[40%] mt-4 flex flex-col space-y-4 ">
        <span className="flex justify-between">
          <Rating rating={calculateRating(reviews_recieved)} readOnly={true} size="xs" />
          <p className="text-xs text-scudGreen">{reviews_recieved?.length} Reviews</p>
        </span>
        <p className="text-sm text-textColor">
          {reviews_recieved?.length == 0
            ? 0
            : reviews_recieved[reviews_recieved.length - 1]?.comment?.substring(0, 60)}
        </p>
        <p className="text-xs text-end text-textColor/40">
          <ReactTimeAgo
            date={
              reviews_recieved?.length == 0
                ? 0
                : reviews_recieved[reviews_recieved.length - 1].created_at
            }
            locale="en-US"
          />
        </p>
      </div>
    </div>
  );
};

export default ReviewListCompo;
