import { useRouter } from "next/router";
import React, { useEffect } from "react";
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
import SearchInput from "../../../../components/admincomponents/SearchInput";
import DatePicker from "../../../../components/common/DatePicker";
import { BASE_URL } from "../../../../api/base";
import { data } from "autoprefixer";
import { validateToken } from "../../../../components/services/validateToken";

const Review_details = ({ user }) => {
  const [rating, setRating] = useState("Ratings");
  const [searchState, setSearchState] = useState("");
  const [dateFilter, setDateFilter] = useState("Select date");
  const [openChat, setOpenChat] = useState(false);
  const [userreviews, setUserReviews] = useState(user.reviews_recieved);
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

  let dateFormate = new Date(dateFilter);
  //filter by search
  useEffect(() => {
    if (rating === "Ratings") {
      setUserReviews(user.reviews_recieved);
    } else {
      let filteredData;
      filteredData = user.reviews_recieved.filter((item) => {
        return item?.rating === rating;
      });

      setUserReviews(filteredData);
    }
  }, [rating]);
  useEffect(() => {
    if (dateFilter === "Select date") {
      setUserReviews(user.reviews_recieved);
    } else {
      let filteredData;
      filteredData = user.reviews_recieved.filter((item) => {
        return new Date(item.created_at).getDay() == dateFormate.getDay();
      });

      setUserReviews(filteredData);
    }
  }, [dateFilter]);

  const max = new Date();
  const maxdate = `${max.getFullYear()}-0${max.getMonth() + 1}-0${max.getDate()}`;

  return (
    <div>
      <span className="text-lg flex space-x-1 mb-10 cursor-pointer font-semibold">
        <p
          className="text-gray-500/60 text-xs md:text-base tracking-wide hover:underline"
          onClick={() => router.push("/admin/driver_mgt/reviews")}
        >
          Driver's Reviews
        </p>
        <AiOutlineRight className="text-gray-500/60 md:mt-1 text-base" />
        <p className="text-gray-500/60 text-xs md:text-base tracking-wide">{user?.first_name}</p>
        <AiOutlineRight className=" md:mt-1 text-base" />
        <p className="tracking-wide text-xs md:text-base">Reviews</p>
      </span>
      <div
        // onClick={() => router.push("/admin/driver_mgt/review_details")}
        className="py-5 px-3  mb-7 bg-white rounded-lg border md:items-center w-full flex-col md:flex-row flex md:justify-between "
      >
        <div className="flex justify-center items-center space-x-4">
          <img
            className="rounded-full h-20 w-20 object-cover"
            src={
              user?.picture === null || user?.picture === undefined ? "/user.png" : user?.picture
            }
            alt="profile_img"
          />
          <div className="flex flex-col space-y-3">
            <p className="text-textColor font-semibold">
              {user?.first_name + " " + user?.last_name}
            </p>
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
            <p className="text-textColor/50 text-sm">
              {
                user.trips.filter((itm) => {
                  return itm.status == "completed";
                }).length
              }
              &nbsp; completed trips
            </p>
          </div>
        </div>
        <div className="flex md:mt-0 mt-6 md:flex-row flex-col md:space-y-0 space-y-4 md:space-x-2">
          <button
            onClick={() => setOpenChat(true)}
            className="flex  justify-center items-center rounded-lg text-sm text-scudGreen px-2 py-2 border border-scudGreen"
          >
            <FiSend className="mt-1 mr-1" />
            <p>Send Message</p>
          </button>
          <button
            onClick={() => {
              router.push({
                pathname: "/admin/driver_mgt/driver_profile",
                query: user?.id
              });
            }}
            className="flex   justify-center items-center rounded-lg text-sm text-white px-2 py-2 border bg-scudGreen"
          >
            <BsPerson className="text-lg mr-1" />
            <p>View Profile</p>
          </button>
          {/* <Button outline={true} text={[<FiSend />, "View Profile"]} /> */}
        </div>
      </div>
      <p className="font-semibold tracking-wide text-textColor">
        All Reviews <b className="text-textColor/50">({user?.reviews_recieved?.length})</b>
      </p>
      <div className="flex md:flex-row md:space-y-0 space-y-6 flex-col-reverse items-center  md:justify-between my-5">
        <div className="flex mt-4 items-center space-x-3 ">
          <Select2
            data={[1, 2, 3, 4, 5]}
            rating={true}
            Icon={AiOutlineStar}
            setValue={setRating}
            value={rating}
          />
          <DatePicker
            onChange={(e) => setDateFilter(e.target.value)}
            type={"date"}
            max={maxdate}
            value={dateFilter}
          />
          {/* <div className="flex w-[8rem] px-1 rounded-md border bg-[#F2F5FF] ">
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
          </div> */}
        </div>

        {/* <SearchInput setValue={setSearchState} value={searchState} /> */}
      </div>
      <div className="bg-white p-3 pb-7 w-full border flex flex-col justify-center items-center rounded-lg">
        <ReviewDetailsCompo reviews={userreviews} />
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
