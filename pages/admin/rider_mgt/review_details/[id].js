import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";
import { AiOutlineGift, AiOutlineRight, AiOutlineStar } from "react-icons/ai";
import { BsArrowLeft, BsArrowRight, BsFilterSquare, BsPerson, BsSearch } from "react-icons/bs";
import { FiSend } from "react-icons/fi";
import Layout from "../../../../components/Admin/Layout";
import Button from "../../../../components/common/Button";
import Select2 from "../../../../components/admincomponents/Select2";
import { MdOutlineDateRange } from "react-icons/md";
import ReviewDetailsCompo from "../../../../components/admincomponents/ReviewDetailsCompo";
import Pagination from "../../../../components/common/Pagination";
import BreadCrumbs from "../../../../components/common/BreadCrumbs";
import { BASE_URL } from "../../../../api/base";
import { validateToken } from "../../../../components/services/validateToken";

const Review_details = ({ user }) => {
  const [rating, setRating] = useState("Ratings");
  const [searchState, setSearchState] = useState("");
  const [date, setDate] = useState(false);
  const [avatar, name, level, status, completedTrips] = [
    "/photo.png",
    "Cynthia Ehunu",
    3,
    "active",
    234
  ];
  const router = useRouter();
  const pageNumber = [];
  for (let i = 1; i <= 4; i++) {
    pageNumber.push(i);
  }
  return (
    <div>
      {" "}
      <BreadCrumbs
        index={"Rider's Reviews"}
        indexPath={"/admin/rider_mgt/reviews"}
        secondItem={user?.first_name}
        thirditem={"Reviews"}
      />
      <div
        // onClick={() => router.push("/admin/driver_mgt/review_details")}
        className="py-5 px-3  mb-7 bg-white rounded-lg border flex flex-col justify-center items-center md:flex-row  w-full md:flex md:justify-between "
      >
        <div className="flex-col flex md:flex md:flex-row justify-center items-center md:space-x-4">
          <img
            className="rounded-full h-20 w-20 object-cover"
            src={
              user?.picture === null || user?.picture === undefined ? "/user.png" : user?.picture
            }
            alt="profile_img"
          />{" "}
          <div className="flex flex-col space-y-3 justify-center items-center">
            <p className="text-textColor font-semibold">
              {user?.first_name + " " + user?.last_name}
            </p>{" "}
            <div className="flex space-x-2">
              {/* <div
                className={` ${
                  level === 3 ? "bg-green-600/20" : level === 2 ? "bg-blue-600/20" : "bg-red-600/20"
                } py-[1.3px] px-4 rounded-md`}
              >
                <span
                  className={` ${
                    level === 3 ? "text-green-600" : level === 2 ? "text-blue-600" : "text-red-600"
                  }  flex space-x-1`}
                >
                  <AiOutlineGift className={`text-xs mt-0.5`} />
                  <p className="text-xs">Tier {level}</p>
                </span>
              </div> */}
              <div className="flex space-x-2">
                <div className="flex space-x-2">
                  <div
                    className={` ${
                      user?.is_active === true ? "bg-green-600" : "bg-red-600"
                    } py-[1.3px]  min-w-[80px] rounded-md `}
                  >
                    <p className="text-center  text-white tracking-wider text-xs">
                      {user?.is_active === true ? "Active" : "Inactive"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-textColor/50 text-sm">{completedTrips} completed trips</p>
          </div>
        </div>
        <div className="flex space-x-4 items-center">
          <button className="flex rounded-lg text-sm text-scudGreen px-2 py-2 border border-scudGreen">
            <FiSend className="mt-1 mr-1" />
            <p>Send Message</p>
          </button>
          <button
            onClick={() => {
              router.push({
                pathname: "/admin/rider_mgt/rider_profile",
                query: user?.id
              });
            }}
            className="flex rounded-lg text-sm text-white px-2 py-2 border bg-scudGreen"
          >
            <BsPerson className="text-lg mr-1" />
            <p>View Profile</p>
          </button>
        </div>
      </div>
      <p className="font-semibold tracking-wide text-textColor">
        All Reviews <b className="text-textColor/50">({user?.reviews_recieved?.length})</b>
      </p>
      <div className="block md:hidden mt-8">
        {searchState ? (
          <div className="shadow-md animate__fadeInRight animate__animated justify-between flex px-3 py-1 md:-mt-3 rounded-lg bg-white">
            <input placeholder="Search..." className=" outline-none bg-white" type={"text"} />
            <div className="bg-scudGreen p-1 rounded-full flex justify-center items-center">
              <BsSearch className="text-white text-sm" />
            </div>
          </div>
        ) : (
          <div
            onClick={() => setSearchState(true)}
            className="bg-white -mt-4 space-x-4 justify-center items-center rounded-lg shadow-lg p-[6px] flex"
          >
            <div className="bg-scudGreen p-1 rounded-full flex justify-center items-center">
              <BsSearch className="text-white text-sm" />
            </div>
            <p className="text-sm">Search</p>
          </div>
        )}
      </div>
      <div className="md:flex justify-between my-5">
        <div className="flex space-x-3 ">
          <Select2
            data={[1, 2, 3, 4, 5]}
            rating={true}
            Icon={AiOutlineStar}
            setValue={setRating}
            value={rating}
          />

          <div className="flex w-[8rem] px-1 rounded-md border bg-[#F2F5FF] ">
            <input
              type={date ? "date" : "text"}
              placeholder="Select Date"
              onFocus={() => setDate(true)}
              className=" bg-[#F2F5FF] w-full text-xs outline-none   px-0.5 py-1 "
              // value={from}
              // onChange={(e) => setFrom(e.target.value)}
            />
            {!date && (
              <MdOutlineDateRange
                onClick={() => setDate(true)}
                className="text-textColor text-[18px]  mt-0.5"
              />
            )}
          </div>
        </div>

        <div className="mt-2 hidden md:block">
          {searchState ? (
            <div className="shadow-md animate__fadeInRight animate__animated justify-between flex px-3 py-1 md:-mt-3 rounded-lg bg-white">
              <input placeholder="Search..." className=" outline-none bg-white" type={"text"} />
              <div className="bg-scudGreen p-1 rounded-full flex justify-center items-center">
                <BsSearch className="text-white text-sm" />
              </div>
            </div>
          ) : (
            <div
              onClick={() => setSearchState(true)}
              className="bg-white -mt-4 space-x-4 justify-center items-center rounded-lg shadow-lg p-[6px] flex"
            >
              <div className="bg-scudGreen p-1 rounded-full flex justify-center items-center">
                <BsSearch className="text-white text-sm" />
              </div>
              <p className="text-sm">Search</p>
            </div>
          )}
        </div>
      </div>
      <div className="bg-white mb-7 w-full border rounded-lg">
        <ReviewDetailsCompo reviews={user?.reviews_recieved} />
      </div>
      {/* <Pagination /> */}
    </div>
  );
};
Review_details.getLayout = Layout;
export default Review_details;

export async function getServerSideProps(context) {
  const token = context.req.cookies.adminAccessToken || "";
  console.log(context.query);
  const { id } = context.query;
  const [userRes] = await Promise.all([
    fetch(`${BASE_URL}users/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    })
  ]);

  const [user] = await Promise.all([userRes.json()]);
  if (user?.statusCode !== undefined && user?.statusCode === 401) {
    try {
      await validateToken(context, true);
    } catch (err) {
      return { redirect: { destination: `/admin/auth`, permanent: false } };
    }
  }

  return {
    props: {
      user
    }
  };
}
