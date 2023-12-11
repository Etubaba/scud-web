import React from "react";
import Button from "./Button";

const SignInModalCP = ({ button, Icon, title, content, onClick, text }) => {
  return (
    <div
      className={
        button
          ? `p-4 bg-[#F7F8FE] border border-scudGreen w-56 md:w-72 rounded-lg `
          : `py-4 px-6   bg-white shadow-figma md:border-none border  w-64 md:w-[23rem] rounded-lg `
      }
    >
      <div className="flex justify-center mb-5 items-center">
        <Icon className="md:text-5xl text-3xl text-scudGreen" />
      </div>
      <h1 className="font-semibold text-title text-xl md:text-2xl mb-4 text-center ">{title}</h1>
      <p className="mb-4 text-xs tracking-wide md:text-sm text-textColor text-center">
        {content}
      </p>{" "}
      {button && (
        <div className="flex justify-center items-center">
          <Button onClick={onClick} social={true} SocialIcon={Icon} text={text} />
        </div>
      )}
    </div>
  );
};

export default SignInModalCP;
