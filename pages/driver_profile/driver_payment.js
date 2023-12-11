import React, { useEffect, useRef, useState } from "react";
import Layout from "../../components/driver_layout/Layout";
import { AiOutlineBank, AiOutlineCheckCircle, AiOutlinePlus } from "react-icons/ai";
import Button from "../../components/common/Button";
import Modal from "../../components/common/Modal";
import { MdErrorOutline } from "react-icons/md";
import Select from "../../components/common/Select";
// import { banks, bankDetails } from '../../dummy';
import { BiEdit } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useRouter } from "next/router";
import { BASE_URL } from "../../api/base";
import { useDispatch, useSelector } from "react-redux";
import { editUserBankDetails } from "../../features/editSlice";
import { getToken } from "../../components/services/refresh";
import Cookies from "js-cookie";
import axios from "axios";
import { useSnackbar } from "notistack";
import { GetBrandName } from "../admin/driver_mgt/document_details";
import { validateToken } from "../../components/services/validateToken";

function Payment({ data }) {
  const [deleteModal, setDeleteModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [details_id, setDetails_id] = useState(null);

  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [actOTPindex, setActiveOTPindex] = useState(0);
  const [openVerify, setOpenVerify] = useState(false);

  const router = useRouter();
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const user = useSelector((state) => state.auth.userDetails);

  const bankDetails = data == null ? [] : [data];

  console.log(bankDetails);

  const url = `${BASE_URL}auth/login`;

  //refresh serverside fetching
  const refreshData = () => {
    router.replace(router.asPath);
  };

  //move from one button to another
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

  const deleteAccountDetails = async () => {
    try {
      const token = Cookies.get("accessToken");
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      axios.defaults.headers.get["Content-Type"] = "application/json";

      const { data } = await axios.delete(`${BASE_URL}payments/bank-accounts/${details_id}`);
      if (data) {
        setSuccessModal(true);
        refreshData();
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
    try {
      const { data } = await axios.post(url, {
        phone: user.phone,
        provider: "phone",
        otp
      });
      if (data) {
        deleteAccountDetails();
        enqueueSnackbar("Verification Completed.", {
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

  if (successModal) {
    setTimeout(() => setSuccessModal(false), 3000);
  }

  return (
    <div>
      <div>
        <p className="font-semibold text-lg tracking-wider"> Payment Methods</p>
        <p className="text-sm mt-2  text-textColor">
          Select and setup your favourite payment methods{" "}
        </p>
      </div>

      <div
        className={
          bankDetails.length === 0
            ? "mt-10 rounded-lg border p-4  w-full bg-white"
            : "w-full mt-10 border rounded-t-lg p-4  bg-white "
        }
      >
        <div className="sm:flex space-y-4 sm:space-y-0 justify-between items-center">
          <div className="flex space-x-3 items-center">
            <div className=" border rounded-full flex justify-center items-center w-6 h-6 p-1">
              <AiOutlineBank className="text-scudGreen" />
            </div>
            <p className="text-sm font-medium ">Bank Account</p>
          </div>

          <button
            onClick={() => router.push("/driver_profile/addacct")}
            className=" border-[0.4px] rounded-md  flex space-x-2 border-scudGreen p-[6px]"
          >
            <AiOutlinePlus className="text-lg text-scudGreen" />
            <p className="text-sm text-scudGreen">Add Account Details</p>
          </button>
        </div>
        {bankDetails.length === 0 && (
          <i className="text-xs ml-9 mt-2 text-textColor"> No Details...</i>
        )}
      </div>
      {bankDetails?.length !== 0 &&
        bankDetails?.map((item) => (
          <div
            key={item.bank_id}
            className="px-3 sm:px-16 sm:flex justify-between border-b h-auto border-x w-full bg-white py-4"
          >
            <div className="flex flex-col space-y-2">
              <span className="flex justify-between space-x-20">
                <p className="text-[#9E9FA3] text-xs">Bank Name:</p>
                <span className="flex space-x-2">
                  <GetBrandName user={true} bank_id={item.bank_id} />
                </span>
              </span>
              <span className="flex justify-between space-x-14">
                <p className="text-[#9E9FA3]  text-xs">Account Number</p>
                <p className="text-textColor text-sm">{item.account_number}</p>
              </span>
              <span className="flex justify-between space-x-16">
                <p className="text-[#9E9FA3] text-xs">Account Name </p>
                <p className="text-textColor text-sm">{item.account_name.toUpperCase()}</p>
              </span>
            </div>
            <div className=" flex justify-between sm:flex-col sm:justify-end sm:items-end">
              <div className="flex  my-4 mb-16 space-x-1">
                <AiOutlineCheckCircle className="text-green-600 text-sm" />
                <p className="text-green-600 text-xs ">Active</p>
              </div>
              <div className="flex my-4 sm:my-0 mb-16  space-x-8 sm:justify-center sm:items-center">
                <span
                  onClick={() => {
                    router.push({ pathname: "/driver_profile/addacct", query: item });
                  }}
                  className="flex cursor-pointer text-scudGreen hover:text-scudGreen/30 space-x-2"
                >
                  <BiEdit className=" text-sm" />
                  <p className=" text-xs">Edit </p>
                </span>
                <span
                  onClick={() => {
                    setDetails_id(item.id);
                    setDeleteModal(true);
                  }}
                  className="cursor-pointer text-red-600 hover:text-red-600/30 flex space-x-2"
                >
                  <RiDeleteBin6Line className=" text-sm" />
                  <p className=" text-xs">Delete </p>
                </span>
              </div>
            </div>
          </div>
        ))}

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

          <p className="text-sm text-center text-textColor">
            Didn't receive a code ? <b className="text-scudGreen">Resend</b>
          </p>
        </div>
      </Modal>

      {/* success modal */}

      <Modal onClose={() => setSuccessModal(false)} open={successModal}>
        <div className=" w-[20rem] md:w-[24rem]  h-auto">
          <div className="flex flex-col space-y-3 justify-center items-center">
            <AiOutlineCheckCircle className="text-green-600 text-5xl" />
            <p className="text-lg font-semibold mt-2">Bank account details deleted</p>
            <p className="text-sm text-center text-textColor mt-2">
              Your account account details has been deleted successfully.
            </p>
          </div>
        </div>
      </Modal>

      {/* delete modal start here  */}
      <Modal onClose={() => setDeleteModal(false)} open={deleteModal}>
        <div className="w-[18rem] md:w-[24rem]  h-auto">
          <div className="flex flex-col space-y-3 justify-center items-center">
            <MdErrorOutline className="text-red-600 text-5xl" />
            <p className="text-lg font-semibold mt-2">Delete account details</p>
            <p className="text-sm text-textColor mt-2">
              You are about to delete your Fidelity account details
            </p>
          </div>
          <div className="flex justify-between mt-4">
            <button
              onClick={() => setDeleteModal(false)}
              className="bg-white border hover:bg-slate-50 px-4 py-1 rounded-md text-sm font-semibold text-textColor mr-2"
            >
              No,Cancel
            </button>
            <Button
              onClick={() => {
                sendOtp();
                setOpenVerify(true);
                setDeleteModal(false);
              }}
              text={"Yes, Delete"}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
}

Payment.getLayout = Layout;
export default Payment;

export async function getServerSideProps(context) {
  try {
    const token = context.req.cookies.accessToken || "";
    const id = context.req.cookies.user_id || "";
    const res = await fetch(`${BASE_URL}auth/profile`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    });

    const data = await res.json();

    if (data?.statusCode !== undefined && data?.statusCode === 401) {
      try {
        await validateToken(context);
      } catch (err) {
        return { redirect: { destination: `/signin/driver-signin`, permanent: false } };
      }
    }

    return {
      props: {
        data: data.bank_account
      }
    };
  } catch (err) {
    console.log(err);
  }
}
