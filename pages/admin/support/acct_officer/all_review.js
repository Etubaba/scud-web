import React from "react";
import { useState } from "react";
import { BsTelephone } from "react-icons/bs";
import { FiSend } from "react-icons/fi";
import { MdOutlineLocationOn } from "react-icons/md";
import Layout from "../../../../components/Admin/Layout";
import Review from "../../../../components/admincomponents/Review";
import BreadCrumbs from "../../../../components/common/BreadCrumbs";
import { riderReviews } from "../../../../dummy";
import { validateToken } from "../../../../components/services/validateToken";
import { BASE_URL } from "../../../../api/base";

const Allofficer_review = ({ data }) => {
  const {
    id,
    first_name,
    last_name,
    state,
    drivers,
    phone,
    picture,
    supervisor,
    reviews_recieved
  } = data;

  const managedBy =
    supervisor?.supervisor.first_name.charAt(0).toUpperCase() +
    supervisor?.supervisor.first_name.slice(1) +
    " " +
    supervisor?.supervisor.last_name.charAt(0).toUpperCase() +
    supervisor?.supervisor.last_name.slice(1);

  const officer_name =
    first_name.charAt(0).toUpperCase() +
    first_name.slice(1) +
    " " +
    last_name.charAt(0).toUpperCase() +
    last_name.slice(1);

  console.log("//", drivers);
  return (
    <div>
      {" "}
      <BreadCrumbs
        secondItem={officer_name}
        indexPath="/admin/support/acct_officer/account_officer"
        index={"Account Officer"}
        thirditem="Reviews"
      />
      <div className="py-3 mb-6 px-3 bg-white rounded-lg border  flex-col md:flex-row w-full flex md:items-center md:justify-between ">
        <div className="flex flex-col md:flex-row md:space-y-0 justify-center mb-10 md:mb-0 items-center md:space-x-4">
          <div className="mb-4 md:mb-0">
            {" "}
            <img
              src={picture === null || picture === undefined ? "/user.png" : picture}
              className="w-24 md:mb-0 md:mr-2 h-24 rounded-full"
              alt=""
            />{" "}
            <div className="w-2.5 border border-white h-2.5 rounded-full relative z-40 -mt-4  ml-[4.5rem] bg-green-600"></div>
          </div>

          <div className="flex flex-col justify-center items-center md:justify-start md:items-start space-y-2">
            <p className="text-textColor font-semibold">{officer_name}</p>
            <span className="flex space-x-1">
              <MdOutlineLocationOn className="text-scudGreen mt-0.5" />
              <p className="text-textColor  text-sm">{state?.name} State</p>
            </span>
            <div className="flex items-center space-x-1">
              <div className="flex">
                {drivers.slice(0, 3).map((el, i) => (
                  <div
                    className={`rounded-full  border-2 border-white z-20 ${
                      i === 0 ? "z-20" : i === 1 ? "z-10 -ml-1" : "z-0 -ml-1"
                    }`}
                  >
                    <img
                      src={
                        el.driver.picture === null || el.driver.picture === undefined
                          ? "/user.png"
                          : el.driver.picture
                      }
                      className="w-3 h-3 rounded-full "
                    />
                  </div>
                ))}
              </div>

              <p className="text-xs text-textColor/50">Managing {drivers?.length} Drivers</p>
            </div>
            {supervisor === null ? (
              <p className="text-xs text-textColor">
                This officer has not been assigned to any supervisor{" "}
              </p>
            ) : (
              <div className="flex space-x-1  items-center">
                <p className="text-xs text-textColor/50">Manage by</p>
                <span className="flex space-x-1 items-center">
                  <img
                    src={
                      supervisor?.picture === null || supervisor?.picture === undefined
                        ? "/user.png"
                        : supervisor.picture
                    }
                    className="w-3  h-3  rounded-full"
                  />
                  <p className="text-xs  text-textColor">{managedBy}</p>
                </span>
              </div>
            )}
          </div>
        </div>
        <div className="flex justify-center items-center space-x-2">
          <button
            // onClick={() => setOpenChat(true)}
            className="flex rounded-lg text-sm text-scudGreen px-2 py-2 border border-scudGreen"
          >
            <FiSend className="mt-1 mr-1" />
            <p>Send Message</p>
          </button>
          <button
            onClick={() => window.open(`tel:${phone}`)}
            className="flex rounded-lg text-sm text-white px-2 py-2 border bg-scudGreen"
          >
            <BsTelephone className="text-lg mr-1" />
            <p>{phone}</p>
          </button>
        </div>
      </div>
      <p className="font-semibold mb-5 ">
        {" "}
        All Reviews <b className="text-textColor/50">({riderReviews.length})</b>
      </p>
      <div className="bg-white mb-8 p-6 border rounded-lg grid grid-cols-1 md:grid-cols-3 gap-5 ">
        {reviews_recieved.map((item) => (
          <Review rider={true} item={item} key={item.id} />
        ))}
      </div>
    </div>
  );
};
Allofficer_review.getLayout = Layout;
export default Allofficer_review;

export async function getServerSideProps(context) {
  const token = context.req.cookies.adminAccessToken || "";
  const id = Object.keys(context.query)[0];

  const res = await fetch(`${BASE_URL}users/${id}`, {
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
