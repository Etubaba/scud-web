import React, { useState } from "react";
import { BsWallet2 } from "react-icons/bs";
import Button from "../../components/common/Button";
import DashboardCompo from "../../components/common/DashboardCompo";
import Select from "../../components/common/Select";
import Layout from "../../components/driver_layout/Layout";
import Earnchart from "../../components/EarningsComponent/Earnchart";
import Earnstats from "../../components/EarningsComponent/Earnstats";
import { BASE_URL } from "../../api/base";
import axios from "axios";
import { useRef } from "react";
import { useSnackbar } from "notistack";
import { Loader } from "../../components/common/Loader";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { getToken } from "../../components/services/refresh";
import Modal from "../../components/common/Modal";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { MdErrorOutline } from "react-icons/md";
import { validateToken } from "../../components/services/validateToken";

const Earnings = ({ earnings }) => {
  const [datevalue, setDateValue] = useState("Select");
  const [outline, setOutline] = useState(false);
  const [openVerify, setOpenVerify] = useState(false);
  const [loading, setLoading] = useState(false);
  const [withdrawModal, setWithdrawModal] = useState(false);
  const [congratModal, setCongratModal] = useState(false);

  const { balance, earnings: earningsArr, net_earnings } = earnings;

  const minimum_withdrawer = 1000;

  const [amount, setAmount] = useState("");

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const dept = (money) => {
    if (Math.sign(money) === 1) return 0;
    else return money * -1;
  };
  const url = `${BASE_URL}auth/login`;
  const user = useSelector((state) => state.auth.userDetails);

  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [actOTPindex, setActiveOTPindex] = useState(0);

  const inputRef = useRef(null);

  //auto move to the next verification input in verification modal
  useEffect(() => {
    inputRef.current?.focus();
  }, [actOTPindex]);

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
            await getToken();
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
        provider: "phone",
        otp
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
      {/* first section from the top ############################################### */}
      <div className="md:flex   mb-10 justify-between items-center">
        <div>
          <p className="text-lg tracking-wider text-title font-semibold">Earnings</p>
          <p className="text-sm tracking-wider text-textColor">A Summary of earnings</p>
        </div>
        <div className="flex  md:flex-row space-y-4 flex-col-reverse justify-center items-center md:space-y-0 md:space-x-2 ">
          <Button
            disabled={balance <= 0 ? true : false}
            onClick={() => {
              if (balance >= minimum_withdrawer) {
                setWithdrawModal(true);
              } else {
                enqueueSnackbar("You balance is below minimum withdrawer amount", {
                  variant: "error"
                });
              }
            }}
            custom={"px-2.5 w-full md:min-w-[150px] mt-5 md:mt-0 py-1.5"}
            text={"Withdraw request"}
          />

          <Select
            position={"md:right-0.5 "}
            value={datevalue}
            setValue={setDateValue}
            dateSelect={true}
          />
        </div>
      </div>

      {/* second section from the top with indicators ############################################### */}
      <div className="w-full space-y-3 md:space-y-0 md:flex md:space-x-4 my-10">
        <DashboardCompo value={`₦${balance}`} title="Balance" color="" Icon={BsWallet2} />
        <DashboardCompo
          value={`₦${net_earnings}`}
          title="Net Earning"
          color="green"
          Icon={BsWallet2}
        />
        <DashboardCompo
          value={`₦${dept(balance)}`}
          title="What You Owed"
          color="red"
          Icon={BsWallet2}
        />
      </div>

      {/* Chart and earning section ################################################################ */}
      <div className="md:flex md:space-x-4 w-full  pb-5">
        <div className="w-full ">
          <p className="text-lg mb-3 tracking-wider font-semibold">Earnings</p>

          <div className=" border shadow-sm w-full p-4 rounded-lg h-4/5">
            <Earnchart earnings={earningsArr} />
          </div>
        </div>

        <div className="w-full">
          <p className="text-lg mb-3 tracking-wider font-semibold">Owing</p>
          <div className="border flex flex-col justify-center items-center shadow-sm p-4 bg-no-repeat bg-cover w-full rounded-lg h-4/5">
            <Earnstats earnings={earnings} />
            <div className="flex justify-between w-4/5">
              <div className="flex">
                <span className="w-1 h-2.5 rounded-md mt-1 mx-1 bg-scudGreen"></span>
                <p className="text-sm font-semibold text-[#9E9FA3]">What you earn</p>
              </div>
              <div className="flex">
                <span className="w-1 h-2.5 rounded-md mt-1 mx-1 bg-red-500"></span>
                <p className="text-sm font-semibold text-[#9E9FA3]">What you owe</p>
              </div>
            </div>
          </div>
        </div>
      </div>
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
                value={amount}
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

      {/* verification modal   */}
      <Modal open={openVerify} onClose={() => setOpenVerify(false)}>
        <div className="w-[18rem] md:w-[24rem]  h-auto">
          <p className=" text-center font-semibold md:text-left ">Account Verification</p>
          <div className="border-b my-4" />
          <div className="flex mb-6 justify-center items-center rounded-md bg-red-600/10 px-2 py-1 space-x-2">
            <MdErrorOutline className=" text-red-600 text-sm" />
            <p className="text-red-600/80 text-xs">
              We want to be sure this account belongs to you
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

      <Modal onClose={() => setCongratModal(false)} open={congratModal}>
        <div className=" w-[20rem] md:w-[24rem]  h-auto">
          <div className="flex flex-col space-y-3 justify-center items-center">
            <AiOutlineCheckCircle className="text-green-600 text-5xl" />
            <p className="text-lg font-semibold mt-2">Request Sent</p>
            <p className="text-sm text-center text-textColor mt-2">
              Your request has been sent successfully, and it is awaiting approver.
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
};
Earnings.getLayout = Layout;
export default Earnings;

export async function getServerSideProps(context) {
  const token = context.req.cookies.accessToken || "";
  const res = await fetch(`${BASE_URL}payments/earnings`, {
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
