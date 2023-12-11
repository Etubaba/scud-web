import React from "react";

const ContentComponent = ({ content, title, Icon, padding }) => {
  return (
    <div
      className={` py-12 px-6 ${
        padding != undefined ? " py-4" : " py-2"
      } bg-white shadow-figma border md:border-none  rounded-3xl md:h-[270px] md:min-w-[370px]`}
    >
      <div className="flex justify-center mb-2 items-center">
        <Icon className="md:text-4xl mb-2 text-3xl text-scudGreen" />
      </div>
      <h1 className="font-semibold text-title text-lg md:text-base lg:text-lg mb-3 text-center ">
        {title}
      </h1>
      <p className="mb-4 text-[0.8rem]   md:text-sm text-textColor text-center">{content}</p>{" "}
    </div>
  );
};

export default ContentComponent;
