import { FirstSection } from "../components/homeComponents/sections/FirstSection";
import ReasonSection from "../components/homeComponents/sections/ReasonSection";
import SafeSection from "../components/homeComponents/sections/SafeSection";
import Testimonial from "../components/homeComponents/sections/Testimonial";
import ThirdSection from "../components/homeComponents/sections/ThirdSection";
import HelpingSection from "../components/homeComponents/sections/HelpingSection";
import LastSection from "../components/homeComponents/sections/LastSection";
import MobileLastsection from "../components/homeComponents/sections/MobileLastsection";

export default function Home() {
  return (
    <div className=" ">
      <div className="px-2">
        <FirstSection />
        <ReasonSection />
        <ThirdSection />
      </div>
      <div>
        <SafeSection />
      </div>
      <div className="px-2">
        <HelpingSection />
        <Testimonial />
      </div>
      <LastSection />
      <MobileLastsection />
    </div>
  );
}
