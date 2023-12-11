import { useRouter } from "next/router";
import React from "react";

const MobileLastsection = () => {
  const router = useRouter();

  const { platform } = router.query;

  if (platform === "mobile") return null;

  return (
    <div className="md:hidden rounded-lg absolute -mt-12 mx-1 w-[98%] flex h-48  bg-no-repeat bg-cover py-5 px-3 bg-[url('/bglast2.png')]">
      <div className="mb-12">
        <p className="text-lg tracking-wide mb-3 max-w-[200px] font-bold text-white">
          Download Scud App for free
        </p>
        <p className="text-xs  tracking-wider max-w-[180px] text-white">
          For faster,easier booking and exclusive deals.
        </p>
        <div className="flex space-x-2 mt-4 S">
          <img alt="App" className="w-16 " src="/appstore.svg" />
          <img alt="App" className="  w-14" src="/Google.svg" />
        </div>
      </div>

      <div className=" -mt-11 ">
        <img src="/phones.png" className=" w-64 h-48" />
      </div>
    </div>
  );
};

export default MobileLastsection;
