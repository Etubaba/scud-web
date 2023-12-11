import Layout from "../../../components/officer_layout/Layout";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { AiFillStar, AiOutlineMail } from "react-icons/ai";
import { BsChatLeftDotsFill, BsChatLeftText } from "react-icons/bs";
import { FiPhoneCall } from "react-icons/fi";
import Faq from "../../../components/drivepageComponents/Faq";
import { BASE_URL } from "../../../api/base";
import { validateToken } from "../../../components/services/validateToken";

function Support({ data }) {
  const [online, setOnline] = useState();
  const router = useRouter();

  useEffect(() => {
    typeof window !== "undefined" && navigator.onLine ? setOnline(true) : setOnline(false);
  }, []);

  return (
    <div>
      <div className="flex mb-8 justify-between items-center">
        <p className="text-lg tracking-wide font-semibold">Support</p>
      </div>
      <div className="rounded-md shadow-sm space-y-4 md:space-y-0 md:flex justify-between  p items-center p-5 my-4 border w-full">
        <div className="flex space-x-2">
          <div className="">
            {/* profile upload section ################################## */}
            <img className="rounded-full h-20 w-20" src="/photo.svg" alt="profile_img" />
          </div>
          <div>
            <div className="my-1">
              <p className="font-semibold">James Anderson</p>
            </div>
            <div className="my-1">
              <p className=" text-xs text-textColor">Account Manager</p>
            </div>
            <div className="flex space-x-1 my-2">
              <div className="w-2 mt-1 h-2 mt rounded-full bg-green-700"></div>
              <p className="text-green-700 text-xs">Online</p>
            </div>
          </div>
        </div>
        <div className=" flex justify-evenly w-1/3">
          <div
            onClick={() => router.push("/officer_profile/officers_manager/callpage")}
            className="flex border py-2 px-3 hover:bg-gray-100 border-scudGreen hover:bg-gray-10 space-x-2 rounded-md  cursor-pointer"
          >
            <FiPhoneCall className=" text-sm text-scudGreen" />
            <p className="text-scudGreen text-xs">Call</p>
          </div>
          <div
            onClick={() => router.push("/officer_profile/officers_manager/messages")}
            className="flex border py-2 px-3 hover:bg-gray-100 border-scudGreen hover:bg-gray-10 space-x-2 rounded-md  cursor-pointer "
          >
            <BsChatLeftText className=" text-sm text-scudGreen" />
            <p className="text-scudGreen text-xs">Chat</p>
          </div>
          <div className="flex border py-2 px-3 hover:bg-gray-100 border-scudGreen hover:bg-gray-10 space-x-2 rounded-md  cursor-pointer">
            <AiOutlineMail className=" text-sm text-scudGreen" />
            <p className="text-scudGreen text-xs">Email</p>
          </div>
        </div>
      </div>

      {/* faq section ################################################################## */}

      <div>
        <Faq faqs={data.data} />
      </div>
    </div>
  );
}

Support.getLayout = Layout;
export default Support;
export async function getServerSideProps() {
  const res = await fetch(`${BASE_URL}faqs`);
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
