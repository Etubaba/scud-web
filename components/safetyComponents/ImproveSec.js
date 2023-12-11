import React from "react";

import { BsFillPinMapFill } from "react-icons/bs";
import { GoLaw } from "react-icons/go";
import { MdLocalAirport, MdPhoneIphone } from "react-icons/md";
import ContentComponent from "../common/ContentComponent";
import FirstScud from "../rideComponents/FirstScud";

const ImproveSec = () => {
  return (
    <div className="lg:px-16  px-8 mb-8 md:mb-28 -mt-12 py-8 md:py-20 pb-5 md:pb-40 bg-[#F7FAFE]">
      <div className="flex flex-col mt-5 mb-5 md:mb-9 justify-center items-center">
        <p className="text-scudGreen">In the App and Offline</p>
        <h1 className=" font-bold text-center md:text-left text-xl md:text-3xl tracking-wider mb-4">
          Improving experiences with technology
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <ContentComponent
          Icon={MdPhoneIphone}
          content={
            "In many locations around the world, Scud uses technology that anonymizes phone numbers to keep contact details confidential. So when you and your driver need to contact each other, your personal information stays private."
          }
          title={"Substitute phone numbers"}
        />
        <ContentComponent
          Icon={BsFillPinMapFill}
          content={
            "GPS data is logged for every trip so we know who you’re driving and where you’re going, which promotes accountability and encourages good behavior."
          }
          title={"Always on the map"}
        />
        <ContentComponent
          Icon={GoLaw}
          content={
            "In cases where local law enforcement provides us with valid legal process, we provide them with useful data to help in their investigations."
          }
          title={"Assisting law enforcement"}
        />
      </div>

      <div className="md:flex  hidden  justify-center md:px-40 mb-20 px-6 lg:px-72 items-center">
        <FirstScud text={"Get a safe ride with Scud"} />
      </div>
    </div>
  );
};

export default ImproveSec;
