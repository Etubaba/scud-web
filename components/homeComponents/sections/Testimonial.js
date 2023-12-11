import React from "react";
import Carousel, { CarouselItem } from "../../slider/CustomCarousel";
import Slide2 from "../../slider/TestimonialSlide copy";
import { RiDoubleQuotesL } from "react-icons/ri";
import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import TestimonialCard from "../TestimonialCard";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { ImQuotesLeft } from "react-icons/im";

function Testimonial() {
  const [windowSize, setWindowSize] = useState(null);
  useEffect(() => {
    setWindowSize(window.innerWidth);
  }, [windowSize]);

  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const swiperRef = useRef(null);

  useEffect(() => {
    if (prevRef.current && nextRef.current) {
      const prevButton = prevRef.current;
      const nextButton = nextRef.current;

      prevButton.addEventListener("click", () => {
        swiperRef.current?.slidePrev();
      });
      nextButton.addEventListener("click", () => {
        swiperRef.current?.slideNext();
      });
    }
  }, [prevRef.current, nextRef.current]);

  const pagination = "";

  return (
    <div className="flex justify-center items-center my-20">
      <div className="flex flex-col justify-center items-center">
        <p className="text-title text-3xl font-bold">TESTIMONIALS</p>
        <h1 className="text-sm text-textColor leading-7 text-scudGre">What people say about us?</h1>
        <div className="my-10  space-x-8 flex lg:space-x-16 items-center justify-center w-full">
          <button
            ref={prevRef}
            className="bg-white  hover:bg-slate-50 button-shadow2 rounded-full p-3 flex justify-center items-center"
          >
            <BsArrowLeft className="md:text-xl text-lg text-scudGreen " />
          </button>

          <div className="flex mx-auto my-0 items-center   w-[200px]  md:w-[600px]  lg:w-[1000px] justify-center">
            <Swiper
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
              }}
              modules={[Navigation, Pagination, Scrollbar]}
              autoplay={{
                delay: 2500,
                disableOnInteraction: true
              }}
              // spaceBetween={"-65px"}
              slidesPerView={3}
              navigation={{
                prevEl: prevRef.current,
                nextEl: nextRef.current
              }}
              pagination={{
                clickable: true
              }}
              loop={true}
              breakpoints={{
                "@0.00": {
                  slidesPerView: 1,
                  spaceBetween: 2
                },
                "@0.75": {
                  slidesPerView: 1,
                  spaceBetween: 2
                },
                "@1.00": {
                  slidesPerView: 2,
                  spaceBetween: "-65px"
                },
                "@1.50": {
                  slidesPerView: 3,
                  spaceBetween: "-65px"
                }
              }}
              className="swiper_container"
            >
              <SwiperSlide className="swiper_card">
                <TestimonialCard />
              </SwiperSlide>
              <SwiperSlide className="swiper_card">
                <TestimonialCard />
              </SwiperSlide>
              <SwiperSlide className="swiper_card">
                <TestimonialCard />
              </SwiperSlide>
              <SwiperSlide className="swiper_card">
                <TestimonialCard />
              </SwiperSlide>
              <SwiperSlide className="swiper_card">
                <TestimonialCard />
              </SwiperSlide>
              <SwiperSlide className="swiper_card">
                <TestimonialCard />
              </SwiperSlide>
              <SwiperSlide className="swiper_card">
                <TestimonialCard />
              </SwiperSlide>
              <SwiperSlide className="swiper_card">
                <TestimonialCard />
              </SwiperSlide>
              <SwiperSlide className="swiper_card">
                <TestimonialCard />
              </SwiperSlide>
              <SwiperSlide className="swiper_card">
                <TestimonialCard />
              </SwiperSlide>
            </Swiper>
          </div>

          <button
            ref={nextRef}
            className="bg-scudGreen hover:bg-scudGreenHover rounded-full p-2 md:p-3 button-shadow flex justify-center items-center"
          >
            <BsArrowRight className="md:text-xl text-lg text-white " />
          </button>

          {/* <Carousel device={windowSize <= 800 ? "sm" : windowSize <= 850 ? "md" : "lg"}>
            {slides?.map((item, index) => (
              <div
                key={index}
                className=" w-[260px] max-w-[260px] h-[350px] max-h-[350px] bg-white flex flex-col md:justify-center md:items-center  p-5 shadow-md shadow-scudGreen/10  rounded-md"
              >
                <div className="flex justify-center items-center">
                  <RiDoubleQuotesL className="text-scudGreen text-xl my-4" />
                </div>
                <p className=" whitespace-normal mb-3 font-bold text-left md:text-center text-black ">
                  It was a great experience
                </p>
                <p className=" whitespace-normal md:text-center text-textColor text-sm">
                  {item.review}
                </p>
                <div className="my-5 space-x-3 md:space-x-0 w-full flex flex-row md:flex-col space-y-5 md:items-center md:justify-center">
                  <img
                    className=" w-10 rounded-full object-cover mt-5  h-10   "
                    src={item.image}
                    alt={item.name}
                  />
                  <div className="md:text-center">
                    <p className="font-bold">{item.name}</p>
                    <p className="text-xs text-color">Manager @Digitalize Ltd</p>
                  </div>
                </div>
              </div>
            ))}
          </Carousel> */}
        </div>
      </div>
    </div>
  );
}

export default Testimonial;
