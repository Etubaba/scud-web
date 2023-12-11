import { useRouter } from "next/router";
import React from "react";
import { BsArrowRight } from "react-icons/bs";

const SignInCompo = ({ drive }) => {
  // if (drive) {
  //   return (
  //     <div className="bg-scudGreen font-sans mt-72 left-[54%] md:left-[60%] absolute z-40  text-white p-4 md:p-8 h-36 md:h-60 w-32 md:w-60">
  //       <div>
  //         <p className="text-start  mb-12 md:mb-28">Start riding with scud</p>
  //       </div>

  //       <div className="flex  transform justify-end">
  //         <p className="mr-3 text-xs md:text-base">SIGN UP</p>
  //         <BsArrowRight className=" md:mt-1" />
  //       </div>
  //     </div>
  //   );
  // } else {

  const router = useRouter();
  return (
    <div
      className={`bg-scudGreen font-sans ${
        drive
          ? " left-[10%] h-36 md:h-60 -mt-[28rem] md:-mt-[22rem]  w-32  md:w-[16rem] md:left-[10%]"
          : "h-36 md:h-60 w-32 md:w-60 mt-72 left-[54%] lg:hidden md:left-[60%]"
      }  absolute z-40   text-white p-4 md:p-8 `}
    >
      <div>
        <p className="text-start md:text-lg mb-12 md:mb-28">
          Start riding with scud
        </p>
      </div>

      <div
        onClick={() => router.push("/signup/options")}
        className="flex duration-300 cursor-pointer  hover:translate-x-3 transform justify-end"
      >
        <p className="mr-3 text-xs md:text-base">SIGN UP</p>
        <BsArrowRight className=" md:mt-1" />
      </div>
    </div>
  );
  // }
};

export default SignInCompo;
