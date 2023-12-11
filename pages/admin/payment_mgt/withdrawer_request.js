import React from "react";
import { BASE_URL } from "../../../api/base";
import Layout from "../../../components/Admin/Layout";
import SearchInput from "../../../components/admincomponents/SearchInput";
import WithrawerCompo from "../../../components/admincomponents/WithrawerCompo";
import Pagination from "../../../components/common/Pagination";
import EmptyTable from "../../../components/common/EmptyTable";
import { MdAttachMoney } from "react-icons/md";
import { validateToken } from "../../../components/services/validateToken";
import { useState } from "react";

const Withdraw_request = ({ data }) => {
  const [search, setSearch] = useState("");
  const WithdrawReq = data?.data;

  return (
    <div>
      <p className="tracking-wide font-semibold mb-10 text-sm md:text-lg">Withdrawal Requests</p>

      {WithdrawReq?.length !== 0 && (
        <div className="flex flex-col-reverse mb-7 md:flex-row items-center md:justify-between">
          <div className="flex space-x-3">
            <div className="border py-1 text-textColor hover:text-scudGreen hover:border-scudGreen min-w-[90px] bg-[#E6EBFF] text-sm justify-center items-center flex rounded-md">
              <p className="">All ({WithdrawReq.length})</p>
            </div>
            <div className="border py-1 text-textColor hover:text-scudGreen hover:border-scudGreen min-w-[90px] bg-[#E6EBFF] text-sm justify-center items-center flex rounded-md">
              <p>Paid (100)</p>
            </div>
            <div className="border py-1 text-textColor hover:text-scudGreen hover:border-scudGreen min-w-[90px] bg-[#E6EBFF] text-sm justify-center items-center flex rounded-md">
              <p>unpaid (20)</p>
            </div>
          </div>
          <SearchInput value={search} setValue={setSearch} style={"mb-5 md:mb-0"} />
        </div>
      )}

      {WithdrawReq?.length === 0 ? (
        <EmptyTable
          Icon={MdAttachMoney}
          name={"withrawal request"}
          title={"No Withdrawal Request"}
        />
      ) : (
        <div>
          {WithdrawReq.filter((el) => {
            if (search === "") return el;
            else if (
              el.user.first_name.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
              el.user.last_name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
            ) {
              return el;
            }
          })?.map((item, idx) => (
            <WithrawerCompo key={idx} item={item} />
          ))}
        </div>
      )}

      {WithdrawReq?.length > 15 && <div className="my-6"> {/* <Pagination /> */}</div>}
    </div>
  );
};

Withdraw_request.getLayout = Layout;
export default Withdraw_request;

export async function getServerSideProps(context) {
  const token = context.req.cookies.adminAccessToken || "";
  const res = await fetch(`${BASE_URL}payments/withdrawal-requests`, {
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
