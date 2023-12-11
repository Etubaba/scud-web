import React, { useState } from "react";
import { BsPerson, BsTelephone } from "react-icons/bs";
import { MdAccessTime, MdOutlineKeyboardArrowRight } from "react-icons/md";
import WithdrawerReqTrips from "./WithdrawerReqTrips";
import { getTimeAgo } from "../services/getTimeAgo";
import { useRouter } from "next/router";
import axios from "axios";
import { BASE_URL } from "../../api/base";
import Cookies from "js-cookie";
import { useSnackbar } from "notistack";
import Modal from "../common/Modal";
import { AiOutlineCar, AiOutlineCheckCircle } from "react-icons/ai";

const WithrawerCompo = ({ item, we_owe }) => {
  const { user, amount, created_at } = item;

  const { first_name, last_name, picture } = user;

  const [trips, setTrips] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const driver_name =
    first_name?.charAt(0).toUpperCase() +
    first_name?.slice(1) +
    " " +
    last_name?.charAt(0).toUpperCase() +
    last_name?.slice(1);

  const router = useRouter();

  const viewProfile = (e) => {
    e.stopPropagation();
    router.push({
      pathname: "/admin/driver_mgt/driver_profile",
      query: user.id
    });
  };

  const makePayment = async (e) => {
    e.stopPropagation();
    try {
      const token = Cookies.get("adminAccessToken");
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      axios.defaults.headers.get["Content-Type"] = "application/json";
      const { data } = await axios.patch(`${BASE_URL}withdrawal-requests/${user.id}`, {
        status: "approved"
      });
      if (data) {
        setSuccessModal(true);
      }
    } catch (err) {
      if (err.response) {
        const msg = err.response.data.message;
        if (typeof msg === "string") {
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
      } else {
        enqueueSnackbar(err.message, {
          variant: "error"
        });
      }
    }
  };

  return (
    <div onClick={() => setTrips(!trips)} className="bg-white border rounded-md mb-3">
      <div
        className={` flex ${
          ""
          //   trips ? " pb-4 border-x border-t rounded-t " : "border rounded-md"
        } md:flex-row flex-col py-3 px-4 md:justify-between `}
      >
        <div className="flex flex-col md:flex-row items-center md:space-x-2 ">
          <img
            alt=""
            className="w-16 h-16 md:mb-0 mb-2 md:w-10 md:h-10 rounded-full"
            src={picture === null || picture === undefined ? "/user.png" : picture}
          />
          <div className="md:justify-start mb-6 md:mb-0 md:items-start justify-center items-center flex flex-col">
            <p className="font-semibold mb-1 text-sm text-textColor">{driver_name}</p>
            <span
              onClick={(e) => viewProfile(e)}
              className="flex hover:text-scudGreen/70 space-x-1 text-scudGreen"
            >
              <BsPerson className="" />
              <p className="text-xs">View Profile</p>
            </span>
          </div>
        </div>
        <div className="flex flex-col md:flex-row md:space-x-20 md:items-center md:justify-between">
          <div className="flex items-center mb-4 md:mb-0 space-x-12">
            {we_owe ? (
              <div className="flex space-x-2 items-center">
                <AiOutlineCar className="text-scudGreen" />
                <p className="md:text-sm text-xs text-textColor font-thin">
                  {item?.no_of_trips} trips
                </p>
              </div>
            ) : (
              <div className="flex space-x-2 items-center">
                <BsTelephone className="text-scudGreen" />
                <p className="md:text-sm text-xs text-textColor font-thin">{item?.user?.phone}</p>
              </div>
            )}

            <div className="flex space-x-2">
              <p className="text-sm text-textColor/50">Amount :</p>
              <p className="text-textColor font-semibold text-sm">{amount}</p>
            </div>
          </div>
          <div className="flex space-x-4 justify-between md:justify-start items-center">
            <div className="flex space-x-0.5 text-textColor/50 ">
              <MdAccessTime />
              <p className="text-xs">{getTimeAgo(we_owe ? new Date() : created_at)}</p>
            </div>
            <button
              onClick={(e) => makePayment(e)}
              className="bg-scudGreen text-sm  rounded text-white py-1 px-4"
            >
              Paid
            </button>
          </div>
        </div>
      </div>
      {trips && (
        <div className="bg-white">
          <div className="border-t mx-4 pt-6  bg-white ">
            <div className="flex mb-4 justify-between">
              <p className="text-textColor/50 text-sm">Trips details</p>
              <button
                onClick={() => router.push("/admin/trips_mgt/trips")}
                className="flex px-2 py-1 text-scudGreen border rounded-md space-x-1 "
              >
                <p className="text-xs ">View all Trips</p>
                <MdOutlineKeyboardArrowRight className="text-sm mt-0.5" />
              </button>
            </div>

            {we_owe ? (
              <div>
                {item?.trips?.map((item, idx) => (
                  <WithdrawerReqTrips key={idx} item={item} />
                ))}
              </div>
            ) : (
              <div>
                {item?.unpaid?.map((item, idx) => (
                  <WithdrawerReqTrips key={idx} item={item} />
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      <Modal onClose={() => setSuccessModal(false)} open={successModal}>
        <div className=" w-[20rem] md:w-[24rem]  h-auto">
          <div className="flex flex-col space-y-3 justify-center items-center">
            <AiOutlineCheckCircle className="text-green-600 text-5xl" />
            <p className="text-lg font-semibold mt-2">Payment completed</p>
            <p className="text-sm text-center text-textColor mt-2">
              {driver_name} has been paid successfully.
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default WithrawerCompo;
