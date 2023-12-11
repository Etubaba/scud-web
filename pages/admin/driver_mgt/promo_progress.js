import React, { useState } from "react";
import Layout from "../../../components/Admin/Layout";
import SearchInput from "../../../components/admincomponents/SearchInput";
import ProgressCompo from "../../../components/admincomponents/ProgressCompo";
import Pagination from "../../../components/common/Pagination";
import { BASE_URL } from "../../../api/base";
import EmptyTable from "../../../components/common/EmptyTable";
import { BsPerson } from "react-icons/bs";
import CountDown from "../../../components/common/CountDown";
import { validateToken } from "../../../components/services/validateToken";

const promo_progress = ({ data }) => {
  // const  = data?.participants;
  const { participants, expires_at } = data;

  const promoTarget = {
    trips: data?.trips,
    online_hours: data?.online_hours,
    cancellation_rate: data?.cancellation_rate
  };

  const [filter, setFilter] = useState("All");

  return (
    <div>
      <div className="flex  flex-row mb-6  md:mb-6 justify-between items-center">
        <p className="md:text-lg text-title  text-sm tracking-wide font-semibold">
          Driver Promotion
        </p>
        {participants?.length !== 0 && (
          <div className="">
            <CountDown date={expires_at} />
          </div>
        )}
      </div>

      {participants?.length !== 0 && (
        <div className="mb-6">
          <p className="text-textColor  text-sm">Participants</p>
        </div>
      )}
      {participants.length !== 0 && (
        <div className="flex mb-6 justify-between items-center">
          <div className="flex space-x-2">
            <div className=" min-w-[6rem] flex justify-center items-center rounded-md border bg-[#f2f5ff] p-1">
              <p className="text-xs text-textColor/60 font-thin">All (200)</p>
            </div>
            <div className=" min-w-[6.5rem] flex justify-center items-center rounded-md border bg-[#f2f5ff] p-1">
              <p className="text-xs text-textColor/60 font-thin">Completed (20)</p>
            </div>
            <div className=" min-w-[6rem] flex justify-center items-center rounded-md border bg-[#f2f5ff] p-1">
              <p className="text-xs text-textColor/60 font-thin">Failed (4)</p>
            </div>
            <div className=" min-w-[6rem] flex justify-center items-center rounded-md border bg-[#f2f5ff] p-1">
              <p className="text-xs text-textColor/60 font-thin">Ongoing (8)</p>
            </div>
          </div>
          <SearchInput />
        </div>
      )}

      <div>
        {participants.length === 0 ? (
          <EmptyTable title={"No participant"} Icon={BsPerson} name={"participant"} />
        ) : (
          <div className="bg-white p-2 mb-6 rounded-md border">
            {participants.map((el, idx) => (
              <ProgressCompo promoTarget={promoTarget} key={idx} item={el} />
            ))}
          </div>
        )}
      </div>

      {/* <Pagination /> */}
    </div>
  );
};

promo_progress.getLayout = Layout;
export default promo_progress;

export async function getServerSideProps(context) {
  const token = context.req.cookies.adminAccessToken || "";
  const id = Object.keys(context.query)[0];

  const res = await fetch(`${BASE_URL}driver-promos/progress/${id}`, {
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
