import { useRouter } from "next/router";
import { IoIosArrowBack } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import CompleteSignup from "../../components/common/CompleteSignup";
import FormStepper from "../../components/common/FormStepper";
import SignupForm from "../../components/common/SignupForm";
import SignUpOtpForm from "../../components/common/SignUpOtpForm";
import { handleRidersignupLevel } from "../../features/scudSlice";
import Cookies from "js-cookie";
import { useEffect } from "react";

const Ridersignup = () => {
  const level = useSelector((state) => state.scud.ridersignuplevel);
  const extraSpace = useSelector((state) => state.auth.extraSpace);

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
    }
  ];

  const dispatch = useDispatch();
  const router = useRouter();

  //for mobile app
  const query = router?.query;
  useEffect(() => {
    if (query?.platform !== undefined && query?.token !== undefined) {
      dispatch(handleRidersignupLevel(3));
      Cookies.set("accessToken", query?.token, {
        expires: 1
      });
    }
  }, []);

  const windowWidth = typeof window !== "undefined" && window.innerWidth;

  return (
    <div className={`${level === 3 ? "h-auto" : "h-[88vh]"} pb-12 md:pb-0   bg-[#fbfbff]  `}>
      <div className="  flex flex-col space-y-4 md:space-y-0 lg:flex-row px-5 lg:justify-start lg:items-start items-center justify-center lg:px-20 md:pt-8 w-full lg:space-x-8  ">
        <div className="md:w-1/2 w-full">
          <div
            onClick={() => router.back()}
            className="md:flex hidden cursor-pointer hover:text-textColor/30 mb-5 md:mb-24 space-x-2 items-center"
          >
            <div className="bg-white border hover:bg-[#ccd6ff]/40 rounded-md p-1 ">
              <IoIosArrowBack className="text-textColor" />
            </div>
            <p className=" text-textColor hover:text-gray-400 text-sm tracking-wide">Back</p>
          </div>

          <h1 className="text-xl mt-10 md:mt-0 mb-4 md:text-4xl text-center lg:text-left font-bold">
            Drive With <b className="text-scudGreen">Scud</b>{" "}
          </h1>

          <p className="text-[#7C7F8A] max-w-[400px] text-base hidden lg:block">
            Get paid weekly just for helping our community of riders get rides around town. Be your
            own boss and get paid in fares for driving on your own schedule.{" "}
          </p>
        </div>
        <div className="md:w-[47%] w-full flex flex-col justify-center items-center">
          <FormStepper stages={stages} level={level} />

          {level === 1 ? (
            <SignupForm rider={true} />
          ) : level === 2 ? (
            <SignUpOtpForm rider={true} />
          ) : (
            <CompleteSignup rider={true} />
          )}
        </div>
      </div>

      {extraSpace && windowWidth < 400 && <div className="h-[16rem] w-full"></div>}
      <img
        className="h-20 w-24 fixed  block left-0 bottom-0 object-contain md:w-60"
        src="/sign.png"
      />
    </div>
  );
};

export default Ridersignup;
