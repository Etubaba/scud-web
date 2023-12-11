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
import { driverList } from "../../../dummy";
import TableItem from "../../../components/common/TableItem";
import { useState } from "react";
import { BASE_URL, STATE_URL } from "../../../api/base";
import EmptyTable from "../../../components/common/EmptyTable";
import { GiPoliceOfficerHead } from "react-icons/gi";
import { validateToken } from "../../../components/services/validateToken";

const officer_details = ({ data, state }) => {
  const [viewprofile, setViewProfile] = useState(false);

  const {
    id,
    first_name,
    last_name,
    state: { name },
    drivers,
    supervisor: { supervisor },
    picture,
    phone,
    created_at,
    email
  } = data;

  const managedBy =
    supervisor?.first_name.charAt(0).toUpperCase() +
    supervisor?.first_name.slice(1) +
    " " +
    supervisor?.last_name.charAt(0).toUpperCase() +
    supervisor?.last_name.slice(1);

  const officer_name =
    first_name?.charAt(0).toUpperCase() +
    first_name?.slice(1) +
    " " +
    last_name?.charAt(0).toUpperCase() +
    last_name?.slice(1);

  const states = state?.map((item) => item.name);

  const router = useRouter();
  return (
    <div>
      <BreadCrumbs
        secondItem={`${officer_name}`}
        indexPath="/admin/support/acct_officer/account_officer"
        index={"Account Officer"}
      />
      <div className="rounded-lg border  bg-white mb-8">
        <div className="py-5 px-3  flex-col md:flex-row w-full flex md:items-center md:justify-between ">
          <div className="flex flex-col md:flex-row md:space-y-0 justify-center mb-10 md:mb-0 items-center md:space-x-4">
            <div>
              <img
                src={picture === null || picture === undefined ? "/user.png" : picture}
                className="w-24 mb-4 md:mb-0 md:mr-2 h-24"
                alt=""
              />
              <div className="w-2.5 border border-white h-2.5 rounded-full relative z-40 -mt-4  ml-[4.5rem] bg-green-600"></div>
            </div>

            <div className="flex flex-col justify-center items-center md:justify-start md:items-start space-y-2">
              <p className="text-textColor font-semibold">{officer_name}</p>
              <span className="flex space-x-1">
                <MdOutlineLocationOn className="text-scudGreen mt-0.5" />
                <p className="text-textColor  text-sm">{name} State</p>
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

                <p className="text-xs text-textColor/50">Managing {drivers.length} Drivers</p>
              </div>
              <div className="flex space-x-1 items-center">
                <p className="text-xs text-textColor/50">Manage by</p>
                <span className="flex space-x-1 items-end">
                  <img
                    src={
                      supervisor?.picture === null || supervisor?.picture === undefined
                        ? "/user.png"
                        : supervisor.picture
                    }
                    className="w-3 -mt-1 h-3 "
                  />
                  <p className="text-xs text-textColor">{managedBy}</p>
                </span>
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center space-x-2">
            <button className="flex rounded-lg text-sm text-scudGreen px-2 py-2 border border-scudGreen">
              <FiSend className="mt-1 mr-1" />
              <p>Send Message</p>
            </button>
            {viewprofile ? (
              <button
                onClick={() => window.open(`tel:${phone}`)}
                // onClick={() => setViewProfile(true)}
                className="flex rounded-lg text-sm text-white px-2 py-2 border bg-scudGreen"
              >
                <BsTelephone className="text-lg mr-1" />
                <p>{phone}</p>
              </button>
            ) : (
              <button
                onClick={() => setViewProfile(true)}
                className="flex rounded-lg text-sm text-white px-2 py-2 border bg-scudGreen"
              >
                <BsPerson className="text-lg mr-1" />
                <p>View Profile</p>
              </button>
            )}
          </div>
        </div>

        {viewprofile && (
          <div className="border-t  mx-5 p-4 animate__animated animate__fadeIn ">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 mb-4 gap-5">
              <div>
                <p className="text-xs text-textColor/50">Country</p>
                <p className="text-textColor  text-sm">Nigeria</p>
              </div>
              <div>
                <p className="text-xs text-textColor/50">State</p>
                <p className="text-textColor  text-sm">{name} State</p>
              </div>
              <div>
                <p className="text-xs text-textColor/50">City</p>
                <p className="text-textColor  text-sm">Port Harcourt</p>
              </div>
              <div>
                <p className="text-xs text-textColor/50">Joined Date</p>
                <p className="text-textColor  text-sm">{new Date(created_at).toDateString()}</p>
              </div>
              <div className="">
                <p className="text-xs text-textColor/50">Postal code</p>
                <p className="text-textColor  text-sm">5000264</p>
              </div>
              <div className="">
                <p className="text-xs text-textColor/50">Email address</p>
                <p className="text-textColor  text-sm">{email}</p>
              </div>
              <div className="">
                <p className="text-xs text-textColor/50">Home address</p>
                <p className="text-textColor  text-sm">
                  Plot 101 redemmed road, eagle Island, Port Harcourt
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* ############################################################### */}
      {viewprofile && (
        <div className="animate__animated animate__fadeIn">
          <div className="flex mb-6  justify-between">
            <p className=" font-bold  text-sm">Managing Drivers ({drivers.length})</p>
            <div className="bg-white flex items-center justify-between px-2 py-1 rounded-lg border">
              <p className="text-xs text-scudGreen mr-1">View All Chats</p>
              <MdOutlineArrowForwardIos className="text-scudGreen text-xs mt-0.5" />
            </div>
          </div>
          <div className="rounded-lg border  bg-white mb-8">
            <div className="py-5 px-3 grid-col-1 grid md:grid-cols-3 gap-7  w-full">
              <div className="bg-[#F2F5FF] hover:border-scudGreen border rounded-md p-3">
                <div className="flex justify-between mb-2">
                  <div className="flex space-x-2">
                    <img src={"/photo.png"} className="w-5 mb-4 md:mb-0 md:mr-2 h-5" alt="" />
                    <p className=" font-bold text-sm">james anderson</p>
                  </div>
                  <p className="text-xs text-textColor/50">2m</p>
                </div>

                <div>
                  <p className="text-textColor/50 text-sm">
                    Lorem i text-textColor/50psum dolor sit amet, consectetur dolor sit amet, t,
                    consectetur sum dolo...
                  </p>
                </div>
              </div>
              <div className="bg-[#F2F5FF] hover:border-scudGreen border rounded-md p-3">
                <div className="flex justify-between mb-2">
                  <div className="flex space-x-2">
                    <img src={"/photo.png"} className="w-5 mb-4 md:mb-0 md:mr-2 h-5" alt="" />
                    <p className=" font-bold text-sm">james anderson</p>
                  </div>
                  <p className="text-xs text-textColor/50">2m</p>
                </div>

                <div>
                  <p className="text-textColor/50 text-sm">
                    Lorem i text-textColor/50psum dolor sit amet, consectetur dolor sit amet, t,
                    consectetur sum dolo...
                  </p>
                </div>
              </div>
              <div className="bg-[#F2F5FF] hover:border-scudGreen border rounded-md p-3">
                <div className="flex justify-between mb-2">
                  <div className="flex space-x-2">
                    <img src={"/photo.png"} className="w-5 mb-4 md:mb-0 md:mr-2 h-5" alt="" />
                    <p className=" font-bold text-sm">james anderson</p>
                  </div>
                  <p className="text-xs text-textColor/50">2m</p>
                </div>

                <div>
                  <p className="text-textColor/50 text-sm">
                    Lorem i text-textColor/50psum dolor sit amet, consectetur dolor sit amet, t,
                    consectetur sum dolo...
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <p className="text-textColor  text-sm mb-4">Managing Drivers (7)</p>
      <div className="flex mb-4 items-center justify-between">
        <div className="flex space-x-5">
          <button
            // onClick={() => copyToClipboard("scud.io/ref:jamesanderson")}
            className="bg-[#F2F5FF] justify-center items-center  border flex space-x-2 hover:to-blue-500 text-[14px]  rounded-md p-1 px-3"
          >
            <p className="text-xs md:text-base">All drivers (10)</p>
          </button>
          <button
            // onClick={() => copyToClipboard("scud.io/ref:jamesanderson")}
            className="bg-[#F2F5FF] justify-center  items-center  border flex space-x-2 hover:to-blue-500 text-[14px]  rounded-md p-1 px-3"
          >
            <p className="text-xs md:text-base">Active drivers (8)</p>
          </button>
          <button
            // onClick={() => copyToClipboard("scud.io/ref:jamesanderson")}
            className="bg-[#F2F5FF] justify-center items-center  border border-scudGreen text-scudGreen flex space-x-2 hover:to-blue-500 text-[14px]  rounded-md p-1 px-3"
          >
            <p className="text-xs md:text-base">Inactive drivers (2)</p>
          </button>
        </div>
        <div className="hidden md:block">
          <SearchInput />
        </div>
      </div>
      {/* table start here  */}
      {drivers.length === 0 ? (
        <div className="mt-4">
          <EmptyTable Icon={GiPoliceOfficerHead} title={"No  record"} name="account officer" />
        </div>
      ) : (
        <div className="mb-5">
          {drivers.map((item, idx) => (
            <TableItem nolink={true} item={item} key={idx} />
          ))}
        </div>
      )}
      {/* table end here  */}
      {/* <Pagination /> */}
    </div>
  );
};
officer_details.getLayout = Layout;
export default officer_details;

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

  const state = await stateRes.json();

  const data = await res.json();

  if (
    (data?.statusCode !== undefined && data?.statusCode === 401) ||
    (state.statusCode !== undefined && state.statusCode === 401)
  ) {
    try {
      await validateToken(context, true);
    } catch (err) {
      return { redirect: { destination: `/admin/auth`, permanent: false } };
    }
  }

  // console.log(data);
  return {
    props: {
      data,
      state
    }
  };
}
