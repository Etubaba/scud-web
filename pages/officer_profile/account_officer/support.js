import Layout from "../../../components/officer_layout/Layout";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { AiFillStar, AiOutlineMail } from "react-icons/ai";
import { BsChatLeftDotsFill, BsChatLeftText } from "react-icons/bs";
import { FiPhoneCall } from "react-icons/fi";
import Faq from "../../../components/drivepageComponents/Faq";
import { BASE_URL } from "../../../api/base";
import { useSelector } from "react-redux";
import { validateToken } from "../../../components/services/validateToken";

function Support({ data, userData }) {
  const [online, setOnline] = useState();
  const router = useRouter();

  useEffect(() => {
    typeof window !== "undefined" && navigator.onLine ? setOnline(true) : setOnline(false);
  }, []);

  const user = userData;

  const { supervisor } = user;

  return (
    <div>
      <div className="flex mb-8 justify-between items-center">
        <p className="text-lg tracking-wide font-semibold">Support</p>
      </div>
      <div className="rounded-md shadow-sm space-y-4 md:space-y-0 flex flex-col md:flex-row md:justify-between  justify-center items-center p-3 my-4 border w-full">
        {supervisor === null ? (
          <p className="text-textColor">You have not been assigned to a supervisor</p>
        ) : (
          <div className="flex flex-col justify-center md:justify-start md:flex-row md:space-x-2">
            <div className=" flex justify-center items-center">
              {/* profile upload section ################################## */}
              <img
                className="rounded-full h-20 w-20"
                src={
                  supervisor?.supervisor?.picture === null ||
                  supervisor?.supervisor?.picture === undefined
                    ? "/user.png"
                    : supervisor?.supervisor?.picture
                }
                alt="profile_img"
              />
            </div>
            <div className="flex flex-col justify-center md:justify-start md:items-start items-center">
              <div className="my-1">
                <p className="font-semibold">
                  {supervisor?.supervisor?.first_name + " " + supervisor?.supervisor?.last_name}
                </p>
              </div>
              <div className="my-1">
                <p className=" text-xs text-textColor">Supervisor</p>
              </div>
              <div className="flex space-x-1 my-2">
                <div className="w-2 mt-1 h-2 mt rounded-full bg-green-700"></div>
                <p className="text-green-700 text-xs">Online</p>
              </div>
            </div>
          </div>
        )}
        <div className="space-x-2 flex justify-evenly w-1/3">
          <div
            onClick={() => router.push("/officer_profile/account_officer/callpage")}
            className="flex border py-2 px-3 hover:bg-gray-100 border-scudGreen hover:bg-gray-10 space-x-2 rounded-md  cursor-pointer"
          >
            <FiPhoneCall className=" text-sm text-scudGreen" />
            <p className="text-scudGreen text-xs">Call</p>
          </div>
          <div
            onClick={() => router.push("/officer_profile/account_officer/message")}
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

export async function getServerSideProps(context) {
  const res = await fetch(`${BASE_URL}faqs`);

  const token = context.req.cookies.adminAccessToken || "";

  const userRes = await fetch(`${BASE_URL}auth/profile`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  });

  const data = await res.json();
  const userData = await userRes.json();

  if (
    (data?.statusCode !== undefined && data?.statusCode === 401) ||
    (userData?.statusCode !== undefined && userData?.statusCode === 401)
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
      userData
    }
  };
}
