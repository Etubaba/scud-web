import React from "react";
import { useState } from "react";
import { MdOutlineLocationOn } from "react-icons/md";
import Layout from "../../../components/officer_layout/Layout";
import OfficerCompo from "../../../components/admincomponents/OfficerCompo";
import SearchInput from "../../../components/admincomponents/SearchInput";
import Select2 from "../../../components/admincomponents/Select2";
import Pagination from "../../../components/common/Pagination";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { STATE_URL } from "../../../api/base";
import { GiPoliceOfficerHead } from "react-icons/gi";
import EmptyTable from "../../../components/common/EmptyTable";
import { validateToken } from "../../../components/services/validateToken";

const Mgt_officer = ({ state }) => {
  const [location, setLocation] = useState("Locations");

  const states = ["Lagos", "Abuja"];

  const router = useRouter();
  const user = useSelector((state) => state.auth.adminDetails);
  const account_officers = user.account_managers;
  return (
    <div>
      {" "}
      <p className="md:text-lg tracking-wide mb-4 font-semibold">Account Officers</p>
      <p className="text-textColor mb-4 text-sm">All Account Officers</p>
      <div className="flex mb-6 items-center flex-col-reverse md:flex-row md:justify-between">
        <Select2
          data={states}
          Icon={MdOutlineLocationOn}
          setValue={setLocation}
          value={location}
          position={"mt-[20rem]"}
        />

        <SearchInput style={"md:mb-0 mb-4 "} />
      </div>
      {account_officers.length === 0 ? (
        <div className="mt-4">
          <EmptyTable
            Icon={GiPoliceOfficerHead}
            title={"No Account officer record"}
            name="account officer"
          />
        </div>
      ) : (
        <div className="grid mb-5 grid-flow-row-dense place-items-center grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {account_officers.map((item, idx) => (
            <OfficerCompo accountOfficer={true} key={idx} item={item.account_manager} />
          ))}
        </div>
      )}
      {/* {account_officers.length > 8 && <Pagination />} */}
    </div>
  );
};
Mgt_officer.getLayout = Layout;
export default Mgt_officer;

export async function getServerSideProps(context) {
  const token = context.req.cookies.adminAccessToken || "";

  const stateRes = await fetch(`${STATE_URL}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  });

  const state = await stateRes.json();
  if (state?.statusCode !== undefined && state?.statusCode === 401) {
    try {
      await validateToken(context, true);
    } catch (err) {
      return { redirect: { destination: `/admin/auth`, permanent: false } };
    }
  }

  return {
    props: {
      state
    }
  };
}
