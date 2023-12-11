import Layout from "../../../components/officer_layout/Layout";

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

import ReviewListCompo from "../../../components/admincomponents/ReviewListCompo";
import SearchInput from "../../../components/admincomponents/SearchInput";
import Select2 from "../../../components/admincomponents/Select2";
import Pagination from "../../../components/common/Pagination";
import { reviewList } from "../../../dummy";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";
import { BASE_URL } from "../../../api/base";
import { useEffect } from "react";

const Reviews = () => {
  const router = useRouter();
  const [rating, setRating] = useState("Filter Rating");
  const [level, setLevel] = useState("Level");
  const [location, setLocation] = useState("Locations");
  const [searchState, setSearchState] = useState("");
  const [officerDivers, setOfficerDivers] = useState([]);
  const user = useSelector((state) => state.auth.adminDetails);

  const drivers = user.drivers;
  const tier = [
    {
      option: "Tier 1",
      total: 123,
      OptionIcon: <AiOutlineGift className="text-textColor mt-0.5 text-xs" />
    },
    {
      option: "Tier 2",
      total: 123,
      OptionIcon: <AiOutlineGift className="text-textColor mt-0.5  text-xs" />
    },
    {
      option: "Tier 3",
      total: 123,
      OptionIcon: <AiOutlineGift className="text-textColor mt-0.5  text-xs" />
    }
  ];

  const states = [
    "Abuja",
    "Lagos",
    "Port Harcourt",
    "Ibadan",
    "Abuja",
    "Sokodo",
    "Abuja",
    "Abuja",
    "Abuja",
    "Abuja"
  ];
  const pageNumber = [];
  for (let i = 1; i <= 4; i++) {
    pageNumber.push(i);
  }

  useEffect(() => {
    let cleanUp = true;
    const getEachDriver = async () => {
      const token = Cookies.get("adminAccessToken");
      user.drivers?.map(async (review) => {
        const res = await fetch(`${BASE_URL}users/${review.driver.id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
        });
        const user = await res.json();

        setOfficerDivers((prev) => [...prev, user]);
      });
    };
    if (cleanUp) {
      getEachDriver();
    }

    return () => {
      cleanUp = false;
    };
  }, [user.drivers.length]);

  return (
    <div>
      <p className="text-base tracking-wide font-semibold">Driver's Reviews</p>
      <div className="block md:hidden mt-7">
        <SearchInput />
      </div>
      <div className="flex md:flex-row flex-col  md:justify-between my-10">
        <div className="flex md:mb-0 mb-6 space-x-1 md:space-x-3 ">
          <Select2
            data={[1, 2, 3, 4, 5]}
            rating={true}
            Icon={BsFilterSquare}
            setValue={setRating}
            value={rating}
          />
          <Select2
            data={tier}
            iconDropdown={true}
            Icon={BsBarChartLine}
            setValue={setLevel}
            value={level}
          />
          <Select2
            data={states}
            Icon={MdOutlineLocationOn}
            setValue={setLocation}
            value={location}
            position={"mt-[20rem]"}
          />
        </div>
        <div className="hidden md:block">
          <SearchInput />
        </div>
      </div>
      {officerDivers?.map((review, idx) => (
        //
        <ReviewListCompo
          link={() => router.push(`/officer_profile/account_officer/review_details/${review.id}`)}
          key={idx}
          item={review}
        />
      ))}
      {/* <Pagination /> */}
    </div>
  );
};

Reviews.getLayout = Layout;
export default Reviews;
