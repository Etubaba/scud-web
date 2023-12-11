import Rating from "../../components/common/Rating";
import React from "react";
import { useState } from "react";
import { BiRefresh, BiTrip } from "react-icons/bi";
import {
  BsCalendar2Date,
  BsCheckCircle,
  BsClock,
  BsCreditCard,
  BsPersonCircle,
  BsSearch,
  BsStar
} from "react-icons/bs";
import { MdLocationOn, MdOutlineLocationOn } from "react-icons/md";
import Modal from "../../components/common/Modal";
import Layout from "../../components/riderLayout/Layout";
import EmptyTable from "../../components/common/EmptyTable";
import SearchInput from "../../components/admincomponents/SearchInput";
import { getAddressSubstring } from "../../components/services/shortenAddress";

import { BASE_URL } from "../../api/base";
import { getTimeAgo } from "../../components/services/getTimeAgo";
import { useSelector } from "react-redux";
import axios from "axios";
import Cookies from "js-cookie";
import { validateToken } from "../../components/services/validateToken";

const History = ({ userTrips }) => {
  const [searchState, setSearchState] = useState(false);
  // const [dateValue, setDateValue] = useState("Total Trips");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalOpen2, setModalOpen2] = useState(false);
  const [details, setDetails] = useState();
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [reviewInput, setReviewInput] = useState(false);

  const user = useSelector((state) => state.auth.userDetails);

  const completedTrips = userTrips.filter((item) => item.status === "completed");
  const canceledTrips = userTrips.filter((item) => item.status === "canceled");

  const rows = userTrips?.map((element) => (
    <tr
      onClick={() => {
        setDetails(element);
        setModalOpen(true);
      }}
      className=" text-center hover:shadow-md hover:border text-sm text-textColor border-b"
      key={element.id}
    >
      <td className="flex justify-center py-2 items-center space-x-2">
        <img
          src={element.driver.picture === null ? "/user.png" : element.driver.picture}
          // src={element.driver.picture}
          className="rounded-full h-7 w-7 md:h-8 md:w-8"
          alt=""
        />
        <p className="md:text-xs text-xs">{element.driver.first_name}</p>
      </td>
      <td>{getAddressSubstring(element.pickup)}</td>
      <td>{getAddressSubstring(element.destination)}</td>
      <td className="md:text-base text-xs">
        <p className="text-xs">
          {element.trip_fare == null ? "N/A" : `₦ ${element.trip_fare.total_fare}`}
        </p>
      </td>
      <td className="md:text-base text-xs">
        <p className="text-xs">{getTimeAgo(element.start_date)}</p>
      </td>
      <td>{"Cash"}</td>
      <td className="text-center">
        {element.status == "completed" ? (
          <div className=" max-w-[100px] p-1 rounded-lg bg-[#f2fbf6]">
            <p className="text-green-600">Completed</p>
          </div>
        ) : element.status == "unstarted" ? (
          <div className=" max-w-[100px] p-1 rounded-lg bg-[#f2f5ff]">
            <p className="text-scudGreen">Ongoing</p>
          </div>
        ) : (
          <div className=" max-w-[100px] p-1 rounded-lg bg-[#fff4f4]">
            <p className="text-red-600">Canceled</p>
          </div>
        )}
      </td>
    </tr>
  ));

  const postReview = async () => {
    if (review === "") return;
    try {
      const token = Cookies.get("accessToken");
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      axios.defaults.headers.get["Content-Type"] = "application/json";
      const formData = {
        reviewer_id: user?.id,
        reviewed_id: details?.driver?.id,
        rating: rating,
        comment: review
      };

      review === "" ? delete formData.comment : null;

      const { data } = await axios.post(`${BASE_URL}reviews`, formData);

      if (data) {
        setModalOpen2(true);
        setModalOpen(false);
        setRating(0);
        setReview("");
        setReviewInput(false);
      }
    } catch (err) {
      if (err.response) {
        if (err.response.statusCode === 401) await getToken();
        const msg = err.response.data.message;
        if (typeof msg === "string") {
          enqueueSnackbar(msg, {
            variant: "error"
          });
        } else {
          for (let i = 0; i < msg?.length; i++) {
            enqueueSnackbar(msg[i], {
              variant: "error"
            });
          }
        }
      } else {
        enqueueSnackbar(`${err.message}`, {
          variant: "error"
        });
      }
    }
  };

  return (
    <div className="p-2  md:p-5">
      <div>
        <p className="font-semibold md:text-lg tracking-wider">My Ride History</p>
      </div>

      {userTrips.length > 0 && (
        <div className="flex  flex-col-reverse   md:flex-row md:justify-between md:items-center  mt-14">
          <div className="flex space-x-2 my-5 md:my-0 md:space-x-4">
            <div className="md:min-w-[120px] min-w-[90px] border rounded-md p-1">
              <p className="text-scudGreen text-xs md:text-sm">Total trips: {userTrips.length}</p>
            </div>
            <div className="min-w-[120px] border rounded-md p-1">
              <p className="text-textColor text-xs md:text-sm">
                Completed trips: {completedTrips?.length}
              </p>
            </div>
            <div className="min-w-[120px] text-textColor border rounded-md p-1">
              <p className=" text-xs md:text-sm">cancelled trips: {canceledTrips?.length}</p>
            </div>
          </div>
          <SearchInput />
        </div>
      )}

      {/* table start here  */}
      {userTrips?.length === 0 ? (
        <EmptyTable Icon={BiTrip} title={"No Trip Details"} name={"trips"} />
      ) : (
        <div className="mt-10 mb-6 overflow-x-auto bg-white border shadow pb-4  rounded-xl">
          <table className="w-full min-w-[1000px]">
            <thead className="border-b bg-[#fbfbff] w-full rounded-t-lg">
              <tr className="border-b ">
                <td className="">
                  <div className="flex justify-center">
                    <BsPersonCircle className="text-scudGreen mr-2 text-sm mt-1" />
                    <p>Driver</p>
                  </div>
                </td>
                <td className="py-4 ">
                  <div className="flex justify-center">
                    <MdLocationOn className="text-scudGreen mr-2 text-sm mt-1" />
                    <p>Pick Up</p>
                  </div>
                </td>
                <td className="">
                  <div className="flex justify-center">
                    <MdOutlineLocationOn className="text-scudGreen mr-2 text-base mt-1" />
                    <p>Destination</p>
                  </div>
                </td>
                <td className=" ">
                  <div className="flex justify-center">
                    {/* <BsPersonCircle className="text-scudGreen mr-2 text-sm mt-1" /> */}
                    <p className="text-scudGreen text-lg -mt-0.5 mr-1">₦</p>
                    <p>Fare</p>
                  </div>
                </td>
                <td className=" text-center">
                  <div className="flex justify-center">
                    <BsClock className="text-scudGreen mr-2 text-sm mt-1" />
                    <p>Time Spent</p>
                  </div>
                </td>
                <td className=" ">
                  <div className="flex justify-center">
                    <BsCreditCard className="text-scudGreen mr-2 text-sm mt-1.5" />
                    <p>Payment Method</p>
                  </div>
                </td>
                <td className=" ">
                  <div className="flex justify-center">
                    <div className="border h-4 w-4 mt-1 mr-1 border-scudGreen rounded-full">
                      <BiRefresh className="text-scudGreen text-sm " />
                    </div>
                    <p>Trip Status</p>
                  </div>
                </td>
              </tr>
            </thead>

            <tbody className="mx-4">{rows}</tbody>
          </table>
        </div>
      )}
      {/* table end here  */}

      {/* Details modal starts here */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <div className="w-[18rem] md:w-[30rem]  h-auto px-2 overflow-y-auto md:h-[25rem]">
          <p className=" text-center font-semibold md:text-left ">Trips Details</p>
          <div className="border-b my-4" />
          <div className="flex justify-between items-center">
            <div className="flex space-x-3 justify-center items-center">
              <img
                src={details?.driver.picture === null ? "/user.png" : details?.driver.picture}
                className="h-16 w-16 rounded-full"
                alt=""
              />
              <p className="text-2xl text-textColor">{details?.driver?.first_name}</p>
            </div>
            <div className="flex space-x-2">
              <BsCalendar2Date className="text-scudGreen" />
              <p className="text-textColor text-sm">{details?.date}</p>
            </div>
          </div>
          <div className="bg-adminbg flex flex-col space-y-4 mt-6 p-4 w-full border h-auto rounded-lg">
            <span className=" flex justify-between ">
              <span className="flex space-x-2">
                <MdLocationOn className="text-scudGreen mr-2 text-sm mt-1" />
                <p className="text-sm text-textColor tracking-wide">Pickup Location</p>
              </span>
              <p className="text-sm text-textColor tracking-wide">{details?.pickup}</p>
            </span>
            <span className=" flex justify-between ">
              <span className="flex space-x-2">
                <MdOutlineLocationOn className="text-scudGreen mr-2 text-sm mt-1" />
                <p className="text-sm text-textColor tracking-wide">Destination</p>
              </span>
              <p className="text-sm text-textColor tracking-wide">{details?.destination}</p>
            </span>
            <span className=" flex justify-between ">
              <span className="flex space-x-2">
                <p className="text-scudGreen text-sm  mr-3">₦</p>
                <p className="text-sm text-textColor tracking-wide">Fare</p>
              </span>
              <p className="text-sm text-textColor tracking-wide">
                {" "}
                {details?.trip_fare == null ? "N/A" : `₦ ${details?.trip_fare.total_fare}`}
              </p>
            </span>
            <span className=" flex justify-between ">
              <span className="flex space-x-2">
                <BsClock className="text-scudGreen mr-2 text-sm mt-1" />
                <p className="text-sm text-textColor tracking-wide">Time </p>
              </span>
              <p className="text-sm text-textColor tracking-wide">
                {" "}
                {getTimeAgo(details?.start_date)}
              </p>
            </span>
            <span className=" flex justify-between ">
              <span className="flex space-x-2">
                <BsCreditCard className="text-scudGreen mr-2 text-sm mt-1" />
                <p className="text-sm text-textColor tracking-wide">Payment Method</p>
              </span>
              <p className="text-sm text-textColor tracking-wide">{"Cash"}</p>
            </span>
            <span className=" flex justify-between ">
              <span className="flex space-x-2">
                <div className="border h-4 w-4 mt-1 mr-1 border-scudGreen rounded-full">
                  <BiRefresh className="text-scudGreen text-sm " />
                </div>
                <p className="text-sm text-textColor tracking-wide">Trip Status</p>
              </span>
              {details?.tripStatus == "completed" ? (
                <div className=" max-w-[100px] p-1 rounded-lg bg-[#f2fbf6]">
                  <p className="text-green-600 text-sm">Completed</p>
                </div>
              ) : (
                <div className=" max-w-[100px] p-1 rounded-lg bg-[#fff4f4]">
                  <p className="text-red-600 text-sm">Cancelled</p>
                </div>
              )}
            </span>
          </div>

          <div
            className={
              !reviewInput
                ? "w-full border flex-col mt-5  py-6 space-y-4 rounded-lg flex justify-center items-center"
                : "border w-full h- rounded-lg mt-5 p-3"
            }
          >
            {reviewInput ? (
              <div>
                <div className="flex justify-between items-center">
                  <p className="font-semibold text-sm text-textColor">Review</p>
                  <div>
                    {" "}
                    <Rating rating={rating} readOnly={true} />
                  </div>
                </div>
                <div>
                  <textarea
                    placeholder="Write your comment here"
                    size="sm"
                    onChange={(e) => setReview(e.target.value)}
                    value={review}
                    autosize
                    className="placeholder:text-xs text-sm text-textColor mt-2 outline-none w-full"
                    minRows={5}
                  />
                </div>
                <p
                  onClick={postReview}
                  className={` ${
                    review !== "" ? "text-scudGreen" : "text-scudGreen/30"
                  } cursor-pointer text-right text-xs`}
                >
                  Submit Review
                </p>
              </div>
            ) : (
              <>
                <p className="font-semibold text-textColor text-sm">Rate Your Ride</p>
                <p className="text-xs text-textColor">How would you rate your ride with James?</p>
                <div>
                  <Rating
                    rating={rating}
                    setRating={setRating}
                    // onChange={(currValue) => setRating(currValue)}
                    size="lg"
                  />
                </div>

                {rating > 0 && !reviewInput && (
                  <span
                    onClick={() => setReviewInput(true)}
                    className="flex cursor-pointer  space-x-2"
                  >
                    <BsStar className="text-sm text-scudGreen" />
                    <p className="text-xs hover:text-scudGreenHover/40 text-scudGreen">
                      Write Review
                    </p>
                  </span>
                )}
              </>
            )}
          </div>
        </div>
      </Modal>

      <Modal onClose={() => setModalOpen2(false)} open={modalOpen2}>
        <div className="justify-center mt-1 space-x-3 mr-12 flex items-center">
          <BsCheckCircle className="text-green-600" />
          <p>Review Sent</p>
        </div>
      </Modal>
    </div>
  );
};
History.getLayout = Layout;
export default History;
export async function getServerSideProps(context) {
  const token = context.req.cookies.accessToken || "";
  const id = context.req.cookies.user_id;

  const res = await fetch(`${BASE_URL}trips/rider/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  });

  const userTrips = await res.json();

  if (userTrips?.statusCode !== undefined && userTrips?.statusCode === 401) {
    try {
      await validateToken(context);
    } catch (err) {
      return { redirect: { destination: `/signin/rider-signin`, permanent: false } };
    }
  }

  return {
    props: {
      userTrips
    }
  };
}
