import React from "react";
import Layout from "../../../../components/Admin/Layout";

import { useState } from "react";
import { MdOutlineLocationOn } from "react-icons/md";
import useFetch from "../../../../Hooks/useFetch";
import OfficerCompo from "../../../../components/admincomponents/OfficerCompo";
import SearchInput from "../../../../components/admincomponents/SearchInput";
import Select2 from "../../../../components/admincomponents/Select2";
import { account_officers } from "../../../../dummy";
import Pagination from "../../../../components/common/Pagination";
import { useRouter } from "next/router";
import { AiOutlinePlus } from "react-icons/ai";
import { BASE_URL, STATE_URL } from "../../../../api/base";
import EmptyTable from "../../../../components/common/EmptyTable";
import { GiPoliceOfficerHead } from "react-icons/gi";
import { validateToken } from "../../../../components/services/validateToken";
import { useEffect } from "react";

const Officer_mgt = ({ data, state }) => {
  const [location, setLocation] = useState("Locations");
  const [search, setSearch] = useState("");
  const users = data?.data;
  const supervisors = users?.filter((user) => user.roles.includes("supervisor"));
  const [supervisorList, setSupervisorList] = useState(supervisors);
  const router = useRouter();

  useEffect(() => {
    if (location === "Locations") return;
    const filteredSupervisors = supervisors.filter(
      (el) => el.state?.name?.toLowerCase() == location.toLowerCase()
    );
    setSupervisorList(filteredSupervisors);
  }, [location]);

  return (
    <div>
      <div className="flex justify-between items-center">
        <p className="text-lg tracking-wide mb-4 font-semibold">Officers Managers</p>

        <span className="">
          <button
            onClick={() => router.push("/admin/support/officer_manager/assign_officer")}
            className="bg-scudGreen flex space-x-2 hover:bg-scudGreenHover text-[8px] md:text-[14px] text-white rounded-md p-2 "
          >
            <AiOutlinePlus className="md:text-xl md:mt-0 -mt-0.5 text-sm" />
            &nbsp;Assign Manager
          </button>
        </span>
      </div>

      <p className="text-textColor mb-4 text-sm">All Officers Managers</p>
      <div className="flex mb-6 flex-col-reverse md:flex-row md:justify-between">
        <Select2
          data={state?.map((item) => item.name)}
          Icon={MdOutlineLocationOn}
          setValue={setLocation}
          value={location}
          position={"mt-[22rem]"}
        />

        <SearchInput value={search} setValue={setSearch} style={"md:mb-0 mb-4"} />
      </div>
      {supervisors?.length === 0 ? (
        <div className="mt-4">
          <EmptyTable Icon={GiPoliceOfficerHead} title={"No supervisor record"} name="supervisor" />
        </div>
      ) : (
        <div className="grid mb-5 grid-flow-row-dense place-items-center grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {supervisorList
            ?.filter((element) => {
              if (search === "" && location === "Locations") {
                return element;
              } else if (
                element.first_name.toLowerCase().includes(search.toLowerCase()) ||
                element.last_name.toLowerCase().includes(search.toLowerCase())
              ) {
                return element;
              }
            })
            ?.map((item) => (
              <OfficerCompo officerManager={true} key={item.id} item={item} />
            ))}
        </div>
      )}
      {/* <Pagination total={supervisors?.length} /> */}
    </div>
  );
};
Officer_mgt.getLayout = Layout;
export default Officer_mgt;

export async function getServerSideProps(context) {
  const token = context.req.cookies.adminAccessToken || "";

  const res = await fetch(`${BASE_URL}users`, {
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

  const data = await res.json();
  const state = await stateRes.json();

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

  return {
    props: {
      data,
      state
    }
  };
}
