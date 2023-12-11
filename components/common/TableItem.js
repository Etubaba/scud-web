import { useRouter } from "next/router";
import React from "react";
import { AiOutlineGift, AiOutlineMail } from "react-icons/ai";
import { BsTelephone } from "react-icons/bs";

const TableItem = ({
  nolink,
  item: { id, first_name, last_name, picture, phone, email, phone_verified, is_active }
}) => {
  const router = useRouter();
  const tier = 1;
  return (
    <div
      onClick={() =>
        nolink
          ? null
          : router.push({ pathname: "/officer_profile/account_officer/driver_profile", query: id })
      }
      className="bg-white border hover:shadow-md rounded-md mb-2.5"
    >
      <div
        className={` flex ${
          ""
          //   trips ? " pb-4 border-x border-t rounded-t " : "border rounded-md"
        } md:flex-row flex-col py-3 px-4 md:justify-between `}
      >
        <div className="flex flex-col md:flex-row items-center md:space-x-2 ">
          <img
            alt=""
            className="w-16 h-16 md:mb-0 mb-2 md:w-14 md:h-14 rounded-full"
            src={picture === null || picture === undefined ? "/user.png" : picture}
          />
          <div className="md:justify-start mb-6 md:mb-0 md:items-start justify-center items-center flex flex-col">
            <p className="font-semibold mb-1 text-sm text-textColor">
              {first_name + " " + last_name}
            </p>
            <div
              className={` ${
                tier === 3 ? "bg-green-600/10" : tier === 2 ? "bg-blue-600/10" : "bg-yellow-600/10"
              } py-[1.3px] px-3 rounded-md`}
            >
              <span
                className={` ${
                  tier === 3 ? "text-green-600" : tier === 2 ? "text-blue-600" : "text-yellow-400"
                }  flex space-x-1`}
              >
                <AiOutlineGift className={`text-xs mt-0.5`} />
                <p className="text-xs">Tier {tier}</p>
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row md:space-x-20 md:items-center md:justify-between">
          <div className="flex    justify-between items-center mb-4 md:mb-0 space-x-12">
            <div className="flex space-x-2 items-center">
              <AiOutlineMail className="text-scudGreen" />
              <p className="md:text-sm text-xs text-textColor font-thin">{email}</p>
            </div>
            <div className="flex space-x-2 items-center">
              <BsTelephone className="text-scudGreen" />
              <p className="md:text-sm text-xs text-textColor font-thin">{phone}</p>
            </div>
          </div>
          <div className="flex justify-center items-center">
            {is_active ? (
              <div className=" max-w-[100px] px-3 py-1 rounded-lg bg-[#f2fbf6]">
                <p className="text-green-600 text-xs">Active</p>
              </div>
            ) : (
              <div className=" max-w-[100px] px-3 p-1 rounded-lg bg-[#fff4f4]">
                <p className="text-red-600  text-xs">Inactive</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableItem;
