import { useRouter } from "next/router";
import React, { useState } from "react";
import { AiOutlineRight } from "react-icons/ai";

import { BsTelephone } from "react-icons/bs";
import { FiSend } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import { MdOutlineLocationOn } from "react-icons/md";
import { BASE_URL } from "../../../../api/base";
import Layout from "../../../../components/Admin/Layout";
import Officerchat from "../../../../components/admincomponents/Officerchat";
import OfficerCompo from "../../../../components/admincomponents/OfficerCompo";
import Review from "../../../../components/admincomponents/Review";
import SearchInput from "../../../../components/admincomponents/SearchInput";
import BreadCrumbs from "../../../../components/common/BreadCrumbs";
import Pagination from "../../../../components/common/Pagination";
import { officers_message, riderReviews } from "../../../../dummy";
import ChatModal from "../../../../components/admincomponents/ChatModal";
import { validateToken } from "../../../../components/services/validateToken";

const Officer_profile = ({ data, officerChats }) => {
  const [open, setOpen] = useState("");
  const [search, setSearch] = useState("");
  const [openChat, setOpenChat] = useState(false);
  const router = useRouter();

  const {
    id,
    first_name,
    last_name,
    state,
    account_managers,
    phone,
    created_at,
    email,
    gender,
    picture,
    reviews_recieved
  } = data;

  const officer_name =
    first_name.charAt(0).toUpperCase() +
    first_name.slice(1) +
    " " +
    last_name.charAt(0).toUpperCase() +
    last_name.slice(1);

  return (
    <div>
      <BreadCrumbs
        indexPath={"/admin/support/officer_manager/officer_mgt"}
        index={"Officer Manager"}
        secondItem={`${officer_name}`}
      />
      <div className="mb-10">
        <div className="py-5 px-3 bg-white rounded-t-lg border  flex-col md:flex-row w-full flex md:items-center md:justify-between ">
          <div className="flex flex-col md:flex-row md:space-y-0 justify-center mb-10 md:mb-0 items-center md:space-x-4">
            <div className="mb-4 md:mb-0">
              {" "}
              <img
                src={picture === null || picture === undefined ? "/user.png" : picture}
                className="w-24 md:mb-0 md:mr-2 h-24"
                alt=""
              />{" "}
              <div className="w-2.5 border border-white h-2.5 rounded-full relative z-40 -mt-4  ml-[4.5rem] bg-green-600"></div>
            </div>

            <div className="flex flex-col justify-center items-center md:justify-start md:items-start space-y-2">
              <p className="text-textColor font-semibold">{officer_name}</p>
              <span className="flex space-x-1">
                <MdOutlineLocationOn className="text-scudGreen mt-0.5" />
                <p className="text-textColor  text-sm">{state?.name} State</p>
              </span>
              <div className="flex items-center space-x-1">
                <div className="flex">
                  {account_managers?.slice(0, 3).map((el, idx) => (
                    <div key={idx} className="rounded-full  border-2 -ml-1 border-white z-0">
                      {" "}
                      <img
                        src={
                          el.account_manager.picture === null ||
                          el.account_manager.picture === undefined
                            ? "/user.png"
                            : el.account_manager.picture
                        }
                        className="w-3 h-3 "
                      />
                    </div>
                  ))}{" "}
                  {/* <div className="rounded-full  border-2 border-white z-20">
                    {" "}
                    <img
                      src={
                        accts1.picture === null || accts1.picture === undefined
                          ? "/user.png"
                          : accts1.picture
                      }
                      className="w-3 h-3 "
                    />
                  </div> */}
                </div>

                <p className="text-xs text-textColor/50">
                  Managing {account_managers?.length} officers
                </p>
              </div>
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
              onClick={() => window.open(`tel:${phone}`)}
              className="flex rounded-lg text-sm text-white px-2 py-2 border bg-scudGreen"
            >
              <BsTelephone className="text-lg mr-1" />
              <p>{phone}</p>
            </button>
          </div>
        </div>
        <div className="bg-white py-4 md:py-6 px-4 md:px-6 rounded-b-lg w-full h-auto border-b border-x">
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-28">
            <div className=" ">
              <span className="mb-5 flex md:space-x-0 space-x-2 flex-row md:space-y-2 md:flex-col">
                <p className="text-sm text-textColor/50">Country</p>
                <p className="text-sm text-textColor">Nigeria</p>
              </span>
              <span className=" flex md:space-x-0  space-x-2 flex-row md:space-y-2 md:flex-col">
                <p className="text-sm text-textColor/50">Joined date</p>
                <p className="text-sm text-textColor">{new Date(created_at).toDateString()}</p>
              </span>
            </div>
            <div className=" ">
              <span className="mb-5  space-x-2 md:space-x-0 flex flex-row md:space-y-2 md:flex-col">
                <p className="text-sm text-textColor/50">State</p>
                <p className="text-sm text-textColor">{state?.name} State</p>
              </span>
              <span className=" flex space-x-2 md:space-x-0 flex-row md:space-y-2 md:flex-col">
                <p className="text-sm text-textColor/50">Postal Code</p>
                <p className="text-sm text-textColor">21423333</p>
              </span>
            </div>
            <div className=" ">
              <span className="mb-5 space-x-2 md:space-x-0 flex flex-row md:space-y-2 md:flex-col">
                <p className="text-sm text-textColor/50">City</p>
                <p className="text-sm text-textColor">Port Harcourt</p>
              </span>
              <span className=" flex space-x-2 md:space-x-0 flex-row md:space-y-2 md:flex-col">
                <p className="text-sm text-textColor/50">Email</p>
                <p className="text-sm text-textColor">{email}</p>
              </span>
            </div>
            <div className=" ">
              <span className="mb-5 space-x-2 md:space-x-0 flex flex-row md:space-y-2 md:flex-col">
                <p className="text-sm text-textColor/50">Gender</p>
                <p className="text-sm text-textColor">
                  {gender?.charAt(0).toUpperCase() + gender?.slice(1)}
                </p>
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between mb-5 items-center">
        <p className="font-semibold">
          Recent Chats<b className="text-textColor/50"> ({officerChats.length})</b>
        </p>
        <button
          onClick={() =>
            router.push({ pathname: "/admin/support/officer_manager/all_chat", query: id })
          }
          className="flex bg-white border items-center rounded-lg px-3 py-1 space-x-1"
        >
          {" "}
          <p className="text-scudGreen text-xs">View All Chats</p>
          <AiOutlineRight className="text-scudGreen text-xs" />
        </button>
      </div>

      <div className="bg-white mt-5 mb-8 p-6 border rounded-lg grid grid-cols-1 md:grid-cols-3 gap-5 ">
        {officerChats.slice(0, 3).map((item, idx) => (
          <Officerchat officerDetails={{ picture, officer_name }} key={idx} item={item} />
        ))}
      </div>

      <div className="flex flex-col md:flex-row mb-5 mt-10 md:items-center md:justify-between">
        <p className="md:mb-0 mb-5 text-title">Managing Account Officers</p>

        <SearchInput value={search} setValue={setSearch} />
      </div>

      <div className="grid mb-5 grid-cols-1 md:grid-cols-4 gap-4">
        {account_managers
          ?.filter((it) => {
            if (search === "") return it;
            else if (it.account_manager.first_name.toLowerCase().includes(search.toLowerCase())) {
              return it;
            }
          })
          .map((item) => (
            <OfficerCompo key={item.id} item={item.account_manager} />
          ))}
      </div>

      <div className="flex justify-between mb-5 mt-8 items-center">
        <p className="font-semibold">
          Officers's Reviews <b className="text-textColor/50"> ({reviews_recieved?.length})</b>
        </p>
        <button
          onClick={() =>
            router.push({ pathname: "/admin/support/officer_manager/all_review", query: id })
          }
          className="flex bg-white border items-center rounded-lg px-3 py-1 space-x-1"
        >
          {" "}
          <p className="text-scudGreen text-xs">View Reviews</p>
          <AiOutlineRight className="text-scudGreen text-xs" />
        </button>
      </div>

      <div className="bg-white mb-8 p-6 border rounded-lg grid grid-cols-1 md:grid-cols-3 gap-5 ">
        {reviews_recieved?.slice(0, 3).map((item) => (
          <Review rider={true} item={item} key={item.id} />
        ))}
      </div>

      {/* <Pagination /> */}

      <ChatModal open={openChat} onClose={() => setOpenChat(false)} />
    </div>
  );
};
Officer_profile.getLayout = Layout;
export default Officer_profile;

export async function getServerSideProps(context) {
  const token = context.req.cookies.adminAccessToken || "";
  const id = Object.keys(context.query)[0];

  const res = await fetch(`${BASE_URL}users/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  });

  const chatRes = await fetch(`${BASE_URL}conversation/supervisor/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  });

  const officerChats = await chatRes.json();

  const data = await res.json();

  if (
    (data?.statusCode !== undefined && data?.statusCode === 401) ||
    (officerChats?.statusCode !== undefined && officerChats?.statusCode === 401)
  ) {
    try {
      await validateToken(context, true);
    } catch (err) {
      return { redirect: { destination: `/admin/auth`, permanent: false } };
    }
  }

  return {
    props: {
      data,
      officerChats
    }
  };
}
