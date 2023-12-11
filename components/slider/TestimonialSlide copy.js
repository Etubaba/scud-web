import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { AiFillStar } from "react-icons/ai";
import { RiDoubleQuotesL } from "react-icons/ri";

function Slide2() {
  const slides = [
    {
      id: 1,
      image: "/Rectangle 26.png",
      review:
        "Scud gave me one of the, most interesting platform to run with. I booked my ride and the driver arrived on time and he gave me good customer experience that i really love. Good one Scud",
      name: "John Doe1",
      ratingValue: "4.5"
    },
    {
      id: 2,
      image: "/Rectangle 26.png",
      review:
        "Scud gave me one of the, most interesting platform to run with. I booked my ride and the driver arrived on time and he gave me good customer experience that i really love. Good one Scud",
      name: "John Doe2",
      ratingValue: "2.5"
    },
    {
      id: 3,
      image: "/Rectangle 26.png",
      review:
        "Scud gave me one of the, most interesting platform to run with. I booked my ride and the driver arrived on time and he gave me good customer experience that i really love. Good one Scud",
      name: "John Doe3",
      ratingValue: "0.5"
    }
  ];
  return (
    <div className="md:flex space-x-10 items-center justify-center w-full">
      {slides?.map((item, index) => (
        <div
          key={item.id}
          className=" w-[260px] max-w-[260px] bg-white flex flex-col justify-center items-center  p-5 shadow-md shadow-scudGreen/10  rounded-md"
        >
          <div>
            <RiDoubleQuotesL className="text-scudGreen text-xl my-4" />
          </div>
          <p className=" whitespace-normal text-center text-textColor text-sm">{item.review}</p>
          <div className="my-5 flex flex-col space-y-5 items-center justify-center">
            <img
              className=" w-10 rounded-full object-cover  h-10   "
              src={item.image}
              alt={item.name}
            />
            <p className="font-bold">{item.name}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Slide2;
