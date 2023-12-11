import { useRouter } from "next/router";
import React from "react";
import { AiOutlineMail, AiOutlinePhone, AiOutlineRight } from "react-icons/ai";
import { BiHash, BiRefresh } from "react-icons/bi";
import { BsGenderAmbiguous, BsPerson, BsTelephone } from "react-icons/bs";
import { FiSend } from "react-icons/fi";
import { MdOutlineArrowForwardIos, MdOutlineLocationOn } from "react-icons/md";
import Layout from "../../../components/officer_layout/Layout";
import SearchInput from "../../../components/admincomponents/SearchInput";
import BreadCrumbs from "../../../components/common/BreadCrumbs";
import Pagination from "../../../components/common/Pagination";
import { driverList, riderReviews } from "../../../dummy";
import TableItem from "../../../components/common/TableItem";
import { useState } from "react";
import Review from "../../../components/admincomponents/Review";

const review_details = () => {
  const states = [
    "Abuja",
    "Lagos",
    "Port Harcourt",
    "Ibadan",
    "Abuja",
    "Sokodo",
    "Abuja",
    "Abuja",
    "Abuja",
    "Abuja",
  ];

  const rows = driverList.map((element) => (
    <tr
      onClick={() => {
        router.push("/admin/driver_mgt/driver_profile");
      }}
      className=" text-center hover:shadow-lg hover:rounded-lg hover:border text-sm  text-textColor border-b"
      key={element.id}
    >
      <td className="md:text-base text-xs p-3">{element.id}</td>
      <td className="md:text-base text-xs p-3">{element.firstname}</td>
      <td className="md:text-base text-xs p-3">{element.lastname}</td>
      <td className="md:text-base text-xs p-3">{element.email}</td>
      <td className="md:text-base text-xs p-3">{element.sex}</td>
      <td className="md:text-base text-xs p-3">{element.phone}</td>

      <td className="text-center">
        {element.status == "Active" ? (
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

  const router = useRouter();
  return (
    <div>
      <BreadCrumbs
        secondItem={"James Anderson"}
        indexPath="/admin/support/acct_officer/account_officer"
        index={"Account Officer"}
      />
      <div className="rounded-lg border  bg-white mb-8">
        <div className="py-5 px-3  flex-col md:flex-row w-full flex md:items-center md:justify-between ">
          <div className="flex flex-col md:flex-row md:space-y-0 justify-center mb-10 md:mb-0 items-center md:space-x-4">
            <div>
              <img
                src={"/photo.png"}
                className="w-24 mb-4 md:mb-0 md:mr-2 h-24"
                alt=""
              />
              <div className="w-2.5 border border-white h-2.5 rounded-full relative z-40 -mt-4  ml-[4.5rem] bg-green-600"></div>
            </div>

            <div className="flex flex-col justify-center items-center md:justify-start md:items-start space-y-2">
              <p className="text-textColor font-semibold">James Anderson</p>
              <span className="flex space-x-1">
                <MdOutlineLocationOn className="text-scudGreen mt-0.5" />
                <p className="text-textColor  text-sm">Lagos State</p>
              </span>
              <div className="flex items-center space-x-1">
                <div className="flex">
                  <div className="rounded-full  border-2 border-white z-20">
                    <img src="/photo.png" className="w-3 h-3 " />
                  </div>
                  <div className="rounded-full  border-2 -ml-1 border-white z-10">
                    <img src="/photo.png" className="w-3 h-3 " />
                  </div>
                  <div className="rounded-full  border-2 -ml-1 border-white z-0">
                    <img src="/photo.png" className="w-3 h-3 " />
                  </div>
                </div>

                <p className="text-xs text-textColor/50">Managing 10 Drivers</p>
              </div>
              <div className="flex space-x-1 items-center">
                <p className="text-xs text-textColor/50">Manage by</p>
                <span className="flex space-x-1 items-end">
                  <img src="/photo.png" className="w-3 -mt-1 h-3 " />
                  <p className="text-xs text-textColor">Malvin Nice</p>
                </span>
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center space-x-2">
            <button className="flex rounded-lg text-sm text-scudGreen px-2 py-2 border border-scudGreen">
              <FiSend className="mt-1 mr-1" />
              <p>Send Message</p>
            </button>
            <button className="flex rounded-lg text-sm text-white px-2 py-2 border bg-scudGreen">
              <BsPerson className="text-lg mr-1" />
              <p>View Profile</p>
            </button>
          </div>
        </div>
      </div>
      {/* ############################################################### */}

      <p className=" font-bold  text-sm mb-4">All Reviews (39)</p>

      {/* table start here  */}
      <div className="grid grid-cols-3 gap-5 w-full rounded-md border p-4">
        {riderReviews.slice(0, 10).map((item) => (
          <Review rider={true} item={item} key={item.id} />
        ))}
      </div>
      {/* table end here  */}
      {/* <Pagination /> */}
    </div>
  );
};
review_details.getLayout = Layout;
export default review_details;
