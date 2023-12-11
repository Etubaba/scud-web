import { useRouter } from "next/router";
import { useEffect } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import CompleteSignup from "../../components/common/CompleteSignup";
import FormStepper from "../../components/common/FormStepper";
import SignupForm from "../../components/common/SignupForm";
import SignUpOtpForm from "../../components/common/SignUpOtpForm";
import UploadLicense from "../../components/common/UploadLicenseCard";
import VehicleDetails from "../../components/common/VehicleDetailsCard";
import { handleDriverSigninLevel, handleDriverSignupLevel } from "../../features/scudSlice";
import BankDetailsCard from "../../components/common/BankDetailsCard";
import Cookies from "js-cookie";
import { webViewUser } from "../../components/services/webViewUser";
import { useState } from "react";
import BackDrop from "../../components/common/BackDrop";
import { BASE_URL } from "../../api/base";
import axios from "axios";
import { handlePhoneNo, handleSigninemail, handleSigninOption } from "../../features/authSlice";
import { useSnackbar } from "notistack";
const DriverSignup = () => {
  const { enqueueSnackbar } = useSnackbar();
  const extraSpace = useSelector((state) => state.auth.extraSpace);
  const level = useSelector((state) => state.scud.driversignuplevel);
  const [loading, setLoading] = useState(true);
  const phone = useSelector((state) => state.auth.phone);
  const countryNum = useSelector((state) => state.auth.countryCode);
  const stages = [
    {
      level: 1,
      name: "Create Account"
    },
    {
      level: 2,
      name: "OTP Verification"
    },
    {
      level: 3,
      name: "Profile Details"
    },
    {
      level: 4,
      name: "Driver's License"
    },
    {
      level: 5,
      name: "Vehicle details"
    },
    {
      level: 6,
      name: "Bank details"
    }
  ];
  const router = useRouter();
  const dispatch = useDispatch();

  // for mobile app
  const query = router?.query;

  // resubmisson login auto to get token
  const calllogin = async () => {
    dispatch(handleDriverSigninLevel(2));
    dispatch(handlePhoneNo(query.user_resubmission_phone));
    dispatch(handleSigninOption(2));
    const trimNumber =
      query.user_resubmission_phone.charAt(0) === "0"
        ? query.user_resubmission_phone.substring(1)
        : query.user_resubmission_phone;

    const url = `${BASE_URL}auth/login`;

    const data = {
      phone: countryNum + trimNumber,
      provider: "phone"
    };

    await axios
      .post(url, data)
      .then((res) => {
        if (res.data.statusCode == 201) {
          router.push({
            pathname: "/signin/driver-signin",
            query: {
              user_resubmission_phone: query.user_resubmission_phone,
              resubmission_step: query.resubmission_step,
              doc_id: query.doc_id
            }
          });
        }
      })
      .catch((err) => {
        if (err.response) {
          enqueueSnackbar(err.response.data.message, {
            variant: "error"
          });
        } else {
          enqueueSnackbar(err.message, {
            variant: "error"
          });
        }
      });
  };
  useEffect(() => {
    if (query.resubmission_step !== undefined && query.user_resubmission_phone !== undefined) {
      calllogin();
    } else if (query?.platform !== undefined && query?.token !== undefined) {
      Cookies.set("accessToken", query?.token, {
        expires: 1
      });
      Cookies.set("user_id", query?.id, {
        expires: 1
      });
      webViewUser(query?.token).then((res) => {
        if (typeof res === "string" || res === "Invalid token") {
          dispatch(handleDriverSignupLevel(1));
        } else if (res?.profile === false) {
          dispatch(handleDriverSignupLevel(3));
        } else if (res?.profile && res?.license === false) {
          dispatch(handleDriverSignupLevel(4));
        } else if (res?.profile && res?.license && res?.vehicle === false) {
          dispatch(handleDriverSignupLevel(5));
        } else if (res?.profile && res?.license && res?.vehicle && res.bankDetails === false) {
          dispatch(handleDriverSignupLevel(6));
        }
        setLoading(false);
      });
    } else setLoading(false);
  }, []);

  if (loading) return <BackDrop />;

  const windowWidth = typeof window !== "undefined" && window.innerWidth;

  return (
    <div
      className={`
            ${level === 3 || level === 5 || level === 4 ? "h-full" : "h-[88vh]"}
          pb-12 md:pb-0 md:bg-none   md:bg-[#fbfbff] bg-no-repeat  bg-left-bottom `}
    >
      <div className="  flex flex-col space-y-4 md:space-y-0 lg:flex-row px-3 md:justify-center md:items-center lg:justify-start  lg:items-start  lg:px-20 md:pt-8 w-full lg:space-x-8 ">
        <div className="w-full md:w-1/2">
          <div
            onClick={() => router.back()}
            // router.push("/officer_profile/officers_manager/support")

            className="md:flex hidden cursor-pointer hover:text-textColor/30 mb-5 md:mb-24 space-x-2 items-center"
          >
            <div className="bg-white border hover:bg-[#ccd6ff]/40 rounded-md p-1 ">
              <IoIosArrowBack className="text-textColor" />
            </div>
            <p className=" text-textColor hover:text-gray-400 text-sm tracking-wide">Back</p>
          </div>

          <h1 className="text-xl mb-4 mt-10 md:mt-0 md:text-4xl text-center lg:text-left font-bold">
            Drive With <b className="text-scudGreen">Scud</b>{" "}
          </h1>

          <p className="text-[#7C7F8A] max-w-[400px] text-base hidden lg:block">
            Get paid weekly just for helping our community of riders get rides around town. Be your
            own boss and get paid in fares for driving on your own schedule.{" "}
          </p>
        </div>
        <div className="md:w-[47%] flex flex-col justify-center items-center">
          <FormStepper stages={stages} level={level} />

          {level === 1 ? (
            <SignupForm />
          ) : level === 2 ? (
            <SignUpOtpForm />
          ) : level === 3 ? (
            <CompleteSignup />
          ) : level === 4 ? (
            <UploadLicense />
          ) : level === 5 ? (
            <VehicleDetails />
          ) : (
            <BankDetailsCard />
          )}
        </div>
      </div>
      {extraSpace && windowWidth < 400 && <div className="h-[16rem] w-full"></div>}

      {(extraSpace && windowWidth < 400) || level === 1 || level === 2 || level === 6 ? null : (
        <img className="h-20 hidden md:block object-contain w-24 md:w-60" src="/sign.png" />
      )}

      {(level === 1 || level === 2 || level === 3) && (
        <img
          className="h-20 absolute bottom-0 left-0 hidden md:block object-contain w-24 md:w-60"
          src="/sign.png"
        />
      )}
    </div>
  );
};

export default DriverSignup;
