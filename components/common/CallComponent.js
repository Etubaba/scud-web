import { useRouter } from "next/router";
import React, { useState } from "react";
import { AiOutlineMessage } from "react-icons/ai";
import {
  BsCameraVideo,
  BsCameraVideoOff,
  BsMic,
  BsMicMute,
  BsRecord2,
  BsThreeDots,
} from "react-icons/bs";
import { MdOutlineScreenShare } from "react-icons/md";

const CallComponent = ({ video, mute, setVideo, setMute }) => {
  // const [mute, setMute] = useState(false);
  // const [video, setVideo] = useState(false);
  const router = useRouter();
  return (
    <div className="md:px-14 py-4 md:py-6 flex flex-col md:flex-row md:justify-between items-center border bg-white">
      <div className="flex justify-center  items-center space-x-4 md:space-x-8 ">
        <div
          onClick={() => setMute(!mute)}
          className="bg-scudGreen hover:bg-scudGreenHover rounded-full shadow-md p-2 "
        >
          {mute ? (
            <BsMicMute className="text-white text-sm" />
          ) : (
            <BsMic
              // onClick={() => setMute(!mute)}
              className="text-white text-sm"
            />
          )}
        </div>
        <div
          onClick={() => setVideo(!video)}
          className="bg-scudGreen hover:bg-scudGreenHover rounded-full shadow-md p-2 "
        >
          {video ? (
            <BsCameraVideoOff
              // onClick={() => setVideo(!video)}
              className="text-white text-sm"
            />
          ) : (
            <BsCameraVideo
              // onClick={() => setVideo(!video)}
              className="text-white text-sm"
            />
          )}
        </div>

        <div className="rounded-full hover:bg-[#E6EBFF]/50 bg-[#E6EBFF] shadow-md p-2 ">
          <MdOutlineScreenShare className="text-sm text-scudGreen" />
        </div>
        <div className="rounded-full  bg-[#FFC0C0] shadow-lg p-2 ">
          <BsRecord2 className="text-sm text-red-600" />
        </div>
        <div className="rounded-full hover:bg-[#E6EBFF]/50 bg-[#E6EBFF] shadow-md p-2 ">
          <AiOutlineMessage className="text-sm text-scudGreen" />
        </div>
        <div className="rounded-full hover:bg-[#E6EBFF]/50 bg-[#E6EBFF] shadow-md p-2 ">
          <BsThreeDots className="text-sm text-scudGreen" />
        </div>
      </div>
      <button className="bg-red-600 hidden md:flex hover:bg-red-600/30 rounded-md text-white px-4 py-2">
        <p>End Call</p>
      </button>
    </div>
  );
};

export default CallComponent;
