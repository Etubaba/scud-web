import { useRouter } from "next/router";
import React from "react";
import { AiOutlineRight } from "react-icons/ai";
import Layout from "../../../../components/Admin/Layout";

const Trips_details = () => {
  const router = useRouter();
  return <div>Details</div>;
};

Trips_details.getLayout = Layout;
export default Trips_details;
