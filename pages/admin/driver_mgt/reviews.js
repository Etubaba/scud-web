import { useRouter } from "next/router";
import React, { useEffect } from "react";
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
import { BASE_URL, STATE_URL } from "../../../api/base";
import Layout from "../../../components/Admin/Layout";
import ReviewListCompo from "../../../components/admincomponents/ReviewListCompo";
import SearchInput from "../../../components/admincomponents/SearchInput";
import Select2 from "../../../components/admincomponents/Select2";
import Pagination from "../../../components/common/Pagination";
import { getToken } from "../../../components/services/refresh";
import { reviewList } from "../../../dummy";
import EmptyTable from "../../../components/common/EmptyTable";
import { VscEmptyWindow } from "react-icons/vsc";
import { validateToken } from "../../../components/services/validateToken";
import { calculateRating } from "../../../components/services/calculateRating";

const Reviews = ({ reviews, users, states }) => {
  const router = useRouter();
  const [rating, setRating] = useState("Filter Rating");
  // const [level, setLevel] = useState("Level");
  const driver = users.data?.filter((driver) => driver?.roles.includes("driver"));
  const drivers = driver?.filter((driver) => driver?.reviews_recieved?.length !== 0);
  const [location, setLocation] = useState("Locations");
  const [searchState, setSearchState] = useState("");
  const [driverList, setDriverList] = useState(drivers);

  // reload server side props #################

  const refreshData = () => {
    router.replace(router.asPath);
  };
  // const tier = [
  //   {
  //     option: "Tier 1",
  //     total: 123,
  //     OptionIcon: <AiOutlineGift className="text-textColor mt-0.5 text-xs" />
  //   },
  //   {
  //     option: "Tier 2",
  //     total: 123,
  //     OptionIcon: <AiOutlineGift className="text-textColor mt-0.5  text-xs" />
  //   },
  //   {
  //     option: "Tier 3",
  //     total: 123,
  //     OptionIcon: <AiOutlineGift className="text-textColor mt-0.5  text-xs" />
  //   }
  // ];

  useEffect(() => {
    if (location === "Locations") return;
    const filterDrivers = drivers.filter(
      (el) => el.state?.name?.toLowerCase() == location.toLowerCase()
    );
    setDriverList(filterDrivers);
  }, [location]);

  useEffect(() => {
    if (rating === "Filter Rating") return;
    const filterDrivers = drivers.filter((el) => calculateRating(el.reviews_recieved) == rating);
    setDriverList(filterDrivers);
  }, [rating]);

  return (
    <div>
      <p className="text-base tracking-wide font-semibold">Driver's Reviews</p>
      <div className="block md:hidden mt-7">
        <SearchInput />
      </div>
      <div className="flex md:flex-row flex-col  md:justify-between my-5">
        <div className="flex md:mb-0 mb-6 space-x-1 md:space-x-3 ">
          <Select2
            data={[1, 2, 3, 4, 5]}
            rating={true}
            Icon={BsFilterSquare}
            setValue={setRating}
            value={rating}
          />
          {/* <Select2
            data={tier}
            iconDropdown={true}
            Icon={BsBarChartLine}
            setValue={setLevel}
            value={level}
          /> */}
          <Select2
            data={states.map((el) => el.name)}
            Icon={MdOutlineLocationOn}
            setValue={setLocation}
            value={location}
            position={"mt-[22rem]"}
          />
        </div>
        <div className="hidden md:block">
          <SearchInput value={searchState} setValue={setSearchState} />
        </div>
      </div>
      {drivers.length == 0 ? (
        <>
          <EmptyTable Icon={VscEmptyWindow} name={"reviews"} title={"Reviews"} />
        </>
      ) : (
        driverList
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
              link={() => router.push(`/admin/driver_mgt/review_details/${review.id}`)}
              key={idx}
              item={review}
            />
          ))
      )}
      {/* <Pagination /> */}
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
    (reviews.statusCode !== undefined && reviews.statusCode === 401) ||
    (states.statusCode !== undefined && states.statusCode === 401)
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
