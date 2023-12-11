import { useRouter } from "next/router";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  handleDriverSigninLevel,
  handleRidersigninLevel,
  handleSignupLevel
} from "../../features/scudSlice";
import { useSnackbar } from "notistack";
import { handleSigninOption } from "../../features/authSlice";
import { Loader } from "./Loader";
import { useState } from "react";

function SigninOption({ rider, admin }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const signinoption = useSelector((state) => state.auth.signinOption);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const handleContinue = () => {
    if (signinoption == null) {
      enqueueSnackbar("you must select an option", {
        variant: "error"
      });
    } else {
      setLoading(true);
      if (rider) {
        dispatch(handleRidersigninLevel(2));
      } else if (admin) {
        dispatch(handleSignupLevel(2));
      } else {
        dispatch(handleDriverSigninLevel(2));
      }
    }
  };

  return (
    <div className="bg-white shadow-figma animate__fadeIn animate__animated rounded-lg w-full md:w-[450px] p-3 md:p-10 ">
      <p className="text-center text-lg text-[#1e202a] font-semibold">Login to your account</p>

      <p className="text-center text-sm text-[#7c7f8a] mb-5">
        Login with your email or mobile number
      </p>

      <div className="w-full space-y-3">
        <div className="flex w-full space-x-3 justify-between mb-2">
          <div
            onClick={() => dispatch(handleSigninOption(1))}
            className={
              signinoption == 1
                ? "rounded-lg w-1/2 cursor-pointer flex justify-center bg-scudGreen/10 items-center border border-scudGreen py-3  "
                : "rounded-lg w-1/2 cursor-pointer flex justify-center items-center border py-3  "
            }
          >
            <p className={signinoption == 1 ? "text-sm text-scudGreen font-semibold" : "text-sm "}>
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
            <p className={signinoption == 2 ? "text-sm text-scudGreen font-semibold" : "text-sm "}>
              Mobile number
            </p>
          </div>
        </div>

        <div>
          
        </div>

        <button
          onClick={handleContinue}
          className="p-3 mb-2 mt-2 justify-center items-center  rounded-md text-scudGray text-[12px] px-16 font-semibold bg-scudGreen hover:bg-[#4747e1] w-full "
        >
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
  );
}

export default SigninOption;
