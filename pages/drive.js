import React from "react";
import Button from "../components/common/Button";
import { AiFillCar, AiOutlinePhone } from "react-icons/ai";
import { MdOutlineAppSettingsAlt } from "react-icons/md";
import { IoMdDocument } from "react-icons/io";
import { BsFillPinMapFill, BsCalendar2Check, BsPersonPlus } from "react-icons/bs";
import { HiOutlineDocumentAdd } from "react-icons/hi";
import { BiWalletAlt } from "react-icons/bi";
import { MdLocalAirport, MdPhoneIphone } from "react-icons/md";
import ContentComponent from "../components/common/ContentComponent";
import { FaUserShield } from "react-icons/fa";
//import FirstScud from "../components/rideComponents/FirstScud";
import LastSection from "../components/homeComponents/sections/LastSection";
import MobileLastsection from "../components/homeComponents/sections/MobileLastsection";
import { useRouter } from "next/router";

const Drive = () => {
  const router = useRouter();
  return (
    <div className="">
      {/* Hero section ####################################################################################################### */}

      <div className="px-2  md:pl-16 w-full   bg-[#F7FAFE] flex-row  md:flex justify-between ">
        <div className="md:w-1/2 md:my-20">
          <div className="w-full  ">
            <p className="font-semibold text-scudGreen">Drive</p>
            <h1 className="text-3xl text-title font-bold my-2">Work that puts you first</h1>
            <p className="text-textColor">Drive when you want, earn what you need</p>
          </div>
          <div className="block  md:hidden">
            <img src="/car-png-16828 1.png" loading="lazy" className="mt-10 " alt="hero" />
          </div>
          <div className="flex justify-between  max-w-[400px] mt-7">
            <Button
              onClick={() => router.push("/signup/driver-signup")}
              social={true}
              SocialIcon={AiFillCar}
              style={"lg:px-5  "}
              text={"Become a driver"}
            />
          </div>
        </div>
        <div className="hidden mt-12  w-1/2 md:flex justify-end">
          <img src="/blueeclis.png" className="h-80 w-72 lg:-mr-2 " loading="lazy" />

          <img src="/corola.png" alt="hero" className="z-10  lg:mr-28 absolute h-80 w-[28rem]" />
        </div>
      </div>

      {/* Easy to start section */}
      <div className="md:px-7 md:mb-10 px-5 py-20">
        <p className="text-center text-title font-sans text-base md:text-2xl font-bold">
          It's easy to get started
        </p>
        <p className="text-center text-sm mt-3 text-textColor">
          Just follow a simple steps and you are good to make money
        </p>

        <div className="md:flex hidden space-x-14 mt-16 justify-center mb-8  items-center">
          <div className="flex items-center rounded-lg  bg-scudWhite shadow-2xl  justify-center p-7">
            {/* <img src="/location.png" className="h-8 w-6" /> */}
            <BsPersonPlus className=" text-scudGreen text-4xl" />
          </div>
          <div className="border  dashed w-24 bg-gray-600" />
          <div className="flex justify-center shadow-blue-600/50 rounded-lg p-6 shadow-xl items-center bg-scudGreen">
            <HiOutlineDocumentAdd className=" text-4xl text-white" />
          </div>
          <div className="border  dashed w-24 bg-gray-600" />
          <div className="flex items-center rounded-lg  bg-scudWhite shadow-2xl  justify-center p-7">
            {/* <img src="/bluecar.png" className="h-8 w-8" /> */}
            <MdOutlineAppSettingsAlt className=" text-4xl text-scudGreen" />
          </div>
        </div>

        <div className="md:hidden space-y-10 my-10 flex flex-col justify-center items-center">
          <div className="flex flex-col justify-center items-center">
            <div className="flex items-center w-24 rounded-lg mb-5  bg-scudWhite shadow-2xl  justify-center p-7">
              {/* <img src="/location.png" className="h-8 w-6" /> */}
              <BsPersonPlus className=" text-scudGreen text-3xl" />
            </div>
            <div className=" text-center">
              <p className="font-bold text-title  text-lg">Sign up online</p>
              <p className="text-sm text-textColor">
                Tell us a little about yourself and your car. Vehicle requirements vary by region,
                so we’ll show you what’s needed for your city.
                {/* Choose your location and find
                <br /> your best car. */}
              </p>
            </div>
          </div>

          <div className="flex flex-col justify-center items-center">
            <div className="flex justify-center mb-5 shadow-blue-600/50 rounded-lg p-6 shadow-xl items-center bg-scudGreen">
              <IoMdDocument className=" text-4xl text-white" />
            </div>

            <div className=" text-center">
              {" "}
              <p className="font-semibold text-lg">Share some documents</p>
              <p className="text-sm text-textColor">
                Just upload your license, registration, proof of insurance, and the necessary
                information to start a driver screening.
              </p>
            </div>
          </div>

          <div className="flex flex-col justify-center items-center">
            <div className="flex items-center rounded-lg mb-4 bg-scudWhite shadow-2xl  justify-center p-7">
              <img src="/bluecar.png" className="h-8 w-8" />
            </div>
            <div className=" text-center">
              <p className="font-semibold text-lg">Get the app and go</p>
              <p className="text-sm text-textColor">
                Just tap and go. You’ll get turn-by-turn directions, tools to help you earn more,
                and 24/7 support. And if you don’t have a smartphone, we can connect you to one.
              </p>
            </div>
          </div>
        </div>
        {/* for larger screens */}
        <div className="md:flex hidden md:ml-14 space-x-12 mb-7 justify-center items-center ">
          <div className=" text-center max-w-[250px]">
            <p className="font-bold text-title text-lg">Sign up online</p>
            <p className="text-sm text-textColor">
              Tell us a little about yourself and your car. Vehicle requirements vary by region, so
              we'll show you .
              {/* Choose your location and find
              <br /> your best car. */}
            </p>
          </div>
          <div className=" text-center max-w-[300px]">
            {" "}
            <p className="font-bold text-title text-lg">Share some documents</p>
            <p className="text-sm text-textColor">
              Just upload your license, registration, proof of insurance, and the necessary
              information to start a driver screening.
            </p>
          </div>
          <div className=" text-center   max-w-[300px]">
            <p className="font-bold text-title text-lg">Get the app and go</p>
            <p className="text-sm text-textColor">
              Just tap and go. You’ll get turn-by-turn directions, tools to help you earn more, and
              24/7 support. And if you don’t have a smartphone, we can connect you to one.
            </p>
          </div>
        </div>
      </div>
      {/* always section */}
      <div className="lg:px-16  px-8  -mt-12 py-8  pb-5 md:py-20 bg-[#F7FAFE]">
        <div className="flex flex-col mt-5 mb-5 md:mb-9 justify-center items-center">
          <h1 className=" font-bold text-title text-center md:text-left text-xl md:text-2xl tracking-wider mb-4">
            We are always here for you
          </h1>

          <p className="text-sm tracking-wider max-w-[600px] text-center text-textColor">
            massa odio. Condimentum ultrices id sollicitudin tristique congue feugiat vestibulum.
            Molestie quam semper faucibus quam. Velit velit{" "}
          </p>
        </div>

        {/* <div className="flex lg:flex-row flex-col  justify-center items-center  space-y-7 lg:space-y-0  lg:space-x-12"> */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
          <ContentComponent
            Icon={BsCalendar2Check}
            content={
              "You can drive with Scud anytime, day or night, 365 days a year. When you drive is always up to you, so it never interferes with the important things in your life."
            }
            title={"Set your own schedule"}
          />
          <ContentComponent
            Icon={BiWalletAlt}
            content={
              "Trip fares start with a base amount, then increase with time and distance. And when demand is higher than normal, drivers earn more."
            }
            title={"Earn more at every turn"}
          />
          <ContentComponent
            Icon={AiOutlinePhone}
            content={
              "Just tap and go. You’ll get turn-by-turn directions, tools to help you earn more, and 24/7 support. And if you don’t have a smartphone, we can connect you to one."
            }
            title={"Let the app lead the way"}
          />
        </div>

        {/* <div className="md:flex hidden  justify-center md:px-40 px-4 lg:px-52 items-center">
          <FirstScud text={"Get a safe ride with Scud"} />
        </div> */}
      </div>

      {/* ############################################################################################ */}
      <div className="mb-7 ">
        <div className="bg-[url('/driverphone.png')]   bg-bottom bg-cover bg-no-repeat  w-full h-60 md:h-[400px] ">
          <div className="bg-gradient-to-l from-black/0 flex justify-start items-center to-gradientblue w-full h-60 md:h-[400px] ">
            <div className=" md:flex md:px-16 px-8 justify-start">
              <div className="max-w-[450px] md:text-right ">
                <div>
                  <h1 className="text-white text-start text-xl text- md:text-2xl font-bold ">
                    Designed just for drivers
                  </h1>
                  <p className="text-white text-start  text-xs md:text-base my-2 md:my-4">
                    When you want to make money, just open the app and you'll start to receive trip
                    requests. You'll get information about your rider and directions to their
                    location and destination. When the trip is over, you'll receive another nearby
                    request. And if you're ready to get off the road, you can sign off at any time.
                  </p>
                </div>
                <div className="flex justify-start">
                  {" "}
                  <Button
                    onClick={() => router.push("/signup/driver-signup")}
                    style={"md:px-12 font-semibold my-3 "}
                    text={"Become a Driver"}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <img className="w-full h-8" src="malvin.png" />
      </div>
      {/* 3333################################################################################ */}

      <div className="bg-[#F7FAFE] items-center flex my-16 justify-center  h-80 w-full">
        <div>
          <div className="md:-mt-16 mt-16">
            <h1 className="font-bold text-title text-xl text-center md:text-2xl tracking-wider mb-4">
              Safety
            </h1>
            <p className="font-semibold text-title  text-center mb-4 tracking-wider">
              From start to finish, a ride you can trust
            </p>
            <p className="md:max-w-[600px]  text-textColor text-xs md:text-sm text-center">
              Your safety is important to us before, during, and after every trip. That’s why we
              continue to develop technology that helps make millions of rides safer every day.
            </p>

            <span
              onClick={() => router.push("/safety")}
              className="flex justify-center cursor-pointer hover:text-scudGreenHover text-xs items-center mb-8 mt-4 md:mb-0 text-scudGreen"
            >
              <FaUserShield className="mr-3" />
              <p>See how we keep you safe</p>
            </span>
            <div className="flex justify-center">
              {" "}
              <Button style={"md:px-12 font-semibold md:my-5 "} text={"Become a Driver"} />
            </div>
          </div>
        </div>
        <div className="" />
      </div>
      {/* 3333################################################################################ */}
      <LastSection />
      <MobileLastsection />
    </div>
  );
};

export default Drive;
