import React from "react";

const SubFooter = () => {
  return (
    <div
      className="md:bg-[url('/bglast.png')]  absolute px-5 md:px-0   pb-5 bg-contain md:pl-6  lg:pl-16 flex md:flex-row 
       flex-col-reverse md:space-x-8 rounded-lg h-[25rem] md:h-60 w-full md:w-[60%] mt-[8rem] md:mt-[17rem]  lg:mt-[14rem] md:bg-no-repeat"
    >
      <div className="flex flex-col -ml-5  lg:space-y-4  md:mt-16 lg:mt-5  ">
        {" "}
        <p className="text-white font-bold   download  ">
          Download Scud
          <br className="br" />
          app for free
        </p>
        <p className="text-white text-xs lg:text-base">
          For faster, easier booking and exclusive deals.
        </p>
        <div className="flex space-x-5">
          <img
            alt="App"
            className="transform h-[1.5rem] md:h-7 lg:h-9  cursor-pointer"
            src="/appstore.svg"
          />
          <img
            alt="App"
            className="transform  h-[1.4rem]  md:h-7 lg:h-9  cursor-pointer"
            src="/Google.svg"
          />
        </div>
      </div>

      <div className="lg:-mt-[6.5rem] md:-mt-[20rem]  -mt-[22rem] flex justify-center  ">
        <img
          src="/phones.png"
          className="phone lg:w-[24rem] lg:h-[19rem] md:h-[17rem] md:w-[20rem]  md:mt-48 lg:mt-0 -mt-[26rem] w-64 h-60"
        />
      </div>
    </div>
  );
};

export default SubFooter;
