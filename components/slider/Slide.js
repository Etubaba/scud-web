import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

function Slide() {
  const slides = [
    { id: 1, image: "/car1.jpg", btntext: "Economy" },
    { id: 2, image: "/car2.jpg", btntext: "Premium" },
    { id: 3, image: "/car3.jpg", btntext: "Accessibility" },
  ];
  return (
    <Carousel
      showArrows={true}
      className="md:w-[32rem] "
      showThumbs={true}
      autoPlay={true}
      infiniteLoop={true}
      //   swipeAnimationHandler={true}
      duration={1000}
    >
      {slides?.map((item, index) => (
        <div key={item.id} className="">
          <div className="flex justify-center items-center md:justify-start md:items-start">
            <button className="border-b-2 text-scudGreen border-b-scudGreen">
              {item.btntext}
            </button>
          </div>
          <div className=" w-full">
            <img
              src={item.image}
              alt="slides"
              className=" w-full object-contain "
            />
          </div>
        </div>
      ))}
    </Carousel>
  );
}

export default Slide;
