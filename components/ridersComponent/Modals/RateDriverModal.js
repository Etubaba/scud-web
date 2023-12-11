import axios from "axios";
import Cookies from "js-cookie";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { BsCash, BsCheckCircle } from "react-icons/bs";
import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../../../api/base";
import { setTripEnded } from "../../../features/bookRideSlice";
import Button from "../../common/Button";
import Modal from "../../common/Modal";
import Rating from "../../common/Rating";
import { getToken } from "../../services/refresh";

const RateDriverModal = ({ open }) => {
  const [showTrip, setShowTrip] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [showTextArea, setShowTextArea] = useState(false);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const paymentMethod = useSelector((state) => state.bookride.paymentMethod);
  const user = useSelector((state) => state.auth.userDetails);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const driver = useSelector((state) => state.bookride.connectedUser);
  const amountPaid = useSelector((state) => state.bookride.amountPaid);

  const dispatch = useDispatch();

  const onClose = () => {
    dispatch(setTripEnded(false));
  };

  const postReview = async () => {
    try {
      const token = Cookies.get("accessToken");
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      axios.defaults.headers.get["Content-Type"] = "application/json";
      const formData = {
        reviewer_id: user.id,
        reviewed_id: driver?.id,
        rating: rating,
        comment: review
      };

      review === "" ? delete formData.comment : null;

      const { data } = await axios.post(`${BASE_URL}reviews`, formData);

      if (data) {
        setSuccessModal(true);
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
  if (successModal) {
    return (
      <Modal
        onClose={() => {
          setSuccessModal(false);
        }}
        open={successModal}
      >
        <div className="justify-center mt-1 space-x-3 mr-12 flex items-center">
          <BsCheckCircle className="text-green-600" />
          <p>Review Sent</p>
        </div>
      </Modal>
    );
  }
  return (
    <Modal
      // congrat={true}
      onClose={onClose}
      open={open}
    >
      <div className="md:w-[20rem] w-[17rem] overflow-y-auto h-auto">
        <div className="flex flex-col  my-3 justify-center items-center">
          <AiOutlineCheckCircle className="text-green-600 text-5xl" />
          <p className="text-lg font-semibold my-1">Trip Ended </p>
          <div className="w-full">
            <div className="bg-adminbg  border-x flex items-center justify-between px-3 py-2  rounded-t-md border-[#E6EBFF] border-t">
              <span className="flex items-center space-x-1">
                <BsCash className="text-xs text-scudGreen" />
                <p className="text-[#1E202B] text-xs">{paymentMethod} payment</p>
              </span>
              <p className="text-xs text-[#1E202B] font-semibold ">₦{amountPaid}</p>
            </div>
            <div className="rounded-b-md border  px-3 py-2 border-b border-[#E6EBFF]">
              <div className="flex justify-between items-center">
                <p onClick={() => setShowTrip(!showTrip)} className="text-scudGreen text-xs">
                  Price break down
                </p>
                {!showTrip ? (
                  <MdOutlineKeyboardArrowDown
                    onClick={() => setShowTrip(!showTrip)}
                    className="text-scudGreen text-sm"
                  />
                ) : (
                  <MdOutlineKeyboardArrowUp
                    onClick={() => setShowTrip(!showTrip)}
                    className="text-scudGreen text-sm"
                  />
                )}
              </div>
              {showTrip && (
                <div className="space-y-1 mt-1">
                  <span className="flex justify-between items-center">
                    <p className="text-xs text-textColor">Trip fare</p>
                    <p className="text-xs text-textColor">2500</p>
                  </span>
                  <span className="flex justify-between items-center">
                    <p className="text-xs text-textColor">booking fee</p>
                    <p className="text-xs text-textColor">200</p>
                  </span>
                  <span className="flex justify-between items-center">
                    <p className="text-xs text-textColor">waiting time(0:59)</p>
                    <p className="text-xs text-textColor">300</p>
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className=" w-full my-2 rounded-md border border-[#E6EBFF] p-7 flex flex-col justify-center items-center">
            <img
              className="w-16 h-16 mb-2 rounded-full"
              src={
                driver?.picture === null || driver?.picture === undefined
                  ? "/user.png"
                  : driver?.picture
              }
            />
            <p className="font-semibold text-sm">Rate your ride with {}?</p>
            <p className="text-xs text-textColor/60 text-center">Let's know about your ride</p>

            <div className="mt-1">
              <Rating rating={rating} setRating={setRating} size="xl" />
            </div>
          </div>

          {showTextArea && (
            <div className="w-full">
              <textarea
                placeholder="Write your comment here"
                size="sm"
                onChange={(e) => setReview(e.target.value)}
                value={review}
                autosize
                className="placeholder:text-xs p-2 text-sm text-textColor mt-2 border rounded-md border-scudGreen outline-none w-full"
                minRows={5}
              />
            </div>
          )}

          {rating > 0 && (
            <div className="space-y-1 mt-1 w-full">
              {!showTextArea && (
                <Button
                  onClick={() => setShowTextArea(!showTextArea)}
                  style={"w-full"}
                  text={"Tell us about your trip or the driver"}
                  outline={true}
                />
              )}
              <Button
                style={"w-full"}
                text={"Done"}
                onClick={postReview}
                disabled={showTextArea && review === "" ? true : false}
              />
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default RateDriverModal;
