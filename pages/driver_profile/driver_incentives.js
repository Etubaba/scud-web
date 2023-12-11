import axios from "axios";
import Cookies from "js-cookie";
import { useSnackbar } from "notistack";
import React, { useEffect, useRef, useState } from "react";
import { AiOutlineCheckCircle, AiOutlineGift } from "react-icons/ai";
import { BsCalendar2Date, BsCashStack, BsCheck2Circle } from "react-icons/bs";
import { MdErrorOutline, MdOutlineCancel, MdOutlinePending } from "react-icons/md";
import { useSelector } from "react-redux";
import { BASE_URL } from "../../api/base";
import Button from "../../components/common/Button";
import { Loader } from "../../components/common/Loader";
import Modal from "../../components/common/Modal";
import TierComponent from "../../components/common/TierComponent";
import Layout from "../../components/driver_layout/Layout";
import { validateToken } from "../../components/services/validateToken";

const Incentives = ({ earnings }) => {
  const [currentTier, setCurrentTier] = useState(2);
  const [progress, setProgress] = useState("70%");

  const [openVerify, setOpenVerify] = useState(false);
  const [withdrawModal, setWithdrawModal] = useState(false); // modal state
  const [congratModal, setCongratModal] = useState(false); // modal state
  const [outline, setOutline] = useState(false);
  const [cancelRequest, setCancelRequest] = useState(false);
  const [loading, setLoading] = useState(false);

  const { balance } = earnings;

  const [amount, setAmount] = useState("");

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const url = `${BASE_URL}auth/login`;
  const user = useSelector((state) => state.auth.userDetails);

  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [actOTPindex, setActiveOTPindex] = useState(0);

  const inputRef = useRef(null);

  //auto move to the next verification input in verification modal
  useEffect(() => {
    inputRef.current?.focus();
  }, [actOTPindex]);

  const offer =
    currentTier === 1
      ? "25 Trips/7 days to earn N1000"
      : currentTier === 2
      ? "35 Trips/10 days to earn N2500"
      : "50 Trips/15 days to earn N5000";

  const iconbg =
    currentTier === 1 ? "bg-[#FFBD3D]" : currentTier === 2 ? "bg-scudGreen" : "bg-green-600";

  const textcolor =
    currentTier === 1 ? "text-[#FFBD3D]" : currentTier === 2 ? "text-scudGreen" : "text-green-600";

  const progressColor =
    currentTier === 1 ? "bg-[#FFBD3D]" : currentTier === 2 ? "bg-scudGreen" : "bg-green-600";

  const tooltipborder =
    currentTier === 1
      ? "border-[#FFBD3D]"
      : currentTier === 2
      ? "border-scudGreen"
      : "border-green-600";

  const sendOtp = async () => {
    try {
      const { data } = await axios.post(url, {
        phone: user.phone,
        provider: "phone"
      });
      if (data) {
        enqueueSnackbar("OTP sent Successfully.", {
          variant: "success"
        });
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
      }
    }
  };

  const makeWithdrawerRequest = async () => {
    const token = Cookies.get("accessToken");
    axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    axios.defaults.headers.get["Content-Type"] = "application/json";
    try {
      const { data } = await axios.post(`${BASE_URL}payments/withdrawal-requests`, {
        amount: +amount
      });
      if (data) {
        setCongratModal(true);
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

  const verifyOtp = async (otp) => {
    setLoading(true);
    try {
      const { data } = await axios.post(url, {
        phone: user.phone,
        otp,
        provider: "phone"
      });
      if (data) {
        makeWithdrawerRequest();
        enqueueSnackbar("Verification Completed.", {
          variant: "success"
        });
        setLoading(false);
        setOtp(new Array(6).fill(""));
      }
    } catch (err) {
      setOtp(new Array(6).fill(""));
      setLoading(false);
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
      }
    }
  };

  const handleOnChange = ({ target: { value } }, index) => {
    const newOTP = [...otp];
    newOTP[index] = value.substring(value.length - 1);
    setOtp(newOTP);

    if (value === "") setActiveOTPindex(index - 1);
    else setActiveOTPindex(index + 1);

    if (actOTPindex === 5) {
      const otpCode = newOTP.join("");
      verifyOtp(otpCode);
    }
  };

  return (
    <div>
      <div className="md:mb-10 mb-5">
        <p className="font-semibold text-base md:text-lg tracking-wide"> Incentives </p>
        <p className="md:text-sm text-xs mt-2 tracking-wide text-textColor">
          You will receive <b>FREE</b> cash after completing the tasks assigned to each of the
          different Tiers
        </p>
      </div>

      <div className="w-full grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 gap-4 mb-10">
        <TierComponent
          color={"yellow"}
          task={"Complete 25 trips in 7 days to earn N1000"}
          note={
            " if you complete at least 80% daily, you will be paid the said amount for that day,"
          }
          level={1}
          active={true}
        />
        <TierComponent
          color={""}
          task={"Complete 35 trips in 10 days to earn N2500"}
          note={
            "if you complete at least 80% daily, you will be paid the said amount for that day,"
          }
          level={2}
          active={false}
        />
        <TierComponent
          color={"green"}
          task={"Complete 50 trips in 15 days to earn N5000"}
          note={
            "if you complete at least 80% daily, you will be paid the said amount for that day,"
          }
          level={3}
          active={false}
        />
      </div>

      <div className="w-full ">
        <p className="text-sm mb-3 tracking-wider font-semibold">Current Tier Level</p>

        <div className="h-72 bg-white md:shadow md:p-4 space-y-5 md:space-y-0 flex flex-col md:flex-row md:space-x-4 w-full md:border md:rounded-xl">
          {/* showing currentTier Level */}
          <div className="md:w-2/3 shadow rounded-md md:rounded-none p-2 md:shadow-none w-full h-full">
            <div className={`flex items-center mb-20  justify-between`}>
              <div className="flex space-x-3 justify-center items-center">
                <div
                  className={`${iconbg} p-3 flex justify-center items-center rounded-full text-white`}
                >
                  <AiOutlineGift className="text-xl " />
                </div>
                <p className={`${textcolor} `}>Tier {currentTier}</p>
              </div>

              <p className="text-textColor text-xs">{offer}</p>
            </div>

            {/* progress bar  percentage div */}

            <div className={`w-full mb-10 h-10 ${progressColor}/10 rounded-md`}>
              <div
                className={`h-full flex justify-end items-end ${progressColor} rounded-l-md`}
                style={{ width: progress }}
              >
                <div
                  className={`bg-white z-30 border shadow-xl relative left-12 rounded-md mb-16 -ml-[20%]  p-1 ${tooltipborder} `}
                >
                  <p className="text-sm  ">
                    <b>{progress}</b> Completed
                  </p>
                </div>
                <div className={`border-r relative left-[0.01rem] mb-8 h-8 ${tooltipborder}`} />
              </div>
            </div>

            {/* trip count */}
            <div className="flex justify-between">
              <div className="flex-col flex space-y-2">
                <div className="flex ">
                  <div className=" h-5 w-5 flex justify-center items-center  mr-1 bg-green-600/10 rounded-full">
                    {" "}
                    <AiOutlineCheckCircle className="text-green-600 " />
                  </div>

                  <p className="text-textColor mt-1 md:mt-0 text-[10px] md:text-sm ">
                    Trips Completed
                  </p>
                </div>
                <p className="md:text-lg text-sm md:font-medium">24 trips</p>
              </div>
              <div className="flex-col flex space-y-2">
                <div className="flex ">
                  <div className=" h-5 w-5 flex justify-center items-center  mr-1 bg-red-600/10 rounded-full">
                    {" "}
                    <MdOutlinePending className="text-red-600 " />
                  </div>

                  <p className="text-textColor mt-1 md:mt-0  text-[10px] md:text-sm ">
                    Trips Remaining
                  </p>
                </div>
                <p className="md:text-lg text-sm md:font-medium">5 trips</p>
              </div>
              <div className="flex-col flex space-y-2">
                <div className="flex ">
                  <div className=" h-5 w-5 flex justify-center items-center  mr-1 bg-blue-600/10 rounded-full">
                    {" "}
                    <BsCalendar2Date className="text-blue-600  text-xs" />
                  </div>

                  <p className="text-textColor mt-1 md:mt-0  text-[10px] md:text-sm ">
                    Trips Completed
                  </p>
                </div>
                <p className="md:text-lg text-sm textcenter md:font-medium">24 trips</p>
              </div>
            </div>
          </div>

          {/* Balance div */}
          <div className="md:w-1/3 w-full bg-[url(/withdraw.svg)]  p-4 flex flex-col justify-center items-center rounded-md bg-cotain bg-no-repeat h-full">
            <div className="flex flex-col space-y-4 my-8 justify-center items-center">
              <span className="flex space-x-1">
                <sub className="text-lg">₦</sub>
                <p className="text-4xl font-semibold">{balance}</p>
              </span>
              <p className="text-sm text-textColor">Current Balance</p>
            </div>

            {cancelRequest && (
              <p className=" text-[#ff2d2d] mb-5 text-[10px] md:text-xs">
                You can cancel your withdrawal request within 60min
              </p>
            )}

            {cancelRequest ? (
              <button className="w-full space-x-2 py-2 flex bg-[#ff2d2d] text-white items-center justify-center rounded-lg">
                <MdOutlineCancel className="" />
                <p>Cancel Withdrawal Request</p>
              </button>
            ) : (
              <Button
                disabled={balance == 0 ? true : false}
                onClick={() => setWithdrawModal(true)}
                SocialIcon={BsCashStack}
                social={true}
                style={"w-full flex justify-center items-center"}
                text={"Request A withdrawer"}
              />
            )}
          </div>
        </div>
      </div>
      <div className="h-64 md:h-5"></div>

      {/* withdrawal modal start here */}
      <Modal open={withdrawModal} onClose={() => setWithdrawModal(false)}>
        <div className="md:w-[24rem]  h-auto">
          <p className=" text-center font-semibold md:text-left ">Withdrawal Request</p>
          <div className="border-b my-4" />
          <div className="flex flex-col space-y-4">
            <p className="text-sm text-textColor">Enter Amount</p>
            <div
              className={`border rounded-md py-1 px-2 flex  ${outline ? "border-scudGreen" : ""}`}
            >
              <p className="text-xl">₦</p>
              <input
                onBlur={() => setOutline(false)}
                onFocus={() => setOutline(true)}
                onChange={(e) => setAmount(e.target.value)}
                type="text"
                className=" outline-none w-full -mt-0.5 rounded-md px-2 py-1"
              />
              <div className="bg-[#F2F5FF] hover:bg-blue-100 rounded-md px-2 py-1">
                <p className="text-scudGreen text-sm">All</p>
              </div>
            </div>
          </div>
          <div className="flex justify-between mt-4">
            <button
              onClick={() => setWithdrawModal(false)}
              className="bg-white border hover:bg-slate-50 px-4 py-1 rounded-md text-sm font-semibold text-textColor mr-2"
            >
              Cancel
            </button>
            <Button
              disabled={amount === "" ? true : false}
              onClick={() => {
                sendOtp();
                setWithdrawModal(false);
                setOpenVerify(true);
              }}
              text={"Send Request"}
            />
          </div>
        </div>
      </Modal>
      {/* Congratulation modal  */}
      <Modal onClose={() => setCongratModal(false)} open={congratModal}>
        <div className="md:w-[24rem] w-[16rem]   h-auto">
          <div className="flex flex-col space-y-3  justify-center items-center">
            <BsCheck2Circle className="text-green-600 text-5xl" />
            <p className="md:text-lg text- font-semibold mt-2">Request Sent Successfully</p>
            <p className="text-sm text-center text-textColor mt-2">
              Your withdrawal request has been sent, this would take us 3 hours to review and
              process
            </p>
          </div>
        </div>
      </Modal>

      {/* verification modal   */}
      <Modal open={openVerify} onClose={() => setOpenVerify(false)}>
        <div className="w-[18rem] md:w-[24rem]  h-auto">
          <p className=" text-center font-semibold md:text-left ">Account Verification</p>
          <div className="border-b my-4" />
          <div className="flex mb-6 justify-center items-center rounded-md bg-red-600/10 px-2 py-1 space-x-2">
            <MdErrorOutline className=" text-red-600 text-sm" />
            <p className="text-red-600/80 text-xs">
              We want to be sure this bank account details belongs to you
            </p>
          </div>
          <div className="justify-center items-center flex">
            <p className="text-center max-w-[200px] font-[550] text-sm text-textColor">
              Enter the 4-digit code sent to your mobile device
            </p>
          </div>

          <div className="flex  space-x-2 items-center justify-center md:px-7 md:py-6 p-2">
            {otp.map((_, idx) => (
              <React.Fragment key={idx}>
                <input
                  onChange={(e) => handleOnChange(e, idx)}
                  className=" border spin-button-none h-8 w-8 md:h-12 md:w-12  text-center form-control rounded-md focus:border-scudGreen focus:outline-none focus:ring-1 focus:ring-scudGreen focus:ring-opacity-5"
                  type="number"
                  maxlength="1"
                  ref={idx === actOTPindex ? inputRef : null}
                  value={otp[idx]}
                />
              </React.Fragment>
            ))}
          </div>

          <span className="text-sm space-x-3 flex text-center text-textColor">
            <p>Didn't receive a code ?</p>{" "}
            {loading ? (
              <Loader />
            ) : (
              <b onClick={sendOtp} className="text-scudGreen">
                Resend
              </b>
            )}
          </span>
        </div>
      </Modal>

      {/* success modal */}

      <Modal onClose={() => setCongratModal(false)} open={congratModal}>
        <div className=" w-[20rem] md:w-[24rem]  h-auto">
          <div className="flex flex-col space-y-3 justify-center items-center">
            <AiOutlineCheckCircle className="text-green-600 text-5xl" />
            <p className="text-lg font-semibold mt-2">Request Sent</p>
            <p className="text-sm text-center text-textColor mt-2">
              Your request has been sent successfully successfully.
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
};
Incentives.getLayout = Layout;
export default Incentives;

export async function getServerSideProps(context) {
  const token = context.req.cookies.accessToken || "";
  const res = await fetch(`${BASE_URL}earnings`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  });

  const earnings = await res.json();

  if (earnings?.statusCode !== undefined && earnings?.statusCode === 401) {
    try {
      await validateToken(context);
    } catch (err) {
      return { redirect: { destination: `/signin/driver-signin`, permanent: false } };
    }
  }

  return {
    props: {
      earnings
    }
  };
}
