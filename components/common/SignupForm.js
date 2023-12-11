import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import NumberSelect from "./NumberSelect";
import Divider from "../../components/common/Divider";
import { useDispatch, useSelector } from "react-redux";
import {
  handleDriverSigninLevel,
  handleDriverSignupLevel,
  handleRidersigninLevel,
  handleRidersignupLevel,
  handleSignupLevel
} from "../../features/scudSlice";
import { useSnackbar } from "notistack";
import cookie from "js-cookie";
import axios from "axios";
import {
  handleDriverProps,
  handleRiderLogin,
  handleRiderProps,
  handleSigninemail,
  handleSigninOption,
  handleUserProps
} from "../../features/authSlice";
import { BASE_URL } from "../../api/base";
import { Loader } from "./Loader";
import { useState } from "react";
import Input from "./Input";
import Link from "next/link";
import Button from "./Button";

function SignupForm({ signin, rider, admin }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [signinemail, setSigninEmail] = useState("");
  const [agree, setAgree] = useState(false);
  const dispatch = useDispatch();
  const signinoption = useSelector((state) => state.auth.signinOption);
  const phone = useSelector((state) => state.auth.phone);
  const countryNum = useSelector((state) => state.auth.countryCode);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  //  Handle register function  ###############################################???????????????????????????????????????????????????
  const handleRegister = async () => {
    // if (signinoption == null) {
    //   console.log("am null");
    //   enqueueSnackbar("Signin Option can't be empty", {
    //     variant: "error"
    //   });
    // } else if (signinoption == 1) {
    //   console.log("am 1");

    //   if (signinemail == "") {
    //     enqueueSnackbar("Email is required", {
    //       variant: "error"
    //     });
    //   }
    // } else if (signinoption == 2) {
    //   console.log("am 2");

    // }

    if (phone == "") {
      enqueueSnackbar("Phone is required", {
        variant: "error"
      });
    } else {
      setLoading(true);
      const trimNumber = phone.charAt(0) === "0" ? phone.substring(1) : phone;
      // const url = `/api/phonesubmission`;

      const url = `${BASE_URL}auth/register`;
      try {
        const phoneTrim = phone.trim();

        const zeroRemovedNumber = phoneTrim.charAt(0) === "0" ? phoneTrim.substring(1) : phoneTrim;

        await axios
          .post(url, {
            phone: countryNum + zeroRemovedNumber,
            role: rider === undefined ? "driver" : "rider"
          })
          .then((res) => {
            if (res.data?.user) {
              setLoading(false);
              enqueueSnackbar(`${res?.data?.message}`, {
                variant: "success"
              });
              cookie.set("accessToken", res.data?.accessToken, { expires: 1 });
              cookie.set("refreshToken", res.data?.refreshToken, {
                expires: 30
              });
              dispatch(handleUserProps(res.data.user));

              if (res.data?.user?.phone_verified !== null) {
                if (rider) {
                  dispatch(handleRiderLogin(true));
                  router.push("/rider_profile");
                } else {
                  dispatch(handleDriverSignupLevel(3));
                }
              } else {
                if (rider) {
                  dispatch(handleRidersignupLevel(2));
                } else {
                  dispatch(handleDriverSignupLevel(2));
                }

                // dispatch(handleSignupLevel(2));
              }
            }
          });
      } catch (err) {
        setLoading(false);
        //refresh the token if expired

        //error response from server
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
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      document.addEventListener("keydown", handleKeyPress);
    }
    // Add event listener when the component mounts

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  // const detectRole=()=>{
  //   if(admin) return ['admin','super-admin','accoount-officer','supervisor']
  //   if(rider) {
  //     return ['rider']
  //   }else{
  //     return ['driver']
  //   }
  // }

  //  Handle login function  ###########################

  const calllogin = async () => {
    setLoading(true);
    dispatch(handleSigninemail(signinemail));
    const url = `${BASE_URL}auth/login`;
    const phoneTrim = phone.trim();

    const zeroRemovedNumber = phoneTrim.charAt(0) === "0" ? phoneTrim.substring(1) : phoneTrim;

    const data =
      signinoption == 1
        ? {
            // phone: "",
            email: signinemail,
            provider: "email"
          }
        : {
            phone: countryNum + zeroRemovedNumber,
            provider: "phone"
          };
    await axios
      .post(url, data)
      .then((res) => {
        if (res.data.statusCode == 201) {
          setLoading(false);
          if (rider) {
            dispatch(handleRidersigninLevel(2));
          } else if (admin) {
            dispatch(handleRidersigninLevel(2));
          } else {
            dispatch(handleDriverSigninLevel(2));
          }
        }
      })
      .catch((err) => {
        if (err.response) {
          setLoading(false);
          enqueueSnackbar(err.response.data.message, {
            variant: "error"
          });
        } else {
          setLoading(false);
          enqueueSnackbar(err.message, {
            variant: "error"
          });
        }
      });
  };
  const handleLogin = async () => {
    if (signinoption == null) {
      enqueueSnackbar("Signin Option can't be empty", {
        variant: "error"
      });
    } else if (signinoption == 1) {
      if (signinemail == "") {
        enqueueSnackbar("Email is required", {
          variant: "error"
        });
      } else {
        calllogin();
      }
    } else {
      if (phone == "") {
        enqueueSnackbar("Phone is required", {
          variant: "error"
        });
      } else {
        calllogin();
      }
    }
  };

  function handleKeyPress(event) {
    if (event.key === "Enter") {
      if (signin) {
        handleLogin();
      } else {
        handleRegister();
      }
    }
  }
  return (
    <div className="bg-white shadow-figma animate__fadeIn animate__animated rounded-lg w-full md:w-[450px] p-3 ">
      {rider === undefined ? (
        admin ? (
          <p className="text-center text-lg text-[#1e202a] font-semibold">
            {signin && "Login to dashboard"}
          </p>
        ) : (
          <p className="text-center text-lg text-[#1e202a] font-semibold">
            {signin ? "Sign in as driver" : "Sign up as driver"}
          </p>
        )
      ) : (
        <p className="text-center text-lg text-[#1e202a] font-semibold">
          {signin ? "Sign in as rider" : "Sign up as riders"}
        </p>
      )}
      {admin ? (
        <p className="text-center text-sm text-[#7c7f8a] mb-5">Provide your credentials</p>
      ) : (
        <p className="text-center text-sm text-[#7c7f8a] mb-5">
          {signin
            ? signinoption == 1
              ? "Enter your registered email"
              : "Enter your registered number"
            : "Create Your Account"}
        </p>
      )}
      <div className="w-full space-y-4">
        {signin && (
          <div className="flex w-full space-x-3 justify-between mb-2">
            <div
              onClick={() => dispatch(handleSigninOption(1))}
              className={
                signinoption == 1
                  ? "rounded-lg w-1/2 cursor-pointer flex justify-center bg-scudGreen/10 items-center border border-scudGreen py-3  "
                  : "rounded-lg w-1/2 cursor-pointer flex justify-center items-center border py-3  "
              }
            >
              <p
                className={signinoption == 1 ? "text-sm text-scudGreen font-semibold" : "text-sm "}
              >
                Email address
              </p>
            </div>
            <div
              onClick={() => dispatch(handleSigninOption(2))}
              className={
                signinoption == 2
                  ? "rounded-lg w-1/2 cursor-pointer flex justify-center bg-scudGreen/20 items-center border border-scudGreen py-3  "
                  : "rounded-lg w-1/2 cursor-pointer flex justify-center items-center border py-3  "
              }
            >
              <p
                className={signinoption == 2 ? "text-sm text-scudGreen font-semibold" : "text-sm "}
              >
                Mobile number
              </p>
            </div>
          </div>
        )}
        {/* <p className="text-xs mb-2 text-textColor/50">
          {signinoption == 1 ? "Enter your Email" : "Enter Your number"}
        </p> */}
        {signin == "undefined" || !signin ? (
          <div className="flex w-full justify-between mb-2">
            <NumberSelect placeholder={"Enter Your number"} />
          </div>
        ) : (
          <div className="flex w-full justify-between mb-2">
            {signinoption == 1 ? (
              <Input
                placeholder={"Enter your Email"}
                value={signinemail}
                onChange={(e) => setSigninEmail(e.target.value)}
              />
            ) : (
              <NumberSelect placeholder={"Enter Your number"} />
            )}
          </div>
        )}
        {!signin && (
          <div className="w-full space-x-3  my-4 flex">
            <input
              value={agree}
              onChange={(e) => setAgree(e.target.checked)}
              id="terms"
              type={"checkbox"}
            />
            <label htmlFor="terms" className="text-[10px]  text-textColor/70 ">
              I agree to the company's
              <Link href="/terms">
                <a className="underline cursor-pointer text-scudGreen px-1">Terms of use</a>
              </Link>
              and
              <Link className="text-scudGreen cursor-pointer underline px-1" href="/terms">
                <a className="underline cursor-pointer text-scudGreen px-1"> Privacy Policy</a>
              </Link>
            </label>
          </div>
        )}

        <div className="flex justify-between items-center space-x-5">
          {/* {signin && (
            <button
              onClick={() => {
                dispatch(
                  signin
                    ? rider
                      ? handleRidersigninLevel(0)
                      : admin
                      ? handleSignupLevel(0)
                      : handleDriverSigninLevel(0)
                    : rider
                    ? handleRidersignupLevel(1)
                    : handleDriverSignupLevel(1)
                );

                // dispatch(goBackSignupLevel(goBackPayload));
              }}
              className="p-2.5 my-4 rounded-md text-gray-400 bg-slate-200 text-[12px] px-8 font-semibold  hover:bg-slate-100 w-full "
            >
              Back
            </button>
          )} */}

          <Button
            disabled={!signin && !agree ? true : false}
            loading={loading}
            text={"Continue"}
            style={"w-full"}
            onClick={() => (signin ? handleLogin() : handleRegister())}
          />

          {/* <button
            // disabled={}
           
            className="p-3 my-4 rounded-md text-scudGray text-[12px] px-8 font-semibold bg-scudGreen hover:bg-[#4747e1] w-full "
          >
            {loading ? (
              <div className="justify-center  flex items-center">
                <Loader />
              </div>
            ) : (
              <p> </p>
            )}
          </button> */}
        </div>
      </div>

      {/* <div className="mb-2">
          <Divider text={"Or"} />
        </div>

        <button className="flex space-x-2 justify-center items-center w-full border p-2 rounded-md">
          <FcGoogle />
          <p className="text-textColor text-sm">Continue with google</p>
        </button> */}
    </div>
    // </div>
  );
}

export default SignupForm;
