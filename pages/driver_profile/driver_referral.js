import React, { useState } from "react";
import { AiOutlineCalendar, AiOutlineCar } from "react-icons/ai";
import { BiRefresh } from "react-icons/bi";
import {
  BsArrowLeft,
  BsArrowRight,
  BsCheckCircle,
  BsClock,
  BsCreditCard,
  BsPersonCircle,
  BsSearch,
  BsShare
} from "react-icons/bs";
import { MdLocationOn, MdOutlineLocationOn } from "react-icons/md";
import Modal from "../../components/common/Modal";
import Layout from "../../components/driver_layout/Layout";
import { trips } from "../../dummy";
import { useSelector } from "react-redux";
import { BASE_URL, WEBSITE_BASE_URL } from "../../api/base";
import EmptyTable from "../../components/common/EmptyTable";
import SearchInput from "../../components/admincomponents/SearchInput";
import { validateToken } from "../../components/services/validateToken";

function Referral({ referrals }) {
  const [open, setOpen] = useState(false);
  const [searchState, setSearchState] = useState(false);

  // console.log(referrals);

  const user = useSelector((state) => state.auth.userDetails);

  //table rows
  const rows = referrals.map((element) => (
    <tr className=" text-center  text-sm text-textColor border-b" key={element.id}>
      <td className="flex justify-center py-2 items-center space-x-2">
        <img
          src={
            element.picture === null || element.picture === undefined
              ? "/user.png"
              : element.picture
          }
          className="rounded-full h-10 w-10"
          alt=""
        />
        <p>{element.first_name}</p>
      </td>
      <td>{element.trips.length}</td>
      <td>{"1000"}</td>
      <td className="text-center">
        {element.is_active ? (
          <div className=" max-w-[100px] p-1 rounded-lg bg-[#f2fbf6]">
            <p className="text-green-600">Active</p>
          </div>
        ) : (
          <div className=" max-w-[100px] p-1 rounded-lg bg-[#fff4f4]">
            <p className="text-red-600">not Active</p>
          </div>
        )}
      </td>
    </tr>
  ));

  //copy to clipboard
  const copyToClipboard = (str) => {
    window.navigator.clipboard.writeText(str);
    setOpen(true);
  };

  return (
    <div>
      <div className="md:flex mb-6 md:mb-20 md:justify-between items-center">
        <div>
          <p className="font-semibold text-base md:text-lg tracking-wider"> Referral</p>
          <p className="md:text-sm text-xs mt-2  text-textColor">
            Get Paid For Every Referral Sign-Up!
          </p>
        </div>
        <span className="flex flex-col md:flex-row space-y-2 md:space-y-0 mt-5 md:-mt-5 md:space-x-2">
          {" "}
          <p className="text-sm text-textColor">Referral link:</p>
          <p className="text-scudGreen text-sm">
            {WEBSITE_BASE_URL + `?referral_code=${user.referral_code}`.substring(23) + "..."}
          </p>
          <button
            onClick={() =>
              copyToClipboard(WEBSITE_BASE_URL + `?referral_code=${user.referral_code}`)
            }
            className="bg-scudGreen  max-w-[40px] hover:to-blue-500 text-[10px] text-white rounded-md px-1 py-[2px]"
          >
            Copy
          </button>
        </span>
      </div>

      <div className="flex mb-8 justify-between items-center">
        <p className="text-sm font-semibold">My Referrals</p>
        {referrals.length > 0 && <SearchInput />}
      </div>

      {/* table start here  */}
      {referrals.length === 0 ? (
        <EmptyTable Icon={BsShare} name={"referral"} title={"No Referral"} />
      ) : (
        <div className="mt-10 mb-6 bg-white border shadow overflow-x-auto pb-4  rounded-xl">
          <table className="w-full min-w-[700px] ">
            <thead className="border-b bg-[#fbfbff] w-full rounded-t-lg">
              <tr className="border-b ">
                <td className="">
                  <div className="flex justify-center">
                    <BsPersonCircle className="text-scudGreen mr-2 text-sm mt-1" />
                    <p> Rider Name</p>
                  </div>
                </td>
                <td className="">
                  <div className="flex justify-center">
                    <AiOutlineCar className="text-scudGreen mr-2 text-base mt-1" />
                    <p>Total Trips</p>
                  </div>
                </td>
                <td className=" ">
                  <div className="flex justify-center">
                    <p className="text-scudGreen text-lg -mt-0.5 mr-1">₦</p>
                    <p>Earned</p>
                  </div>
                </td>
                <td className=" ">
                  <div className="flex justify-center">
                    <div className="border h-4 w-4 mt-1 mr-1 border-scudGreen rounded-full">
                      <BiRefresh className="text-scudGreen text-sm " />
                    </div>
                    <p>Status</p>
                  </div>
                </td>
              </tr>
            </thead>

            <tbody className="mx-4">{rows}</tbody>
          </table>
        </div>
      )}
      {/* table end here  */}

      <Modal onClose={() => setOpen(false)} open={open}>
        <div className="justify-center mt-1 space-x-3 mr-12 flex items-center">
          <BsCheckCircle className="text-green-600" />
          <p>Copied to clipboard</p>
        </div>
      </Modal>
    </div>
  );
}

Referral.getLayout = Layout;
export default Referral;

export async function getServerSideProps(context) {
  const token = context.req.cookies.accessToken || "";
  const id = context.req.cookies.user_id || "";

  const res = await fetch(`${BASE_URL}referrals/find/user/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  });

  const referrals = await res.json();
  if (referrals?.statusCode !== undefined && referrals?.statusCode === 401) {
    try {
      await validateToken(context);
    } catch (err) {
      return { redirect: { destination: `/signin/driver-signin`, permanent: false } };
    }
  }

  return {
    props: {
      referrals
    }
  };
}
