import React from "react";
import { FiPhone, FiUser } from "react-icons/fi";
import { getTimeAgo } from "../services/getTimeAgo";
import { MdAccessTime } from "react-icons/md";
import { BsCreditCard, BsPersonVcard } from "react-icons/bs";
import { useRouter } from "next/router";
import { FaCarSide } from "react-icons/fa";
import { AiFillBank } from "react-icons/ai";

const DriverDocComponent = ({ onClick, item }) => {
  const router = useRouter();
  const picture = null;
  const status = "completed";

  console.log(item);
  return (
    <div onClick={onClick} className="bg-white border rounded-md mb-3">
      <div className={`flex md:flex-row flex-col py-3 px-4 md:justify-between`}>
        <div className="flex flex-col md:flex-row items-center md:space-x-2 ">
          <img
            alt=""
            className="w-16 h-16 md:mb-0 mb-2 md:w-10 md:h-10 rounded-full"
            src={
              item?.picture === null || item?.picture === undefined ? "/user.png" : item?.picture
            }
          />
          <div className="md:justify-start mb-6 md:mb-0 md:items-start justify-center items-center flex flex-col">
            <p className="font-semibold mb-1 text-sm text-textColor">
              {item.first_name + " " + item.last_name}
            </p>
            <div className="flex space-x-0.5 text-textColor/50 ">
              <MdAccessTime />
              <p className="text-xs">{getTimeAgo(item.created_at)}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:space-x-8 md:items-center md:justify-between">
          <div className="flex items-center justify-center mb-4 md:mb-0 space-x-8">
            {item.phone_verified && (
              <div className="flex space-x-2 items-center">
                <div className="rounded-full p-1 flex justify-center items-center bg-[#E5F7ED]">
                  <FiPhone className="text-scudGreen" />
                </div>

                <p className="md:text-sm text-xs text-textColor font-thin">Phone number</p>
              </div>
            )}
            {item.first_name !== null && item.picture !== null && (
              <div className="flex space-x-2 items-center">
                <div className="rounded-full p-1 flex justify-center items-center bg-[#E5F7ED]">
                  <FiUser className="text-scudGreen" />
                </div>

                <p className="md:text-sm text-xs text-textColor font-thin">Driver details</p>
              </div>
            )}
            {item.vehicles.length !== 0 && (
              <div className="flex space-x-2 items-center">
                <div className="rounded-full p-1 flex justify-center items-center bg-[#eafff1]">
                  <FaCarSide className="text-green-400" />
                </div>

                <p className="md:text-sm text-xs text-textColor font-thin">Vehicle details</p>
              </div>
            )}
          </div>
          <div className="flex space-x-4 justify-between md:justify-start items-center">
            {item.license !== null && (
              <div className="flex space-x-2 items-center">
                <div className="rounded-full p-1 flex justify-center items-center bg-[#fffaea]">
                  <BsCreditCard className="text-orange-400" />
                </div>

                <p className="md:text-sm text-xs text-textColor font-thin">Driver’s license</p>
              </div>
            )}
            {item.bank_account !== null && (
              <div className="flex space-x-2 items-center">
                <div className="rounded-full p-1 flex justify-center items-center bg-[#ffeaea]">
                  <AiFillBank className="text-red-500" />
                </div>

                <p className="md:text-sm text-xs text-textColor font-thin">Bank details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriverDocComponent;
