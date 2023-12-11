import { useRouter } from "next/router";
import React from "react";
import { AiOutlineCar, AiOutlineRight } from "react-icons/ai";
import { GiPoliceOfficerHead, GiSteeringWheel } from "react-icons/gi";
import { TbCarOff } from "react-icons/tb";
import { useSelector } from "react-redux";
import DashboardCompo from "../../../components/common/DashboardCompo";
import EmptyTable from "../../../components/common/EmptyTable";
import Pagination from "../../../components/common/Pagination";
import TableItem from "../../../components/common/TableItem";
import Layout from "../../../components/officer_layout/Layout";
import { driverList } from "../../../dummy";
import { BASE_URL } from "../../../api/base";
import { validateToken } from "../../../components/services/validateToken";

const Dashboard = ({ data }) => {
  // const user = useSelector((state) => state.auth.adminDetails);
  const router = useRouter();
  const drivers = data.drivers;
  console.log("data", data);
  // console.log("driver", drivers);
  return (
    <div>
      <p className="text-lg mb-5 tracking-wide font-semibold">Dashboard</p>
      <div className="grid mb-8 w-full grid-cols-1 md:grid-cols-3  gap-4 ">
        <DashboardCompo
          title={"Number of Drivers"}
          value={drivers?.length}
          filled={true}
          Icon={GiSteeringWheel}
          color="indigo"
        />
        <DashboardCompo
          title={"Completed Trips"}
          value={"25"}
          filled={true}
          Icon={AiOutlineCar}
          color="green"
        />
        <DashboardCompo
          title={"Cancelled Trips"}
          value={"65"}
          filled={true}
          Icon={TbCarOff}
          color="red"
        />
      </div>
      <div className="flex mb-5 justify-between">
        <p className="text-textColor ">
          {" "}
          Managing Drivers
          <b className="text-textColor/50 ml-2">({drivers?.length})</b>
        </p>

        <button
          onClick={() => router.push("/admin/support/acct_officer/all_review")}
          className="flex bg-white border items-center rounded-lg px-3 py-1 space-x-1"
        >
          {" "}
          <p className="text-scudGreen text-xs">View All Trips</p>
          <AiOutlineRight className="text-scudGreen text-xs" />
        </button>
      </div>

      <>
        {drivers?.length === 0 ? (
          <div className="mt-4">
            <EmptyTable Icon={GiPoliceOfficerHead} title="No driver" name={"driver"} />
          </div>
        ) : (
          <div className="mb-5">
            {drivers?.map((item, idx) => (
              <TableItem item={item.driver} key={idx} />
            ))}
          </div>
        )}
      </>
      {/* 
      <Pagination /> */}
    </div>
  );
};

Dashboard.getLayout = Layout;
export default Dashboard;
export async function getServerSideProps(context) {
  const token = context.req.cookies.adminAccessToken || "";

  const res = await fetch(`${BASE_URL}auth/profile`, {
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
