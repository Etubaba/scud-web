import React from "react";
import KnowUs from "../components/aboutusComponents/KnowUs";
import { FirstSection } from "../components/aboutusComponents/FirstSection";
import Services from "../components/aboutusComponents/Services";
import LastSection from "../components/homeComponents/sections/LastSection";
import MobileLastsection from "../components/homeComponents/sections/LastSection";
import Testimonial from "../components/homeComponents/sections/Testimonial";
// import Testimonial from "../components/homeComponents/sections/MobileLastsection";

function About() {
  return (
    <div>
      <FirstSection />
      <Services />

      <KnowUs />
      <Testimonial />
      {/* <LastSection /> */}
      <MobileLastsection />
    </div>
  );
}

export default About;
