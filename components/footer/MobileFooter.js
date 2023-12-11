import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import FooterButton from "./FooterButton";

const MobileFooter = () => {
  //hide mobile footer for these routes
  const router = useRouter();
  const authPaths = [
    "/signup/driver-signup",
    "/signup/rider-signup",
    "/signin/rider-signin",
    "/signin/driver-signin"
  ];
  const isAuthPath = () => {
    return authPaths.includes(`${router.pathname}`);
  };

  if (isAuthPath()) {
    return;
  }

  const { platform } = router.query;

  if (platform === "mobile") return;
  return (
    <div
      className="md:hidden z-0 block h-auto p-8 w-full text-white bg-[#1E202B]
"
    >
      <div className="flex justify-center my-10 items-center">
        <img src="/scudLogo.png" className="w-[4rem] h-[4rem] " alt="Scud Logo" />
      </div>
      {/* <div className="justify-center  space-x-4 flex  items-center">
        <FooterButton
          style={"md:-mt-[3.7rem]  -mt-[3.4rem]"}
          text={"SIGN UP TO RIDE"}
          fill={true}
        />
        <div className="flex flex-col space-y-4">
          <FooterButton text={"BECOME A DRIVER"} />
          <FooterButton text={"BECOME A DRIVER"} />
        </div>
      </div> */}
      <div className="border-[0.5px] my-6 border-gray-500/40" />
      <ul className="flex flex-col space-y-3 justify-center items-center text-sm text-[#e1e3e1] font-sans">
        <li className="text-lg font-medium">Services</li>
        <li>Ride</li>
        <li>Drive</li>
        <li>Safety</li>
        <li className="text-lg my-3 font-medium">Company</li>
        <Link href={"/terms"}>
          <li className="cursor-pointer quicklink">Terms of use</li>
        </Link>{" "}
        <li>Privacy Policy</li>
        <li>About us</li>
      </ul>

      {/* <div className="flex-col mt-7 flex">
        <select className="rounded-md mb-4 w-full h-8 text-white border-[1px] border-[#767676] bg-black ">
          <option value="en">English</option>
          <option value="en">English</option>
        </select>
        <select className="rounded-md mb-4 w-full h-8 text-white border-[1px] border-[#767676] bg-black ">
          <option value="en">English</option>
          <option value="en">English</option>
        </select>

        <div>
          <p className="text-white font-sans text-base font-semibold ">
            Rider App
          </p>
          <img
            alt="App"
            className="transform w-40 h-24 hover:translate-x-5 duration-300 cursor-pointer"
            src="/appstore.svg"
          />
        </div>
        <div>
          <p className="text-white font-sans text-base font-semibold ">
            Driver
          </p>
          <img
            alt="App"
            className="transform w-40 h-24 hover:translate-x-5 duration-300 cursor-pointer"
            src="/appstore.svg"
          />
        </div>

      
      </div> */}
      <div className="border-[0.5px] my-6 border-gray-500/40" />
      <p className="text-center text-xs mt-4 font-sans text-[#C0C0B4]">© Scud, Inc.</p>
    </div>
  );
};

export default MobileFooter;
