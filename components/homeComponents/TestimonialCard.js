import React from "react";
import { ImQuotesLeft } from "react-icons/im";

const TestimonialCard = () => {
  return (
    <div className="bg-white shadow-figma  space-y-2 border-[#E6EBFF] flex flex-col  md:min-h-[368px] max-h-[368px]  md:w-[320px] justify-center items-center border rounded-[20px] p-3 md:py-6 md:px-5">
      <div className="flex justify-center mt-2 items-center">
        <ImQuotesLeft className="text-scudGreen text-xl md:text-3xl" />
      </div>
      <div>
        <p className="text-title text-center mt-3 font-semibold text-sm md:text-lg">
          It was a great experience
        </p>

        <p className="text-textColor text-center mt-3 mb-3 font-[400] text-xs md:text-base">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Non eros molestie dolor eu purus
          magna elementum. Est mauris massa massa ultrices non vitae quam. Magna{" "}
        </p>
      </div>

      <div className=" flex flex-col justify-center items-center">
        <img src="/photo.png" className="md:h-12 h-8 w-8 md:w-12 mb-1 rounded-full" alt="" />
        <p className="text-title font-semibold text-sm md:text-base">John Doe</p>

        <p className="text-xs leading-4">Manager @Digitalize Ltd</p>
      </div>
    </div>
  );
};

export default TestimonialCard;
