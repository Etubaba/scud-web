import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import React, { useState, useEffect, useRef } from "react";
import { AiOutlineCheckCircle, AiOutlineRight } from "react-icons/ai";
import { MdErrorOutline } from "react-icons/md";
import { useSelector } from "react-redux";
import { BASE_URL } from "../../api/base";
import Button from "../../components/common/Button";
import Modal from "../../components/common/Modal";
import Select from "../../components/common/Select";
import Layout from "../../components/driver_layout/Layout";
import { getToken } from "../../components/services/refresh";
import { validateToken } from "../../components/services/validateToken";

function AddCard({ banks }) {
  const router = useRouter();
  const bank_details_toEdit = router.query;

  const [bankName, setBankName] = useState(
    bank_details_toEdit !== undefined ? bank_details_toEdit.account_name : ""
  );
  const [bankNum, setBankNum] = useState(
    bank_details_toEdit !== undefined ? bank_details_toEdit.account_number : ""
  );

  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [actOTPindex, setActiveOTPindex] = useState(0);
  const [selectedBank, setSelectedBank] = useState(
    bank_details_toEdit !== undefined ? bank_details_toEdit.bank_name : "Select Bank"
  );
  const [selectedBankType, setSelectedBankType] = useState("Select Bank Type");
  const [disabled, setDisabled] = useState(true);
  const [successModal, setSuccessModal] = useState(false);
  const [openVerify, setOpenVerify] = useState(false);

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const bankList = banks?.map((item) => item.name);

  const bank_id = banks?.filter((item) => item.name === selectedBank)[0]?.id;

  const inputRef = useRef(null);

  const user = useSelector((state) => state.auth.userDetails);
  const url = `${BASE_URL}auth/login`;
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

  const addAccountDetails = async () => {
    try {
      const token = Cookies.get("accessToken");
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      axios.defaults.headers.get["Content-Type"] = "application/json";
      const { data } = await axios.post(`${BASE_URL}payments/bank-accounts`, {
        bank_id,
        account_number: bankNum,
        account_name: bankName,
        user_id: user.id
      });
      if (data) {
        setSuccessModal(true);
        setOpenVerify(false);
        setOtp(new Array(6).fill(""));
        setBankName("");
        setBankNum("");
        setSelectedBank("Select Bank");
        setSelectedBankType("Select Bank Type");
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

  async function updateAccountDetails() {
    try {
      const formdata = {
        bank_name: selectedBank,
        account_number: bankNum,
        account_name: bankName,
        user_id: user.id
      };
      if (formdata.account_name === bank_details_toEdit.account_name) delete formdata.account_name;
      if (formdata.account_number === bank_details_toEdit.account_number)
        delete formdata.account_number;

      const token = Cookies.get("accessToken");
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      axios.defaults.headers.get["Content-Type"] = "application/json";
      const { data } = await axios.patch(
        `${BASE_URL}payments/bank-accounts/${bank_details_toEdit.id}`,
        formdata
      );
      if (data) {
        setSuccessModal(true);
        setOpenVerify(false);
        setBankName("");
        setBankNum("");
        setOtp(new Array(6).fill(""));
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
  }

  const verifyOtp = async (otp) => {
    try {
      const { data } = await axios.post(url, {
        phone: user.phone,
        provider: "phone",
        otp
      });
      if (data) {
        bank_details_toEdit === null ? addAccountDetails() : updateAccountDetails();
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

  //move from one button to another
  useEffect(() => {
    inputRef.current?.focus();
  }, [actOTPindex]);

  //change button from disable to able
  useEffect(() => {
    if (bankNum !== "" && selectedBank !== "Select Bank" && bankName !== "") {
      setDisabled(false);
    }
  }, [selectedBankType, selectedBank, bankName, bankNum]);

  if (successModal) {
    setTimeout(() => setSuccessModal(false), 3000);
  }
  const acctType = ["Savings Account", "Current Account", "Fixed Account"];
  return (
    <div className="md:px-5 px-2">
      <div>
        <div className="flex space-x-1">
          <p
            onClick={() => router.push("/driver_profile/driver_payment")}
            className="text-[#9E9FA3] text-xs md:text-base cursor-pointer hover:text-[#9E9FA3]/40"
          >
            Payment methods
          </p>
          <AiOutlineRight className="text-[#9E9FA3] text-sm md:text-base md:mt-1" />
          <p className="text-xs md:text-base">Add account details</p>
        </div>
        <p className="text-textColor mt-2 text-xs md:text-sm">
          Select and setup your favourite payment methods
        </p>
      </div>

      <div className="md:mt-10 mt-8 w-full bg-white border shadow-sm rounded-md p-3 md:p-6">
        <div className="bg-adminbg rounded-md md:h-60 p-3 md:p-6">
          <p className="text-sm text-textColor mb-7">Enter your bank details</p>
          <div className="grid grid-cols-1   md:grid-cols-2 gap-5 md:gap-8">
            <div className="col-span-1">
              <Select
                data={bankList}
                style={"w-full p-3"}
                positon={"p-4 "}
                value={selectedBank}
                setValue={setSelectedBank}
                dropDownWidth={"w-[16.5rem]  md:w-[26.5rem] md:bottom-[8rem]  lg:bottom-[-14.5rem]"}
                search={true}
                color=""
              />
            </div>
            <div className="col-span-1">
              <input
                value={bankName}
                onChange={(e) => setBankName(e.target.value)}
                placeholder="Account name"
                type="text"
                className="border placeholder:text-xs   focus:border-scudGreen focus:outline-none outline-none focus:ring-1 focus:ring-scudGreen w-full rounded-md px-2 py-2"
              />
            </div>

            <div className="col-span-1">
              <input
                value={bankNum}
                onChange={(e) => setBankNum(e.target.value)}
                placeholder="Account number"
                type="number"
                className="border placeholder:text-xs   focus:border-scudGreen focus:outline-none outline-none focus:ring-1 focus:ring-scudGreen w-full rounded-md px-2 py-2"
              />
            </div>
            <div className="col-span-1">
              <Select
                data={acctType}
                style={"w-full p-3"}
                positon={"p-4"}
                value={selectedBankType}
                setValue={setSelectedBankType}
                dropDownWidth={
                  " w-[16.5rem] md:w-[26.5rem] bottom-[-6rem] md:bottom-[7rem] lg:bottom-[-6rem]"
                }
                color=""
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex my-7 justify-between ">
        <button
          onClick={() => router.push("/driver_profile/driver_payment")}
          className="bg-white border min-w-[120px] md:min-w-[150px] hover:bg-slate-50 px-4 py-1 rounded-md text-sm  text-textColor mr-2"
        >
          Back
        </button>
        <Button
          disabled={disabled}
          onClick={() => {
            sendOtp();
            setOpenVerify(true);
          }}
          text={"Add details"}
        />
      </div>

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
            <p className="text-lg font-semibold mt-2">
              {bank_details_toEdit === null ? "Added" : "Update"} Account details
            </p>
            <p className="text-sm text-center text-textColor mt-2">
              Your account details has been {bank_details_toEdit === null ? "added" : "updated"}{" "}
              successfully.
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
}

AddCard.getLayout = Layout;
export default AddCard;

export async function getServerSideProps(context) {
  try {
    const token = context.req.cookies.accessToken || "";

    const res = await fetch(`${BASE_URL}payments/banks`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    });

    const banks = await res.json();

    if (banks?.statusCode !== undefined && banks?.statusCode === 401) {
      try {
        await validateToken(context);
      } catch (err) {
        return { redirect: { destination: `/signin/driver-signin`, permanent: false } };
      }
    }

    return {
      props: {
        banks
      }
    };
  } catch (err) {
    console.log(err);
  }
}
