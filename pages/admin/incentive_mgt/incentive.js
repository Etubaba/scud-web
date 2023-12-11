import { useRouter } from "next/router";
import React from "react";
import { useEffect } from "react";
import { AiOutlineGift, AiOutlinePlus } from "react-icons/ai";
import { useSelector } from "react-redux";
import { BASE_URL } from "../../../api/base";
import Layout from "../../../components/Admin/Layout";
import TierCompo from "../../../components/admincomponents/TierCompo";
import EmptyTable from "../../../components/common/EmptyTable";
import { getToken } from "../../../components/services/refresh";
import { tiermgt } from "../../../dummy";
import { validateToken } from "../../../components/services/validateToken";

const Incentive = ({ data }) => {
  // console.log("data", data);

  const tier_levels = data?.data;

  const router = useRouter();
  return (
    <div>
      {" "}
      <div className="flex justify-between mb-8 items-center">
        <p className="md:text-lg text-sm tracking-wider  font-semibold">Manage Incentives</p>

        <button
          onClick={() => router.push("/admin/incentive_mgt/edit_tier")}
          className="bg-scudGreen flex space-x-2 hover:bg-scudGreenHover text-[8px] md:text-[14px] text-white rounded-md p-2 "
        >
          <AiOutlinePlus className="md:text-xl -mt-0.5 text-sm" />
          &nbsp; Create Tier
        </button>
      </div>
      {tier_levels?.length === 0 ? (
        <EmptyTable name={"incentive"} title={"No incentive details"} Icon={AiOutlineGift} />
      ) : (
        <div>
          {tier_levels?.map((item) => (
            <TierCompo key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
};

Incentive.getLayout = Layout;
export default Incentive;

export async function getServerSideProps(context) {
  const token = context.req.cookies.adminAccessToken || "";

  const res = await fetch(`${BASE_URL}incentives`, {
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
