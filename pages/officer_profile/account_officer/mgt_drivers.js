import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";
import { GiPoliceOfficerHead, GiSteeringWheel } from "react-icons/gi";
import { useSelector } from "react-redux";
import SearchInput from "../../../components/admincomponents/SearchInput";
import DashboardCompo from "../../../components/common/DashboardCompo";
import EmptyTable from "../../../components/common/EmptyTable";
import Pagination from "../../../components/common/Pagination";
import TableItem from "../../../components/common/TableItem";
import Layout from "../../../components/officer_layout/Layout";
import { validateToken } from "../../../components/services/validateToken";
import { BASE_URL } from "../../../api/base";

const Mgt_drivers = ({ userData }) => {
  const [search, setSearch] = useState("");
  // const user = useSelector((state) => state.auth.adminDetails);
  const [drivers, setDrivers] = useState(userData.drivers);

  const router = useRouter();

  const driverStatusLength = (status) => {
    if (status === "inactive") {
      const filteredData = userData.drivers.filter((el) => {
        return !el.driver.is_active;
      });
      return filteredData.length;
    } else {
      const filteredData = userData.drivers.filter((el) => {
        return el.driver.is_active;
      });
      return filteredData.length;
    }
  };
  const driverFilter = (status) => {
    if (status === "inactive") {
      const filteredData = userData.drivers.filter((el) => {
        return !el.driver.is_active;
      });
      setDrivers(filteredData);
    } else {
      const filteredData = userData.drivers.filter((el) => {
        return el.driver.is_active;
      });
      setDrivers(filteredData);
    }
  };

  return (
    <div>
      {" "}
      <p className="text-lg mb-5 tracking-wide font-semibold">Manage Drivers</p>
      <div className="grid mb-8 w-full grid-cols-1 md:grid-cols-3  gap-4 ">
        <DashboardCompo
          title={"Number of Drivers"}
          value={userData.drivers.length}
          filled={true}
          Icon={GiSteeringWheel}
          color="indigo"
        />
        <DashboardCompo
          title={"Inactive Drivers"}
          value={driverStatusLength("inactive")}
          filled={true}
          Icon={GiSteeringWheel}
          color="red"
        />
        <DashboardCompo
          title={"Active Drivers"}
          value={driverStatusLength("")}
          filled={true}
          Icon={GiSteeringWheel}
          color="green"
        />
      </div>
      <div className="flex mb-5">
        <p className="text-textColor ">
          {" "}
          All Drivers
          <b className="text-textColor/50 ml-2">({userData.drivers.length})</b>
        </p>
      </div>
      <div className="flex flex-col-reverse mb-7 md:flex-row items-center md:justify-between">
        <div className="flex space-x-3">
          <button
            onClick={() => setDrivers(userData.drivers)}
            className="border px-3 py-1 text-textColor hover:text-scudGreen hover:border-scudGreen min-w-[90px] bg-[#E6EBFF] text-[8px] md:text-sm justify-center items-center flex rounded-md"
          >
            <p className="">All Drivers({userData.drivers.length})</p>
          </button>
          <button
            onClick={() => driverFilter("")}
            className="border px-3 py-1 text-textColor hover:text-scudGreen hover:border-scudGreen min-w-[90px] bg-[#E6EBFF] text-[8px] md:text-sm justify-center items-center flex rounded-md"
          >
            <p>Active Drivers ({driverStatusLength("")})</p>
          </button>
          <button
            onClick={() => driverFilter("inactive")}
            className="border px-3 py-1 text-textColor hover:text-scudGreen hover:border-scudGreen min-w-[90px] bg-[#E6EBFF] text-[8px] md:text-sm justify-center items-center flex rounded-md"
          >
            <p>Inactive Drivers ({driverStatusLength("inactive")})</p>
          </button>
        </div>
        <SearchInput setValue={setSearch} value={search} style={"mb-5 md:mb-0"} />
      </div>
      <>
        {userData.drivers.length === 0 ? (
          <div className="mt-4">
            <EmptyTable Icon={GiPoliceOfficerHead} title="No driver" name={"driver"} />
          </div>
        ) : (
          <div className="mb-5">
            {drivers
              ?.filter((item) => {
                if (search === "") {
                  return item;
                } else if (
                  item?.driver?.first_name
                    .toLocaleLowerCase()
                    .includes(search.toLocaleLowerCase()) ||
                  item?.driver?.last_name
                    .toLocaleLowerCase()
                    .includes(search.toLocaleLowerCase()) ||
                  item.driver?.email?.toLocaleLowerCase().includes(search.toLocaleLowerCase())
                ) {
                  return item;
                }
              })
              ?.map((item, idx) => (
                <TableItem item={item.driver} key={idx} />
              ))}
          </div>
        )}
      </>
      {/* {drivers.length > 7 && <Pagination />} */}
    </div>
  );
};
Mgt_drivers.getLayout = Layout;
export default Mgt_drivers;

export async function getServerSideProps(context) {
  const token = context.req.cookies.adminAccessToken || "";

  const userRes = await fetch(`${BASE_URL}auth/profile`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  });
  const userData = await userRes.json();

  if (userData?.statusCode !== undefined && userData?.statusCode === 401) {
    try {
      await validateToken(context, true);
    } catch (err) {
      return { redirect: { destination: `/admin/auth`, permanent: false } };
    }
  }

  return {
    props: {
      userData
    }
  };
}
