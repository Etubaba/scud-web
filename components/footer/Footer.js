import React from "react";
import FooterButton from "./FooterButton";
import { AiFillFacebook, AiOutlineInstagram, AiOutlineTwitter } from "react-icons/ai";
import { useRouter } from "next/router";
import Link from "next/link";

export const Footer = () => {
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

  return (
    <div className="hidden bg-[#1E202B] pt-5 md:block">
      <div className=" w-full px-8 lg:px-40 py-8  flex justify-between items-center   h-auto">
        <div className="flex  items-center justify-center">
          <img src="/scudLogo.png" className="w-16 h-16" alt="Scud Logo" />
        </div>

        <div className="flex mt-20 md:space-x-10 lg:space-x-20 text-[#e1e3e1] font-[400]">
          <ul className="space-y-2 flex flex-col font-[400] text-sm">
            <li className="text-xl  text-white">Company</li>
            <li onClick={() => router.push("/about")} className="cursor-pointer font-[200]">
              About
            </li>
            <li onClick={() => router.push("/terms")} className="cursor-pointer quicklink">
              Privacy Policy
            </li>
            <Link href={"/terms"}>
              <li className="cursor-pointer quicklink">Terms of use</li>
            </Link>
            <li className="cursor-pointer quicklink">Contact us</li>
          </ul>
          <ul className="space-y-2 flex flex-col font-[400] text-sm">
            <li className="text-xl text-white ">Services</li>
            <li onClick={() => router.push("/ride")} className="cursor-pointer quicklink">
              Ride
            </li>
            <li onClick={() => router.push("/drive")} className="cursor-pointer quicklink">
              Drive
            </li>
            <li onClick={() => router.push("/safety")} className="cursor-pointer quicklink">
              Safety
            </li>
          </ul>
          <div className="flex flex-col font-[400] space-y-4">
            <p className="text-white">Contact</p>
            <p className="max-w-[200px] text-sm">
              71 NTA Road, Mgboba by location Bust stop Port Harcourt.
            </p>
            <div className="flex space-x-3">
              <AiFillFacebook className="hover:text-gray-400 text-lg" />
              <AiOutlineInstagram className="hover:text-gray-400 text-lg" />
              <AiOutlineTwitter className="hover:text-gray-400 text-lg" />
            </div>
          </div>
        </div>
      </div>
      <hr className="mt-10 opacity-30" />
      <p className="text-center text-xs p-[20px] mt-4 font-sans text-[#C0C0B4]">© Scud, Inc.</p>
    </div>
  );
};
