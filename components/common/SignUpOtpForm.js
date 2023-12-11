import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  goBackSignupLevel,
  handleDriverSigninLevel,
  handleDriverSignupLevel,
  handleRidersigninLevel,
  handleRidersignupLevel,
  handleSignupLevel
} from "../../features/scudSlice";
import Cookies from "js-cookie";
import { useSnackbar } from "notistack";
import {
  handleAdminProps,
  handleUserProps,
  handleAdminLogin,
  handleRiderLogin,
  handleDriverLogin,
  handlePhoneNo
} from "../../features/authSlice";
import { BASE_URL } from "../../api/base";
import { getToken } from "../services/refresh";
import { Loader } from "./Loader";

function SignUpOtpForm({ signin, rider, admin }) {
  const [loading, setLoading] = React.useState(false);
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [actOTPindex, setActiveOTPindex] = useState(0);
  const signinoption = useSelector((state) => state.auth.signinOption);

  const router = useRouter();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const phone = useSelector((state) => state.auth.phone);
  const countryNum = useSelector((state) => state.auth.countryCode);
  const signinemail = useSelector((state) => state.auth.signinEmail);

  const [event, updateEvent] = useReducer(
    (prev, next) => {
      const newEvent = { ...prev, ...next };
      return newEvent;
    },
    { counts: 90, hidden: false }
  );

  const inputRef = useRef(null);

  const dispatch = useDispatch();
  const query = router?.query;

  const handleOTPsubmit4Signup = async (otp) => {
    setLoading(true);
    const token = Cookies.get("accessToken");
    axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    axios.defaults.headers.get["Content-Type"] = "application/json";

    const url = `${BASE_URL}auth/verify`;
    const formdata = {
      otp,
      otp_type: signin !== undefined ? "login" : "register"
    };
    try {
      const { data } = await axios.post(url, formdata);
      if (data) {
        setLoading(false);

        if (rider) {
          dispatch(handleRidersignupLevel(3));
        } else {
          dispatch(handleDriverSignupLevel(3));
        }

        // dispatch(handleSignupLevel(3));
      }
    } catch (err) {
      setLoading(false);
      if (err.response) {
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

  const handleOTPsubmit4Signin = async (otp) => {
    setLoading(true);
    const url = `${BASE_URL}auth/login`;
    const trimNumber =
      query.user_resubmission_phone !== undefined && query.user_resubmission_step !== undefined
        ? query.user_resubmission_phone.charAt(0) === "0"
          ? query.user_resubmission_phone.substring(1)
          : query.user_resubmission_phone
        : phone.charAt(0) === "0"
        ? phone.substring(1)
        : phone;

    const data =
      signinoption == 1
        ? {
            email: signinemail,
            otp,
            provider: "email"
          }
        : {
            phone: countryNum + trimNumber,
            otp,
            provider: "phone" // to be updated
          };
    try {
      axios
        .post(url, data)
        .then((res) => {
          if (res.data?.user) {
            setLoading(false);
            if (admin) {
              Cookies.set("adminAccessToken", res.data?.accessToken, {
                expires: 1
              });
              Cookies.set("adminRefreshToken", res.data?.refreshToken, {
                expires: 30
              });
            } else {
              Cookies.set("accessToken", res.data?.accessToken, {
                expires: 1
              });
              Cookies.set("refreshToken", res.data?.refreshToken, {
                expires: 30
              });
            }

            admin
              ? dispatch(handleAdminProps(res.data?.user))
              : rider !== undefined
              ? dispatch(handleUserProps(res.data?.user))
              : dispatch(handleUserProps(res.data?.user));

            admin
              ? dispatch(handleAdminLogin(true))
              : rider !== undefined
              ? dispatch(handleRiderLogin(true))
              : dispatch(handleDriverLogin(true));

            Cookies.set("user_id", res.data.user.id, { expires: 30 });

            if (rider === undefined) {
              if (admin) {
                if (res.data.user.roles.includes("super-admin")) {
                  router.push("/admin");
                  enqueueSnackbar("login successful", {
                    variant: "success"
                  });
                } else if (res.data.user.roles.includes("supervisor")) {
                  router.push("/officer_profile/officers_manager");
                  enqueueSnackbar("login successful", {
                    variant: "success"
                  });
                } else if (res.data.user.roles.includes("account-officer")) {
                  router.push("/officer_profile/account_officer");
                  enqueueSnackbar("login successful", {
                    variant: "success"
                  });
                } else if (res.data.user.roles.includes("admin")) {
                  router.push("/admin");
                  enqueueSnackbar("login successful", {
                    variant: "success"
                  });
                } else
                  enqueueSnackbar("You don't have access to this dashboard", {
                    variant: "error"
                  });
              } else {
                if (
                  query.resubmission_step !== undefined &&
                  query.user_resubmission_phone !== undefined
                ) {
                  dispatch(handleDriverSignupLevel(Number(query.resubmission_step)));
                  router.push({
                    pathname: "/signup/driver-signup",
                    query: {
                      resubmission_step: query.resubmission_step,
                      doc_id: query.doc_id
                    }
                  });
                } else if (res.data.user.roles.includes("driver")) {
                  if (res.data?.user?.license == null) {
                    router.push("/signup/driver-signup");
                    dispatch(handleDriverSignupLevel(4));
                  } else if (res.data?.user?.vehicles.length == 0) {
                    router.push("/signup/driver-signup");
                    dispatch(handleDriverSignupLevel(5));
                  } else if (res.data?.user?.bank_account == null) {
                    router.push("/signup/driver-signup");
                    dispatch(handleDriverSignupLevel(6));
                  } else {
                    router.push("/driver_profile");
                    enqueueSnackbar("login successful", {
                      variant: "success"
                    });
                    dispatch(handleDriverSigninLevel(1));
                  }
                } else {
                  enqueueSnackbar("You do not have an account as a driver", {
                    variant: "info"
                  });
                }
              }
            } else {
              if (res.data.user.roles.includes("rider")) {
                router.push("/rider_profile");
                enqueueSnackbar("login successful", {
                  variant: "success"
                });
                dispatch(handleRidersigninLevel(1));
              } else {
                enqueueSnackbar("You do not have an account as a rider", {
                  variant: "info"
                });
              }
            }

            dispatch(handleSignupLevel(0));
          }
        })
        .catch((err) => {
          setLoading(false);
          if (err.response) {
            enqueueSnackbar(err.response?.data?.message, {
              variant: "error"
            });
          } else {
            setLoading(false);
            enqueueSnackbar(err.message, {
              variant: "error"
            });
          }
        })
        .catch((err) => {
          setLoading(false);
          if (err.response) {
            enqueueSnackbar(err.response?.data?.message, {
              variant: "error"
            });
          } else {
            setLoading(false);
            enqueueSnackbar(err.message, {
              variant: "error"
            });
          }
        });
    } catch (err) {
      setLoading(false);
      if (err.response) {
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

  const handleOnChange = ({ target: { value } }, index) => {
    const newOTP = [...otp];
    newOTP[index] = value.substring(value.length - 1);
    setOtp(newOTP);

    if (value === "") setActiveOTPindex(index - 1);
    else setActiveOTPindex(index + 1);

    if (actOTPindex === 5) {
      const otpCode = newOTP.join("");
      signin ? handleOTPsubmit4Signin(otpCode) : handleOTPsubmit4Signup(otpCode);
    }
  };

  const handlePaste = async (event) => {
    event.preventDefault();
    const clipboardData = await navigator.clipboard.readText();
    const pastedOtp = clipboardData.trim().substring(0, 6).split("");

    setOtp((prevOtp) => {
      const newOtp = [...prevOtp];
      pastedOtp.forEach((digit, index) => {
        if (index < newOtp.length) {
          newOtp[index] = digit;
        }
      });
      return newOtp;
    });
    signin
      ? handleOTPsubmit4Signin(pastedOtp.join(""))
      : handleOTPsubmit4Signup(pastedOtp.join(""));
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, [actOTPindex]);

  const resendOtp = async () => {
    const url = `${BASE_URL}auth/login`;
    const trimNumber = phone.charAt(0) === "0" ? phone.substring(1) : phone;
    try {
      const { data } = await axios.post(url, {
        phone: countryNum + trimNumber,
        provider: "phone" // to be updated
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

  const resendOtp4Register = async () => {
    try {
      const token = Cookies.get("accessToken");
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      axios.defaults.headers.get["Content-Type"] = "multipart/form-data";

      const { data } = await axios.get(`${BASE_URL}auth/send-otp?otp_type=register`);

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

  // count down function below #################################################
  const handleCount = async () => {
    if (event.counts > 60) updateEvent({ hidden: true });
    updateEvent({ counts: event.counts-- });
    let decri = setInterval(() => {
      updateEvent({ counts: event.counts-- });
      event.counts === -2
        ? updateEvent({ counts: 90, hidden: false }) & clearInterval(decri)
        : null;
    }, 1000);
    if (signin) {
      resendOtp();
    } else {
      resendOtp4Register();
    }
  };
  const goBackPayload =
    signin && rider
      ? "ridersignin"
      : !signin && rider
      ? "ridersignup"
      : signin && !rider
      ? "driversignin"
      : !signin && !rider
      ? "driversignup"
      : "";
  return (
    // <div>
    <div className="bg-white animate__fadeIn animate__animated shadow-figma rounded-md w-full md:w-[470px] p-3 md:p-5 ">
      <div className="">
        {rider === undefined ? (
          admin ? (
            <p className="text-center text-[#1e202a] font-semibold">Login to dashboard</p>
          ) : (
            <p className="text-center text-[#1e202a] font-semibold">
              {signin ? "Sign in as driver" : "Sign up as driver"}
            </p>
          )
        ) : (
          <p className="text-center text-[#1e202a] font-semibold">
            {signin ? "Sign in as rider" : "Sign up as rider"}
          </p>
        )}
        <p className="text-center text-[#7c7f8a] text-xs mb-5">OTP Verification</p>
        <div>
          <div className="">
            <div className="justify-center items-center flex">
              <p className="text-center max-w-[200px] font-[550] text-xs md:text-sm text-textColor">
                Enter the 6-digit code sent to your mobile device
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
                    onPaste={handlePaste}
                  />
                </React.Fragment>
              ))}
            </div>

            <p className="md:text-sm text-xs text-center text-textColor">
              Didn't receive a code ?
              {!event.hidden ? (
                <b
                  onClick={handleCount}
                  className="text-scudGreen cursor-pointer ml-2 hover:text-scudGreen/50"
                >
                  Resend
                </b>
              ) : (
                <b className="text-scudGreen -mt-1 ml-2 cursor-pointer">
                  {event.counts} <b>s</b>
                </b>
              )}
            </p>
          </div>
          <div className="flex justify-between space-x-5">
            <button
              onClick={() => {
                dispatch(handlePhoneNo(""));
                dispatch(goBackSignupLevel(goBackPayload));
              }}
              className="p-3 my-4 rounded-md text-gray-400 bg-slate-200 text-[12px] px-8 font-semibold  hover:bg-slate-100 w-full "
            >
              Back
            </button>
            <button className="p-3 my-4 rounded-md text-scudGray text-[12px] px-8 font-semibold bg-scudGreen hover:bg-[#4747e1] w-full ">
              {loading ? (
                <div className="justify-center  flex items-center">
                  <Loader />
                </div>
              ) : (
                <p> Continue</p>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
    // </div>
  );
}

export default SignUpOtpForm;
