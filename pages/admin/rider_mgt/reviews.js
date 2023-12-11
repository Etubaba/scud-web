import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";
import { AiOutlineGift } from "react-icons/ai";
import {
  BsArrowLeft,
  BsArrowRight,
  BsBarChartLine,
  BsFilterSquare,
  BsSearch
} from "react-icons/bs";
import { MdOutlineLocationOn } from "react-icons/md";
import { VscEmptyWindow } from "react-icons/vsc";
import { BASE_URL, STATE_URL } from "../../../api/base";
import Layout from "../../../components/Admin/Layout";
import ReviewListCompo from "../../../components/admincomponents/ReviewListCompo";
import Select2 from "../../../components/admincomponents/Select2";
import EmptyTable from "../../../components/common/EmptyTable";
import Pagination from "../../../components/common/Pagination";
import { reviewList } from "../../../dummy";
import { validateToken } from "../../../components/services/validateToken";
import SearchInput from "../../../components/admincomponents/SearchInput";
import { useEffect } from "react";
import { calculateRating } from "../../../components/services/calculateRating";

const Reviews = ({ users, states }) => {
  const router = useRouter();
  const rider = users.data?.filter((rider) => rider?.roles.includes("rider"));
  const riders = rider?.filter((driver) => driver?.reviews_recieved?.length !== 0);

  const [rating, setRating] = useState("Filter Rating");
  const [level, setLevel] = useState("Level");
  const [location, setLocation] = useState("Locations");
  const [riderList, setRiderList] = useState(riders);
  const [searchState, setSearchState] = useState("");

  useEffect(() => {
    if (location === "Locations") return;
    const filterRiders = riders.filter(
      (el) => el.state?.name?.toLowerCase() == location.toLowerCase()
    );
    setRiderList(filterRiders);
  }, [location]);

  useEffect(() => {
    if (rating === "Filter Rating") return;
    const filterRiders = riders.filter((el) => calculateRating(el.reviews_recieved) == rating);
    setRiderList(filterRiders);
  }, [rating]);
  return (
    <div>
      <p className="text-base tracking-wide font-semibold">Rider's Reviews</p>
      <div className=" block md:hidden mt-7">
        <SearchInput value={searchState} setValue={setSearchState} />
      </div>
      <div className="flex justify-between items-center my-5">
        <div className="flex space-x-3 items-center ">
          <Select2
            data={[1, 2, 3, 4, 5]}
            rating={true}
            Icon={BsFilterSquare}
            setValue={setRating}
            value={rating}
          />

          <Select2
            data={states.map((el) => el.name)}
            Icon={MdOutlineLocationOn}
            setValue={setLocation}
            value={location}
            position={"mt-[22rem]"}
          />
        </div>

        <div className="mt-2 hidden md:block">
          <SearchInput value={searchState} setValue={setSearchState} />
        </div>
      </div>
      {riders.length == 0 ? (
        <>
          <EmptyTable Icon={VscEmptyWindow} name={"reviews"} title={"Reviews"} />
        </>
      ) : (
        riderList
          .filter((el) => {
            if (searchState === "") return el;
            else if (
              el.first_name.toLowerCase().includes(searchState.toLowerCase()) ||
              el.last_name.toLowerCase().includes(searchState.toLowerCase()) ||
              el.email.toLowerCase().includes(searchState.toLowerCase())
            )
              return el;
          })
          .map((review, idx) => (
            <ReviewListCompo
              link={() => router.push(`/admin/rider_mgt/review_details/${review.id}`)}
              key={idx}
              item={review}
            />
          ))
      )}

      {/* <div className="flex justify-between">
        <p className="text-sm font-[400] text-textColor">
          Total Number of trips : 12
        </p>
        <div className="flex space-x-3 justify-center items-center">
          <BsArrowLeft className="text-scudGreen text-lg" />
          {pageNumber.map((element) => (
            <span className="flex">
              <p className="text-sm font-[400] text-textColor">{element}</p>
            </span>
          ))}
          <div className="bg-scudGreen hover:bg-scudGreenHover rounded-full shadow-md p-2 ">
            <BsArrowRight className="text-white text-sm" />
          </div>
        </div>
      </div> */}

      {/* <Pagination page={12} /> */}
    </div>
  );
};

Reviews.getLayout = Layout;
export default Reviews;
export async function getServerSideProps(context) {
  const token = context.req.cookies.adminAccessToken || "";

  const [reviewsRes, userRes, stateRes] = await Promise.all([
    fetch(`${BASE_URL}reviews`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    }),

    fetch(`${BASE_URL}users`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    }),

    fetch(`${STATE_URL}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    })
  ]);

  const [reviews, users, states] = await Promise.all([
    reviewsRes.json(),
    userRes.json(),
    stateRes.json()
  ]);

  if (
    (users?.statusCode !== undefined && users?.statusCode === 401) ||
    (reviews.statusCode !== undefined && reviews.statusCode === 401)
  ) {
    try {
      await validateToken(context, true);
    } catch (err) {
      return { redirect: { destination: `/admin/auth`, permanent: false } };
    }
  }

  return {
    props: {
      reviews,
      users,
      states
    }
  };
}
