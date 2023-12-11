import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";
import { AiOutlineGift } from "react-icons/ai";
import {
  BsArrowLeft,
  BsArrowRight,
  BsBarChartLine,
  BsFilterSquare,
  BsSearch,
} from "react-icons/bs";
import { MdOutlineLocationOn } from "react-icons/md";
import ReviewListCompo from "../../../components/admincomponents/ReviewListCompo";
import Select2 from "../../../components/admincomponents/Select2";
import Pagination from "../../../components/common/Pagination";
import { reviewList } from "../../../dummy";
import Layout from "../../../components/officer_layout/Layout";

const Reviews = () => {
  const router = useRouter();

  const [rating, setRating] = useState("Filter Rating");
  const [level, setLevel] = useState("Level");
  const [location, setLocation] = useState("Locations");
  const [searchState, setSearchState] = useState("");

  const tier = [
    {
      option: "Tier 1",
      total: 123,
      OptionIcon: <AiOutlineGift className="text-textColor mt-0.5 text-xs" />,
    },
    {
      option: "Tier 2",
      total: 123,
      OptionIcon: <AiOutlineGift className="text-textColor mt-0.5  text-xs" />,
    },
    {
      option: "Tier 3",
      total: 123,
      OptionIcon: <AiOutlineGift className="text-textColor mt-0.5  text-xs" />,
    },
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
    "Abuja",
  ];
  const pageNumber = [];
  for (let i = 1; i <= 4; i++) {
    pageNumber.push(i);
  }
  return (
    <div>
      <p className="text-base tracking-wide font-semibold">Officer’s Reviews</p>
      <div className=" block md:hidden mt-7">
        {searchState ? (
          <div className="shadow-md animate__fadeInRight animate__animated flex justify-between px-3 py-1 md:-mt-3 rounded-lg bg-white">
            <input
              placeholder="Search..."
              className=" outline-none bg-white"
              type={"text"}
            />
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
      <div className="flex justify-between my-10">
        <div className="flex space-x-3 ">
          <Select2
            data={[1, 2, 3, 4, 5]}
            rating={true}
            Icon={BsFilterSquare}
            setValue={setRating}
            value={rating}
          />

          <Select2
            data={states}
            Icon={MdOutlineLocationOn}
            setValue={setLocation}
            value={location}
            position={"mt-[18.4rem]"}
          />
        </div>

        <div className="mt-2 hidden md:block">
          {searchState ? (
            <div className="shadow-md animate__fadeInRight animate__animated flex px-3 py-1 md:-mt-3 rounded-lg bg-white">
              <input
                placeholder="Search..."
                className=" outline-none bg-white"
                type={"text"}
              />
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
      {reviewList.map((review, idx) => (
        <ReviewListCompo
          type2
          link={() =>
            router.push("/officer_profile/officers_manager/review_details")
          }
          key={idx}
          item={review}
        />
      ))}

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
