import { useRouter } from "next/router";
import React from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { BsCreditCard2Back } from "react-icons/bs";
import Layout from "../../../components/Admin/Layout";
import GatewayCompo from "../../../components/admincomponents/GatewayCompo";
import EmptyTable from "../../../components/common/EmptyTable";
import { gateways } from "../../../dummy";
import { BASE_URL } from "../../../api/base";
import { useEffect } from "react";
import { useState } from "react";
import { validateToken } from "../../../components/services/validateToken";

const Gateways = ({ data }) => {
  const [dependant, setDependant] = useState(0);

  const router = useRouter();
  const refreshData = () => {
    router.replace(router.asPath);
  };

  useEffect(() => {
    refreshData();
  }, [dependant]);

  const activePaymentGateway = data?.filter((item) => item.key === "ACTIVE_PAYMENT_GATEWAY")[0]
    ?.value;

  // console.log(activePaymentGateway);
  return (
    <div className="md:px-4">
      {" "}
      <div className="flex space-y-2 md:space-y-0 flex-col md:flex-row md:justify-between mb-10 md:flex items-center">
        <p className="tracking-wide font-semibold text-lg">Payment Gateways</p>
        <button
          onClick={() => router.push("/admin/payment_mgt/add_gateway")}
          className="bg-scudGreen flex space-x-2 hover:to-blue-500 text-[14px] text-white rounded-md p-2 "
        >
          <AiOutlinePlus className="text-xl" />
          &nbsp;Add Gateway keys
        </button>
      </div>
      {gateways.length === 0 ? (
        <EmptyTable title={"No Payment Gatways"} name="gateways" Icon={BsCreditCard2Back} />
      ) : (
        <div className="">
          {gateways.map((item, idx) => (
            <GatewayCompo
              setDependant={setDependant}
              activeGateway={activePaymentGateway}
              key={idx}
              item={item}
            />
          ))}
        </div>
      )}
    </div>
  );
};

Gateways.getLayout = Layout;
export default Gateways;

export async function getServerSideProps(context) {
  const token = context.req.cookies.adminAccessToken || "";
  const res = await fetch(`${BASE_URL}settings`, {
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
