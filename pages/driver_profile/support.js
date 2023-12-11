import { useRouter } from "next/router";
import React from "react";
import { AiFillStar, AiOutlineMail } from "react-icons/ai";
import { BsChatLeftDotsFill, BsChatLeftText } from "react-icons/bs";
import { FiPhoneCall } from "react-icons/fi";
import Faq from "../../components/drivepageComponents/Faq";
import Layout from "../../components/driver_layout/Layout";
import { BASE_URL } from "../../api/base";
import { validateToken } from "../../components/services/validateToken";

function Support({ faqs, officer }) {
  const router = useRouter();
  return (
    <div>
      <div className="flex mb-10 justify-between items-center">
        <p className="text-lg tracking-wide font-semibold">Support</p>
      </div>

      <div className="rounded-md shadow-sm space-y-4 md:space-y-0 flex flex-col md:flex-row md:justify-between  justify-center items-center p-3 my-4 border w-full">
        <div className="flex  flex-col justify-center md:justify-start md:flex-row md:space-x-2">
          <div className="flex justify-center items-center">
            <img
              className="rounded-full h-20 w-20"
              src={officer?.picture === null ? "/user.png" : officer?.picture}
              alt="profile_img"
            />
          </div>
          <div className="flex flex-col justify-center md:justify-start md:items-start items-center">
            <div className="my-1">
              <p className="font-semibold">{officer?.first_name + " " + officer?.last_name}</p>
            </div>
            <div className="my-1">
              <p className=" text-xs text-textColor">Account Officer</p>
            </div>
            <div className="flex space-x-1 my-2">
              <div className="w-2 mt-1 h-2 mt rounded-full bg-green-700"></div>
              <p className="text-green-700 text-xs">Online</p>
            </div>
          </div>
        </div>
        <div className="space-x-2 flex justify-evenly w-1/3">
          <div
            onClick={() => router.push("/driver_profile/chats/callpage")}
            className="flex border py-2 px-3 hover:bg-gray-100 border-scudGreen hover:bg-gray-10 space-x-2 rounded-md  cursor-pointer"
          >
            <FiPhoneCall className=" text-sm text-scudGreen" />
            <p className="text-scudGreen text-xs">Call</p>
          </div>
          <div
            onClick={() => router.push(`/driver_profile/chats/${officer?.id}`)}
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
        <Faq faqs={faqs.data} />
      </div>
    </div>
  );
}

Support.getLayout = Layout;
export default Support;

export async function getServerSideProps(context) {
  const token = context.req.cookies.accessToken || "";
  const userId = context.req.cookies.user_id || "";
  const faqRes = await fetch(`${BASE_URL}faqs`);
  const userRes = await fetch(`${BASE_URL}users/${userId}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  });
  const faqs = await faqRes.json();
  const user = await userRes.json();

  console.log("user", user);

  if (
    (faqs?.statusCode !== undefined && faqs?.statusCode === 401) ||
    (user.statusCode !== undefined && user.statusCode === 401)
  ) {
    try {
      await validateToken(context);
    } catch (err) {
      return { redirect: { destination: `/signin/driver-signin`, permanent: false } };
    }
  }

  const officer = user?.officer;

  return {
    props: {
      faqs,
      officer
    }
  };
}
