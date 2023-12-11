import React, { useState } from "react";
import Layout from "../../../components/Admin/Layout";
import SearchInput from "../../../components/admincomponents/SearchInput";
import ProgressCompo from "../../../components/admincomponents/ProgressCompo";
import Pagination from "../../../components/common/Pagination";
import DriverDocComponent from "../../../components/admincomponents/DriverDocComponent";
import { useRouter } from "next/router";
import { BASE_URL } from "../../../api/base";
import EmptyTable from "../../../components/common/EmptyTable";
import { VscEmptyWindow } from "react-icons/vsc";
import { validateToken } from "../../../components/services/validateToken";

const document_mgt = ({ users }) => {
  const router = useRouter();

  const [documents, setDocuments] = useState([...users]);

  const [search, setSearch] = useState("");

  const declinedDocs = documents.filter((el) => {
    return (
      el.verification == "declined" ||
      el.license?.verification == "declined" ||
      el.vehicles?.verification == "declined" ||
      el.bank_account?.verification == "declined"
    );
  });
  const handleFilter = (opt) => {
    if (opt == "all") return setDocuments([...users]);
    else {
      setDocuments(declinedDocs);
    }
  };

  return (
    <div>
      <div className="flex  flex-row mb-6  md:mb-6 justify-between items-center">
        <p className="md:text-lg text-title  text-sm tracking-wide font-semibold">
          Drivers Document
        </p>
      </div>

      <div className="flex mb-6 justify-between items-center">
        <div className="flex space-x-2">
          <div
            onClick={() => handleFilter("all")}
            className=" min-w-[6rem] flex justify-center items-center rounded-md border bg-[#f2f5ff] p-1"
          >
            <p className="text-xs text-textColor/60 font-thin">All ({users.length})</p>
          </div>
          <div
            onClick={() => handleFilter("declined")}
            className=" min-w-[6.5rem] flex justify-center items-center rounded-md border bg-[#f2f5ff] p-1"
          >
            <p className="text-xs text-textColor/60 font-thin">Declined ({declinedDocs.length})</p>
          </div>
        </div>
        <SearchInput value={search} setValue={setSearch} />
      </div>
      <div className="bg-white p-2 mb-6 rounded-md border">
        {users.length == 0 ? (
          <EmptyTable Icon={VscEmptyWindow} title={"No Document"} name="user document" />
        ) : (
          documents
            .filter((el) => {
              if (search === "") return el;
              else if (el.first_name.toLowerCase().includes(search.toLowerCase())) return el;
            })
            .map((item, index) => (
              <DriverDocComponent
                item={item}
                key={index}
                onClick={() => {
                  router.push({
                    pathname: "/admin/driver_mgt/document_details",
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

  const userRes = await fetch(`${BASE_URL}approvals`, {
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
