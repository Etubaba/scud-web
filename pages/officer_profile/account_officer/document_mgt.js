import React, { useState } from "react";
import Layout from "../../../components/officer_layout/Layout";
import SearchInput from "../../../components/admincomponents/SearchInput";
import ProgressCompo from "../../../components/admincomponents/ProgressCompo";
import Pagination from "../../../components/common/Pagination";
import DriverDocComponent from "../../../components/admincomponents/DriverDocComponent";
import { useRouter } from "next/router";
import EmptyTable from "../../../components/common/EmptyTable";
import { VscEmptyWindow } from "react-icons/vsc";
import { BASE_URL } from "../../../api/base";
import { validateToken } from "../../../components/services/validateToken";

const document_mgt = ({ users }) => {
  const [filter, setFilter] = useState("All");
  const [documents, setDocuments] = useState([...users]);
  const expire = true;
  const router = useRouter();

  return (
    <div>
      <div className="flex  flex-row mb-6  md:mb-6 justify-between items-center">
        <p className="md:text-lg text-title  text-sm tracking-wide font-semibold">
          Drivers Document
        </p>
      </div>

      <div className="flex mb-6 justify-between items-center">
        <div className="flex space-x-2">
          <div className=" min-w-[6rem] flex justify-center items-center rounded-md border bg-[#f2f5ff] p-1">
            <p className="text-xs text-textColor/60 font-thin">All (200)</p>
          </div>
          <div className=" min-w-[6.5rem] flex justify-center items-center rounded-md border bg-[#f2f5ff] p-1">
            <p className="text-xs text-textColor/60 font-thin">Declined (20)</p>
          </div>
        </div>
        <SearchInput />
      </div>
      <div className="bg-white p-2 mb-6 rounded-md border">
        {documents.length == 0 ? (
          <EmptyTable Icon={VscEmptyWindow} title={"No Document"} name="user document" />
        ) : (
            documents.map((item, index) => (
            
            <DriverDocComponent
              item={item}
              key={index}
              onClick={() => {
                router.push({
                  pathname: "/officer_profile/account_officer/document_details",
                  query: { id: item.id }
                });
              }}
            />
          ))
        )}
      </div>
      {/* <Pagination /> */}
    </div>
  );
};

document_mgt.getLayout = Layout;
export default document_mgt;

export async function getServerSideProps(context) {
  const token = context.req.cookies.adminAccessToken || "";

  const userRes = await fetch(`${BASE_URL}approvals/by-manager`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  });

  const users = await userRes.json();

  if (users?.statusCode !== undefined && users?.statusCode === 401) {
    try {
      await validateToken(context, true);
    } catch (err) {
      return { redirect: { destination: `/admin/auth`, permanent: false } };
    }
  }

  return {
    props: {
      users
    }
  };
}
