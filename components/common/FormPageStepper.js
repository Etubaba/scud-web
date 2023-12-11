import React from "react";
import { IoIosArrowBack } from "react-icons/io";
import SignupForm from "./SignupForm";

function FormPageStepper() {
  return (
    <div>
      <div className="  w-full pb-20">
        <div className=" h-full w-full px-5 md:px-16 md:justify-between flex flex-col md:flex-row  items-center">
          <div className=" w-full md:max-w-[700px] mt-20 ">
            {" "}
            <div
              onClick={() => router.push("/driver_profile/support")}
              className="flex cursor-pointer mb-12 space-x-2 items-center "
            >
              <div className="bg-[#CCD6FF]/50 hover:bg-[#CCD6FF]/30 rounded-md p-1 ">
                <IoIosArrowBack className="text-textColor" />
              </div>
              <p className=" text-textColor hover:text-textColor/30 text-sm tracking-wide">
                Back
              </p>
            </div>
          </div>
          <div className="flex justify-center items-center  w-full">
            <div className="flex w-full items-center">
              <div className="h-6 min-w-[24px] w-6 rounded-full text-white bg-scudGreen"></div>
              <div className="h-[1px] w-full bg-gray-300"></div>
              <div className="h-6 min-w-[24px] w-6 rounded-full bg-scudGreen"></div>
              <div className="h-[1px] w-full bg-gray-300"></div>
              <div className="h-6 min-w-[24px] w-6 rounded-full bg-scudGreen"></div>
              <div className="h-[1px] w-full bg-gray-300"></div>
              <div className="h-6 min-w-[24px] w-6 rounded-full bg-scudGreen"></div>
              <div className="h-[1px] w-full bg-gray-300"></div>
              <div className="h-6 min-w-[24px] w-6 rounded-full bg-scudGreen"></div>
              <div className="h-[1px] w-full bg-gray-300"></div>
              <div className="h-6 min-w-[24px] w-6 rounded-full bg-scudGreen"></div>
            </div>
          </div>
        </div>

        {/* STEPPER COMPONENTS BELOW        ########################################### */}
        <div className=" h-full w-full px-5 md:px-16 md:justify-between flex flex-col md:flex-row  items-center">
          <div className=" w-full md:max-w-[700px] ">
            <div className=" w-full md:max-w-[500px]  ">
              <h1 className="md:text-4xl text-2xl text-center md:text-start text-black font-bold my-3">
                Ride With
                <br className="md:block hidden" /> Scud
              </h1>
              <p className="text-[#545454]  md:block hidden">
                Get paid weekly just for helping our community of riders get
                rides around town. Be your own boss and get paid in fares for
                driving on your own schedule.
              </p>
            </div>
          </div>

          <div className="flex justify-center items-center w-full">
            <SignupForm rider={true} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default FormPageStepper;
