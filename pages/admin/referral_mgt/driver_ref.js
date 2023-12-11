import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";
import { BiHash } from "react-icons/bi";
import { BsArrowLeft, BsArrowRight, BsPeople, BsWallet2 } from "react-icons/bs";
import { GiSteeringWheel } from "react-icons/gi";
import { MdOutlineAccountBalanceWallet, MdOutlineLocationOn } from "react-icons/md";
import Layout from "../../../components/Admin/Layout";
import SearchInput from "../../../components/admincomponents/SearchInput";
import Select2 from "../../../components/admincomponents/Select2";
import BreadCrumbs from "../../../components/common/BreadCrumbs";
import { driverRef } from "../../../dummy";
import Pagination from "../../../components/common/Pagination";
import { validateToken } from "../../../components/services/validateToken";
import { BASE_URL, STATE_URL } from "../../../api/base";
import EmptyTable from "../../../components/common/EmptyTable";
import { useEffect } from "react";

const Driver = ({ users, states }) => {
  const drivers = users?.filter((rider) => rider?.roles.includes("driver"));
  const [driverList, setDriverList] = useState(drivers);
  const [location, setLocation] = useState("Locations");
  const [search, setSearch] = useState("");
  const router = useRouter();
  const stateList = states.map((item) => item.name);

  const rows = driverList
    .filter((item) => {
      if (search === "") return item;
      else if (
        item?.first_name?.toLowerCase().includes(search.toLowerCase()) ||
        item?.last_name?.toLowerCase().includes(search.toLowerCase()) ||
        item?.email?.toLowerCase().includes(search.toLowerCase())
      ) {
        return item;
      }
    })
    .map((element) => (
      <tr
        onClick={() => {
          router.push({ pathname: `/admin/referral_mgt/details`, query: element.id });
        }}
        className=" text-center hover:translate-x-1  transition-all cursor-pointer hover:border text-sm  text-textColor border-b"
        key={element.id}
      >
        <td className="md:text-base text-xs p-3">{element.id}</td>
        <td className="flex justify-center py-2 items-center space-x-2">
          <img
            src={
              element.picture === null || element.picture === undefined
                ? "/user.png"
                : element.picture
            }
            className="rounded-full h-7 w-7 md:h-8 md:w-8"
            alt=""
          />
          <p className=" text-xs ">{element.first_name + " " + element.last_name}</p>
        </td>
        <td className="md:text-xs text-xs p-3">{element.referrals.length}</td>
        <td className="md:text-xs text-xs p-3">{element.account_balance}</td>
        <td className="md:text-xs text-xs p-3">{"N/A"}</td>
      </tr>
    ));

  useEffect(() => {
    if (location === "Locations") return;
    const filterDrivers = drivers.filter(
      (el) => el.state?.name?.toLowerCase() == location.toLowerCase()
    );
    setDriverList(filterDrivers);
  }, [location]);

  return (
    <div>
      {" "}
      <BreadCrumbs index={"Driver's Referral"} />
      {drivers.length > 0 && (
        <div className="flex flex-col-reverse md:flex-row  md:justify-between mt-8 items-center">
          <Select2
            data={stateList}
            Icon={MdOutlineLocationOn}
            setValue={setLocation}
            value={location}
            position={"mt-[20rem]"}
          />

          <SearchInput value={search} setValue={setSearch} style={"md:mb-0 mb-5"} />
        </div>
      )}
      {/* table start here  */}
      {drivers.length > 0 ? (
        <div className=" my-6 bg-white w-full overflow-x-auto border shadow pb-4  rounded-xl">
          <table className="w-full min-w-[700px] ">
            <thead className="border-b  bg-[#fbfbff] w-full rounded-t-lg">
              <tr className="border-b ">
                <td className="">
                  <div className="flex md:text-base text-xs justify-center">
                    <BiHash className="text-scudGreen mr-1 md:mr-2 text-sm md:mt-1" />
                    <p className="md:text-base  text-xs">id</p>
                  </div>
                </td>
                <td className="">
                  <div className="flex md:text-base text-xs justify-center">
                    <GiSteeringWheel className="text-scudGreen mr-1 md:mr-2 text-sm md:mt-1" />
                    <p className="md:text-base  text-xs">Drivers</p>
                  </div>
                </td>

                <td className="md:py-4 py-2 ">
                  <div className="flex  md:text-base text-xs justify-center">
                    <BsPeople className="text-scudGreen mr-1 md:mr-2 text-sm md:mt-1" />
                    <p className="md:text-base text-xs ">Referred</p>
                  </div>
                </td>
                <td className="">
                  <div className="flex  justify-center">
                    <MdOutlineAccountBalanceWallet className="text-scudGreen mr-1 md:mr-2 md:text-base md:mt-1" />
                    <p className="md:text-base text-xs ">Earned Amount</p>
                  </div>
                </td>

                <td className="">
                  <div className="flex md:text-base text-xs justify-center">
                    <BsWallet2 className="text-scudGreen mr-1 md:mr-2 text-sm md:mt-1" />
                    <p className="md:text-base  text-xs">Pending Amount</p>
                  </div>
                </td>
              </tr>
            </thead>

            <tbody className="mx-4">{rows}</tbody>
          </table>
        </div>
      ) : (
        <EmptyTable Icon={BsPeople} name={"referrers"} title={"No Driver With Referrees"} />
      )}
      {/* table end here  */}
      {/* <Pagination /> */}
    </div>
  );
};

Driver.getLayout = Layout;

export default Driver;
export async function getServerSideProps(context) {
  const token = context.req.cookies.adminAccessToken || "";

  const res = await fetch(`${BASE_URL}referrals`, {
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

  const users = await res.json();
  const states = await stateRes.json();

  if (
    (users?.statusCode !== undefined && users?.statusCode === 401) ||
    (states.statusCode !== undefined && states.statusCode === 401)
  ) {
    try {
      await validateToken(context, true);
    } catch (err) {
      return { redirect: { destination: `/admin/auth`, permanent: false } };
    }
  }

  return {
    props: {
      users,
      states
    }
  };
}
