import React from "react";

function AfterTrip() {
  return (
    <div className="py-20 bg-adminbg">
      <div className="md:flex px-4   ">
        <div className="lg:pl-16 md:pl-8 md:w-1/2">
          <p className="text-scudGreen text-[12px] font-semibold ">AFTER THE TRIP</p>
          <h1 className="text-2xl mb-2 text-title font-semibold">Always here for you</h1>
          <div className="mb-6">
            <h1 className="text-base text-title font-semibold mb-2">Anonymous feedback </h1>
            <p className="text-textColor text-sm">
              After every trip, you can rate the driver and provide anonymous feedback about your
              ride. We review all feedback because our goal is to make every ride a great
              experience.
            </p>
          </div>
          <div className="mb-6">
            <h1 className="text-base text-title font-semibold mb-2">24/7 support </h1>
            <p className="text-textColor text-sm">
              Our support team is always ready to respond to any questions you may have about your
              trip and help you retrieve lost items.
            </p>
          </div>
          <div className="mb-2">
            <h1 className="text-base text-title font-semibold mb-2">Rapid response </h1>
            <p className="text-textColor text-sm">
              Our specially-trained incident response teams are available around the clock to handle
              any urgent concerns that arise.
            </p>
          </div>
        </div>
        <div className="flex md:w-1/2 justify-end">
          <img className=" md:w-[450px] object-contain" src="/Group35720.svg" loading="lazy" />
        </div>
      </div>
    </div>
  );
}

export default AfterTrip;
