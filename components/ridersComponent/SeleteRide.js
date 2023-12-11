import React, { useCallback, useEffect, useReducer, useState } from "react";
import {
  BsCash,
  BsChevronDown,
  BsStar,
  BsClock,
  BsChatDots,
  BsCreditCard2Back
} from "react-icons/bs";
import { MdOutlineAccountBalanceWallet } from "react-icons/md";
import { RiCheckboxBlankCircleLine } from "react-icons/ri";
import Button from "../common/Button";
import ChatDriver from "./Modals/ChatDriver";
import CancelModal from "./Modals/CancelModal";
import LoadingModal from "./Modals/LoadingModal";
import RateDriverModal from "./Modals/RateDriverModal";
import { useDispatch, useSelector } from "react-redux";
import {
  handleLoadingModal,
  handlePaymentMethod,
  handleReasonModal,
  handleVehicleTypeId,
  setAmountPaid
} from "../../features/bookRideSlice";
import axios from "axios";
import Cookies from "js-cookie";
import { BASE_URL } from "../../api/base";
import PriceCalculator from "./PriceCalculator";

const SeleteRide = ({ rideRequest, cancelRideRequest }) => {
  const [ride, setRide] = useState("");
  const [open, setOpen] = useState(false);
  // const [paymentMethod, setPaymentMethod] = useState("Cash");
  const [type, setType] = useState("select ride");

  const [waitingTime, setWaitTime] = useState(0);
  const [chatdriver, setChatDriver] = useState(false);

  const [isDriverFound, setIsDriverFound] = useState(false);

  //to be updated
  const [paidWaiting, setPaidWaiting] = useState(false);
  const [event, updateEvent] = useReducer(
    (prev, next) => {
      const newEvent = { ...prev, ...next };
      return newEvent;
    },
    { counts: waitingTime * 60, hidden: false }
  );

  const paymentMethod = useSelector((state) => state.bookride.paymentMethod);
  const driver = useSelector((state) => state.bookride.connectedUser);

  const hasDriverArrivered = useSelector((state) => state.bookride.driverArrived);

  const hasTripStarted = useSelector((state) => state.bookride.tripStarted);
  const vehicleType = useSelector((state) => state.bookride.vehicleType);

  const loadingModal = useSelector((state) => state.bookride.loadingModal);
  const reasonModal = useSelector((state) => state.bookride.reasonModal);

  const center = useSelector((state) => state.scud.origin);
  const destination = useSelector((state) => state.scud.destination);
  const vehicleTypeId = useSelector((state) => state.bookride.vehicleTypeId);
  const [calculatedPrice, setCalculatedPrice] = useState("");
  const data = ["Cash", "Card"];
  //get waiting time
  const getWaitingTime = async (id) => {
    try {
      const token = Cookies.get("accessToken");
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      axios.defaults.headers.get["Content-Type"] = "application/json";

      const { data } = await axios.post(BASE_URL + "fare/calculate", {
        pickup: {
          longitude: center.lng,
          latitude: center.lat
        },
        destination: {
          longitude: destination.lng,
          latitude: destination.lat
        },
        vehicle_type_id: id
      });
      if (data) {
        // console.log(data);
        setWaitTime(data.price.base.waiting_time_limit);
        setCalculatedPrice(data.price.price);
        dispatch(setAmountPaid(data.price.price));
      }
    } catch (err) {
      console.log(err);
    }
  };

  // console.log("waiting", waitingTime);

  // count down function for waiting time limit #################
  const handleCount = async () => {
    if (event.counts > waitingTime * 60) updateEvent({ hidden: true });
    updateEvent({ counts: event.counts-- });
    let decri = setInterval(() => {
      updateEvent({ counts: event.counts-- });
      event.counts === -2
        ? updateEvent({ counts: waitingTime * 60, hidden: false }) & clearInterval(decri)
        : null;
    }, 1000);
    setTimeout(() => setPaidWaiting(true), waitingTime * 60 * 1000);
  };

  // return price

  const dispatch = useDispatch();

  useEffect(() => {
    if (driver === null) return;
    setType("confirm");
    setIsDriverFound(true);
    setTimeout(() => dispatch(handleLoadingModal(false)), 3000);
  }, [driver]);

  const title = hasDriverArrivered
    ? "Driver has arrived"
    : hasTripStarted
    ? "Driving to destination"
    : "Select Ride";

  // const countStart = useCallback(() => , [hasDriverArrivered]);

  useEffect(() => {
    if (hasDriverArrivered) {
      handleCount();
    }
  }, [hasDriverArrivered]);

  return (
    <>
      <div className=" md:w-[60%] w-[95%]  fixed  bottom-2 shadow-lg ">
        {hasDriverArrivered && (
          <div
            // onAbort={()=>}
            className={` md:w-[60%] p-0.5 space-x-3 w-[95%] ${
              paidWaiting ? "bg-[#FF2D2D]" : "bg-[#00AB4C]"
            }  flex items-center justify-center fixed rounded-t-md `}
          >
            {" "}
            <img className="w-3 h-3 " src="/waiting.png" />
            {paidWaiting ? (
              <p className="text-white text-xs">Paid waiting time: 59 </p>
            ) : (
              <p className="text-white text-xs">Free waiting time until: {event.counts}s</p>
            )}
          </div>
        )}

        <div
          className={`bg-white  py-6 px-4 md:px-8 ${
            hasDriverArrivered ? "rounded-b-md " : "rounded"
          }`}
        >
          <div className="md:w-[57%] w-full mb-5 flex justify-between items-center">
            <div
              onClick={() => setOpen(!open)}
              className="flex justify-center cursor-pointer hover:bg-adminbg  hover:rounded space-x-5 items-center"
            >
              <div className="flex justify-between space-x-2 items-center">
                {paymentMethod === "Cash" ? (
                  <BsCash className="text-scudGreen" />
                ) : paymentMethod === "Card" ? (
                  <BsCreditCard2Back className="text-scudGreen" />
                ) : (
                  <MdOutlineAccountBalanceWallet className="text-scudGreen" />
                )}
                <p className="text-xs text-textColor">{paymentMethod}</p>
              </div>
              <BsChevronDown className="text-sm text-textColor" />

              {/* 
            {open && <div></div>} */}
              {/* <p className="font-semibold  text-sm">SELECT RIDE</p> */}
            </div>

            {open && (
              <div className="absolute p-2 w-[6rem] mt-[7rem] bg-white rounded border transition duration-300 ease-in  shadow-lg">
                {data.map((item, index) => (
                  <div className="flex mr-1">
                    {item === "Cash" ? (
                      <BsCash className="text-scudGreen" />
                    ) : item === "Card" ? (
                      <BsCreditCard2Back className="text-scudGreen" />
                    ) : (
                      <MdOutlineAccountBalanceWallet className="text-scudGreen" />
                    )}
                    <p
                      onClick={() => {
                        dispatch(handlePaymentMethod(item));
                        setOpen(false);
                      }}
                      key={index}
                      className="flex hover:bg-adminbg text-textColor -mt-1 items-center text-xs px-2 rounded-md py-1"
                    >
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            )}

            <p className="font-semibold  text-sm">{title}</p>
          </div>

          {type === "select ride" ? (
            <div className="flex w-full mb-4 space-x-3 md:space-x-6 justify-center items-center">
              {vehicleType?.map((type, idx) => (
                <div key={idx}>
                  {}
                  <span
                    onClick={() => {
                      dispatch(handleVehicleTypeId(type.id));
                      setRide(type.name);
                      getWaitingTime(type.id);
                    }}
                    className="flex justify-center mb-3 items-center space-x-2"
                  >
                    <RiCheckboxBlankCircleLine
                      className={`text-sm ${
                        ride === type.name ? "text-scudGreen" : "text-textColor/50"
                      } `}
                    />
                    <p
                      className={` md:text-base text-sm ${
                        ride === type.name ? "text-scudGreen" : "text-textColor/50"
                      }`}
                    >
                      {type.name}
                    </p>
                  </span>
                  <div
                    onClick={() => {
                      dispatch(handleVehicleTypeId(type.id));

                      setRide(type.name);

                      getWaitingTime(type.id);
                    }}
                    className={` ${
                      ride === type.name ? "border-scudGreen" : ""
                    }  flex space-x-5 px-5 md:px-6 justify-around p-0.5 md:py-2  border rounded-lg bg-adminbg `}
                  >
                    <img src="/corola.png" className=" mt-2 h-10 w-14 md:w-16" alt="" />
                    <div className="mt-2">
                      <PriceCalculator id={type.id} />
                      <p className="text-textColor text-[8px] md:text-xs">3 minutes</p>
                    </div>
                  </div>
                </div>
              ))}
              {/* <div>
                <span
                  onClick={() => setRide("premium")}
                  className="flex justify-center mb-3 items-center space-x-2"
                >
                  <BsStar
                    className={`text-sm ${
                      ride === "premium" ? "text-scudGreen" : "text-textColor/50"
                    } `}
                  />
                  <p className={ride === "premium" ? "text-scudGreen" : "text-textColor/50"}>
                    Premuim
                  </p>
                </span>
                <div
                  onClick={() => setRide("premium")}
                  className={` ${
                    ride === "premium" ? "border-scudGreen" : ""
                  }  flex space-x-5 px-5 md:px-6 justify-around md:py-2  border rounded-lg bg-adminbg `}
                >
                  <img src="/corola.png" className="mt-2 h-10 w-14 md:w-16" alt="" />
                  <div className="mt-2">
                    <p className="font-semibold text-sm md:text-base">₦4500</p>
                    <p className="text-textColor text-[8px] text-xs">1 minutes</p>
                  </div>
                </div>
              </div> */}
            </div>
          ) : (
            <div className="w-full mb-6">
              <div className="w-full  flex justify-between items-center">
                <span className="flex space-x-2 items-center">
                  {ride === "standard" ? (
                    <RiCheckboxBlankCircleLine className="text-sm text-scudGreen" />
                  ) : (
                    <BsStar className="text-sm text-scudGreen" />
                  )}
                  <p className="text-scudGreen">{ride}</p>
                </span>

                <span className="flex space-x-2">
                  <BsClock className="text-sm text-scudGreen" />
                  <p className="text-textColor text-[8px] text-xs">3 minutes</p>
                </span>
              </div>
              <div className="flex justify-between items-center px-3 md:px-5 py-3 w-full border rounded-lg bg-adminbg">
                <div className="flex justify-center items-center">
                  <img
                    src={
                      driver?.picture === null || driver?.picture === undefined
                        ? "/user.png"
                        : driver?.picture
                    }
                    alt=" "
                    className="md:w-12 md:h-12 mr-1 h-8 w-8 rounded-full"
                  />
                  <p className="text-xs md:text-base">
                    {" "}
                    {driver?.first_name?.charAt(0).toUpperCase() +
                      driver?.first_name?.slice(1) +
                      " " +
                      driver?.last_name?.charAt(0).toUpperCase() +
                      driver?.last_name?.slice(1)}
                  </p>
                </div>

                <div className="flex justify-center items-center space-x-1 md:space-x-6">
                  <img src="/corola.png" className=" w-14   md:w-16 h-10" alt="" />
                  <p className="text-textColor text-xs md:text-sm">
                    {driver === null
                      ? null
                      : driver?.vehicles[0]?.vehicle_brand.name + " " + driver?.vehicles[0]?.model}
                  </p>
                  <p className="text-textColor text-xs md:text-sm">
                    {driver === null ? null : driver?.vehicles[0]?.color}
                  </p>
                </div>

                <p className="text-scudGreen text-sm md:text-base font-semibold">
                  ₦{calculatedPrice}
                </p>
              </div>
            </div>
          )}

          {type === "select ride" ? (
            <Button
              onClick={() => {
                // setType("confirm ride");
                rideRequest();
                dispatch(handleLoadingModal(true));
              }}
              style={"w-full"}
              text={"Select Ride"}
              disabled={ride !== "" ? false : true}
            />
          ) : (
            <div className="flex space-x-2 md:space-x-6 items-center justify-between">
              <button
                onClick={() => {
                  dispatch(handleReasonModal(true));
                }}
                className="w-full p-1 md:py-2 text-red-600 border border-red-600 rounded-md"
              >
                Cancel Ride
              </button>
              <Button
                onClick={() => {
                  setChatDriver(true);
                }}
                style={"w-full  justify-center items-center"}
                text={"Message Driver"}
                social={true}
                SocialIcon={BsChatDots}
              />
            </div>
          )}
        </div>

        {/* Loading state modal   ########################################################### */}
        <LoadingModal
          driverFound={isDriverFound}
          open={loadingModal}
          onClose={() => dispatch(handleLoadingModal(false))}
        />

        {/* cancelation modal  ########################################################## */}
        <CancelModal
          cancelRideRequest={cancelRideRequest}
          open={reasonModal}
          onClose={() => dispatch(handleReasonModal(false))}
        />

        {/* chat modal #################################################### */}
        <ChatDriver open={chatdriver} onClose={() => setChatDriver(false)} />
      </div>
    </>
  );
};

export default SeleteRide;
