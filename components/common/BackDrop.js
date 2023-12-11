import React from "react";
import { Loader } from "./Loader";

const BackDrop = () => {
  return (
    <div className="fixed z-50  left-0  bg-white/80 right-0 bottom-0    w-full h-screen flex justify-center items-center">
      <Loader secondary={true} />
    </div>
  );
};

export default BackDrop;
