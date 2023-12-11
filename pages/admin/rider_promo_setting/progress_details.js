import React from "react";
import Layout from "../../../components/Admin/Layout";
import BreadCrumbs from "../../../components/common/BreadCrumbs";
import { FiSend } from "react-icons/fi";
import { BsArrowUpRight, BsFacebook, BsLinkedin, BsPerson, BsTag } from "react-icons/bs";
import { useState } from "react";
import {
  MdOutlineAccessTime,
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp
} from "react-icons/md";
import { TbCarOff, TbCurrencyNaira } from "react-icons/tb";
import {
  AiOutlineCar,
  AiOutlineInstagram,
  AiOutlinePercentage,
  AiOutlineTwitter
} from "react-icons/ai";
import Divider from "../../../components/common/Divider";
import Button from "../../../components/common/Button";
import { BASE_URL } from "../../../api/base";
import { validateToken } from "../../../components/services/validateToken";
import { getTimeAgo } from "../../../components/services/getTimeAgo";
import axios from "axios";
import Cookies from "js-cookie";
import { getToken } from "../../../components/services/refresh";
import { useSnackbar } from "notistack";

const progress_details = ({ discountDetails }) => {
  const [offerType, setOfferType] = useState("discount and cash"); // discount and cash offer or cash offer or discount offer
  const [expired, setExpired] = useState(false);
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [mins, setMins] = useState(0);
  const [firstOffer, setFirstOffer] = useState(false);
  const [secondOffer, setSecondOffer] = useState(false);
  const [thirdOffer, setThirdOffer] = useState(false);

  const {
    user: { picture, first_name, last_name },
    discount_id,
    user_id,
    discount,
    created_at,
    last_offer_trips,
    first_offer_trips,
    last_offer_active,
    first_offer_complete,
    second_offer_paid,
    facebook_link,
    instagram_link,
    twitter_link,
    linkedin_link
  } = discountDetails;

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const expirationDate = new Date(discount.end_date);
  useEffect(() => {
    function count() {
      const countdownInterval = setInterval(() => {
        const currentTime = new Date();
        const timeDiff = expirationDate.getTime() - currentTime.getTime();

        // Check if the discount has already expired
        if (timeDiff <= 0) {
          clearInterval(countdownInterval);
          setExpired(true);
          return;
        }

        // Convert time difference to days, hours, and minutes
        const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        const hrs = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));

        setDays(days);
        setHours(hrs);
        setMins(minutes);
        setExpired(false);
      }, 1000);
    }
    count();
  }, []);

  const activateStage = async (stage) => {
    try {
      const obj =
        stage === "first"
          ? {
              first_offer_complete: true
            }
          : stage === "second"
          ? {
              second_offer_paid: true
            }
          : {
              last_offer_active: true
            };

      const token = Cookies.get("adminAccessToken");
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      axios.defaults.headers.get["Content-Type"] = "application/json";

      const { data } = await axios.patch(`${BASE_URL}progress/${discount_id}/${user_id}`, obj);
      if (data) {
        enqueueSnackbar("Activated Successfully", {
          variant: "success"
        });
      }
    } catch (err) {
      if (err.response) {
        const msg = err.response.data.message;
        if (typeof msg === "string") {
          if (msg === "Unauthorized" || err.response.data.statusCode == 401) {
            await getToken(true);
            enqueueSnackbar(`Try again, something went wrong`, {
              variant: "info"
            });
          } else
            enqueueSnackbar(msg, {
              variant: "error"
            });
        } else {
          for (let i = 0; i < msg.length; i++) {
            enqueueSnackbar(msg[i], {
              variant: "error"
            });
          }
        }
      }
    }
  };
  return (
    <div>
      {" "}
      <BreadCrumbs
        indexPath={"/admin/rider_promo_setting/promo_progress"}
        index={"Rider Discount"}
        secondItem={first_name + " " + last_name}
      />
      <div className="py-3 px-4 bg-white rounded-md border mb-4 flex-col md:flex-row  w-full flex items-center justify-between ">
        <div className="flex flex-col md:flex-row  justify-center items-center space-y-2 md:space-y-0 md:space-x-2">
          <img
            src={picture === null ? "/user.png" : picture}
            className="w-[3rem] rounded-full h-[3rem] object-cover"
            alt=""
          />
          <div className="flex flex-col md:block md:justify-start md:items-center justify-center items-center ">
            <p className="text-textColor mb-2 font-semibold">{first_name + " " + last_name}</p>
            <div className="flex space-x-4 justify-center items-center mb-4 md:mb-0">
              <p className="text-xs text-textColor/50">
                {" "}
                Joined {new Date(created_at).toDateString()}
              </p>
              <div className="flex space-x-1">
                <span className="w-2 h-2 mt-1 rounded-full bg-green-600"></span>
                <p className="text-xs text-green-600">Online</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex space-x-4">
          <button className="flex rounded-md text-sm text-scudGreen px-2 py-1.5 border border-scudGreen">
            <FiSend className="mt-1 mr-1" />
            <p className="text-sm">Send Message</p>
          </button>
          <button className="flex rounded-md text-sm text-white bg-scudGreen px-3 py-1.5 border ">
            <BsPerson className="mt-1 mr-1" />
            <p className="text-sm">View Profile</p>
          </button>
        </div>
      </div>
      {/*this is for default offer*/}
      {discount.type === "default" && (
        <div className="bg-white rounded-md border py-4 px-4 md:px-6">
          <div className=" flex flex-col md:flex-row justify-between mb-4">
            <p className="text-sm  font-[600] text-title mb-3 md:mb-0">Discount and cash offer</p>
            <span className=" flex space-x-3 items-center">
              {!expired ? (
                <p className="md:text-sm text-xs">
                  Expires:{" "}
                  <b className="text-scudGreen ">
                    {days}days : {hours}hrs : {mins}mins
                  </b>
                </p>
              ) : (
                <p className="md:text-sm text-xs text-[#FF2D2D]">
                  Expired: <b className="text-textColor/40">{getTimeAgo(expirationDate)}</b>
                </p>
              )}

              {last_offer_trips >= discount.last_stage_no_of_trips ? (
                <div className=" max-w-[120px] flex justify-center p-1 rounded-lg bg-[#f2fbf6]">
                  <p className="text-green-600 text-xs">Completed</p>
                </div>
              ) : (
                <div className=" max-w-[120px] p-1 rounded-lg bg-[#F2F5FF]">
                  <p className="text-scudGreen text-xs">Ongoing</p>
                </div>
              )}
            </span>
          </div>
          {/* this is for the first offer */}
          <div
            onClick={() => setFirstOffer(!firstOffer)}
            className={`border ${firstOffer ? " border-scudGreen" : ""} rounded-md p-2.5 `}
          >
            <div className=" flex justify-between items-center">
              <div className="flex space-x-2 md:space-x-3 items-center">
                <div
                  className={`w-10 h-10 flex justify-center ${
                    firstOffer ? "bg-scudGreen" : "bg-[#f2f5ff]"
                  } items-center rounded-full  `}
                >
                  <BsTag className={` ${firstOffer ? "text-white" : "text-scudGreen"} text-base`} />
                </div>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm text-title font-[500]">First Offer Setting</p>
                  <p className="text-xs text-textColor/60">Ride Discount</p>
                </div>
                {first_offer_complete ? (
                  <div className=" max-w-[120px] flex justify-center -mt-5 p-1 px-2 rounded-lg bg-green-600/20">
                    <p className="text-green-600 text-xs tracking-wide">Completed</p>
                  </div>
                ) : (
                  <div className=" max-w-[120px] flex justify-center -mt-5 p-1 px-2 rounded-lg bg-[#ffbd3d1a]">
                    <p className="text-[#FFBD3D] text-xs tracking-wide">pending</p>
                  </div>
                )}
              </div>
              {firstOffer ? (
                <MdOutlineKeyboardArrowUp
                  onClick={(e) => {
                    e.stopPropagation();
                    setFirstOffer(false);
                  }}
                  className="text-scudGreen"
                />
              ) : (
                <MdOutlineKeyboardArrowDown className="text-textColor/70" />
              )}
            </div>

            {firstOffer && (
              <div className="">
                <div className="my-3">
                  {" "}
                  <Divider />
                </div>
                <div className="md:ml-6">
                  <div className="md:max-w-[20rem]  mb-4 md:mb-6">
                    <div className="flex justify-between items-center mb-3">
                      <div className="flex space-x-2 items-center">
                        <div className="rounded-full p-1 flex justify-center items-center bg-[#fff8ec]">
                          <TbCurrencyNaira className="text-[#FFBD3D]" />
                        </div>
                        <p className="text-sm text-textColor">Amount</p>
                      </div>
                      <p className="text-sm text-title font-semibold mr-3">
                        ₦{discount.first_stage_total}
                      </p>
                    </div>
                    <div className="flex justify-between items-center mb-3">
                      <div className="flex space-x-2 items-center">
                        <div className="rounded-full p-1 flex justify-center items-center bg-[#F2F5FF]">
                          <AiOutlineCar className="text-scudGreen" />
                        </div>
                        <p className="text-sm text-textColor">Number of trips</p>
                      </div>
                      <div className="flex space-x-1">
                        <p className="text-sm text-title font-semibold">
                          {first_offer_trips}/{discount.first_stage_no_of_trips}
                        </p>
                        <div className="p-1 bg-[#f2f5ff] rounded-md">
                          <BsArrowUpRight className="text-textColor text-xs" />
                        </div>
                      </div>
                    </div>
                    {/* <div className="flex justify-between items-center mb-3">
                      <div className="flex space-x-2 items-center">
                        <div className="rounded-full p-1 flex justify-center items-center bg-[#fff4f4]">
                          <TbCarOff className="text-red-600" />
                        </div>
                        <p className="text-sm text-textColor">Number of canceled trips</p>
                      </div>
                      <div className="flex space-x-1">
                        <p className="text-sm text-title font-semibold">20/20</p>
                        <div className="p-1 bg-[#f2f5ff] rounded-md">
                          <BsArrowUpRight className="text-textColor text-xs" />
                        </div>
                      </div>
                    </div> */}

                    <div className="flex justify-between items-center mb-3">
                      <div className="flex space-x-2 items-center">
                        <MdOutlineAccessTime className="text-textColor text-sm ml-1" />

                        <p className="text-sm text-textColor">{getTimeAgo(created_at)}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="my-3">
                  {" "}
                  <Divider />
                </div>

                <div className="justify-between space-y-4 md:space-y-0 flex-col md:flex-row flex items-center">
                  <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
                    <div className="bg-[#f2f5ff]  py-1 px-3 flex justify-center items-center rounded-md">
                      <p className=" text-xs">
                        Promo type: <b>{discount.type}</b>
                      </p>{" "}
                    </div>
                    <div className="bg-[#f2f5ff] py-1 px-3 flex justify-center items-center rounded-md">
                      <p className=" text-xs">
                        Offer type: <b>Rider Discount and Cash</b>
                      </p>{" "}
                    </div>
                    <div className="bg-[#f2f5ff] py-1 px-3 flex justify-center items-center rounded-md">
                      <p className=" text-xs">
                        Discount amount: <b>{discount.first_stage_percentage}%</b>
                      </p>
                      {/* <p className=" text-xs">
                        Discount amount: <b>{discount.first_stage_percentage}% of 30,000</b>
                      </p> */}
                    </div>
                  </div>

                  <Button onClick={() => activateStage("first")} text={"Activate Offer"} />
                </div>
              </div>
            )}
          </div>

          {/* this is for second offer  */}
          <div
            onClick={() => setSecondOffer(!secondOffer)}
            className={`mt-4 border ${
              secondOffer ? " border-scudGreen" : ""
            } rounded-md p-2 md:p-2.5 `}
          >
            <div className=" flex justify-between items-center">
              <div className="flex space-x-2 md:space-x-3 items-center">
                <div
                  className={`w-10 h-10 flex justify-center ${
                    secondOffer ? "bg-scudGreen" : "bg-[#f2f5ff]"
                  } items-center rounded-full  `}
                >
                  <BsTag
                    className={` ${secondOffer ? "text-white" : "text-scudGreen"} text-base`}
                  />
                </div>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm text-title font-[500]">Second Offer Setting</p>
                  <p className="text-xs text-textColor/60">Cash offer</p>
                </div>
                {second_offer_paid ? (
                  <div className=" max-w-[120px] flex justify-center -mt-5 p-1 px-2 rounded-lg bg-green-600/20">
                    <p className="text-green-600 text-xs tracking-wide">Completed</p>
                  </div>
                ) : (
                  <div className=" max-w-[120px] flex justify-center -mt-5 p-1 px-2 rounded-lg bg-[#ffbd3d1a]">
                    <p className="text-[#FFBD3D] text-xs tracking-wide">pending</p>
                  </div>
                )}
              </div>
              {secondOffer ? (
                <MdOutlineKeyboardArrowUp
                  onClick={(e) => {
                    e.stopPropagation();
                    setSecondOffer(false);
                  }}
                  className="text-scudGreen"
                />
              ) : (
                <MdOutlineKeyboardArrowDown className="text-textColor/70" />
              )}
            </div>

            {secondOffer && (
              <div>
                <div className="my-3">
                  {" "}
                  <Divider />
                </div>

                <div className="justify-between space-y-4 md:space-y-0 flex-col md:flex-row flex items-center">
                  <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
                    <div className="bg-[#f2f5ff]  py-1 px-3 flex justify-center items-center rounded-md">
                      <p className=" text-xs">
                        Promo type: <b>{discount.type}</b>
                      </p>{" "}
                    </div>
                    <div className="bg-[#f2f5ff] py-1 px-3 flex justify-center items-center rounded-md">
                      <p className=" text-xs">
                        Offer type: <b>Rider Discount & Cash</b>
                      </p>{" "}
                    </div>
                    <div className="bg-[#f2f5ff] py-1 px-3 flex justify-center items-center rounded-md">
                      <p className=" text-xs">
                        Discount amount: <b>₦{discount.second_offer_total}</b>
                      </p>{" "}
                    </div>
                  </div>

                  <div
                    onClick={() => activateStage("second")}
                    className="bg-[#f2f5ff] py-1 min-w-[100px] flex justify-center items-center rounded-md"
                  >
                    <p className=" text-xs text-scudGreen">Pay</p>{" "}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* this is for third offer  */}

          <div
            onClick={() => setThirdOffer(!thirdOffer)}
            className={`mt-4 border ${
              thirdOffer ? " border-scudGreen" : ""
            } rounded-md p-2 md:p-2.5 `}
          >
            <div className=" flex justify-between items-center">
              <div className="flex space-x-2 md:space-x-3 items-center">
                <div
                  className={`w-10 h-10 flex justify-center ${
                    thirdOffer ? "bg-scudGreen" : "bg-[#f2f5ff]"
                  } items-center rounded-full  `}
                >
                  <BsTag className={` ${thirdOffer ? "text-white" : "text-scudGreen"} text-base`} />
                </div>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm text-title font-[500]">Third Offer Setting</p>
                  <p className="text-xs text-textColor/60">Ride discount</p>
                </div>
                {last_offer_active ? (
                  <div className=" max-w-[120px] flex justify-center -mt-5 p-1 px-2 rounded-lg bg-green-600/20">
                    <p className="text-green-600 text-xs tracking-wide">Completed</p>
                  </div>
                ) : (
                  <div className=" max-w-[120px] flex justify-center -mt-5 p-1 px-2 rounded-lg bg-[#ffbd3d1a]">
                    <p className="text-[#FFBD3D] text-xs tracking-wide">pending</p>
                  </div>
                )}
              </div>
              {thirdOffer ? (
                <MdOutlineKeyboardArrowUp
                  onClick={(e) => {
                    e.stopPropagation();
                    setThirdOffer(false);
                  }}
                  className="text-scudGreen"
                />
              ) : (
                <MdOutlineKeyboardArrowDown className="text-textColor/70" />
              )}
            </div>

            {thirdOffer && (
              <div>
                <div className="my-3">
                  {" "}
                  <Divider />
                </div>

                <div className=" ml-10">
                  <div className="flex space-x-10 mb-5">
                    <div>
                      <div className="flex space-x-1 mb-2 items-center">
                        <BsFacebook className="text-[#0333FF] text-xl" />
                        <p className="text-textColor text-sm">Facebook</p>
                      </div>
                      <div className="flex space-x-1 items-center">
                        <a href={facebook_link} className="text-textColor text-xs">
                          {facebook_link}
                        </a>
                        <div className="p-1 bg-[#f2f5ff] rounded-md">
                          <BsArrowUpRight className="text-textColor text-xs" />
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="flex space-x-1 mb-2 items-center">
                        <AiOutlineTwitter className="text-[#1D9BF0] text-xl" />
                        <p className="text-textColor text-sm">Twitter</p>
                      </div>
                      <div className="flex space-x-1 items-center">
                        <a href={twitter_link} className="text-textColor text-xs">
                          {twitter_link}
                        </a>
                        <div className="p-1 bg-[#f2f5ff] rounded-md">
                          <BsArrowUpRight className="text-textColor text-xs" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-10 mb-5">
                    <div>
                      <div className="flex space-x-1 mb-2 items-center">
                        <AiOutlineInstagram className="text-[#cf3480] text-xl" />
                        <p className="text-textColor text-sm">Instagram</p>
                      </div>
                      <div className="flex space-x-1 items-center">
                        <a href={instagram_link} className="text-textColor text-xs">
                          {instagram_link}
                        </a>
                        <div className="p-1 bg-[#f2f5ff] rounded-md">
                          <BsArrowUpRight className="text-textColor text-xs" />
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="flex space-x-1 mb-2 items-center">
                        <BsLinkedin className="text-[#0A66C2] text-base" />
                        <p className="text-textColor text-sm">LinkedIn</p>
                      </div>
                      <div className="flex space-x-1 items-center">
                        <a href={linkedin_link} className="text-textColor text-xs">
                          {linkedin_link}
                        </a>
                        <div className="p-1 bg-[#f2f5ff] rounded-md">
                          <BsArrowUpRight className="text-textColor text-xs" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="my-3">
                    {" "}
                    <Divider />
                  </div>

                  <div className="justify-between space-y-4 md:space-y-0 flex-col md:flex-row flex items-center">
                    <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
                      <div className="bg-[#f2f5ff]  py-1 px-3 flex justify-center items-center rounded-md">
                        <p className=" text-xs">
                          Promo type: <b>{discount.type}</b>
                        </p>{" "}
                      </div>
                      <div className="bg-[#f2f5ff] py-1 px-3 flex justify-center items-center rounded-md">
                        <p className=" text-xs">
                          Offer type: <b>Rider Discount & Cash</b>
                        </p>{" "}
                      </div>
                      <div className="bg-[#f2f5ff] py-1 px-3 flex justify-center items-center rounded-md">
                        <p className=" text-xs">
                          Discount amount: <b>{discount.last_stage_percentage}%</b>
                        </p>{" "}
                      </div>
                    </div>

                    <div
                      onClick={() => activateStage("last")}
                      className="bg-[#f2f5ff] py-1 min-w-[100px] flex justify-center items-center rounded-md"
                    >
                      <p className=" text-xs text-scudGreen">Activated</p>{" "}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      {/*this is for just cash offer or just discount offer*/}
      {discount.type !== "default" && (
        <div className="bg-white rounded-md border   py-4 px-4 md:px-6">
          <div className=" flex justify-between mb-4">
            {/*this can either be cash offer or car offer*/}
            <p className="text-sm  font-[600] text-title">{offerType}</p>
            <span className="">
              {!expired ? (
                <p className="md:text-sm text-xs">
                  Expires:{" "}
                  <b className="text-scudGreen ">
                    {days}days : {hours}hrs : {mins}mins
                  </b>
                </p>
              ) : (
                <p className="md:text-sm text-xs text-[#FF2D2D]">
                  Expired: <b className="text-textColor/40">{getTimeAgo(expirationDate)}</b>
                </p>
              )}
            </span>
          </div>

          <div className="md:max-w-[20rem]  mb-4 md:mb-6">
            {/* {offerType === "cash offer" && (
              <div className="flex justify-between items-center mb-3">
                <div className="flex space-x-2 items-center">
                  <div className="rounded-full p-1 flex justify-center items-center bg-[#fff8ec]">
                    <TbCurrencyNaira className="text-[#FFBD3D]" />
                  </div>
                  <p className="text-sm text-textColor">Amount</p>
                </div>
                <p className="text-sm text-title font-semibold mr-3">₦10,000</p>
              </div>
            )} */}

            {/* {discount.type !=='default' && ( */}
            <div className="flex justify-between items-center mb-3">
              <div className="flex space-x-2 items-center">
                <div className="rounded-full p-1 flex justify-center items-center bg-[#f2fbf6]">
                  <AiOutlinePercentage className="text-[#00AB4C]" />
                </div>
                <p className="text-sm text-textColor">Percentage</p>
              </div>
              <p className="text-sm text-title font-semibold mr-3">{discount.percentage}%</p>
            </div>
            {/*  )} */}

            <div className="flex justify-between items-center mb-3">
              <div className="flex space-x-2 items-center">
                <div className="rounded-full p-1 flex justify-center items-center bg-[#F2F5FF]">
                  <AiOutlineCar className="text-scudGreen" />
                </div>
                <p className="text-sm text-textColor">Number of trips</p>
              </div>
              <div className="flex space-x-1">
                <p className="text-sm text-title font-semibold">
                  {first_offer_trips}/{discount.no_of_trips}
                </p>
                <div className="p-1 bg-[#f2f5ff] rounded-md">
                  <BsArrowUpRight className="text-textColor text-xs" />
                </div>
              </div>
            </div>
            {/* {offerType === "cash offer" && (
              <div className="flex justify-between items-center mb-3">
                <div className="flex space-x-2 items-center">
                  <div className="rounded-full p-1 flex justify-center items-center bg-[#fff4f4]">
                    <TbCarOff className="text-red-600" />
                  </div>
                  <p className="text-sm text-textColor">Number of canceled trips</p>
                </div>
                <div className="flex space-x-1">
                  <p className="text-sm text-title font-semibold">20/20</p>
                  <div className="p-1 bg-[#f2f5ff] rounded-md">
                    <BsArrowUpRight className="text-textColor text-xs" />
                  </div>
                </div>
              </div>
            )} */}
            <div className="flex justify-between items-center mb-3">
              <div className="flex space-x-2 items-center">
                <MdOutlineAccessTime className="text-textColor text-sm ml-1" />

                <p className="text-sm text-textColor">{getTimeAgo(created_at)}</p>
              </div>
            </div>
          </div>

          <Divider />

          <div className="flex justify-between my-2">
            <div className="flex space-x-3">
              <div className="bg-[#f2f5ff] px-3 py-2 flex justify-center items-center rounded-md">
                <p className=" text-xs">
                  promo type: <b>{discount.type}</b>
                </p>{" "}
              </div>
              <div className="bg-[#f2f5ff] px-3 py-2  flex justify-center items-center rounded-md">
                <p className=" text-xs">
                  Offer type: <b>Discount</b>
                </p>{" "}
              </div>
              {offerType === "discount offer" && (
                <div className="bg-[#f2f5ff] px-3 py-2 flex justify-center items-center rounded-md">
                  <p className=" text-xs">
                    Discount: <b>{discount.percentage}%</b>
                  </p>{" "}
                </div>
              )}
            </div>
            {/* {offerType === "cash offer" && (
              <div className="flex space-x-3 items-center">
                {status == "completed" ? (
                  <div className=" max-w-[120px] flex justify-center p-1 rounded-lg bg-[#f2fbf6]">
                    <p className="text-green-600 text-xs">Completed</p>
                  </div>
                ) : status == "canceled" ? (
                  <div className=" max-w-[120px] p-1 rounded-lg bg-[#fff4f4]">
                    <p className="text-red-600 text-xs">Canceled</p>
                  </div>
                ) : (
                  <div className=" max-w-[120px] p-1 rounded-lg bg-[#F2F5FF]">
                    <p className="text-scudGreen text-xs">Ongoing</p>
                  </div>
                )}

                <div className="md:block hidden">
                  {" "}
                  <Button text={"Mark Winner"} />
                </div>
              </div>
            )} */}
          </div>

          {/* {offerType === "cash offer" && (
            <div className="md:hidden flex mt-4 item justify-end">
              {" "}
              <Button text={"Mark Winner"} />
            </div>
          )} */}
        </div>
      )}
    </div>
  );
};

progress_details.getLayout = Layout;
export default progress_details;

export async function getServerSideProps(context) {
  const token = context.req.cookies.adminAccessToken || "";
  const { user_id, discount_id } = context.query;
  const [discountRes] = await Promise.all([
    fetch(`${BASE_URL}discount-progress/${discount_id}/${user_id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    })
  ]);
  const [discountDetails] = await Promise.all([discountRes.json()]);

  if (discountDetails?.statusCode !== undefined && discountDetails?.statusCode === 401) {
    try {
      await validateToken(context, true);
    } catch (err) {
      return { redirect: { destination: `/admin/auth`, permanent: false } };
    }
  }

  return {
    props: {
      discountDetails
    }
  };
}
