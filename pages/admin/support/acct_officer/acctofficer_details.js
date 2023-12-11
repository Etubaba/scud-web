import { useRouter } from "next/router";
import React from "react";
import { AiOutlineMail, AiOutlinePhone, AiOutlineRight } from "react-icons/ai";
import { BiHash, BiRefresh } from "react-icons/bi";
import { BsGenderAmbiguous, BsPerson } from "react-icons/bs";
import { FiSend } from "react-icons/fi";
import { GiPoliceOfficerHead } from "react-icons/gi";
import { MdOutlineLocationOn } from "react-icons/md";
import { BASE_URL, STATE_URL } from "../../../../api/base";
import Layout from "../../../../components/Admin/Layout";
import SearchInput from "../../../../components/admincomponents/SearchInput";
import BreadCrumbs from "../../../../components/common/BreadCrumbs";
import EmptyTable from "../../../../components/common/EmptyTable";
import Pagination from "../../../../components/common/Pagination";
import { driverList } from "../../../../dummy";
import useFetch from "../../../../Hooks/useFetch";
import ChatModal from "../../../../components/admincomponents/ChatModal";
import { useState } from "react";
import { validateToken } from "../../../../components/services/validateToken";
import { useEffect } from "react";

const Acctofficer_details = ({ data }) => {
  const router = useRouter();
  const { id, first_name, last_name, state, drivers, supervisor, picture } = data;
  const [openChat, setOpenChat] = useState(false);
  const [searchvalue, setSearchValue] = useState("");
  const [driver, setDriver] = useState(drivers);

  const managedBy =
    supervisor?.supervisor?.first_name.charAt(0).toUpperCase() +
    supervisor?.supervisor?.first_name.slice(1) +
    " " +
    supervisor?.supervisor?.last_name.charAt(0).toUpperCase() +
    supervisor?.supervisor?.last_name.slice(1);

  const officer_name =
    first_name?.charAt(0).toUpperCase() +
    first_name?.slice(1) +
    " " +
    last_name?.charAt(0).toUpperCase() +
    last_name?.slice(1);

  const rows = driver?.map((element) => (
    <tr
      onClick={() => {
        router.push({ pathname: "/admin/driver_mgt/driver_profile", query: element.id });
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

  useEffect(() => {
    if (searchvalue == "") {
      setDriver(drivers);
    } else {
      let filter_data = drivers.filter((item) => {
        return (
          (item?.driver?.first_name !== null &&
            item?.driver?.first_name.toLowerCase().includes(searchvalue.toLowerCase())) ||
          (item?.driver?.last_name !== null &&
            item?.driver?.last_name.toLowerCase().includes(searchvalue.toLowerCase())) ||
          (item?.driver?.email !== null &&
            item?.driver?.email.toLowerCase().includes(searchvalue.toLowerCase())) ||
          (item?.driver?.phone !== null &&
            item?.driver?.phone.toLowerCase().includes(searchvalue.toLowerCase())) ||
          (item?.driver?.gender !== null &&
            item?.driver?.gender.toLowerCase().includes(searchvalue.toLowerCase()))
        );
      });

      setDriver(filter_data);
    }
  }, [searchvalue]);

  return (
    <div>
      {" "}
      <BreadCrumbs
        secondItem={`${officer_name}`}
        indexPath="/admin/support/acct_officer/account_officer"
        index={"Account Officer"}
      />
      <div className="py-3 px-3 mb-8 bg-white rounded-lg border  flex-col md:flex-row w-full flex md:items-center md:justify-between ">
        <div className="flex flex-col md:flex-row md:space-y-0 justify-center mb-10 md:mb-0 items-center md:space-x-2">
          <div>
            {" "}
            <img
              src={picture === null || picture === undefined ? "/user.png" : picture}
              className="w-20 mb-4 md:mb-0 md:mr-2 h-20 rounded-full"
              alt=""
            />
            <div className="w-2.5 border border-white h-2.5 rounded-full relative z-40 -mt-3  ml-[3.5rem] bg-green-600"></div>
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
              <div className="flex space-x-1 items-center">
                <p className="text-xs text-textColor/50">Managed by</p>
                <span className="flex space-x-1 items-center">
                  <img
                    src={
                      supervisor?.picture === null || supervisor?.picture === undefined
                        ? "/user.png"
                        : supervisor.picture
                    }
                    className="w-3  h-3 "
                  />
                  <p className="text-xs text-textColor">{managedBy}</p>
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
            onClick={() =>
              router.push({
                pathname: "/admin/support/acct_officer/officer_profile",
                query: id
              })
            }
            className="flex rounded-lg text-sm text-white px-2 py-2 border bg-scudGreen"
          >
            <BsPerson className="text-lg mr-1" />
            <p>View Profile</p>
          </button>
        </div>
      </div>
      <div className="flex mb-4 items-center justify-between">
        <p className="">List of Drivers</p>

        <SearchInput setValue={setSearchValue} value={searchvalue} />
      </div>
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
      {/* <Pagination /> */}
      <ChatModal open={openChat} onClose={() => setOpenChat(false)} />
    </div>
  );
};
Acctofficer_details.getLayout = Layout;
export default Acctofficer_details;

export async function getServerSideProps(context) {
  const token = context.req.cookies.adminAccessToken || "";
  const id = Object.keys(context.query)[0];

  const res = await fetch(`${BASE_URL}users/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  });

  const data = await res.json();

  if (data?.statusCode !== undefined && data?.statusCode === 401) {
    try {
      await validateToken(context, true);
    } catch (err) {
      return { redirect: { destination: `/admin/auth`, permanent: false } };
    }
  }

  return {
    props: {
      data
    }
  };
}
