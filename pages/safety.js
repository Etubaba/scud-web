import React from "react";
import LastSection from "../components/homeComponents/sections/LastSection";
import MobileLastsection from "../components/homeComponents/sections/MobileLastsection";
import Testimonial from "../components/homeComponents/sections/Testimonial";
import AfterTrip from "../components/safetyComponents/AfterTrip";
import BeforeTrip from "../components/safetyComponents/BeforeTrip";
import CommitmentSec from "../components/safetyComponents/CommitmentSec";
import ImproveSec from "../components/safetyComponents/ImproveSec";
import ThirdSection from "../components/safetyComponents/ThirdSection";

const Safety = () => {
  return (
    <div>
      <CommitmentSec />
      <BeforeTrip />
      <ThirdSection />
      <AfterTrip />
      <Testimonial />
      <ImproveSec />
      <img className="w-full md:block hidden mb-20 mt-[-12rem] h-8" src="malvin.png" />
      <LastSection />
      <MobileLastsection />
    </div>
  );
};

export default Safety;
