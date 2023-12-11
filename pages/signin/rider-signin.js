import { useRouter } from "next/router";
import { IoIosArrowBack } from "react-icons/io";
import { useSelector } from "react-redux";

import FormStepper from "../../components/common/FormStepper";
import SigninOption from "../../components/common/SigninOption";
import SignupForm from "../../components/common/SignupForm";
import SignUpOtpForm from "../../components/common/SignUpOtpForm";

const DriverSignin = () => {
  const level = useSelector((state) => state.scud.ridersigninlevel);

  const stages = [
    {
      level: 1,
      name: "Enter Your Credentials"
    },
    {
      level: 2,
      name: "OTP Verification"
    }
  ];

  const router = useRouter();
  return (
    <div
      className={`${
        level === 3 ? "h-auto" : "h-[88vh]"
      } pb-12 md:pb-0 md:bg-none bg-[url('/sign.png')] bg-50%  bg-no-repeat  bg-left-bottom    bg-[#fbfbff]`}
    >
      <div className="  flex flex-col lg:items-start space-y-4 md:space-y-0 lg:flex-row px-5 lg:justify-start  lg:px-20 md:pt-8 w-full lg:space-x-8 ">
        <div className="md:w-1/2">
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
        <div className="md:w-[47%] flex flex-col justify-center items-center">
          <FormStepper stages={stages} level={level} />

          {level === 1 ? (
            <SignupForm rider={true} signin={true} />
          ) : (
            <SignUpOtpForm rider={true} signin={true} />
          )}
        </div>
      </div>
      <img
        className="h-20 absolute hidden  md:block left-0 bottom-0 object-contain w-60"
        src="/sign.png"
      />
    </div>
  );
};

export default DriverSignin;
