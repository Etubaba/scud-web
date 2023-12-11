import React from "react";
import Layout from "../../../components/officer_layout/Layout";
import { MdOutlineArrowForwardIos, MdSupportAgent } from "react-icons/md";

import OfficerCompo from "../../../components/admincomponents/OfficerCompo";
import Pagination from "../../../components/common/Pagination";
import DashboardCompo from "../../../components/common/DashboardCompo";
import { GiPoliceOfficerHead } from "react-icons/gi";
import { AiOutlineCar } from "react-icons/ai";
import { TbCarOff } from "react-icons/tb";
import { useSelector } from "react-redux";
import EmptyTable from "../../../components/common/EmptyTable";
import { useRouter } from "next/router";

const Dashboard = () => {
  const router = useRouter();
  const user = useSelector((state) => state.auth.adminDetails);
  const account_officers = user.account_managers;

  const allOfficersDrivers = account_officers.map((item) => item.account_manager.drivers.length);

  const sumofDrivers = allOfficersDrivers.reduce((acc, cur) => acc + cur);

  return (
    <div>
      <p className="text-lg tracking-wide mb-4 font-semibold">Dashboard</p>
      <div className="grid mb-10 grid-cols-1 md:grid-cols-4 mt-4 gap-4">
        <DashboardCompo
          title={"Total Officers"}
          value={account_officers.length}
          filled={true}
          Icon={MdSupportAgent}
          color="green"
        />
        <DashboardCompo
          title={"Number of Drivers"}
          value={sumofDrivers}
          filled={true}
          Icon={GiPoliceOfficerHead}
        />
        <DashboardCompo
          title={"Total Vehicles"}
          value={"600"}
          filled={true}
          color="green"
          Icon={AiOutlineCar}
        />
        <DashboardCompo
          title={"Completed Trips"}
          value={"600"}
          color="red"
          filled={true}
          Icon={TbCarOff}
        />
      </div>
      <div className="flex mb-6 flex-col-reverse items-center md:flex-row md:justify-between">
        <p className="text-textColor mb-4 text-sm">All Officers Managers</p>
        <div
          onClick={() => router.push("/officer_profile/officers_managers/mgt_officer")}
          className="bg-white flex items-center justify-between px-2 py-1 rounded-lg border"
        >
          <p className="text-xs text-scudGreen mr-1">View All</p>
          <MdOutlineArrowForwardIos className="text-scudGreen text-xs mt-0.5" />
        </div>
      </div>

      {account_officers.length === 0 ? (
        <div className="mt-4">
          <EmptyTable
            Icon={GiPoliceOfficerHead}
            title={"No Acount officer record"}
            name="acount officer"
          />
        </div>
      ) : (
        <div className="grid mb-5 grid-flow-row-dense place-items-center grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {account_officers?.map((item, idx) => (
            <OfficerCompo accountOfficer={true} key={idx} item={item.account_manager} />
          ))}
        </div>
      )}
      {/* {account_officers.length > 8 && <Pagination />} */}
    </div>
  );
};
Dashboard.getLayout = Layout;
export default Dashboard;
