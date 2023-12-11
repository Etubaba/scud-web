import React, { useRef, useState } from "react";
import { AiOutlinePause } from "react-icons/ai";
import { TbPlayerPlay } from "react-icons/tb";
import dynamic from "next/dynamic";
const WaveSurfer = dynamic(() => import("react-wavesurfer.js"), { ssr: false });
const AudioPayer = ({ url }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  return (
    <div className="bg-scudGreen p-4 h-14 w-[16rem] items-center flex rounded-bl-3xl rounded-t-3xl">
      <div className="w-2/6">
        <div
          onClick={() => setIsPlaying(!isPlaying)}
          className="bg-white py-1.5 max-w-[2rem] flex justify-center items-center rounded-md"
        >
          {isPlaying ? (
            <AiOutlinePause className="text-scudGreen" />
          ) : (
            <TbPlayerPlay className="text-scudGreen " />
          )}
        </div>
      </div>
      <div className="w-4/6  m ">
        <WaveSurfer
          src={url}
          playing={isPlaying}
          waveColor="#ddd"
          progressColor="#999"
          hideScrollbar={true}
          height={40}
          barWidth={2}
          barRadius={0.5}
        />
      </div>
    </div>
  );
};

export default AudioPayer;
