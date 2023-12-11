import { useRouter } from "next/router";
import React, { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import CallComponent from "../../../components/common/CallComponent";
import Layout from "../../../components/driver_layout/Layout";

const Callpage = () => {
  const router = useRouter();
  const [video, setVideo] = useState(false);
  const [mute, setMute] = useState(false);

  return (
    <div className="md:p-5">
      <div
        onClick={() => router.push("/driver_profile/support")}
        className="flex cursor-pointer mb-12 space-x-2 items-center"
      >
        <div className="bg-[#CCD6FF]/50 hover:bg-[#CCD6FF]/30 rounded-md p-1 ">
          <IoIosArrowBack className="text-textColor" />
        </div>
        <p className=" text-textColor hover:text-textColor/30 text-sm tracking-wide">
          Back
        </p>
      </div>

      {!video ? (
        <div className=" flex flex-col mb-12 justify-center items-center">
          <img
            src="/rectangle 26.png"
            alt=""
            className="w-52 h-52 shadow-xl mb-5 shadow-scudGreen/30 rounded-full"
          />
          <p className="font-semibold">Shola Victor</p>
          <p className="text-sm text-textColor">02:28 minutes</p>
        </div>
      ) : (
        <>
          <div className=" w-full rounded-lg mb-8 flex justify-center items-center h-[80vh] border">
            <p> Video of account officer</p>
          </div>
          <div className="h-60 z-40 w-52 border flex justify-center items-center rounded-md absolute right-10 bottom-16">
            <p>My Camera Video</p>
          </div>
        </>
      )}

      <div>
        <CallComponent
          setVideo={setVideo}
          setMute={setMute}
          mute={mute}
          video={video}
        />
      </div>
      <div className="flex mt-8 justify-center items-center ">
        <button className="bg-red-600 md:hidden flex hover:bg-red-600/30 rounded-md text-white px-4 py-2">
          <p>End Call</p>
        </button>
      </div>
    </div>
  );
};

Callpage.getLayout = Layout;
export default Callpage;
