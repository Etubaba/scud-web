import React from "react";
import SignInModalCP from "../common/SignInModalCP";
import { BiBriefcaseAlt } from "react-icons/bi";
import { BsPeople } from "react-icons/bs";
import { MdLocalAirport } from "react-icons/md";
import ContentComponent from "../common/ContentComponent";

const AlwaysSection = () => {
  return (
    <div className="lg:px-16  px-8 -mt-12 mb-24 py-16 bg-white">
      <div className="flex flex-col mt-5 mb-5 md:mb-9 justify-center items-center">
        <h1 className=" font-bold text-center text-title md:text-left text-2xl md:text-3xl tracking-wider mb-4">
          Some benefits you get when using Scud
        </h1>
        <p className="md:max-w-[600px]  text-textColor text-xs md:text-sm text-center">
          massa odio. Condimentum ultrices id sollicitudin tristique congue feugiat vestibulum.
          Molestie quam semper faucibus quam. Velit velit
        </p>
      </div>

      <div className="flex md:flex-row flex-col  justify-center items-center space-y-7 md:space-y-0 md:space-x-8 lg:space-x-4">
        <ContentComponent
          Icon={BiBriefcaseAlt}
          padding={true}
          content={
            "Whether you're headed to the airport, a meeting across town, or home after a late night at the office, Scud works just as hard as you do."
          }
          title={"Keep work trips separate"}
        />
        <ContentComponent
          padding={true}
          Icon={BsPeople}
          content={
            "Scud POOL matches you with riders headed in the same direction. It’s always the cheapest way to Scud. And sharing the ride adds only a few minutes to your trip."
          }
          title={"Share your ride and save"}
        />
        <ContentComponent
          padding={true}
          Icon={MdLocalAirport}
          content={
            "Request a ride on-demand at over 400 airports across the globe. And with multiple vehicle options, there's plenty of room for all your luggage."
          }
          title={"Skip the airport shuttle"}
        />
      </div>
    </div>
  );
};

export default AlwaysSection;
