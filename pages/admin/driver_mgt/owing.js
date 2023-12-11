import React from "react";
import { MdOutlineLocationOn, MdOutlineAccountBalanceWallet } from "react-icons/md";
import Layout from "../../../components/Admin/Layout";
import SearchInput from "../../../components/admincomponents/SearchInput";
import DashboardCompo from "../../../components/common/DashboardCompo";
import Select2 from "../../../components/admincomponents/Select2";
import { BiHash, BiWalletAlt } from "react-icons/bi";
import { useState } from "react";
import { BsWallet2 } from "react-icons/bs";
import { GiSteeringWheel } from "react-icons/gi";
import { useRouter } from "next/router";
import Pagination from "../../../components/common/Pagination";
import { validateToken } from "../../../components/services/validateToken";
import { BASE_URL, STATE_URL } from "../../../api/base";

const Owing = ({ users, states }) => {
  const [location, setLocation] = useState("Location");
  const [search, setSearch] = useState("");

  const allusers = users.data;
  const router = useRouter();

  const stateList = states?.map((item) => item.name);

  function calculateTotal(objects, target) {
    let total = 0;
    for (let i = 0; i < objects.length; i++) {
      if (target === "owe") {
        total += objects[i].owe;
      } else if (target === "paid") {
        total += objects[i].paid;
      } else {
        total += Number(objects[i].user.account_balance);
      }
    }
    return total;
  }
  console.log(allusers);
  const rows = allusers
    .filter((item) => {
      if (search === "") {
        return item;
      } else if (
        item.user?.first_name.toLowerCase().includes(search.toLowerCase()) ||
        item.user?.last_name.toLowerCase().includes(search.toLowerCase())
      ) {
        return item;
      }
    })
    .map((element) => (
      <tr
        onClick={() => {
          router.push({ pathname: `/admin/driver_mgt/owe_details`, query: element.user.id });
        }}
        className=" text-center transition-all delay-300 hover:translate-x-2  hover:shadow-lg hover:border text-sm  text-textColor border-b"
        key={element.user.id}
      >
        <td className="md:text-base text-xs p-3">{element.user.id}</td>
        <td className="flex justify-start md:ml-20 py-2 items-center space-x-2">
          <img
            src={
              element.user.picture === null || element.user.picture === undefined
                ? "/user.png"
                : element.user.picture
            }
            className="rounded-full h-7 w-7 md:h-8 md:w-8"
            alt=""
          />
          <p className=" text-xs ">{element.user.first_name + " " + element.user.last_name}</p>
        </td>
        <td className="md:text-xs text-xs p-3">{element.owe}</td>
        <td className="md:text-xs text-xs p-3">{element.paid}</td>
        <td className="md:text-xs text-xs p-3">{element.user.account_balance}</td>
      </tr>
    ));
  return (
    <div>
      {" "}
      <p className="text-base tracking-wide  font-semibold">Outstanding Payment</p>
      <div className="grid grid-cols-1 md:grid-cols-3 mb-10 mt-6 gap-4 ">
        <DashboardCompo
          title={"Total Amount owed"}
          value={`₦ ${calculateTotal(allusers, "owe")}`}
          filled={true}
          Icon={MdOutlineAccountBalanceWallet}
        />
        <DashboardCompo
          title={"Total Paid Amount"}
          value={`₦ ${calculateTotal(allusers, "paid")}`}
          filled={true}
          color="green"
          Icon={BiWalletAlt}
        />

        <DashboardCompo
          title={"Total Balance"}
          value={`₦ ${calculateTotal(allusers, "")}`}
          color="red"
          filled={true}
          Icon={MdOutlineAccountBalanceWallet}
        />
      </div>
      <p className="text-textColor text-sm  font-semibold">List of Drivers Owing</p>
      <div className="flex flex-col-reverse md:flex-row  md:justify-between mb-5 items-center">
        <Select2
          data={stateList}
          style={"mt-5 min-w-[100px] p-1"}
          Icon={MdOutlineLocationOn}
          setValue={setLocation}
          value={location}
          position={"mt-[22rem]"}
        />

        <SearchInput value={search} setValue={setSearch} />
      </div>
      {/* table start here  */}
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
              <td className=" ">
                <div className="flex md:text-base text-xs justify-center">
                  <GiSteeringWheel className="text-scudGreen mr-1 md:mr-2 text-sm md:mt-1" />
                  <p className="md:text-base  text-xs">Drivers</p>
                </div>
              </td>

              <td className="md:py-4 py-2 ">
                <div className="flex  md:text-base text-xs justify-center">
                  <MdOutlineAccountBalanceWallet className="text-scudGreen mr-1 md:mr-2 text-sm md:mt-1" />
                  <p className="md:text-base text-xs ">Owed Amount (₦)</p>
                </div>
              </td>
              <td className="">
                <div className="flex  justify-center">
                  <MdOutlineAccountBalanceWallet className="text-scudGreen mr-1 md:mr-2 md:text-base md:mt-1" />
                  <p className="md:text-base text-xs ">Paid Amount (₦)</p>
                </div>
              </td>

              <td className="">
                <div className="flex md:text-base text-xs justify-center">
                  <BsWallet2 className="text-scudGreen mr-1 md:mr-2 text-sm md:mt-1" />
                  <p className="md:text-base  text-xs">Balance (₦)</p>
                </div>
              </td>
            </tr>
          </thead>

          <tbody className="mx-4">{rows}</tbody>
        </table>
      </div>
      {/* table end here  */}
      {/* <Pagination /> */}
      <div className="mb-14 hidden md:block"></div>
    </div>
  );
};

Owing.getLayout = Layout;
export default Owing;

export async function getServerSideProps(context) {
  const token = context.req.cookies.adminAccessToken || "";

  const res = await fetch(`${BASE_URL}payments/owe`, {
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
