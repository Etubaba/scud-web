import { useRouter } from "next/router";
import React, { useState } from "react";
import { AiOutlineMail, AiOutlinePhone, AiOutlineRight } from "react-icons/ai";
import { BiHash, BiRefresh } from "react-icons/bi";
import { BsChatDots, BsCheck2All, BsPerson, BsTelephone } from "react-icons/bs";
import { FiSend } from "react-icons/fi";
import { GiPoliceOfficerHead } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import { MdOutlineLocationOn } from "react-icons/md";
import { BASE_URL } from "../../../../api/base";
import Layout from "../../../../components/Admin/Layout";
import Officerchat from "../../../../components/admincomponents/Officerchat";
import Review from "../../../../components/admincomponents/Review";
import SearchInput from "../../../../components/admincomponents/SearchInput";
import BreadCrumbs from "../../../../components/common/BreadCrumbs";
import EmptyTable from "../../../../components/common/EmptyTable";
import Pagination from "../../../../components/common/Pagination";
import { driverList, officers_message, riderReviews } from "../../../../dummy";
import ChatModal from "../../../../components/admincomponents/ChatModal";
import { validateToken } from "../../../../components/services/validateToken";

const Officer_profile = ({ data, officerChats }) => {
  const [openChat, setOpenChat] = useState(false);
  const [search, setSearch] = useState("");
  const router = useRouter();
  const {
    id,
    first_name,
    last_name,
    state,
    drivers,
    phone,
    created_at,
    gender,
    email,
    picture,
    supervisor,
    address,
    reviews_recieved
  } = data;

  const rows = drivers.map((element) => (
    <tr
      onClick={() => {
        router.push("/admin/driver_mgt/driver_profile");
      }}
      className=" text-center hover:shadow-lg hover:rounded-lg hover:border text-sm  text-textColor border-b"
      key={element.driver.id}
    >
      <td className="md:text-base text-xs p-3">{element.driver.id}</td>
      <td className="md:text-base text-xs p-3">{element.driver.first_name}</td>
      <td className="md:text-base text-xs p-3">{element.driver.last_name}</td>
      <td className="md:text-base text-xs p-3">{element.driver.email}</td>
      <td className="md:text-base text-xs p-3">{element.driver.gender}</td>
      <td className="md:text-base text-xs p-3">{element.driver.phone}</td>

      <td className="text-center">
        {element.driver.is_active ? (
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

  const managedBy =
    supervisor?.supervisor.first_name.charAt(0).toUpperCase() +
    supervisor?.supervisor.first_name.slice(1) +
    " " +
    supervisor?.supervisor.last_name.charAt(0).toUpperCase() +
    supervisor?.supervisor.last_name.slice(1);

  const officer_name =
    first_name.charAt(0).toUpperCase() +
    first_name.slice(1) +
    " " +
    last_name.charAt(0).toUpperCase() +
    last_name.slice(1);
  return (
    <div>
      <BreadCrumbs
        indexPath={"/admin/support/acct_officer/account_officer"}
        index={"Account Officer"}
        secondItem={`${officer_name}`}
      />
      <div className="mb-10">
        <div className="py-5 px-3 bg-white rounded-t-lg border  flex-col md:flex-row w-full flex md:items-center md:justify-between ">
          <div className="flex flex-col md:flex-row md:space-y-0 justify-center mb-10 md:mb-0 items-center md:space-x-4">
            <div className="mb-4 md:mb-0">
              {" "}
              <img
                src={picture === null || picture === undefined ? "/user.png" : picture}
                className="w-24 md:mb-0 md:mr-2 h-24 rounded-full"
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
                  {drivers.slice(0, 3).map((el, i) => (
                    <div
                      className={`rounded-full  border-2 border-white z-20 ${
                        i === 0 ? "z-20" : i === 1 ? "z-10 -ml-1" : "z-0 -ml-1"
                      }`}
                    >
                      <img
                        src={
                          el.driver.picture === null || el.driver.picture === undefined
                            ? "/user.png"
                            : el.driver.picture
                        }
                        className="w-3 h-3 rounded-full "
                      />
                    </div>
                  ))}
                </div>

                <p className="text-xs text-textColor/50">Managing {drivers?.length} Drivers</p>
              </div>
              {supervisor === null ? (
                <p className="text-xs text-textColor">
                  This officer has not been assigned to any supervisor{" "}
                </p>
              ) : (
                <div className="flex space-x-1  items-center">
                  <p className="text-xs text-textColor/50">Manage by</p>
                  <span className="flex space-x-1 items-center">
                    <img
                      src={
                        supervisor?.picture === null || supervisor?.picture === undefined
                          ? "/user.png"
                          : supervisor.picture
                      }
                      className="w-3  h-3  rounded-full"
                    />
                    <p className="text-xs  text-textColor">{managedBy}</p>
                  </span>
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
                  {gender === null ? "N/A" : gender?.charAt(0).toUpperCase() + gender?.slice(1)}
                </p>
              </span>
              <span className="mb-5 flex flex-row md:space-y-2 md:flex-col">
                <p className="text-sm text-textColor/50">Home Address</p>
                <p className="text-sm text-textColor">{address}</p>
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
            router.push({ pathname: "/admin/support/acct_officer/all_chat", query: id })
          }
          className="flex bg-white border items-center rounded-lg px-3 py-1 space-x-1"
        >
          {" "}
          <p className="text-scudGreen text-xs">View All Chats</p>
          <AiOutlineRight className="text-scudGreen text-xs" />
        </button>
      </div>
      {officerChats.length === 0 ? (
        <EmptyTable Icon={BsChatDots} title={"No Chat Record"} name={"chats"} />
      ) : (
        <div className="bg-white mb-8 p-6 border grid-cols-1 rounded-lg grid md:grid-cols-3 gap-5 ">
          {officerChats.slice(0, 3).map((item, idx) => (
            <Officerchat
              officerDetails={{ picture, officer_name }}
              accout_officer={true}
              key={idx}
              item={item}
            />
          ))}
        </div>
      )}

      <div className="flex justify-between my-5 items-center">
        <p className="font-semibold">
          Driver's Reviews <b className="text-textColor/50"> ({reviews_recieved?.length})</b>
        </p>
        <button
          onClick={() =>
            router.push({ pathname: "/admin/support/acct_officer/all_review", query: id })
          }
          className="flex bg-white border items-center rounded-lg px-3 py-1 space-x-1"
        >
          {" "}
          <p className="text-scudGreen text-xs">View All</p>
          <AiOutlineRight className="text-scudGreen text-xs" />
        </button>
      </div>

      {reviews_recieved.length === 0 ? (
        <EmptyTable Icon={GiPoliceOfficerHead} title={"No Review Record"} name={"review"} />
      ) : (
        <div className="bg-white mb-8 p-6 border rounded-lg grid grid-cols-1 md:grid-cols-3 gap-5 ">
          {reviews_recieved?.slice(0, 3).map((item) => (
            <Review rider={true} item={item} key={item.id} />
          ))}
        </div>
      )}

      {drivers.length !== 0 && (
        <div className="flex mb-4 items-center justify-between">
          <p className="">List of Drivers</p>

          <SearchInput value={search} setValue={setSearch} />
        </div>
      )}
      {/* table start here  */}
      {drivers.length === 0 ? (
        <EmptyTable Icon={GiPoliceOfficerHead} title={"No Driver Record"} name={"drivers"} />
      ) : (
        <div className="mt-5 mb-6 bg-white w-full overflow-x-auto border shadow pb-4  rounded-xl">
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
                    <p className="md:text-base text-xs ">First Name</p>
                  </div>
                </td>
                <td className="">
                  <div className="flex  justify-center">
                    <BsPerson className="text-scudGreen mr-1 md:mr-2 md:text-base md:mt-1" />
                    <p className="md:text-base text-xs ">Last Name</p>
                  </div>
                </td>
                <td className="">
                  <div className="flex  justify-center">
                    <AiOutlineMail className="text-scudGreen mr-1 md:mr-2 md:text-base md:mt-1" />
                    <p className="md:text-base text-xs ">Email Address</p>
                  </div>
                </td>
                <td className="">
                  <div className="flex  justify-center">
                    <BsPerson className="text-scudGreen mr-1 md:mr-2 md:text-base md:mt-1" />
                    <p className="md:text-base text-xs ">Sex</p>
                  </div>
                </td>
                <td className="">
                  <div className="flex  justify-center">
                    <AiOutlinePhone className="text-scudGreen mr-1 md:mr-2 md:text-base md:mt-1" />
                    <p className="md:text-base text-xs ">Phone</p>
                  </div>
                </td>
                <td className=" ">
                  <div className="flex  justify-center">
                    <div className="border h-4 w-4 mt-1 mr-1 border-scudGreen rounded-full">
                      <BiRefresh className="text-scudGreen text-sm " />
                    </div>

                    <p className="md:text-base text-xs ">Status</p>
                  </div>
                </td>
              </tr>
            </thead>

            <tbody className="mx-4">{rows}</tbody>
          </table>
        </div>
      )}
      {/* table end here  */}
      {/* <Pagination total={drivers.length} /> */}

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

  const chatRes = await fetch(`${BASE_URL}conversation/officer/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  });

  const data = await res.json();
  const officerChats = await chatRes.json();

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
