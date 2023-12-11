import React from "react";
import { useState } from "react";
import { MdOutlineLocationOn, MdSupportAgent } from "react-icons/md";
import Layout from "../../../../components/Admin/Layout";
import OfficerCompo from "../../../../components/admincomponents/OfficerCompo";
import SearchInput from "../../../../components/admincomponents/SearchInput";
import Select2 from "../../../../components/admincomponents/Select2";
// import { account_officers } from "../../../../dummy";
import Pagination from "../../../../components/common/Pagination";
import { BASE_URL, STATE_URL } from "../../../../api/base";
import useFetch from "../../../../Hooks/useFetch";
import EmptyTable from "../../../../components/common/EmptyTable";
import { validateToken } from "../../../../components/services/validateToken";

const Account_officer = ({ data, state }) => {
  const [location, setLocation] = useState("Locations");
  const [search, setSearch] = useState("");

  const states = state?.map((item) => item.name);

  const users = data?.data;

  const account_officers = users?.filter((user) => user?.roles.includes("account-officer"));

  return (
    <div>
      {" "}
      <p className="md:text-lg tracking-wide mb-4 font-semibold">Account Officers</p>
      <p className="text-textColor mb-4 text-sm">All Account Officers</p>
      <div className="flex mb-6 flex-col-reverse md:flex-row md:justify-between">
        <Select2
          data={states}
          Icon={MdOutlineLocationOn}
          setValue={setLocation}
          value={location}
          position={"mt-[20rem]"}
        />

        <SearchInput setValue={setSearch} value={search} style={"md:mb-0 mb-4 "} />
      </div>
      {account_officers?.length === 0 ? (
        <div className="mt-4">
          <EmptyTable Icon={MdSupportAgent} title="No Account Officer" name="Account officer" />
        </div>
      ) : (
        <div className="grid mb-5 grid-flow-row-dense place-items-center grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {account_officers
            ?.filter((element) => {
              if (search === "" && location === "Locations") {
                return element;
              } else if (
                element?.first_name.toLowerCase().includes(search.toLowerCase()) ||
                element?.last_name.toLowerCase().includes(search.toLowerCase())
              ) {
                return element;
              } else if (element?.states === location) {
                return element;
              }
            })
            ?.map((item) => (
              <OfficerCompo key={item.id} item={item} />
            ))}
        </div>
      )}
      {/* <Pagination /> */}
    </div>
  );
};
Account_officer.getLayout = Layout;
export default Account_officer;

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
