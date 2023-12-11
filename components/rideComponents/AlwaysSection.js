import React from "react";
import SignInModalCP from "../common/SignInModalCP";
import { GiSteeringWheel } from "react-icons/gi";
import { MdOutlineReviews } from "react-icons/md";
import { AiOutlineCar, AiOutlineClockCircle } from "react-icons/ai";
import ContentComponent from "../common/ContentComponent";

const AlwaysSection = () => {
  return (
    <div className="md:px-16 px-8 py-12">
      <div className="flex flex-col mt-5 mb-5 md:mb-9 justify-center items-center">
        <h1 className=" font-bold text-title md:text-left text-center text-2xl md:text-3xl tracking-wider mb-4">
          We're always here for you
        </h1>
        <p className="md:max-w-[600px]  text-textColor text-xs md:text-sm text-center">
          massa odio. Condimentum ultrices id sollicitudin tristique congue feugiat vestibulum.
          Molestie quam semper faucibus quam. Velit velit
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <ContentComponent
          Icon={AiOutlineCar}
          padding={true}
          content={
            "Choose your ride and set your location. You’ll see your driver’s picture and vehicle details, and can track their arrival on the map."
          }
          title={"Tap a button, get a ride"}
        />
        <ContentComponent
          padding={true}
          Icon={AiOutlineClockCircle}
          content={
            "No phone calls to make, no pick-ups to schedule. With 24/7 availability, request a ride any time of day, any day of the year."
          }
          title={"Always on, always available"}
        />
        <ContentComponent
          padding={true}
          Icon={MdOutlineReviews}
          content={
            "Rate your driver and provide anonymous feedback about your trip. Your input helps us make every ride a 5-star experience."
          }
          title={"You rate, we listen"}
        />
      </div>
    </div>
  );
};

export default AlwaysSection;
