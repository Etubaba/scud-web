import React from "react";
import Button from "../../common/Button";
import { useRouter } from "next/router";

const SafeSection = () => {
  const router = useRouter();
  return (
    <div className="bg-[url('/driverphone.png')] bg-cover bg-no-repeat  w-full h-52 md:h-[350px]  mt-10  ">
      <div className="bg-gradient-to-l from-black/0 to-[#021977]/100 w-full h-52 md:h-[350px] ">
        <div className=" md:flex pt-8 px-3 justify-start">
          <div className="max-w-[400px] md:text-start md:m-10">
            <div>
              <h1 className="text-white  text-base md:text-3xl font-bold ">
                {" "}
                Drive when you want,
                <br className=" " />
                Make what you need{" "}
              </h1>
              <p className="text-white   text-xs md:text-base my-2 md:my-4">
                Driving with Scud is flexible and rewarding, helping <br className="md:hidden " />{" "}
                drivers meet their career and financial goals.
              </p>
            </div>
            <div className="flex justify-start">
              {" "}
              <Button
                onClick={() => router.push("/signup/driver-signup")}
                style={"md:px-12 font-semibold my-5 "}
                text={"Become a Driver"}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SafeSection;
