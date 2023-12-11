import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { BsPersonCircle } from "react-icons/bs";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { useDispatch } from "react-redux";
import { drawerOpen, modalToggle } from "../../features/scudSlice";
import Button from "../footer/FooterButton";
import "animate.css";
import { useRouter } from "next/router";

const Drawer = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  return (
    <div
      className={`animate__animated animate__fadeInLeft h-screen left-0 top-0 w-[80%] md:w-[40%] absolute p-4 md:p-7  bg-black/95`}
    >
      <AiOutlineClose
        onClick={() => dispatch(drawerOpen(false))}
        className="text-2xl hover:text-gray-500 text-white"
      />
      <div className=" my-10 flex justify-between">
        <img
          onClick={() => {
            router.push("/");
            dispatch(drawerOpen(false));
          }}
          src="/scudLogo.png"
          className="w-[3rem] -mt-4  h-[3rem]"
          alt="Scud Logo"
        />
        <span
          onClick={() => {
            dispatch(drawerOpen(false));
            dispatch(modalToggle(true));
          }}
          className="flex hover:text-gray-500 text-white"
        >
          <BsPersonCircle className="text-2xl mr-2" />
          <p>Sign In</p>
        </span>
      </div>

      <div className="flex space-y-4 lg:px-20 md:px-10 px-6 my-10 flex-col">
        <Button
          onClick={() => {
            router.push("/signup/rider-signup");
            dispatch(drawerOpen(false));
          }}
          text={"SIGN UP TO RIDE"}
          fill={true}
        />
        <Button
          onClick={() => {
            router.push("/signup/driver-signup"), dispatch(drawerOpen(false));
          }}
          text={"BECOME A DRIVER"}
        />

        <div className="my-10" />
      </div>

      <div className="px-6 md:px-20 text-sm text-white font-sans">
        <span
          onClick={() => {
            router.push("/ride"), dispatch(drawerOpen(false));
          }}
          className="flex mb-7 hover:text-gray-400 justify-between"
        >
          <p>Ride</p>
          <MdOutlineArrowForwardIos />
        </span>
        <span
          onClick={() => {
            router.push("/drive"), dispatch(drawerOpen(false));
          }}
          className="flex mb-7 hover:text-gray-400 justify-between"
        >
          <p>Drive</p>
          <MdOutlineArrowForwardIos />
        </span>
        <span
          onClick={() => {
            router.push("/about"), dispatch(drawerOpen(false));
          }}
          className="flex mb-7 hover:text-gray-400 justify-between"
        >
          <p>About</p>
          <MdOutlineArrowForwardIos />
        </span>
        <span
          onClick={() => {
            router.push("/faq"), dispatch(drawerOpen(false));
          }}
          className="flex mb-7 hover:text-gray-400 justify-between"
        >
          <p>Faq</p>
          <MdOutlineArrowForwardIos />
        </span>
      </div>
    </div>
  );
};

export default Drawer;
